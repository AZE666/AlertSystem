import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppLang } from "./app.lang";
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { NavController, ModalController, ViewController, App, ToastController } from "ionic-angular";

export class AppBase {
    static TabChangeParamCache = null;
    

    public statusBar: StatusBar = null;
    public navCtrl: NavController = null;
    public modalCtrl: ModalController = null;
    public viewCtrl: ViewController = null;
    public toastCtrl: ToastController = null;
    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath();
    public util = AppUtil;

    public Lang = [];

    public firseonshow=true;


    public constructor(navCtrl: NavController,
        modalCtrl: ModalController,
        viewCtrl: ViewController,
        statusBar: StatusBar,
        toastCtrl: ToastController) {

        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.statusBar = statusBar;
        this.toastCtrl = toastCtrl;
    }
    setStatusBar() {
      this.statusBar.styleLightContent();
    }
    ionViewDidLoad() {
        this.onMyLoad();
    }
    onMyLoad() {
        this.Lang = AppLang.getLang();
    }
    ionViewDidEnter() {
        this.setStatusBar();
        this.checkLogin();
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
    checkLogin() {
        //this.modal("LoginPage", {});
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
}