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
                                <td>
                                    <button v-if="item.status=='A'"
                                     type="button" class="btn btn-warning btn-xs" @click="showalertinfo(item)">超标</button>
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
                          <dt>监控企业</dt>
                          <dd>{{alertinfo.objectinfo.name}}</dd>
                          <dt>监控负责人</dt>
                          <dd>{{alertinfo.objectinfo.manager}}</dd>
                          <dt>监控负责人电话</dt>
                          <dd>{{alertinfo.objectinfo.tel}}</dd>
                          <dt>预警时间</dt>
                          <dd>{{alertinfo.airdata.df}}时</dd>
                          <dt>预警详情</dt>
                          <dd >{{alertinfo.msg}}</dd>
                          

                          <dt>污染因子</dt>
                          <dd>
<span  v-bind:class="{ 'text-red':alertinfo.avgairdata.SO2>alertinfo.avgairdata.exso2 }">SO2: {{alertinfo.avgairdata.SO2}}</span>
                                  <span style="margin-left:20px;" v-bind:class="{ 'text-red':alertinfo.avgairdata.NO2>alertinfo.avgairdata.exno2 }">NO2: {{alertinfo.avgairdata.NO2}}</span><br />
                                  <span v-bind:class="{ 'text-red':alertinfo.avgairdata.CO>alertinfo.avgairdata.exco }">CO: {{alertinfo.avgairdata.CO}}</span>
                                  <span style="margin-left:20px;" v-bind:class="{ 'text-red':alertinfo.avgairdata.H2S>alertinfo.avgairdata.exh2s }">H2S: {{alertinfo.avgairdata.H2S}}</span><br />
                                  <span v-bind:class="{ 'text-red':alertinfo.avgairdata.O3>alertinfo.avgairdata.exo3 }">O3: {{alertinfo.avgairdata.O3}}</span>
                                  <span style="margin-left:20px;" v-bind:class="{ 'text-red':alertinfo.avgairdata.TVOC>alertinfo.avgairdata.extvoc }">TVOC: {{alertinfo.avgairdata.TVOC}}</span><br />
                                  <span v-bind:class="{ 'text-red':alertinfo.avgairdata.PM25>alertinfo.avgairdata.expm25 }">PM2.5: {{alertinfo.avgairdata.PM25}}</span>
                                  <span style="margin-left:20px;" v-bind:class="{ 'text-red':alertinfo.avgairdata.PM10>alertinfo.avgairdata.expm10 }">PM10: {{alertinfo.avgairdata.PM10}}</span><br />

                          </dd>
                        </dl>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <!--
          <span>提交后无法再修改处理结果，请仔细确认后提交</span>
          <button type="button" v-if="alertinfo.status=='A'" class="btn btn-primary  pull-left" @click="processAlert(alertinfo)">提交处理</button>
          -->
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
  var start=(new Date(2018,10,2,0,0,0)).getTime();
  for(var i=0;i<5000&&start+i*3600*1000<now;i++){
    var ttime=(new Date(start+i*3600*1000));
    var tstr=ttime.getFullYear()+"-"+(ttime.getMonth()+1).toString()+"-"+ttime.getDate()+" "+ttime.getHours()+":15:16";
    this.loadapi("airdata", "alert",{device_id:"SZZT0001",checktime:tstr});
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
