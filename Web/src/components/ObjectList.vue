<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">




			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					监控企业
					<small>列表数据</small>
				</h1>
			</section>

			<!-- Main content -->
			<section class="content">

                <div class="row">
                <div class="col-xs-12">
                <div class="box">

                    <div class="box-header">
                    <h3 class="box-title"></h3>
                    </div>
                        <div style="padding:20px">
                        <div class="row">
                            <div class="col-md-12" >
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th style="width:60px;">公司</th>
                              <th style="width:60px;">设备号</th>
                              <th style="width:60px;">设备</th>
                              <th style="width:60px;">报警</th>
                              <th style="width:60px;">历史</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr v-for="(item,index) in devicelist">
                                <td>{{item.name}}</td>
                                <td>{{item.machineid}}</td>
                                <td>{{item.device_name}}</td>
                                <td><router-link :to="'/ObjectA?id='+item.id">查看</router-link></td>
                                <td><a  @click="showObj(item)" >查看</a></td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                            

                        </div>

                        </div>


                
                </div>
                </div>
                </div>



                
                <div class="row"  v-if="obj!=null">
                <div class="col-xs-12">
                <div class="box">

                <div>
                    <div class="box-header">
                    <h3 class="box-title">{{obj.name}}</h3>
                    </div>
                        <div style="padding:20px">
                        <div class="row">
                            <div class="col-md-12" :id="'exceedtd'">
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>设备</th>
                              <th>机器编号</th>
                              <th>报警时间</th>
                              <th v-if="ispc==false">污染因子</th>
                              <th v-if="ispc==true">SO2</th>
                              <th v-if="ispc==true">NO2</th>
                              <th v-if="ispc==true">CO</th>
                              <th v-if="ispc==true">H2S</th>
                              <th v-if="ispc==true">O3</th>
                              <th v-if="ispc==true">TVOC</th>
                              <th v-if="ispc==true">PM2.5</th>
                              <th v-if="ispc==true">PM10</th>
                              <th v-if="false">状态</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item,index) in obj.airdata">
                                <td>{{item.devicename}}</td>
                                <td>{{item.machineid}}</td>
                                <td >{{item.df}}时</td>
                                <td v-if="ispc==false">
                                  
                                  <span v-bind:class="{ 'text-red':parseInt(item.SO2)>parseInt(obj.exso2) }">SO2: {{item.SO2}}</span>
                                  <span  v-bind:class="{ 'text-red':parseInt(item.NO2)>parseInt(obj.exno2) }">NO2: {{item.NO2}}</span>
                                  <span  v-bind:class="{ 'text-red':parseInt(item.CO)>parseInt(obj.exco) }">CO: {{item.CO}}</span>
                                  <span  v-bind:class="{ 'text-red':parseInt(item.H2S)>parseInt(obj.exh2s) }">H2S: {{item.H2S}}</span>
                                  <span  v-bind:class="{ 'text-red':parseInt(item.O3)>parseInt(obj.exo3) }">O3: {{item.O3}}</span>
                                  <span  v-bind:class="{ 'text-red':parseInt(item.TVOC)>parseInt(obj.extvoc) }">TVOC: {{item.TVOC}}</span>
                                  <span  v-bind:class="{ 'text-red':parseInt(item.PM25)>parseInt(obj.expm25) }">PM2.5: {{item.PM25}}</span>
                                  <span v-bind:class="{ 'text-red':parseInt(item.PM10)>parseInt(obj.expm10) }">PM10: {{item.PM10}}</span>

                                </td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':parseInt(item.SO2)>parseInt(obj.exso2) }">{{item.SO2}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.NO2)>parseInt(obj.exno2) }">{{item.NO2}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.CO)>parseInt(obj.exco) }">{{item.CO}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.H2S)>parseInt(obj.exh2s) }">{{item.H2S}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.O3)>parseInt(obj.exo3) }">{{item.O3}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.TVOC)>parseInt(obj.extvoc) }">{{item.TVOC}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.PM25)>parseInt(obj.expm25) }">{{item.PM25}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':parseInt(item.PM10)>parseInt(obj.expm10) }">{{item.PM10}}</td>

                                <td  v-if="false"><button v-if="index>0&&item.alert_id==0&&(
                                  parseInt(item.SO2)>parseInt(obj.exso2)||
                                    parseInt(item.NO2)>parseInt(obj.exno2)||
                                    parseInt(item.CO)>parseInt(obj.exco)||
                                    parseInt(item.H2S)>parseInt(obj.exh2s)||
                                    parseInt(item.O3)>parseInt(obj.exo3)||
                                    parseInt(item.TVOC)>parseInt(obj.extvoc)||
                                    parseInt(item.PM25)>parseInt(obj.expm25)||
                                    parseInt(item.PM10)>parseInt(obj.expm10))"
                                     type="button" class="btn  btn-warning btn-xs" @click="showalert(item,'A')">报警</button>
                                     <button v-if="index>0&&item.alert_id==0&&(
                                       parseInt(item.SO2)>parseInt(obj.exso2)||
                                    parseInt(item.NO2)>parseInt(obj.exno2)||
                                    parseInt(item.CO)>parseInt(obj.exco)||
                                    parseInt(item.H2S)>parseInt(obj.exh2s)||
                                    parseInt(item.O3)>parseInt(obj.exo3)||
                                    parseInt(item.TVOC)>parseInt(obj.extvoc)||
                                    parseInt(item.PM25)>parseInt(obj.expm25)||
                                    parseInt(item.PM10)>parseInt(obj.expm10))"
                                     type="button" class="btn btn-default btn-xs" @click="showalert(item,'B')">忽略</button>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='A'"  class="label bg-blue">已报警</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='B'"  class="label bg-yellow">不处理</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='C'"  class="label bg-green">已完成</small>
                                     </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                            <div class="col-md-12">

                      <div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                  <li class="active"><a href="#tab_1-1" data-toggle="tab">SO2</a></li>
                  <li><a href="#tab_1-2" data-toggle="tab">NO2</a></li>
                  <li><a href="#tab_1-3" data-toggle="tab">CO</a></li>
                  <li><a href="#tab_1-4" data-toggle="tab">H2S</a></li>
                  <li><a href="#tab_1-5" data-toggle="tab">O3</a></li>
                  <li class="pull-left header"><i class="fa fa-th"></i> 空气污染物走势图 </li>
                </ul>
                <div class="tab-content">
                    <div class="flex-row">
                        <div class="flex-1"></div>
                        <div>
                            <div class="btn-group">
                                <button type="button" @click="rpt1r='T'" class="btn " :class="{'btn-primary':rpt1r=='T','btn-default':rpt1r=='D'}">小时</button>
                                <button type="button" @click="rpt1r='D'" class="btn" :class="{'btn-default':rpt1r=='T','btn-primary':rpt1r=='D'}">日期</button>
                            </div>
                        </div>
                    </div>
                  <div class="tab-pane active" id="tab_1-1">

                        <div id="rptso2" class="rpt" :class="{'hide':rpt1r!='T'}" style="height:400px;"></div>
                        <div id="rptso2_d" class="rpt" :class="{'hide':rpt1r!='D'}" style="height:400px;"></div>


                            </div>

                  <div class="tab-pane " id="tab_1-2">
                        
                        <div id="rptno2" class="rpt" :class="{'hide':rpt1r!='T'}"  style="height:400px;"></div>
                        <div id="rptno2_d" class="rpt" :class="{'hide':rpt1r!='D'}"  style="height:400px;"></div>

                            </div>
                  <div class="tab-pane " id="tab_1-3">
                      
                        <div id="rptco" class="rpt" :class="{'hide':rpt1r!='T'}"  style="height:400px;"></div>
                        <div id="rptco_d" class="rpt" :class="{'hide':rpt1r!='D'}"  style="height:400px;"></div>
                            </div>
                  <div class="tab-pane " id="tab_1-4">
                      
                        <div id="rpth2s" class="rpt" :class="{'hide':rpt1r!='T'}"  style="height:400px;"></div>
                        <div id="rpth2s_d" class="rpt" :class="{'hide':rpt1r!='D'}"  style="height:400px;"></div>
                            </div>
                  <div class="tab-pane " id="tab_1-5">
                      
                        <div id="rpto3" class="rpt" :class="{'hide':rpt1r!='T'}"  style="height:400px;"></div>
                        <div id="rpto3_d" class="rpt" :class="{'hide':rpt1r!='D'}" style="height:400px;"></div>
                            </div>



                            </div>
                            </div>




                            </div>
                            <div class="col-md-12">


<div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                  <li class="active"><a href="#tab_2-1" data-toggle="tab">TVOC</a></li>
                  <li><a href="#tab_2-2" data-toggle="tab">PM2.5</a></li>
                  <li><a href="#tab_2-3" data-toggle="tab">PM10</a></li>
                  <li class="pull-left header"><i class="fa fa-th"></i>可吸入颗粒物走势图</li>
                </ul>
                <div class="tab-content">
                    
                    <div class="flex-row">
                        <div class="flex-1"></div>
                        <div>
                            <div class="btn-group">
                                <button type="button" @click="rpt2r='T'" class="btn " :class="{'btn-primary':rpt2r=='T','btn-default':rpt2r=='D'}">小时</button>
                                <button type="button" @click="rpt2r='D'" class="btn" :class="{'btn-default':rpt2r=='T','btn-primary':rpt2r=='D'}">日期</button>
                            </div>
                        </div>
                    </div>
                  <div class="tab-pane active" id="tab_2-1">

                        <div id="rpttvoc" class="rpt" :class="{'hide':rpt2r!='T'}"   style="height:400px;"></div>
                        <div id="rpttvoc_d" class="rpt" :class="{'hide':rpt2r!='D'}"  style="height:400px;"></div>


                            </div>

                  <div class="tab-pane " id="tab_2-2">
                        
                        <div id="rptpm25" class="rpt" :class="{'hide':rpt2r!='T'}"   style="height:400px;"></div>
                        <div id="rptpm25_d" class="rpt" :class="{'hide':rpt2r!='D'}"  style="height:400px;"></div>

                            </div>
                  <div class="tab-pane " id="tab_2-3">
                      
                        <div id="rptpm10" class="rpt" :class="{'hide':rpt2r!='T'}"   style="height:400px;"></div>
                        <div id="rptpm10_d" class="rpt" :class="{'hide':rpt2r!='D'}"  style="height:400px;"></div>
                            </div>
                  



                            </div>
                            </div>


                            </div>

                        </div>

                        </div>
                </div>


                
                </div>
                </div>
                </div>
                
			</section>
			<!-- /.content -->


	
  </div>
  <!-- /.content-wrapper -->

  
      <div class="modal fade" id="modal-handletips">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">系统提示</h4>
              </div>
              <div class="modal-body">
                <p v-if="opt_status=='B'">是否确定不处理该预警？</p>
                <p v-if="opt_status=='A'">是否确定发起预警？</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary"  @click="alert(opt_obj,opt_status)" >确定</button>
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
ctx.name = "ObjectList";

var data = base.GenData();
data.mainnav = "obj";
data.devicelist = [];
data.rpt1r = "T";
data.rpt2r = "T";
data.opt_obj = {};
data.opt_status = "";
data.obj = null;

ctx.data = function() {
  return data;
};

ctx.methods.onMyShow = function() {
  this.loadapi("obj", "list", { needdevice: "Y" }, devicelist => {
    this.devicelist = devicelist;
  });
};

ctx.methods.showalert = function(item, status) {
  this.opt_obj = item;
  this.opt_status = status;
  $("#modal-handletips").modal("show");
};

ctx.methods.alert = function(item, status) {
  item.alert_id = 1;
  item.alertstatus = status;
  this.loadapi(
    "airdata",
    "alert",
    { airdata_id: item.df_id, status: status, object_id: item.object_id },
    ret => {
      console.log(ret);
    }
  );
  $("#modal-handletips").modal("hide");
};

ctx.methods.showObj = function(item) {
  this.loadapi("airdata", "exceed", { object_id: item.id }, objects => {
    this.obj = objects[0];
    var object = objects[0];
    this.$nextTick(() => {
      var width=$("#exceedtd").width();
      $(".rpt").width(width);

      DT("#exceedtd .dtexam", [[2, "desc"]]);

      var seriesso2 = [ ];
      var seriesno2 = [];
      var seriesco = [];
      var seriesh2s = [];
      var serieso3 = [];

      for (var i = 0; i < object.airdata.length; i++) {
        var item = object.airdata[i];
        seriesso2.push([item.df2, Number(item.SO2) ]);
        seriesno2.push([item.df2 , Number(item.NO2)]);
        seriesco.push([item.df2 , Number(item.CO)]);
        seriesh2s.push([item.df2 , Number(item.H2S) ]);
        serieso3.push([item.df2 , Number(item.O3) ]);
      }
        RPT3("rptso2","SO2(ppm)空气污染物走势图",seriesso2,
        [this.memberinfo.alertset.so2_avg_h_1,
        this.memberinfo.alertset.so2_avg_h_2,
        this.memberinfo.alertset.so2_avg_h_3,
        this.memberinfo.alertset.so2_avg_h_4,
        this.memberinfo.alertset.so2_avg_h_5,
        this.memberinfo.alertset.so2_avg_h_6]);

        RPT3("rptno2","NO2(ppm)空气污染物走势图",seriesno2,
        [this.memberinfo.alertset.no2_avg_h_1,
        this.memberinfo.alertset.no2_avg_h_2,
        this.memberinfo.alertset.no2_avg_h_3,
        this.memberinfo.alertset.no2_avg_h_4,
        this.memberinfo.alertset.no2_avg_h_5,
        this.memberinfo.alertset.no2_avg_h_6]);

        RPT3("rptco","CO2(ppm)空气污染物走势图",seriesco,
        [this.memberinfo.alertset.co_avg_h_1,
        this.memberinfo.alertset.co_avg_h_2,
        this.memberinfo.alertset.co_avg_h_3,
        this.memberinfo.alertset.co_avg_h_4,
        this.memberinfo.alertset.co_avg_h_5,
        this.memberinfo.alertset.co_avg_h_6]);

        
        RPT3("rpth2s","H2S(ppm)空气污染物走势图",seriesh2s,
        [this.memberinfo.alertset.h2s_avg_h_1,
        this.memberinfo.alertset.h2s_avg_h_2,
        this.memberinfo.alertset.h2s_avg_h_3,
        this.memberinfo.alertset.h2s_avg_h_4,
        this.memberinfo.alertset.h2s_avg_h_5,
        this.memberinfo.alertset.h2s_avg_h_6]);

        RPT3("rpto3","O3(ppm)空气污染物走势图",serieso3,
        [this.memberinfo.alertset.o3_avg_h_1,
        this.memberinfo.alertset.o3_avg_h_2,
        this.memberinfo.alertset.o3_avg_h_3,
        this.memberinfo.alertset.o3_avg_h_4,
        this.memberinfo.alertset.o3_avg_h_5,
        this.memberinfo.alertset.o3_avg_h_6]);


      var seriesso2 = [];
      var seriesno2 = [];
      var seriesco = [];
      var seriesh2s = [];
      var serieso3 = [];

      for (var i = 0; i < object.airdata_day.length; i++) {
        var item = object.airdata_day[i];
        seriesso2.push([item.df2, Number(item.SO2) ]);
        seriesno2.push([item.df2 , Number(item.NO2)]);
        seriesco.push([item.df2 , Number(item.CO)]);
        seriesh2s.push([item.df2 , Number(item.H2S) ]);
        serieso3.push([item.df2 , Number(item.O3) ]);
      }

        RPT3("rptso2_d","日期 - SO2(ppm)空气污染物走势图",seriesso2,
        [this.memberinfo.alertset.so2_avg_d_1,
        this.memberinfo.alertset.so2_avg_d_2,
        this.memberinfo.alertset.so2_avg_d_3,
        this.memberinfo.alertset.so2_avg_d_4,
        this.memberinfo.alertset.so2_avg_d_5,
        this.memberinfo.alertset.so2_avg_d_6]);

        RPT3("rptno2_d","日期 - NO2(ppm)空气污染物走势图",seriesno2,
        [this.memberinfo.alertset.no2_avg_d_1,
        this.memberinfo.alertset.no2_avg_d_2,
        this.memberinfo.alertset.no2_avg_d_3,
        this.memberinfo.alertset.no2_avg_d_4,
        this.memberinfo.alertset.no2_avg_d_5,
        this.memberinfo.alertset.no2_avg_d_6]);

        RPT3("rptco_d","日期 - CO2(ppm)空气污染物走势图",seriesco,
        [this.memberinfo.alertset.co_avg_d_1,
        this.memberinfo.alertset.co_avg_d_2,
        this.memberinfo.alertset.co_avg_d_3,
        this.memberinfo.alertset.co_avg_d_4,
        this.memberinfo.alertset.co_avg_d_5,
        this.memberinfo.alertset.co_avg_d_6]);

        
        RPT3("rpth2s_d","日期 - H2S(ppm)空气污染物走势图",seriesh2s,
        [this.memberinfo.alertset.h2s_avg_h_1,
        this.memberinfo.alertset.h2s_avg_h_2,
        this.memberinfo.alertset.h2s_avg_h_3,
        this.memberinfo.alertset.h2s_avg_h_4,
        this.memberinfo.alertset.h2s_avg_h_5,
        this.memberinfo.alertset.h2s_avg_h_6]);

        //alert(this.memberinfo.alertset.o3_avg_8h_1);
        RPT3("rpto3_d","日期 - O3(ppm)空气污染物走势图",serieso3,
        [this.memberinfo.alertset.o3_avg_8h_1,
        this.memberinfo.alertset.o3_avg_8h_2,
        this.memberinfo.alertset.o3_avg_8h_3,
        this.memberinfo.alertset.o3_avg_8h_4,
        this.memberinfo.alertset.o3_avg_8h_5,
        this.memberinfo.alertset.o3_avg_8h_6]);

      var seriestvoc = [];
      var seriespm25 = [];
      var seriespm10 = [];

      for (var i = 0; i < object.airdata.length; i++) {
        var item = object.airdata[i];
        seriestvoc.push([
          item.df,
          Number(item.TVOC) * 1000
        ]);
        seriespm25.push([item.df, Number(item.PM25)]);
        seriespm10.push([item.df, Number(item.PM10)]);
      }

        RPT3("rpttvoc","TVOC可吸入颗粒物走势图",seriestvoc,
        [this.memberinfo.alertset.tvoc_1,
        this.memberinfo.alertset.tvoc_2,
        this.memberinfo.alertset.tvoc_3,
        this.memberinfo.alertset.tvoc_4,
        this.memberinfo.alertset.tvoc_5,
       20000]);

        RPT3("rptpm25","PM2.5可吸入颗粒物走势图",seriespm25,
        [this.memberinfo.alertset.pm25_avg_d_1,
        this.memberinfo.alertset.pm25_avg_d_2,
        this.memberinfo.alertset.pm25_avg_d_3,
        this.memberinfo.alertset.pm25_avg_d_4,
        this.memberinfo.alertset.pm25_avg_d_5,
        this.memberinfo.alertset.pm25_avg_d_6]);

        RPT3("rptpm10","PM10可吸入颗粒物走势图",seriespm10,
        [this.memberinfo.alertset.pm10_avg_d_1,
        this.memberinfo.alertset.pm10_avg_d_2,
        this.memberinfo.alertset.pm10_avg_d_3,
        this.memberinfo.alertset.pm10_avg_d_4,
        this.memberinfo.alertset.pm10_avg_d_5,
        this.memberinfo.alertset.pm10_avg_d_6]);
        

      var seriestvoc = [];
      var seriespm25 = [];
      var seriespm10 = [];

      for (var i = 0; i < object.airdata_day.length; i++) {
        var item = object.airdata_day[i];
        seriestvoc.push([
          item.df,
          Number(item.TVOC) * 1000
        ]);
        seriespm25.push([item.df, Number(item.PM25)]);
        seriespm10.push([item.df, Number(item.PM10)]);
      }
      
        RPT3("rpttvoc_d","TVOC可吸入颗粒物走势图",seriestvoc,
        [this.memberinfo.alertset.tvoc_1,
        this.memberinfo.alertset.tvoc_2,
        this.memberinfo.alertset.tvoc_3,
        this.memberinfo.alertset.tvoc_4,
        this.memberinfo.alertset.tvoc_5,
       20000]);

        RPT3("rptpm25_d","PM2.5可吸入颗粒物走势图",seriespm25,
        [this.memberinfo.alertset.pm25_avg_d_1,
        this.memberinfo.alertset.pm25_avg_d_2,
        this.memberinfo.alertset.pm25_avg_d_3,
        this.memberinfo.alertset.pm25_avg_d_4,
        this.memberinfo.alertset.pm25_avg_d_5,
        this.memberinfo.alertset.pm25_avg_d_6]);

        RPT3("rptpm10_d","PM10可吸入颗粒物走势图",seriespm10,
        [this.memberinfo.alertset.pm10_avg_d_1,
        this.memberinfo.alertset.pm10_avg_d_2,
        this.memberinfo.alertset.pm10_avg_d_3,
        this.memberinfo.alertset.pm10_avg_d_4,
        this.memberinfo.alertset.pm10_avg_d_5,
        this.memberinfo.alertset.pm10_avg_d_6]);


    });
  });
};

ctx.components = { myheader, mynav, myfooter };

export default ctx;
</script>
<style>
.table-bordered {
  border: 1px solid #f4f4f4;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #f4f4f4;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
</style>
