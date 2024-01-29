'use strict';
class Controller{ 

  constructor(view, model){
    this.view = view;
    this.model = model;
    this.formPersonInfoInput = document.querySelector('form#formPersonInfoInput');
    
    this.textAreaAutoSave = document.querySelector('textarea#textAreaAutoSave');


    // adding event listeners
    this.formPersonInfoInput.addEventListener('submit', (event)=>{
      event.preventDefault();
      let personData = {
        firstName: event.target['firstName'].value,
        lastName: event.target['lastName'].value,
        personCountry: event.target['personCountry'].value,
        phoneNumber: event.target['phoneNumber'].value,
        state: event.target['state'].value,
        city: event.target['city'].value,
        village: event.target['village'].value,
      };
      this.view.showOrHideAnimaitonImageSavingData();
      
      
      this.model.saveData(JSON.stringify(personData));    
      setTimeout(()=>{
        this.view.showOrHideAnimaitonImageSavingData();
        this.view.updateOutputTable();
      },3000);
      this.formPersonInfoInput.classList.add('displayNone');    
    });

  }

  debounce(func, delay) {
    let timeoutId;
    
    return (...args) =>{
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  

}
