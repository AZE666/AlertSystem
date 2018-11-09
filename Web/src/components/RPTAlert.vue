<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">




			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					预警数据记录
					<small>数据报表</small>
				</h1>
			</section>

			<!-- Main content -->
			<section class="content" >

                

                <div class="row">
                <div class="col-xs-12">
                <div class="box">

                        <div style="padding:20px">
                        <div class="row">
                            <div class="col-md-12" >
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>预警对象</th>
                              <th v-if="ispc==true">设备</th>
                              <th v-if="ispc==true">机器编号</th>
                              <th>报警时间</th>
                              <th>描述</th>
                              <th v-if="ispc==true">SO2</th>
                              <th v-if="ispc==true">NO2</th>
                              <th v-if="ispc==true">CO</th>
                              <th v-if="ispc==true">H2S</th>
                              <th v-if="ispc==true">O3</th>
                              <th v-if="ispc==true">TVOC</th>
                              <th v-if="ispc==true">PM2.5</th>
                              <th v-if="ispc==true">PM10</th>
                              <th v-if="ispc==false">污染因子</th>
                              <th>处理</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item,index) in alertdata">
                                <td >{{item.objectname}}</td>
                                <td v-if="ispc==true">{{item.devicename}}</td>
                                <td v-if="ispc==true">{{item.machineid}}</td>
                                <td >{{item.df}}时</td>
                                <td >{{item.msg}}</td>
                                <td  v-if="ispc==false">
                                  
                                  <span  v-bind:class="{ 'text-red':item.SO2>item.exso2 }">SO2: {{item.SO2}}</span>
                                  <span v-bind:class="{ 'text-red':item.NO2>item.exno2 }">NO2: {{item.NO2}}</span>
                                  <span v-bind:class="{ 'text-red':item.CO>item.exco }">CO: {{item.CO}}</span>
                                  <span v-bind:class="{ 'text-red':item.H2S>item.exh2s }">H2S: {{item.H2S}}</span>
                                  <span v-bind:class="{ 'text-red':item.O3>item.exo3 }">O3: {{item.O3}}</span>
                                  <span v-bind:class="{ 'text-red':item.TVOC>item.extvoc }">TVOC: {{item.TVOC}}</span>
                                  <span v-bind:class="{ 'text-red':item.PM25>item.expm25 }">PM2.5: {{item.PM25}}</span>
                                  <span v-bind:class="{ 'text-red':item.PM10>item.expm10 }">PM10: {{item.PM10}}</span>

                                </td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.SO2>item.exso2 }">{{item.SO2}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.NO2>item.exno2 }">{{item.NO2}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.CO>item.exco }">{{item.CO}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.H2S>item.exh2s }">{{item.H2S}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.O3>item.exo3 }">{{item.O3}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.TVOC>item.extvoc }">{{item.TVOC}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.PM25>item.expm25 }">{{item.PM25}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.PM10>item.expm10 }">{{item.PM10}}</td>

                                <td>
                                    <button v-if="item.status=='A'"
                                     type="button" class="btn btn-warning btn-xs" @click="showalertinfo(item)">一超标</button>
                                    <button v-if="item.status!='A'"
                                     type="button" class="btn btn-success btn-xs" @click="showalertinfo(item)">没超标</button>
                                </td>


                              </tr>
                            </tbody>
                          </table>

                          <button type="button" class="btn btn-warning btn-xs" @click="forin" >数据补全</button>
                          <button type="button" class="btn btn-warning btn-xs" @click="sendmsg" >短信体验</button>
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

      <myfooter v-bind:memberinfo="memberinfo"></myfooter>

<template>
    


  <div class="modal fade" id="alerinfo_modal"  >
    <div class="modal-dialog"  :class="{t100:ispc}" >
      <div class="modal-content"  >
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">报警详情 - {{alertinfo.status_name}}</h4>
        </div>
        <div class="modal-body">
                <dl  class="dl-horizontal">
                          <dt>报警时间</dt>
                          <dd>{{alertinfo.submit_time_formatting}}</dd>
                          <dt>监控企业</dt>
                          <dd>{{alertinfo.objectinfo.name}}</dd>
                          <dt>监控负责人</dt>
                          <dd>{{alertinfo.objectinfo.manager}}</dd>
                          <dt>监控负责人电话</dt>
                          <dd>{{alertinfo.objectinfo.tel}}</dd>
                          <dt>预警时间</dt>
                          <dd>{{alertinfo.airdata.df}}时</dd>
                          <dt>数据详情</dt>
                          <dd class="table-responsive">
                                <table class="table table-bordered  table-hover " id="example1">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>SO2</th>
                                            <th>NO2</th>
                                            <th>CO</th>
                                            <th>H2S</th>
                                            <th>O3</th>
                                            <th>TVOC</th>
                                            <th>PM2.5</th>
                                            <th>PM10</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>峰值</td>
                                            <td>{{alertinfo.airdata.SO2}}</td>
                                            <td>{{alertinfo.airdata.NO2}}</td>
                                            <td>{{alertinfo.airdata.CO}}</td>
                                            <td>{{alertinfo.airdata.H2S}}</td>
                                            <td>{{alertinfo.airdata.O3}}</td>
                                            <td>{{alertinfo.airdata.TVOC}}</td>
                                            <td>{{alertinfo.airdata.PM25}}</td>
                                            <td>{{alertinfo.airdata.PM10}}</td>
                                        </tr>
                                        <tr>
                                            <td>均值</td>
                                            <td>{{alertinfo.avgairdata.SO2}}</td>
                                            <td>{{alertinfo.avgairdata.NO2}}</td>
                                            <td>{{alertinfo.avgairdata.CO}}</td>
                                            <td>{{alertinfo.avgairdata.H2S}}</td>
                                            <td>{{alertinfo.avgairdata.O3}}</td>
                                            <td>{{alertinfo.avgairdata.TVOC}}</td>
                                            <td>{{alertinfo.avgairdata.PM25}}</td>
                                            <td>{{alertinfo.avgairdata.PM10}}</td>
                                        </tr>
                                        <tr>
                                            <td>设置阙值</td>
                                            <td>{{alertinfo.objectinfo.exso2}}</td>
                                            <td>{{alertinfo.objectinfo.exno2}}</td>
                                            <td>{{alertinfo.objectinfo.exco}}</td>
                                            <td>{{alertinfo.objectinfo.exh2s}}</td>
                                            <td>{{alertinfo.objectinfo.exo3}}</td>
                                            <td>{{alertinfo.objectinfo.extvoc}}</td>
                                            <td>{{alertinfo.objectinfo.expm25}}</td>
                                            <td>{{alertinfo.objectinfo.expm10}}</td>
                                        </tr>
                                        <tr>
                                            <td >峰值超标</td>
                                            <td :class="{'text-red':alertinfo.airdata.SO2*100.0/alertinfo.objectinfo.exso2>100}">{{(alertinfo.airdata.SO2*100.0/alertinfo.objectinfo.exso2).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.NO2*100.0/alertinfo.objectinfo.exno2>100}">{{(alertinfo.airdata.NO2*100.0/alertinfo.objectinfo.exno2).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.CO*100.0/alertinfo.objectinfo.exco>100}">{{(alertinfo.airdata.CO*100.0/alertinfo.objectinfo.exco).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.H2S*100.0/alertinfo.objectinfo.exh2s>100}">{{(alertinfo.airdata.H2S*100.0/alertinfo.objectinfo.exh2s).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.O3*100.0/alertinfo.objectinfo.exo3>100}">{{(alertinfo.airdata.O3*100.0/alertinfo.objectinfo.exo3).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.TVOC*100.0/alertinfo.objectinfo.extvoc>100}">{{(alertinfo.airdata.TVOC*100.0/alertinfo.objectinfo.extvoc).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.PM25*100.0/alertinfo.objectinfo.expm25>100}">{{(alertinfo.airdata.PM25*100.0/alertinfo.objectinfo.expm25).toFixed(2)}}%</td>
                                            <td :class="{'text-red':alertinfo.airdata.PM10*100.0/alertinfo.objectinfo.expm10>100}">{{(alertinfo.airdata.PM10*100.0/alertinfo.objectinfo.expm10).toFixed(2)}}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                          </dd>
                        </dl>
                <div class="modal-header" style="padding-top:0px">
                    <h4 class="modal-title">处理信息</h4>
                </div>

                <dl  class="dl-horizontal">
                          <dt>处理结果</dt>
                          <dd>
                              <div class="form-group">
                                <textarea  v-model="alertinfo.description" :readonly="alertinfo.status!='A'" class="form-control" rows="3" placeholder="请输入处理详情"></textarea>
                              </div>
                          </dd>
                </dl>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
          <span>提交后无法再修改处理结果，请仔细确认后提交</span>
          <button type="button" v-if="alertinfo.status=='A'" class="btn btn-primary" @click="processAlert(alertinfo)">提交处理</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->



  </div>
</template>




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
ctx.name = "RPTAlert";

var data = base.GenData();
data.mainnav = "rptalert";
data.subnav = "rpt";
data.alertdata = [];
data.alertinfo = { objectinfo: {} ,airdata:{} ,avgairdata:{}  };
ctx.data = function() {
  return data;
};

ctx.methods.forin=function(){
  var now=(new Date()).getTime();
  var start=(new Date(2018,9,22,0,0,0)).getTime();
  for(var i=0;i<5000&&start+i*3600*1000<now;i++){
    var ttime=(new Date(start+i*3600*1000));
    var tstr=ttime.getFullYear()+"-"+(ttime.getMonth()+1).toString()+"-"+ttime.getDate()+" "+ttime.getHours()+":15:16";
    this.loadapi("airdata", "alert",{device_id:"AQ000002",checktime:tstr});
  }
};
ctx.methods.sendmsg=function(){
  this.loadapi("airdata", "alert",{device_id:"SZZT0001"});
};

ctx.methods.showalertinfo = function(alertinfo) {
  this.loadapi("airdata", "alertinfo", { id: alertinfo.id }, alertinfo => {
    this.alertinfo = alertinfo;
    this.$nextTick(function() {
      $("#alerinfo_modal").modal("show");
    });
  });
};
ctx.methods.processAlert = function(alertinfo) {
  this.loadapi("airdata", "alertdone", { id: alertinfo.id,description:alertinfo.description }, (ret) => {
      //alert(ret.code);
      alertinfo.status="C";
      alertinfo.status_name="完成";
      for(var i=0;i<this.alertdata.length;i++){
          if(alertinfo.id==this.alertdata[i].id){
                this.alertdata[i].status="C";
                this.alertdata[i].status_name="完成";
          }
      }
      $("#alerinfo_modal").modal("hide");
  });
};

ctx.methods.onMyShow = function() {
  this.loadapi(
    "airdata",
    "alertdata",
    { objectid: this.objectid },
    alertdata => {
      this.alertdata = alertdata;
      //alert(alertdata.length);
      var that = this;
      this.$nextTick(() => {
        $(".dtexam").DataTable({
          paging: true,
          lengthChange: false,
          searching: false,
          ordering: true,
          order: [[3, "desc"]],
          info: true,
          autoWidth: false,
          retrieve: true,
          aLengthMenu: [20, 50, 100],
          iDisplayLength: 20,
          language: {
            sProcessing: "处理中...",
            sLengthMenu: "显示 _MENU_ 项结果",
            sZeroRecords: "没有匹配结果",
            sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
            sInfoFiltered: "(由 _MAX_ 项结果过滤)",
            sInfoPostFix: "",
            sSearch: "搜索:",
            sUrl: "",
            sEmptyTable: "表中数据为空",
            sLoadingRecords: "载入中...",
            sInfoThousands: ",",
            oPaginate: {
              sFirst: "首页",
              sPrevious: "上页",
              sNext: "下页",
              sLast: "末页"
            },
            oAria: {
              sSortAscending: ": 以升序排列此列",
              sSortDescending: ": 以降序排列此列"
            }
          }
        });
      });
    }
  );
};

ctx.components = { myheader, mynav, myfooter };

export default ctx;



</script>


<style>
.table-bordered{border:1px solid #f4f4f4}
.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td
{border:1px solid #f4f4f4}
.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}
</style>
