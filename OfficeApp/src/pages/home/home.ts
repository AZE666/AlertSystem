import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ViewController, ToastController,Slides } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { StataApi } from '../../providers/stata.api';
import { CommonApi } from '../../providers/common.api';

declare var AMap;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StataApi,CommonApi]
})
export class HomePage extends AppBase {
  @ViewChild('home_map') mapElement: ElementRef;
  @ViewChild("menu_slider") slides: Slides;
  @ViewChild("menu1_slider") slides_menu1: Slides;
 
  dashboard = { levelsummary: { bg: "" } };
  map = null;

  menu=1;
  menu1=1;

  bannerlist=[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController
    , public stataapi: StataApi,public commonapi:CommonApi
  ) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl);
    this.menu=1;
    this.menu1=1;
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
    if(this.firseonshow){
      this.menuChange(this.menu);
      this.menu1Change(this.menu1);
    }

    this.commonapi.bannerlist({}).then((bannerlist)=>{
      this.bannerlist=bannerlist;
    });

    this.stataapi.dashboard({}).then((dashboard) => {
      this.dashboard = dashboard;


      // this.map = Loca.create('home_map', {
      //   mapStyle: 'amap://styles/midnight',
      //   viewMode: '3D',
      //   pitch: 50,
      //   zoom: 13,
      //   center: [dashboard.area.lng, dashboard.area.lat]
      // });


      // var layer = Loca.visualLayer({
      //   eventSupport: true, // 开启事件后，可以触发 selectStyle 属性
      //   container: this.map,
      //   type: 'point',
      //   shape: 'prism',
      //   vertex: 4
      // });
      // var list = dashboard.objects.map(function (value) {
      //   var val = value.lng + "," + value.lat;
      //   //alert(val);
      //   return {
      //     coord: val,
      //     value: +value.index
      //   }
      // });
      // layer.setData(list.slice(0, 5000), {
      //   lnglat: 'coord'
      // });

      // var colors = [
      //   '#2c7bb6',
      //   '#abd9e9',
      //   '#ffffbf',
      //   '#fdae61',
      //   '#d7191c'
      // ];


      // layer.setOptions({
      //   // 图形长度单位：米
      //   unit: 'meter',
      //   // 高度单位：米
      //   heightUnit: 'meter',
      //   light: {
      //     // 环境光
      //     ambient: {
      //       // 光照颜色
      //       color: '#ffffff',
      //       // 光照强度，范围 [0, 1]
      //       intensity: 0.5
      //     },
      //     // 平行光
      //     directional: {
      //       color: '#ffffff',
      //       // 光照方向，是指从地面原点起，光指向的方向。
      //       // 数组分别表示 X 轴、Y 轴、Z 轴。
      //       // 其中 X 正向朝东、Y 正向朝南、Z 正向朝地下。
      //       direction: [1, -1.5, 2],
      //       intensity: 0.6
      //     }
      //   },
      //   style: {
      //     // 正多边形半径
      //     radius: 100,
      //     height: {
      //       key: 'value',
      //       value: [0, 500]
      //     },
      //     color: {
      //       key: 'value',
      //       scale: 'quantile',
      //       value: colors
      //     },
      //     opacity: 0.9,
      //     // 旋转角度，单位弧度
      //     rotate: Math.PI / 180 * 45
      //   },
      //   selectStyle: {
      //     // 3D 棱柱可修改的属性暂时只支持 color 和 opacity
      //     color: '#fcff19',
      //   }
      // });


      // layer.render();

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







  }
  onPullRefresh() {
    this.onMyLoad();
  }
  menuChange(m){
    this.menu=m;

    this.slides.lockSwipes(false);
    this.slides.slideTo(this.menu);
    this.slides.lockSwipes(true);
  }
  menu1Change(m){
    this.menu1=m;
    this.slides_menu1.lockSwipes(false);
    this.slides_menu1.slideTo(this.menu1);
    this.slides_menu1.lockSwipes(true);
  }
  bannerClick(link){
    console.log(link);
  }
}
