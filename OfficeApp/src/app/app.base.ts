import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppLang } from "./app.lang";
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { NavController, ModalController, ViewController, App, ToastController,NavParams } from "ionic-angular";
import { CommonApi } from '../providers/common.api';


import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';

export class AppBase {
    static TabChangeParamCache = null;
    public static commonapi:CommonApi=null;
    public static appbrowser:InAppBrowser;
    public static appavailablity:AppAvailability;
    public static appdevice:Device;
    

    public statusBar: StatusBar = null;
    public navCtrl: NavController = null;
    public modalCtrl: ModalController = null;
    public viewCtrl: ViewController = null;
    public toastCtrl: ToastController = null;
    public navParams:NavParams=null;
    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;
    public Lang = [];
    public res=[];


    public options={};

    public firseonshow=true;


    public constructor(navCtrl: NavController,
        modalCtrl: ModalController,
        viewCtrl: ViewController,
        statusBar: StatusBar,
        toastCtrl: ToastController,
    navParams:NavParams) {

        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.statusBar = statusBar;
        this.toastCtrl = toastCtrl;
        this.navParams=navParams;
    }
    setStatusBar() {
    //  this.statusBar.styleLightContent();
    }
    ionViewDidLoad() {
        this.onMyLoad();
        this.options=this.navParams.data;
    }
    onMyLoad() {
        this.Lang = AppLang.getLang();
    }
    getResources(){
        AppBase.commonapi.resource({},false).then((res)=>{
            this.res=res;
        });
    }
    ionViewDidEnter() {
        this.setStatusBar();
        this.checkLogin();
        this.getResources();
        this.onMyShow();
        this.firseonshow=false;
    }
    onMyShow() {

    }
    onPullRefresh(ref) {
        this.onMyShow();
        ref.complete();
    }
    doRefresh(ref) {
        setTimeout(() => {
            this.onPullRefresh(ref);
            ref.complete();
        }, 2000);
    }
    changeTab(index, param) {
        //var tabsPage=AppBase.tabsPage;
        //tabsPage.tabRef.select(index,param);
        //var tab=AppBase.tabsPage.tabRef.getSelected();
        //console.log(tab);
        AppBase.TabChangeParamCache = { tabIndex: index, param: param };
        this.navCtrl.parent.select(index);
    }
    back() {
        this.navCtrl.pop();
    }
    close() {
        this.viewCtrl.dismiss();
    }
    nagivate(pagename, param) {
        this.navCtrl.push(pagename, param);
    }
    modal(pageobj, param) {
        var modal = this.modalCtrl.create(pageobj, param);
        modal.present();
    }
    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }
    gotoObject(id){
        var model=this.modalCtrl.create(TabsPage,{id:id});
        model.present();
    }
    checkLogin() {
        //this.modal("LoginPage", {});
    }
    tel(tel){
        window.location.href="tel:"+tel;
    }
    toast(msg) {
        if (msg == "") {
            return;
        }
        const toast = this.toastCtrl.create({
            message: msg,
            duration: ((msg / 3)+1) * 1000
        });
        toast.present();
    }
    navtoMap(lat,lng,address){
        var a=1;
        a--;
        if(a==0){

            this.toast("还没弄好");
            return;
        }
         var device=AppBase.appdevice;

         let schemeIntent;   // 地图APP Package Name
         if(device.platform === 'iOS') {  
             schemeIntent="iosamap://"
         }else if(device.platform === 'Android') {  
             schemeIntent = 'com.autonavi.minimap';  
         } 
         var appAvailability=AppBase.appavailablity;
         var iab=AppBase.appbrowser;
         appAvailability.check(schemeIntent)     /* 检测微信是否已安卓 */
         .then(
             (yes: boolean) => {
                 iab.create(schemeIntent, '_system');    /* 打开微信 */
             },
             (no: boolean) => {
                 /* 未安装，请编写提示代码或跳转下载 */
                 this.toast("未检查手机的导航软件");
             }
         );
    }
}