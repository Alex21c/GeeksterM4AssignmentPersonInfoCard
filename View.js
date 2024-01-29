'use strict';
class View{

  constructor(model, dbCountries){
    this.dbCountries = dbCountries;
    this.masterWrapper={
      nightMode: "bg-slate-400",      
      dayMode: "bg-slate-700"
    };

    this.styles={
      table:{
        td:{
          heading:{            
            'default': 'font-medium text-[1.3rem] text-right text-stone-700',
            'lightMode': 'text-zinc-50',
            'darkMode': 'text-stone-700'
          },
          value:{
            'default': 'font-normal text-[1.2rem] text-left text-slate-700',
            'lightMode': 'text-zinc-50',
            'darkMode': 'text-slate-700'
          }

        },
        tr:{
          'default' : 'grid grid-cols-2 gap-[1rem]'
        }
      }
    }

    this.model = model;     
    // fetching DOM 
      this.wrapperMoonAndSun = document.querySelector('#wrapperMoonAndSun');
      this.circleMask = document.querySelector('.circleMask');
      this.body = document.querySelector('body');
      // this.textAreaAutoSave = document.querySelector('textarea#textAreaAutoSave');
      this.imgAnimationSavingData = document.querySelector('img#imgAnimationSavingData');
      this.personCountry = document.querySelector('select#personCountry');
      this.tableOutput = document.querySelector('table#tableOutput');
      this.masterWrapper = document.querySelector('div#masterWrapper');
      
    // updating 
      // this.textAreaAutoSave.value = this.model.fetchData();
    // console.log(this.formPersonInfoInput)
      
    // event listeners    

      this.wrapperMoonAndSun.addEventListener('click', (event)=>{
        this.updateDarkLightModeForTableShowingPersonInfo();
        // console.log(this.body)
        if(this.body.classList.contains('nightMode')){      
          // switch to day mode          
            this.circleMask.classList.remove('circleCoverMoon');
            this.circleMask.classList.add('circleCoverSun');
          // update text area
          // this.textAreaAutoSave.className = this.textAreaAutoSave.className.replace( this.styleFortextArea.nightMode, this.styleFortextArea.dayMode);          
          
        }else{          
          this.circleMask.classList.add('circleCoverMoon');        
          // this.textAreaAutoSave.className =  this.textAreaAutoSave.className.replace( this.styleFortextArea.dayMode, this.styleFortextArea.nightMode);
        }    
        // update 
        this.body.classList.toggle('nightMode');                
        
      }
      );
    
    // gui prepare
      this.generateCountriesSelectTag();
      this.updateOutputTable();
      
  }

  updateOutputTable(){
    // fetch data 
      let data = this.model.fetchData();
      if(!data){
        return false;
      }

    // show data
      data = JSON.parse(data);
      this.tableOutput.innerHTML = 
      ` 
      <tr class='${this.styles.table.tr.default}'>
        <td data="heading" class='${this.styles.table.td.heading.default}'>First Name</td>
        <td data="value" class='${this.styles.table.td.value.default}'>${data.firstName}</td>
      </tr>
      <tr class='${this.styles.table.tr.default}'>
        <td data="heading"  class='${this.styles.table.td.heading.default}'>Last Name</td>
        <td data="value" class='${this.styles.table.td.value.default}'>${data.lastName}</td>
      </tr>
      <tr class='${this.styles.table.tr.default}'>
        <td data="heading"  class='${this.styles.table.td.heading.default}'>Country</td>
        <td data="value"  class='flex flex-row gap-[.5rem] ${this.styles.table.td.value.default}'>
          <img src='Assests/${this.getCountryFlagImage(data.personCountry)}' alt='flag ${data.personCountry}' class='w-[2rem] h-[2rem]'> 
          <span>${data.personCountry}</span
        </td>
      </tr>
      <tr class='${this.styles.table.tr.default}'>
        <td  data="heading" class='${this.styles.table.td.heading.default}'>Phone Number</td>
        <td  data="value" class='${this.styles.table.td.value.default}'>${data.phoneNumber}</td>
      </tr>
      <tr class='${this.styles.table.tr.default}'>
        <td  data="heading" class='${this.styles.table.td.heading.default}'>State</td>
        <td  data="value" class='${this.styles.table.td.value.default}'>${data.state}</td>
      </tr>
      <tr class='${this.styles.table.tr.default}'>
        <td  data="heading" class='${this.styles.table.td.heading.default}'>City</td>
        <td  data="value" class='${this.styles.table.td.value.default}'>${data.city}</td>
      </tr>
      <tr class='${this.styles.table.tr.default}'>
        <td  data="heading" class='${this.styles.table.td.heading.default}'>Village</td>
        <td  data="value" class='${this.styles.table.td.value.default}'>${data.village}</td>
      </tr>
      
      `;

  }


  updateDarkLightModeForTableShowingPersonInfo(){
    let isItNightMode = this.body.classList.contains('nightMode');
    this.tableOutput.querySelectorAll('tr').forEach((tr)=>{
      tr.querySelectorAll('td').forEach((td)=>{        
        if(td.getAttribute('data') === 'heading'){
          if(isItNightMode){
            // then make it day mode by applying day light mode styles            
              td.className = td.className.replaceAll(this.styles.table.td.heading.darkMode, this.styles.table.td.heading.lightMode);    
              // console.log(td.className);          
            }else{
              // make it dark mode
              td.className = td.className.replaceAll(this.styles.table.td.heading.lightMode, this.styles.table.td.heading.darkMode);              
          }
        }else if(td.getAttribute('data') === 'value'){
          if(isItNightMode){
            // then make it day mode by applying day light mode styles            
              td.className = td.className.replaceAll(this.styles.table.td.value.darkMode, this.styles.table.td.value.lightMode);    
              // console.log(td.className);          
            }else{
              // make it dark mode
              td.className = td.className.replaceAll(this.styles.table.td.value.lightMode, this.styles.table.td.value.darkMode);              
          }
        }

      });
    });
  }

  showOrHideAnimaitonImageSavingData(){
    this.imgAnimationSavingData.classList.toggle('displayNone');
  }

  getCountryFlagImage(countryName){
    for(let country of this.dbCountries){
      if(country.name.toLowerCase() === countryName.toLowerCase()){
        return country.flag_4x3;
      }
    }
    // Default
    return false;
  }

  generateCountriesSelectTag(){
    this.personCountry.innerHTML = '';        
    this.dbCountries.forEach((country)=>{
      let name = country.name;
      // console.log(name, flag);
      let option = document.createElement('option');
        option.setAttribute('value',name);    
        if(name.toLowerCase() === 'india'){
         option.setAttribute('selected',''); 
        }
          let span = document.createElement('span');
          span.innerText = name;
          option.append(span);
        this.personCountry.append(option);
    });
  }
    
  
  
}  

