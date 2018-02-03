import { ErrorHandler } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';


export class MyErrorHandler extends ErrorHandler {
 
    firebase;
 constructor() { 
   // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
   // when an error happens. If we do not rethrow, bootstrap will always succeed.
   super();
   this.firebase = new  Firebase()
 }
 
  handleError(error) {
    
   // delegate to the default handler
   super.handleError(error); 
    // console.log('ERROOOOOOSSS NAO TRATADOS',error.message);
    let e = {
      message:error.message
    }
    this.firebase.logError(e);

    
   // send the error to the server
   

  }
}
