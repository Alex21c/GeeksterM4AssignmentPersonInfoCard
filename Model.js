'use strict';
class Model{
  constructor(){    
    this.isThereUserDataAlreadyPresent = localStorage.getItem('userData')?true:false;
   
  }  

  saveData(data){    
    localStorage.setItem('userData', data);
    this.isThereUserDataAlreadyPresent=true;
    return true;
  }

  fetchData(){  
    let data = localStorage.getItem('userData');
    // default is
      return data ? data : '';
  }


}
