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

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [MemberApi]
})
export class LoginPage  {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController,
    public memberApi: MemberApi,public navParam:NavParams
  ) {
    //super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl,navParam);
  }

  onMyShow() {

  }

  checkLogin() {

  }
  gotoVerify() {
    
  }
}
