import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { MemberApi } from '../../providers/member.api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [MemberApi]
})
export class LoginPage extends AppBase {

  mobile = "";
  password="";
  model="v";
  pswshow=false;
  verifycode="";
  retryverifysecond=0;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController,
    public memberApi: MemberApi
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl);
    this.model="v";
  }

  onMyShow() {

  }

  checkLogin() {

  }
  gotoVerify() {
    this.memberApi.sendloginverifycode({ mobile: this.mobile }).then((ret) => {
      if (ret.code == 0) {
        this.retryverifysecond=60;
        var retryhandle=setInterval(()=>{
          this.retryverifysecond=this.retryverifysecond-1;
          if(this.retryverifysecond<=0){
            clearInterval(retryhandle);
          }
        },1000);
      } else {
        this.toast(ret.return);
      }
    });
  }
}
