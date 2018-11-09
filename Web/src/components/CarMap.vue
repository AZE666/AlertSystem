<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="bodycontent">


      <div style="width:100%;height:100%;" id="map"></div>

      <div class="carlist">
        <div class="flex-row">
          <div class="padding " >
            <div class="flex-row bg-car">
              <div v-for="car of carlist">
                <div class="padding car-item">
                  <div>
                    <img class="carlogo" :src="uploadpath+'car/'+car.logo">
                  </div>
                  <div class="flex-row"   >
                    <div>
                      <input :id="'icheck_'+car.id" type="checkbox" class="flat-red" :checked="car.checked=='Y'">
                    </div>
                    <div class="flex-1 margin-left" @click="checkCar(car,false)" >
                      {{car.name}}{{car.checked}}
                    </div>
                  </div>
                  <div class="margin-top"><button type="button" @click="showCar(car)" class="btn btn-xs btn-primary">查看详情</button></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>

	
  </div>
  <!-- /.content-wrapper -->

  

  <div class="modal fade" id="cardetail" >
    <div class="modal-dialog" :class="{t100:ispc}">
      <div class="modal-content"  >
        <!--
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">监控点</h4>
        </div>
        -->
        <div class="modal-body">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                  <li class="active"><a href="#tab_1-1" data-toggle="tab">数据</a></li>
                  <li><a href="#tab_2-2" data-toggle="tab">实时图片</a></li>
                  <li><a href="#tab_3-2" data-toggle="tab">实时视频</a></li>
                  <li class="pull-left header"><i class="fa fa-th"></i> {{currCar.name}}</li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="tab_1-1">
                      
                  <div class="row">
                    <div class="col-md-2">
                      <img :src="uploadpath+'car/'+currCar.logo" class="img-responsive img-rounded">
                    </div>
                    <div class="col-md-10">
                      
                      <dl  class="dl-horizontal">
                          <dt>监控时间</dt>
                          <dd>{{currCar.lastupdatetime}}</dd>
                          <dt>监控位置</dt>
                          <dd>{{currCar.address}}</dd>
                          <dt>监控位置坐标</dt>
                          <dd>{{currCar.lng}}, {{currCar.lat}}</dd>
                          <dt>监控负责人</dt>
                          <dd>{{currCar.manager}}</dd>
                          <dt>监控负责人电话</dt>
                          <dd>{{currCar.tel}}</dd>
                          <dt>相关监控设备</dt>
                          <dd>{{currCar.devicetype_name}}</dd>
                        </dl>
                        
                        <div id="rpt_car" style="min-width:640px;height:400px;"></div>
                    </div>
                  </div>
                        
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_2-2">
                      <h3 class="timeline-header"><a href="#">刚刚</a> 上传了照片</h3>

                      <div class="timeline-body">
                        <img src="static/dist/t/1.jpeg" alt="..." class="margin">
                        <img src="static/dist/t/2.jpeg" alt="..." class="margin">
                        <img src="static/dist/t/3.jpeg" alt="..." class="margin">
                        <img src="static/dist/t/4.jpeg" alt="..." class="margin">
                      </div>
                      <h3 class="timeline-header"><a href="#">1小时前</a> 上传了照片</h3>

                      <div class="timeline-body">
                        <img src="static/dist/t/5.jpeg" alt="..." class="margin">
                        <img src="static/dist/t/6.jpeg" alt="..." class="margin">
                        <img src="static/dist/t/7.jpeg" alt="..." class="margin">
                        <img src="static/dist/t/8.jpeg" alt="..." class="margin">
                      </div>
                      <h3 class="timeline-header"><a href="#">5小时前</a> 上传了照片</h3>

                      <div class="timeline-body">
                          <img src="static/dist/t/9.jpeg" alt="..." class="margin">
                          <img src="static/dist/t/10.jpeg" alt="..." class="margin">
                          <img src="static/dist/t/1.jpeg" alt="..." class="margin">
                          <img src="static/dist/t/5.jpeg" alt="..." class="margin">
                      </div>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane" id="tab_3-2">
                      <h3 class="timeline-header"><a href="#">{{currCar.address}}</a></h3>

                      <div class="timeline-body">
                          <video controls="controls" src="" style="width:640px;height:400px;"></video>
                      </div>
                  </div>
                    
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- nav-tabs-custom -->



              
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" v-if="false" class="btn btn-primary" >报警</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>




      <myfooter v-bind:memberinfo="memberinfo"></myfooter>

  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
import myheader from "./myheader";
import mynav from "./mynav";
import myfooter from "./myfooter";

var base = new AppBase();
var ctx = base.Gen();
ctx.name = "CarMap";

var data = base.GenData();
data.mainnav = "carmap";
data.map = null;
data.layer=null;
data.carlist=[];
data.currCar={};
data.datarunning=false;
data.datarunning2=false;
ctx.data = function() {
  return data;
};
ctx.methods.onMyLoad = function() {};
ctx.methods.loaddata = function() {
  this.loadapi("car", "summary", {}, carlist => {
    if(this.carlist.length==0){
      for(let car of carlist){
        car.checked="Y";
      }
    }else{
      
      for(let car of carlist){
        for(var i=0;i<this.carlist.length;i++){
          if(this.carlist[i].id==car.id){
            car.checked=this.carlist[i].checked;
            break;
          }
        }
      }
    }
    this.carlist=carlist;
    this.loadCarTrack();
    var that=this;
    this.$nextTick(()=>{
        if(that.datarunning2==false){
          that.datarunning2=true;
          $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass   : 'iradio_flat-green'
          });
          $('input[type="checkbox"]').on('ifChecked', function(event){
              var id=event.target.id;
                for(let car of that.carlist){
                  if("icheck_"+car.id==id){
                    car.checked="Y";
                    that.checkCar(car,true);
                    break;
                  }
                }
          });
          $('input[type="checkbox"]').on('ifUnchecked', function(event){
              var id=event.target.id;
                for(let car of that.carlist){
                  if("icheck_"+car.id==id){
                    car.checked="N";
                    that.checkCar(car,true);
                    break;
                  }
                }
          });
        }
    });
  });
};

ctx.methods.loadCarTrack=function(){
  //alert(this.carlist.length);


  var list=[];
  for(let car of this.carlist){
    if(car.checked=='Y'){
      for(let item of car.trackline){
        list.push({coord:item.lng+","+item.lat,value:item.TVOC});
      }
    }
  }
  //{coord:"115,44",value:1}
  this.layer.setData(list, {
        lnglat: 'coord'
  });

   var colors = [
        '#499824',
        '#8AC732',
        '#FFFF44',
        '#EB7227',
        '#E41B1B'
    ];

    this.layer.setOptions({
        // 单位米
        unit: 'meter',
        style: {
            // 正多边形半径
            radius: 40,
            // 高度为 0 即可贴地面
            height: 0,
            // 顶面颜色
            color: {
                key: 'value',
                scale: 'quantile',
                value: colors
            },
            opacity: 0.85
        }
    });

    this.layer.render();
  
};

ctx.methods.checkCar=function(car,noture){
  if(noture!=true){
    car.checked=car.checked=="Y"?"N":"Y";
    if(car.checked=="Y"){
      $('#icheck_'+car.id).iCheck('check')
    }else{
      $('#icheck_'+car.id).iCheck('uncheck')
    }
  }
  this.loadCarTrack();
};

ctx.methods.onMyShow = function() {
  //alert();

var bodyheight = $(".content-wrapper").height();
  if (bodyheight > this.lastmapheight) {
    this.lastmapheight = bodyheight;
  }
  var c = document.documentElement.clientHeight - 50 - 51;
  //alert(this.lastmapheight);
  $("#map").height(c);

  // var map = new AMap.Map("map", {
  //   zoom: 12, //级别
  //   center: [114.061882, 22.534653], //中心点坐标
  //   viewMode: "3D" //使用3D视图
  // });
    var map = Loca.create('map', {
        mapStyle: 'amap://styles/midnight',
        viewMode: '3D',
        pitch: 50,
        zoom: 13,
        center: [114.061882, 22.534653],
        features: ['bg', 'road']
    });

  this.map = map;

  var layer = Loca.visualLayer({
        container: map,
        type: 'point',
        shape: 'prism',
        // 设置正多边形顶点数量。
        // 拆分 32 个顶点就可以近似看做是圆形，拆分越多越平滑，但会有性能损耗。
        vertex: 32
    });
  this.layer=layer;
  
  this.loaddata();
  if (this.datarunning == false) {
    this.datarunning = true;
    setInterval(() => {
      this.loaddata();
    }, 1000 * 60);
  }


};

ctx.methods.showCar=function(car){
  this.currCar=car;
  this.$nextTick(()=>{
    $("#cardetail").modal("show");

        var series2 = [
          { name: "TVOC(ug/m3)", data: [] },
          { name: "PM25(ug/m3)", data: [] },
          { name: "PM10(ug/m3)", data: [] }
        ];

        for (var i = 0; i < car.trackline.length; i++) {
          var item = car.trackline[i];
          series2[0].data.push([item.timespan * 1000, Number(item.TVOC)]);
          series2[1].data.push([item.timespan * 1000, Number(item.PM25)]);
          series2[2].data.push([item.timespan * 1000, Number(item.PM10)]);
        }
var chart = Highcharts.chart("rpt_car", {
          chart: {
            type: "spline"
          },
          title: {
            text: "可吸入颗粒物走势图"
          },
          subtitle: {
            text: "48小时内非规律性时间内的变化"
          },
          xAxis: {
            type: "datetime",
            labels: {
              overflow: "justify"
            }
          },
          yAxis: {
            title: {
              text: "浓度"
            },
            min: 0,
            minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            plotBands: [
              {
                // Light air
                from: 0,
                to: 300,
                color: "rgba(68, 170, 213,0.3)",
                label: {
                  text: "优",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Light breeze
                from: 301,
                to: 600,
                color: "rgba(154,206,64,0.3)",
                label: {
                  text: "良",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Gentle breeze
                from: 601,
                to: 2000,
                color: "rgba(255,253,85,0.3)",
                label: {
                  text: "轻度污染",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Moderate breeze
                from: 2001,
                to: 4000,
                color: "rgba(241,134,51,0.3)",
                label: {
                  text: "中度污染",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Fresh breeze
                from: 4001,
                to: 20000,
                color: "rgba(236,51,35,0.3)",
                label: {
                  text: "重度污染",
                  style: {
                    color: "#606060"
                  }
                }
              }
            ]
          },
          plotOptions: {
            spline: {
              lineWidth: 4,
              states: {
                hover: {
                  lineWidth: 5
                }
              },
              marker: {
                enabled: false
              },
              pointInterval: 3600000, // one hour
              pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
            }
          },
          series: series2,
          navigation: {
            menuItemStyle: {
              fontSize: "10px"
            }
          }
        });



  });
};

ctx.components = { myheader, mynav, myfooter };

export default ctx;
//background: red;
</script>


<style>
.carlist{
  position: absolute;
  width:100%;
  margin-top:-200px;
}
.flex-row{
  display: flex;
}
.flex-1{
  flex:1;
}
.padding{
  padding:10px;
}
.bg-car{
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}
.car-item{
  width:150px;
}
.car-item .carlogo{
  width:100px;
  height:100px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.margin-left{
  margin-left: 5px;
}
.margin-top{
  margin-top:5px;
}
</style>
