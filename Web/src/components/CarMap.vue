<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="bodycontent">


      <div style="width:100%;height:100%;" id="map"></div>

      <div class="carlist">
        <div class="row">
            <div class="col-md-3 col-xs-12">
              <div class="form-group">
                <div class="input-group date">
                  <div class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </div>
                  <input type="text" class="form-control pull-right" id="datepicker" readonly >
                </div>
                <!-- /.input group -->
              </div>
            </div>
        </div>
        <table class="table" id="dtcarlist" >
                            <thead>
                            <tr>
                              <th>#</th>
                              <th>监控车</th>
                              <th>设备号</th>
                              <th>数据</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr v-for="(item,index) in vcarlist">
                                <td><input type="checkbox" :checked="item.checked=='Y'" @change="checkNewData(item) " /></td>
                                <td>{{item.name}}</td>
                                <td>{{item.machineid}}</td>
                                <td><a @click="showCar(item)">查看</a></td>
                              </tr>
                            </tbody>
                          </table>
      </div>

	
  </div>
  <!-- /.content-wrapper -->

  

  <div class="modal fade" id="cardetail"  >
    <div class="modal-dialog" :class="{t100:ispc}">
      <div class="modal-content"   >
        <!--
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">监控点</h4>
        </div>
        -->
        <div class="modal-body" >
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                  <li class="active"><a href="#tab_1-1" data-toggle="tab">数据</a></li>
                  <li><a href="#tab_2-2" data-toggle="tab">实时图片</a></li>
                  <li><a href="#tab_3-2" data-toggle="tab">实时视频</a></li>
                  <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                      图表 <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-1" data-toggle="tab">空气污染物走势图</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-2" data-toggle="tab">可吸入颗粒物走势图</a></li>
                    </ul>
                  </li>
                  <li class="pull-left header"><i class="fa fa-th"></i> {{currCar.name}}</li>
                </ul>
                <div class="tab-content" >
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
                        
                    </div>
                    <div class="col-md-12">
                        <div id="rpt_car" ></div>
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
                  <div class="tab-pane" id="tab_4-1">
                      <div id="rpt1_car" style="height:600px"></div>
                  </div>
                  <div class="tab-pane" id="tab_4-2">
                      <div id="rpt2_car" style="height:600px"></div>
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
data.vcarlist=[];
data.currCar={};
data.datarunning=false;
data.datarunning2=false;
ctx.data = function() {
  return data;
};
ctx.methods.onMyLoad = function() {};
ctx.methods.loaddata = function() {
  this.loadapi("car", "summary", {}, carlist => {
    
    this.carlist=carlist;
    this.loadCarTrack();
    var that=this;
    this.$nextTick(()=>{
         that.showCarTrack();
    });
  });
};

ctx.methods.loadCarTrack=function(){
  //alert(this.carlist.length);
  var str=[];
  for(let car of this.carlist){
    if(car.checked=='Y'&&car.upload_date==this.day){
      str.push(car.id+":"+car.upload_date);
    }
  }
//alert(str.join(","));
  this.loadapi("car","trackline",{str:str.join(",")},(data)=>{
      //alert(data);
        if(this.layer!=null){
          
        this.layer.destroy();
        this.layer=null;
        }
        this.layer = Loca.visualLayer({
            container: this.map,
            type: 'heatmap',
            shape: 'hexagon'
        });

        this.layer.setData(data, {
            lnglat: function (obj) {
                var val = obj.value;
                return [val['lng'], val['lat']]
            },
            value: 'count',
            type: 'tsv'
        });

        this.layer.setOptions({
            unit: 'meter',
            style: {
                color: ['#ecda9a', '#efc47e', '#f3ad6a', '#f7945d', '#f97b57', '#f66356', '#ee4d5a'],
                radius: 200,
                opacity: 0.9,
                gap: 200,
                height: [0, 50000]
            }
        });
        console.log(this.layer);

        this.layer.render();


  });
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
  var cc=IsPC()?300:150;
  var c = document.documentElement.clientHeight - 50 - 51 -cc;
  //alert(this.lastmapheight);
  $("#map").height(c);

  // var map = new AMap.Map("map", {
  //   zoom: 12, //级别
  //   center: [114.061882, 22.534653], //中心点坐标
  //   viewMode: "3D" //使用3D视图
  // });
    var map = Loca.create('map', {
        mapStyle: 'amap://styles/dark',
        viewMode: '3D',
        pitch: 50,
        zoom: 13,
        center: [114.061882, 22.534653],
        features: ['bg', 'road']
    });

  this.map = map;
var d=new Date();
var year=d.getFullYear().toString();
var month=(d.getMonth()+1>9)?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString();
var date=(d.getDate()>9)?d.getDate().toString():"0"+(d.getDate()).toString();
var today=year+"-"+month+"-"+date;
this.day=today;
var that=this;
$('#datepicker').val(today);
    $('#datepicker').datepicker({
      autoclose: true,
        endDate: (new Date()),
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: true,
        defaultDate : new Date(),
        todayHighlight:true
    }).on('changeDate', function(e){
        var d=e.date;
        var year=d.getFullYear().toString();
        var month=(d.getMonth()+1>9)?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString();
        var date=(d.getDate()>9)?d.getDate().toString():"0"+(d.getDate()).toString();
        var today=year+"-"+month+"-"+date;
        that.day=today;
        that.showCarTrack();
        that.loadCarTrack();

    });
       


  map.on('mapload', function () {
        map.getMap().plugin(['AMap.ControlBar'], function () {
            var controlBar = new AMap.ControlBar();
            map.getMap().addControl(controlBar);
        });
    });
  
  this.loaddata();
};
ctx.methods.checkNewData=function(item){
  if(item!=undefined){
     item.checked=item.checked=='Y'?'N':"Y";
  }
  this.loadCarTrack();
};


ctx.methods.showCarTrack=function(){
  var vcarlist=[];
  for(var car of this.carlist){
     if(car.upload_date==this.day){
       vcarlist.push(car);
     }
  }
  this.vcarlist=vcarlist;
  this.$nextTick(()=>{
   //DT("#dtcarlist",[[3, "desc"]],4,false);
  });
}

ctx.methods.showCar=function(car){
  this.currCar=car;
  this.loadapi("car","trackline2",{car_id:car.id,date:car.upload_date}, trackline => {
    
    $("#cardetail").modal("show");

        var series2 = [];

        for (var i = 0; i < trackline.length; i++) {
          var item = trackline[i];
          if(item.TVOC>0){
            series2.push([item.upload_time, Number(item.TVOC)*1000]);
          }
        }
        



        if(IsPC()){
          var width= $("#cardetail .modal-dialog").width()*0.9;
        }else{
          var width= $("#cardetail ").width()*0.8;
        }
        


        $("#rpt_car").width(width).height(GetHeight(width));

        RPT3("rpt_car","TVOC可吸入颗粒物走势图",series2,
        [this.memberinfo.alertset.tvoc_1,
        this.memberinfo.alertset.tvoc_2,
        this.memberinfo.alertset.tvoc_3,
        this.memberinfo.alertset.tvoc_4,
        this.memberinfo.alertset.tvoc_5,
       20000]);

        var series = [
          { name: "SO2(ppm)", data: [] },
          { name: "NO2(ppm)", data: [] },
          { name: "CO(ppm)", data: [] },
          { name: "H2S(ppm)", data: [] },
          { name: "O3(ppm)", data: [] }
        ];

        for (var i = 0; i < trackline.length; i++) {
          var item = trackline[i];
          series[0].data.push([item.upload_time, Number(item.SO2)]);
          series[1].data.push([item.upload_time, Number(item.NO2)]);
          series[2].data.push([item.upload_time, Number(item.CO)]);
          series[3].data.push([item.upload_time, Number(item.H2S)]);
          series[4].data.push([item.upload_time, Number(item.O3)]);
        }

        $("#rpt1_car").width(width).height(GetHeight(width));

        RPT4("rpt1_car" ,"空气污染物走势图",series);


        var series2 = [
          { name: "TVOC(mg/m3)", data: [] },
          { name: "PM25(ug/m3)", data: [] },
          { name: "PM10(ug/m3)", data: [] }
        ];
        $("#rpt2_car").width(width).height(GetHeight(width));


        for (var i = 0; i < trackline.length; i++) {
          var item = trackline[i];
          series2[0].data.push([item.upload_time, Number(item.TVOC)]);
          series2[1].data.push([item.upload_time, Number(item.PM25)]);
          series2[2].data.push([item.upload_time, Number(item.PM10)]);
        }
        RPT4("rpt2_car","可吸入颗粒物走势图",series2);

  });
};

ctx.components = { myheader, mynav, myfooter };

export default ctx;
//background: red;
</script>


<style>
.carlist{
  padding:10px;
}
.carlist div{
  
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
