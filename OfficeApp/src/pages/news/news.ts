import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { CommonApi } from '../../providers/common.api';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
  providers: [CommonApi]
})
export class NewsPage extends AppBase {

  news = {};
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController, public navParam: NavParams
    , public commonApi: CommonApi) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, navParam);
  }

  onMyShow() {
    this.commonApi.news({ id: this.options["id"] }).then((news) => {
      news.content=this.util.HtmlDecode(news.content);
      this.news = news;
    });
  }

}
