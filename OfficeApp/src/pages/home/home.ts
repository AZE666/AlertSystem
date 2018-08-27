import { Component } from '@angular/core';
import { NavController,ModalController, ViewController } from 'ionic-angular';
import {AppBase} from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends AppBase {
  bannertop=[];
  catlist=[];
  recommcourselist=[];
  greatecourselist=[];
  hotcourselist=[];
  bannermiddle={pic:""};
  constructor(public navCtrl: NavController,public modalCtrl:ModalController 
    , public statusBar : StatusBar,public viewCtrl:ViewController
  ) {
    super(navCtrl,modalCtrl,viewCtrl,statusBar);
  }
  setStatusBar(){
    this.statusBar.styleLightContent();
  }
  onMyLoad(){
    
    console.log("modal ctrl");
    console.log(this.modalCtrl);

    this.modalCtrl=this.modalCtrl;
    this.navCtrl=this.navCtrl;
    this.statusBar=this.statusBar;


  }
  onMyShow(){
    //this.changeTab(1,{});
  }
  onPullRefresh(){
    this.onMyLoad();
  }
}
