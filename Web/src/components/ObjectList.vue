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
                              <th>#</th>
                              <th>设备号</th>
                              <th>设备名称</th>
                              <th>公司名称</th>
                              <th>历史数据</th>
                              <th>报警数据</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr v-for="(item,index) in devicelist">
                                <td>{{index+1}}</td>
                                <td>{{item.machineid}}</td>
                                <td>{{item.device_name}}</td>
                                <td>{{item.name}}</td>
                                <td><router-link :to="'/ObjectA?id='+item.id">查看详情</router-link></td>
                                <td><button type="button" @click="showObj(item)" class="btn btn-primary  btn-xs">查看历史</button></td>
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
                              <th>状态</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item,index) in obj.airdata">
                                <td>{{item.devicename}}</td>
                                <td>{{item.machineid}}</td>
                                <td >{{item.df}}时</td>
                                <td v-if="ispc==false">
                                  
                                  <span v-bind:class="{ 'text-red':item.SO2>obj.exso2 }">SO2: {{item.SO2}}</span>
                                  <span  v-bind:class="{ 'text-red':item.NO2>obj.exno2 }">NO2: {{item.NO2}}</span>
                                  <span  v-bind:class="{ 'text-red':item.CO>obj.exco }">CO: {{item.CO}}</span>
                                  <span  v-bind:class="{ 'text-red':item.H2S>obj.exh2s }">H2S: {{item.H2S}}</span>
                                  <span  v-bind:class="{ 'text-red':item.O3>obj.exo3 }">O3: {{item.O3}}</span>
                                  <span  v-bind:class="{ 'text-red':item.TVOC>obj.extvoc }">TVOC: {{item.TVOC}}</span>
                                  <span  v-bind:class="{ 'text-red':item.PM25>obj.expm25 }">PM2.5: {{item.PM25}}</span>
                                  <span v-bind:class="{ 'text-red':item.PM10>obj.expm10 }">PM10: {{item.PM10}}</span>

                                </td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.SO2>obj.exso2 }">{{item.SO2}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.NO2>obj.exno2 }">{{item.NO2}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.CO>obj.exco }">{{item.CO}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.H2S>obj.exh2s }">{{item.H2S}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.O3>obj.exo3 }">{{item.O3}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.TVOC>obj.extvoc }">{{item.TVOC}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.PM25>obj.expm25 }">{{item.PM25}}</td>
                                <td v-if="ispc==true" v-bind:class="{ 'text-red':item.PM10>obj.expm10 }">{{item.PM10}}</td>

                                <td><button v-if="index>0&&item.alert_id==0&&(item.SO2>obj.exso2||
                                    item.NO2>obj.exno2||
                                    item.CO>obj.exco||
                                    item.H2S>obj.exh2s||
                                    item.O3>obj.exo3||
                                    item.TVOC>obj.extvoc||
                                    item.PM25>obj.expm25||
                                    item.PM10>obj.expm10)"
                                     type="button" class="btn  btn-warning btn-xs" @click="showalert(item,'A')">报警</button>
                                     <button v-if="index>0&&item.alert_id==0&&(item.SO2>obj.exso2||
                                    item.NO2>obj.exno2||
                                    item.CO>obj.exco||
                                    item.H2S>obj.exh2s||
                                    item.O3>obj.exo3||
                                    item.TVOC>obj.extvoc||
                                    item.PM25>obj.expm25||
                                    item.PM10>obj.expm10)"
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
                  <li class="pull-left header"><i class="fa fa-th"></i> 空气污染物走势图</li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="tab_1-1">

                        <div id="rptso2" style="height:400px"></div>


                            </div>

                  <div class="tab-pane " id="tab_1-2">
                        
                        <div id="rptno2" style="height:400px"></div>

                            </div>
                  <div class="tab-pane " id="tab_1-3">
                      
                        <div id="rptco" style="height:400px"></div>
                            </div>
                  <div class="tab-pane " id="tab_1-4">
                      
                        <div id="rpth2s" style="height:400px"></div>
                            </div>
                  <div class="tab-pane " id="tab_1-5">
                      
                        <div id="rpto3" style="height:400px"></div>
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
                  <div class="tab-pane active" id="tab_2-1">

                        <div id="rpttvoc" style="height:400px"></div>


                            </div>

                  <div class="tab-pane " id="tab_2-2">
                        
                        <div id="rptpm25" style="height:400px"></div>

                            </div>
                  <div class="tab-pane " id="tab_2-3">
                      
                        <div id="rptpm10" style="height:400px"></div>
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

var base=new AppBase();
var ctx=base.Gen();
ctx.name="ObjectList";

var data=base.GenData();
data.mainnav="obj";
data.devicelist=[];
data.opt_obj={};
data.opt_status="";
data.obj=null;

ctx.data=function(){
    return data;
};

ctx.methods.onMyShow=function(){
  
    this.loadapi("obj","list",{needdevice:"Y"},(devicelist)=>{
        this.devicelist=devicelist;
    });
};


ctx.methods.showalert=function(item,status){
  this.opt_obj=item;
  this.opt_status=status;
    $("#modal-handletips").modal("show");
};

ctx.methods.alert=function(item,status){
    item.alert_id=1;
    item.alertstatus=status;
    this.loadapi("airdata","alert",{airdata_id:item.df_id,status:status,object_id:item.object_id},(ret)=>{
        console.log(ret);
    });
    $("#modal-handletips").modal("hide");
};;

ctx.methods.showObj=function(item){
    this.loadapi("airdata", "exceed", { object_id: item.id }, objects => {
        this.obj=objects[0];
        var object=objects[0];
        this.$nextTick(()=>{
            DT("#exceedtd .dtexam",[[2, "desc"]]);

            var seriesso2 = [{ name: "SO2(ppm)", data: [] }];
            var seriesno2 = [{ name: "NO2(ppm)", data: [] }];
            var seriesco = [{ name: "CO(ppm)", data: [] }];
            var seriesh2s = [{ name: "H2S(ppm)", data: [] }];
            var serieso3 = [{ name: "O3(ppm)", data: [] }];


            for (var i = 0; i < object.airdata.length; i++) {
                var item = object.airdata[i];
                seriesso2[0].data.push([item.timespan * 1000, Number(item.SO2)]);
                seriesno2[0].data.push([item.timespan * 1000, Number(item.NO2)]);
                seriesco[0].data.push([item.timespan * 1000, Number(item.CO)]);
                seriesh2s[0].data.push([item.timespan * 1000, Number(item.H2S)]);
                serieso3[0].data.push([item.timespan * 1000, Number(item.O3)]);
            }
            
            
            Rpt1("rptso2","SO2空气污染物走势图","非规律性时间内的变化","ppm",seriesso2);
            Rpt1("rptno2","NO2空气污染物走势图","非规律性时间内的变化","ppm",seriesno2);
            Rpt1("rptco","CO空气污染物走势图","非规律性时间内的变化","ppm",seriesco);
            Rpt1("rpth2s","H2s空气污染物走势图","非规律性时间内的变化","ppm",seriesh2s);
            Rpt1("rpto3","SO2空气污染物走势图","非规律性时间内的变化","ppm",serieso3);

                var seriestvoc = [{ name: "TVOC(mg/m3)", data: [] }];
                var seriespm25 = [{ name: "PM2.5(ug/m3)", data: [] }];
                var seriespm10 = [{ name: "PM10(ug/m3)", data: [] }];

                for (var i = 0; i < object.airdata.length; i++) {
                    var item = object.airdata[i];
                    seriestvoc[0].data.push([item.timespan * 1000, Number(item.TVOC)*1000]);
                    seriespm25[0].data.push([item.timespan * 1000, Number(item.PM25)]);
                    seriespm10[0].data.push([item.timespan * 1000, Number(item.PM10)]);
                }
            Rpt2("rpttvoc","TVOC可吸入颗粒物走势图","非规律性时间内的变化","ug/m3",seriestvoc,"tvoc");
            Rpt2("rptpm25","PM2.5可吸入颗粒物走势图","非规律性时间内的变化","ug/m3",seriespm25);
            Rpt2("rptpm10","PM10可吸入颗粒物走势图","非规律性时间内的变化","ug/m3",seriespm10);
        });
    });
};



ctx.components={myheader,mynav,myfooter};



export default ctx;



</script>
<style>
.table-bordered{border:1px solid #f4f4f4}
.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td
{border:1px solid #f4f4f4}
.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}
</style>
