import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { CommonApi } from '../../providers/common.api';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newslist',
  templateUrl: 'newslist.html',
  providers:[CommonApi]
})
export class NewslistPage  extends AppBase {

  list=[];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController,public navParam:NavParams
  ,public commonApi:CommonApi) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl,navParam);
  } 

  onMyShow(){
    this.commonApi.newslist({type:this.options["type"]}).then((list)=>{
      this.list=list;
    });
  }

  gotoNews(id){
    this.nagivate("NewsPage",{id:id});
  }


}
