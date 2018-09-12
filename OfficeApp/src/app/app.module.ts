import { NgModule, ErrorHandler,enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from "@angular/http";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonApi } from '../providers/common.api';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';

enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ListPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:"",
      iconMode:"ios",
      modalEnter:"modal-slide-in",
      modalLeave:"modal-slide-out",
      tabsPlacement:"bottom",
      pageTransition:"ios",
      backButtonIcon:"ios-arrow-back",
      statusbarPadding:false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonApi,
    InAppBrowser,AppAvailability,Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
