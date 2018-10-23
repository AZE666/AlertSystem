import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ViewController, ToastController, Slides,NavParams } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { StataApi } from '../../providers/stata.api';
import { CommonApi } from '../../providers/common.api';
import { ObjApi } from '../../providers/obj.api';
import { NewslistPage } from '../newslist/newslist';
import { MapCreator } from '../../app/app.map';

declare var AMap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StataApi, CommonApi,ObjApi]
})
export class HomePage extends AppBase {
  @ViewChild('home_map') mapElement: ElementRef;
  @ViewChild("menu_slider") slides: Slides;
  @ViewChild("menu0_slider") slides_menu0: Slides;
  @ViewChild("menu1_slider") slides_menu1: Slides;
  @ViewChild("menu2_slider") slides_menu2: Slides;

  dashboard = { environment: { aqi: "", co: "", no2: "", quality: "", o3: "", so2: "" }, levelsummary: { bg: "" }, area: { cityname: "", areaname: "" }, shidu: "" };
  map = null;

  menu = 1;
  menu0 = 0;
  menu1 = 1;
  menu2 = 0;

  bannerlist = [];
  focusobjlist=[];
  aeventlist=[];
  beventlist=[];

  seasonrank=[];
  monthrank=[];
  weekrank=[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public stataapi: StataApi, public commonapi: CommonApi,public navParam:NavParams,
    public objapi:ObjApi
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl,navParam);
    this.menu = 1;
    this.menu1 = 1;
  }
  onMyLoad() {

    console.log("modal ctrl");
    console.log(this.modalCtrl);

    this.modalCtrl = this.modalCtrl;
    this.navCtrl = this.navCtrl;
    this.statusBar = this.statusBar;



  }
  onMyShow() {
    //this.changeTab(1,{});
    if (this.firseonshow) {
      this.menuChange(this.menu);
      this.menu1Change(this.menu1);
    }

    this.objapi.list({myfocus:"Y",orderby:" rand() desc limit 0,10 "}).then((list)=>{
      this.focusobjlist=list;
    });

    this.objapi.eventlist({status:"A"}).then((aeventlist)=>{
      this.aeventlist=aeventlist;
    });
    this.objapi.eventlist({status:"B"}).then((beventlist)=>{
      this.beventlist=beventlist;
    });
    this.objapi.rank({rank:"week"}).then((weekrank)=>{
      this.weekrank=weekrank;
    });
    this.objapi.rank({rank:"month"}).then((monthrank)=>{
      this.monthrank=monthrank;
    });
    this.objapi.rank({rank:"season"}).then((seasonrank)=>{
      this.seasonrank=seasonrank;
    });

    this.commonapi.bannerlist({}).then((bannerlist) => {
      this.bannerlist = bannerlist;
    });

    this.stataapi.dashboard({}).then((dashboard) => {
      this.dashboard = dashboard;

      var map = Loca.create('home_map', {
        center: [dashboard.area.lng, dashboard.area.lat],
        zoom: 13
      });

      var layer = Loca.visualLayer({
        container: map,
        type: 'heatmap',
        shape: 'normal'
      });

      MapCreator.HeatMap(map,dashboard.objects);

    });

    //   this.map=new AMap.Map("home_map",{
    //     center: [114.120451,22.548031],
    //     layers: [//使用多个图层
    //         new AMap.TileLayer.Satellite(),
    //         new AMap.TileLayer.RoadNet()
    //     ],
    //     zooms: [13,18],//设置地图级别范围
    //     zoom: 13
    // });



    //this.gotoEvent(1);



  }
  onPullRefresh() {
    this.onMyLoad();
  }
  menuChange(m) {
    this.menu = m;

    this.slides.lockSwipes(false);
    this.slides.slideTo(this.menu);
    this.slides.lockSwipes(true);
  }
  menu0Change(m) {
    this.menu0 = m;
    this.slides_menu0.lockSwipes(false);
    this.slides_menu0.slideTo(this.menu0);
    this.slides_menu0.lockSwipes(true);
  }
  menu1Change(m) {
    this.menu1 = m;
    this.slides_menu1.lockSwipes(false);
    this.slides_menu1.slideTo(this.menu1);
    this.slides_menu1.lockSwipes(true);
  }
  menu2Change(m) {
    this.menu2 = m;
    this.slides_menu2.lockSwipes(false);
    this.slides_menu2.slideTo(this.menu2);
    this.slides_menu2.lockSwipes(true);
  }
  bannerClick(link) {
    console.log(link);
  }
  swipe(e, menu, menu1) {
    console.log(e.direction);
    var num = 0;
    if (e.direction == 2) {
      num++;
    } else if (e.direction == 4) {
      num--;
    }
    if (menu == 0) {
      if (menu1 + num > 2) {
        menu++;
      } else if (menu1 + num < 0) {
        //menu--;
      } else {
        menu1 = menu1 + num;
      }
      this.menuChange(menu);
      this.menu0Change(menu1);
      return;
    }
    if (menu == 1) {
      if (menu1 + num > 2) {
        menu++;
      } else if (menu1 + num < 0) {
        menu--;
      } else {
        menu1 = menu1 + num;
      }
      this.menuChange(menu);
      this.menu1Change(menu1);
      return;
    }
    if (menu == 2) {
      if (menu1 + num > 1) {
        //menu++;
      } else if (menu1 + num < 0) {
        menu--;
      } else {
        menu1 = menu1 + num;
      }
      this.menuChange(menu);
      this.menu2Change(menu1);
      return;
    }

    
  }
  gotoNews(type, title) {
    var modal = this.modalCtrl.create("NewslistPage", { type: type, title: title });
    modal.present();
  }
  gotoEvent(id) {
    var modal = this.modalCtrl.create("EventPage", { id:id });
    modal.present();
  }
}
