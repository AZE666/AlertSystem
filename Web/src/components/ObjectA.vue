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
					<small>数据详情</small>
				</h1>
			</section>

			<!-- Main content -->
			<section class="content">


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
                  <li class="pull-left header"><i class="fa fa-th"></i> {{devicedata.name}}</li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="tab_1-1">
                    
                  <div class="row">
                    <div class="col-md-2">
                      <img :src="uploadpath+'object/'+devicedata.cover" class="img-responsive img-rounded">
                    </div>
                    <div class="col-md-10">
                      <dl  class="dl-horizontal">
                          <dt>监控时间</dt>
                          <dd>{{devicedata.lastupdatetime}}</dd>
                          <dt>监控位置</dt>
                          <dd>{{devicedata.address}}</dd>
                          <dt>监控位置坐标</dt>
                          <dd>{{devicedata.lng}}, {{devicedata.lat}}</dd>
                          <dt>监控负责人</dt>
                          <dd>{{devicedata.manager}}</dd>
                          <dt>监控负责人电话</dt>
                          <dd>{{devicedata.tel}}</dd>
                          <dt>相关监控设备</dt>
                          <dd v-for="item in devicedata.devicelist">{{item.machineid}} - {{item.name}}</dd>
                        </dl>
</div></div>
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>时间</th>
                              <th>SO2</th>
                              <th>NO2</th>
                              <th>CO</th>
                              <th>H2S</th>
                              <th>O3</th>
                              <th>TVOC</th>
                              <th>PM2.5</th>
                              <th>PM10</th>
                              <!--<th>风速</th>
                              <th>风向</th>
                              <th>温度</th>
                              <th>湿度</th>
                              <th>压力</th>
                              <th>雨量</th>
                              <th>噪声</th>-->
                              <th>环境</th>
                              <th>状态</th>
                              <th>报警</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item, index) in devicedata.airdata">
                                <td>{{item.df}}时</td>
                                <td  v-bind:class="{ 'text-red':item.SO2_s=='l4','text-yellow':item.SO2_s=='l3','text-blue':item.SO2_s=='l2','text-green':item.SO2_s=='l1' }">{{item.SO2}}</td>
                                <td  v-bind:class="{ 'text-red':item.NO2_s=='l4','text-yellow':item.NO2_s=='l3','text-blue':item.NO2_s=='l2','text-green':item.NO2_s=='l1' }">{{item.NO2}}</td>
                                <td  v-bind:class="{ 'text-red':item.CO_s=='l4','text-yellow':item.CO_s=='l3','text-blue':item.CO_s=='l2','text-green':item.CO_s=='l1' }">{{item.CO}}</td>
                                <td  v-bind:class="{ 'text-red':item.H2S_s=='l4','text-yellow':item.H2S_s=='l3','text-blue':item.H2S_s=='l2','text-green':item.H2S_s=='l1' }">{{item.H2S}}</td>
                                <td  v-bind:class="{ 'text-red':item.O3_s=='l4','text-yellow':item.O3_s=='l3','text-blue':item.O3_s=='l2','text-green':item.O3_s=='l1' }">{{item.O3}}</td>
                                <td  v-bind:class="{ 'text-red':item.TVOC_s=='l4','text-yellow':item.TVOC_s=='l3','text-blue':item.TVOC_s=='l2','text-green':item.TVOC_s=='l1' }">{{item.TVOC}}</td>
                                <td  v-bind:class="{ 'text-red':item.PM25_s=='l4','text-yellow':item.PM25_s=='l3','text-blue':item.PM25_s=='l2','text-green':item.PM25_s=='l1' }">{{item.PM25}}</td>
                                <td  v-bind:class="{ 'text-red':item.PM10_s=='l4','text-yellow':item.PM10_s=='l3','text-blue':item.PM10_s=='l2','text-green':item.PM10_s=='l1' }">{{item.PM10}}</td>
                                <!--<td>{{item.FS}}</td>
                                <td>{{item.FX}}</td>
                                <td>{{item.WD}}</td>
                                <td>{{item.SD}}</td>
                                <td>{{item.SP}}</td>
                                <td>{{item.YL}}</td>
                                <td>{{item.ZS}}</td>-->
                                <td ><a href="#" v-if="item.showenv!='Y'" @click="clickToShowEnv(item)" >查看</a>
                                <div  v-if="item.showenv=='Y'" >
                                  <div>风速：{{item.FS}}m/s</div>
                                  <div>风向：{{item.FX}}&#176;</div>
                                  <div>温度：{{item.WD}}&#8451;</div>
                                  <div>湿度：{{item.SD}}RH%</div>
                                  <div>压力：{{item.SP}}百帕</div>
                                  <div>雨量：{{item.YL}}mm</div>
                                  <div>噪声：{{item.ZS}}dB</div>
                                </div>
                                </td>
                                <td v-if="item.status=='l1'" >
                                  <small class="label  bg-green">优</small>
                                </td>
                                <td v-if="item.status=='l2'" >
                                  <small class="label  bg-blue">良</small>
                                </td>
                                <td v-if="item.status=='l3'">
                                  <small class="label  bg-yellow">中</small>
                                </td>
                                <td v-if="item.status=='l4'">
                                  <small class="label  bg-red">差</small>
                                </td>
                                <td><button v-if="index>0&&item.alert_id==0&&(item.SO2>devicedata.exso2||
                                    item.NO2>devicedata.exno2||
                                    item.CO>devicedata.exco||
                                    item.H2S>devicedata.exh2s||
                                    item.O3>devicedata.exo3||
                                    item.TVOC>devicedata.extvoc||
                                    item.PM25>devicedata.expm25||
                                    item.PM10>devicedata.expm10)"
                                     type="button" class="btn  btn-warning btn-xs"  @click="showalert(item,'A')">报警</button>
                                     <button v-if="index>0&&item.alert_id==0&&(item.SO2>devicedata.exso2||
                                    item.NO2>devicedata.exno2||
                                    item.CO>devicedata.exco||
                                    item.H2S>devicedata.exh2s||
                                    item.O3>devicedata.exo3||
                                    item.TVOC>devicedata.extvoc||
                                    item.PM25>devicedata.expm25||
                                    item.PM10>devicedata.expm10)"
                                     type="button" class="btn btn-default btn-xs" @click="showalert(item,'B')">忽略</button>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='A'"  class="label bg-blue">已报警</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='B'"  class="label bg-yellow">不处理</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='C'"  class="label bg-green">已完成</small>
                                     </td>
                              </tr>
                            </tbody>
                          </table>
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
                      <h3 class="timeline-header"><a href="#">{{devicedata.address}}</a></h3>

                      <div class="timeline-body">
                          <video controls="controls" src="" style="width:640px;height:400px;"></video>
                      </div>
                  </div>
                  <div class="tab-pane" id="tab_4-1">
                      <div :id="'rpt1_device_'+devicedata.id" style="min-width:800px;height:600px"></div>
                  </div>
                  <div class="tab-pane" id="tab_4-2">
                      <div :id="'rpt2_device_'+devicedata.id" style="min-width:800px;height:600px"></div>
                  </div>
                    
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- nav-tabs-custom -->


                
			</section>
			<!-- /.content -->


	
  </div>
  <!-- /.content-wrapper -->

      <myfooter v-bind:memberinfo="memberinfo"></myfooter>


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
ctx.name="ObjectA";

var data=base.GenData();
data.mainnav="obj";
data.devicedata={};
data.object_id=0;
data.opt_obj={};
data.opt_status="";
ctx.data=function(){
    return data;
};




ctx.methods.showalert=function(item,status){
  this.opt_obj=item;
  this.opt_status=status;
    $("#modal-handletips").modal("show");
};;

ctx.methods.alert=function(item,status){
    item.alert_id=1;
    item.alertstatus=status;
    this.loadapi("airdata","alert",{airdata_id:item.df_id,status:status,object_id:item.object_id},(ret)=>{
        console.log(ret);
    });
    $("#modal-handletips").modal("hide");
};;


ctx.methods.onMyShow=function(){
  var object_id = this.$route.query.id;
    this.object_id=object_id;
    this.loadapi("obj","detail",{needairdata:"Y",id:this.object_id},devicedata=>{
        this.devicedata=devicedata;
        this.$nextTick(()=>{
            
            $(".dtexam").DataTable({
            paging: true,
            lengthChange: false,
            searching: false,
            ordering: true,
            order: [[0, "desc"]],
            info: true,
            autoWidth: false,
            retrieve: true,
            aLengthMenu: [12, 24, 72],
            iDisplayLength: 12,
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
        var object=devicedata;
        var object_id=devicedata.id;
        var series = [
          { name: "SO2(ppm)", data: [] },
          { name: "NO2(ppm)", data: [] },
          { name: "CO(ppm)", data: [] },
          { name: "H2S(ppm)", data: [] },
          { name: "O3(ppm)", data: [] }
        ];

        for (var i = 0; i < object.airdata.length; i++) {
          var item = object.airdata[i];
          series[0].data.push([item.timespan * 1000, Number(item.SO2)]);
          series[1].data.push([item.timespan * 1000, Number(item.NO2)]);
          series[2].data.push([item.timespan * 1000, Number(item.CO)]);
          series[3].data.push([item.timespan * 1000, Number(item.H2S)]);
          series[4].data.push([item.timespan * 1000, Number(item.O3)]);
        }

var chart = Highcharts.chart("rpt1_device_" + object_id, {
          chart: {
            type: "spline"
          },
          title: {
            text: "空气污染物走势图"
          },
          subtitle: {
            text: "48小时内非规律性时间内的变化"
          },
          xAxis: {
            type: "datetime",
            title: {
              text: null
            }
          },
          yAxis: {
            title: {
              text: "ppm"
            },
            min: 0
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true
              }
            }
          },
          series: series
        });

        var series2 = [
          { name: "TVOC(mg/m3)", data: [] },
          { name: "PM25(ug/m3)", data: [] },
          { name: "PM10(ug/m3)", data: [] }
        ];

        for (var i = 0; i < object.airdata.length; i++) {
          var item = object.airdata[i];
          series2[0].data.push([item.timespan * 1000, Number(item.TVOC)]);
          series2[1].data.push([item.timespan * 1000, Number(item.PM25)]);
          series2[2].data.push([item.timespan * 1000, Number(item.PM10)]);
        }
        var chart = Highcharts.chart("rpt2_device_" + object_id, {
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
                to: 35,
                color: "rgba(68, 170, 213, 0.1)",
                label: {
                  text: "优",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Light breeze
                from: 35,
                to: 75,
                color: "rgba(0, 0, 0, 0)",
                label: {
                  text: "良",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Gentle breeze
                from: 75,
                to: 115,
                color: "rgba(68, 170, 213, 0.1)",
                label: {
                  text: "轻度污染",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Moderate breeze
                from: 115,
                to: 150,
                color: "rgba(0, 0, 0, 0)",
                label: {
                  text: "中度污染",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Fresh breeze
                from: 150,
                to: 250,
                color: "rgba(68, 170, 213, 0.1)",
                label: {
                  text: "重度污染",
                  style: {
                    color: "#606060"
                  }
                }
              },
              {
                // Strong breeze
                from: 250,
                to: 1000,
                color: "rgba(0, 0, 0, 0)",
                label: {
                  text: "严重污染",
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

    });
};

ctx.components={myheader,mynav,myfooter};

export default ctx;



</script>
