'use strict';
class Model{
  constructor(){    

   
  }  

  saveData(data){    
    localStorage.setItem('userData', data);
    return true;
  }

  fetchData(){  
    let data = localStorage.getItem('userData');

    // default is
      return data ? data : '';
  }


}
