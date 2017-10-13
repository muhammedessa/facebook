import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

logginIN= false;
user:any;

  constructor(public navCtrl: NavController,private fb: Facebook) {

fb.getLoginStatus().then(res=>{
  if(res.status==="connect"){
    this.logginIN = true;
  }else{
    this.logginIN= false;
  }
}).catch(e =>{
  console.log('error : '+e);
});

  }

login(){
  this.fb.login(['public_profile', 'user_friends', 'email'])
  .then(res=>{
    if(res.status==="connected"){
      this.logginIN = true;
      this.getDetails(res.authResponse.userID);

    }else{
      this.logginIN=false;
    }
  })
  .catch(e => console.log('Error logging into Facebook', e));
}

logout(){
  this.fb.logout().then(res=>{
  this.logginIN=false;
  }).catch(e=>{
    console.log(e);
  });
}

getDetails(id){
this.fb.api("/"+id+"/?fields=id,email,name,picture,gender",['public_profile']).then(res=>{
  console.log(res);
  this.user = res;
}).catch(e=>{
  console.log(e);
});
}



}
