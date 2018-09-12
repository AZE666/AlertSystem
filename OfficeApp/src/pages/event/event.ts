import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { AppBase } from "../../app/app.base";
import { StatusBar } from '@ionic-native/status-bar';
import { ObjApi } from '../../providers/obj.api';


/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  providers: [ObjApi]
})
export class EventPage extends AppBase {
  @ViewChild('EchartsContent') container: ElementRef;//与html中div #container1对应
  EChart: any;

  event = {};
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public statusBar: StatusBar, public viewCtrl: ViewController, public toastCtrl: ToastController,
    public navParam: NavParams, public objapi: ObjApi) {
    super(navCtrl, modalCtrl, viewCtrl, statusBar, toastCtrl, navParam);
  }

  onMyShow() {
    this.objapi.event({ id: this.options["id"] }).then((event) => {

      event.start=this.util.HtmlDecode(event.start);
      event.process=this.util.HtmlDecode(event.process);
      event.done=this.util.HtmlDecode(event.done);
      this.event = event;
    });



    var data = [];
    for (var i = 0; i <= 360; i++) {
      var t = i / 180 * Math.PI;
      var r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    let ctelement = this.container.nativeElement;
    this.EChart = echarts.init(ctelement);

    var 
    option = {
        color: ['#003366', '#006699', '#e5323e'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['罗湖区', '黄贝街道', '商户']
        },
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: ['9/8', '9/9', '9/10', '9/11', '9/12']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '罗湖区',
                type: 'bar',
                barGap: 0,
                data: [320, 332, 301, 334, 390]
            },
            {
                name: '黄贝街道',
                type: 'bar',
                data: [220, 182, 191, 234, 290]
            },
            {
                name: '商户',
                type: 'bar',
                data: [667, 585, 587, 299, 760]
            }
        ]
    };

    this.EChart.setOption(option);


  }

}
