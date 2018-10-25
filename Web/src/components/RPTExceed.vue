<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">




			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					超标数据记录图
					<small>数据报表</small>
				</h1>
			</section>

			<!-- Main content -->
			<section class="content" >

                <div class="row">
                <div class="col-xs-12">
                <div class="box">

                <div v-for="obj in objects">
                    <div class="box-header">
                    <h3 class="box-title">{{obj.name}}</h3>
                    </div>
                        <div style="padding:20px">
                        <div class="row">
                            <div class="col-md-12" :id="'exceedtd_'+obj.id">
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>设备</th>
                              <th>机器编号</th>
                              <th>报警时间</th>
                              <th>SO2</th>
                              <th>NO2</th>
                              <th>CO</th>
                              <th>H2S</th>
                              <th>O3</th>
                              <th>TVOC</th>
                              <th>PM2.5</th>
                              <th>PM10</th>
                              <th>状态</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item,index) in obj.airdata">
                                <td>{{item.devicename}}</td>
                                <td>{{item.machineid}}</td>
                                <td >{{item.df}}时</td>
                                <td  v-bind:class="{ 'text-red':item.SO2>obj.exso2 }">{{item.SO2}}</td>
                                <td v-bind:class="{ 'text-red':item.NO2>obj.exno2 }">{{item.NO2}}</td>
                                <td v-bind:class="{ 'text-red':item.CO>obj.exco }">{{item.CO}}</td>
                                <td v-bind:class="{ 'text-red':item.H2S>obj.exh2s }">{{item.H2S}}</td>
                                <td v-bind:class="{ 'text-red':item.O3>obj.exo3 }">{{item.O3}}</td>
                                <td v-bind:class="{ 'text-red':item.TVOC>obj.extvoc }">{{item.TVOC}}</td>
                                <td v-bind:class="{ 'text-red':item.PM25>obj.expm25 }">{{item.PM25}}</td>
                                <td v-bind:class="{ 'text-red':item.PM10>obj.expm10 }">{{item.PM10}}</td>

                                <td><button v-if="index>0&&item.alert_id==0&&(item.SO2>obj.exso2||
                                    item.NO2>obj.exno2||
                                    item.CO>obj.exco||
                                    item.H2S>obj.exh2s||
                                    item.O3>obj.exo3||
                                    item.TVOC>obj.extvoc||
                                    item.PM25>obj.expm25||
                                    item.PM10>obj.expm10)"
                                     type="button" class="btn  btn-warning btn-xs" @click="alert(item,'A')">报警</button>
                                     <button v-if="index>0&&item.alert_id==0&&(item.SO2>obj.exso2||
                                    item.NO2>obj.exno2||
                                    item.CO>obj.exco||
                                    item.H2S>obj.exh2s||
                                    item.O3>obj.exo3||
                                    item.TVOC>obj.extvoc||
                                    item.PM25>obj.expm25||
                                    item.PM10>obj.expm10)"
                                     type="button" class="btn btn-default btn-xs" @click="alert(item,'B')">忽略</button>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='A'"  class="label bg-blue">已报警</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='B'"  class="label bg-yellow">不处理</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='C'"  class="label bg-green">已完成</small>
                                     </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                            <div class="col-md-12">

                      <div :id="'rpt1_exceed_'+obj.id" style="height:600px"></div>

                            </div>
                            <div class="col-md-12">

                      <div :id="'rpt2_exceed_'+obj.id" style="height:600px"></div>

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

      <myfooter v-bind:memberinfo="memberinfo"></myfooter>

    <div v-for='item in objects'>
      <objectdetail v-bind:devicedata="item"></objectdetail>
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
import objectdetail from "./objectdetail";

var base = new AppBase();
var ctx = base.Gen();
ctx.name = "RPTExceed";

var data = base.GenData();
data.mainnav = "rpt";
data.subnav = "rpt";
data.objects = [];
ctx.data = function() {
  return data;
};

ctx.updated = function() {
  //alert($("#exceedtd_1 .dtexam").length);

  //alert($("#exceedtd_1").attr("id"));
  var object_id = 1;
  var successbind = $(".dtexam").length > 0;
  if (successbind == false) {
    return;
  }
  var objects = this.objects;
};

ctx.methods.alert=function(item,status){
    item.alert_id=1;
    item.alertstatus=status;
    this.loadapi("airdata","alert",{airdata_id:item.df_id,status:status,object_id:item.object_id},(ret)=>{
        console.log(ret);
    });
};;

ctx.methods.onMyShow = function() {
  var objectid = this.$route.query.objectid;

  if (objectid == undefined) {
    this.subnav = "exceed_";
  } else {
    this.subnav = "exceed_" + objectid;
  }

  this.loadapi("airdata", "exceed", { objectid: this.objectid }, objects => {
    this.objects = objects;
    var that = this;
    this.$nextTick(() => {
      for (var k = 0; k < objects.length; k++) {
        var object = objects[k];
        var object_id = object.id;

        $("#exceedtd_" + object_id + " .dtexam").DataTable({
          paging: true,
          lengthChange: false,
          searching: false,
          ordering: true,
          order: [[2, "desc"]],
          info: true,
          autoWidth: false,
          retrieve: true,
          aLengthMenu: [10, 50, 100],
          iDisplayLength: 10,
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

        var series = [
          { name: "SO2", data: [] },
          { name: "NO2", data: [] },
          { name: "CO", data: [] },
          { name: "H2S", data: [] },
          { name: "O3", data: [] }
        ];

        for (var i = 0; i < object.airdata.length; i++) {
          var item = object.airdata[i];
          series[0].data.push([item.timespan * 1000, Number(item.SO2)]);
          series[1].data.push([item.timespan * 1000, Number(item.NO2)]);
          series[2].data.push([item.timespan * 1000, Number(item.CO)]);
          series[3].data.push([item.timespan * 1000, Number(item.H2S)]);
          series[4].data.push([item.timespan * 1000, Number(item.O3)]);
        }

        //alert($("#rpt1_device_"+object_id).html());

        var chart = Highcharts.chart("rpt1_exceed_" + object_id, {
          chart: {
            type: "spline"
          },
          title: {
            text: "空气污染物走势图"
          },
          subtitle: {
            text: "非规律性时间内的变化"
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
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: "{point.y:.2f} ppm"
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
          { name: "PM2.5(ug/m3)", data: [] },
          { name: "PM10(ug/m3)", data: [] }
        ];

        for (var i = 0; i < object.airdata.length; i++) {
          var item = object.airdata[i];
          series2[0].data.push([item.timespan * 1000, Number(item.TVOC)]);
          series2[1].data.push([item.timespan * 1000, Number(item.PM25)]);
          series2[2].data.push([item.timespan * 1000, Number(item.PM10)]);
        }
        var chart = Highcharts.chart("rpt2_exceed_" + object_id, {
          chart: {
            type: "spline"
          },
          title: {
            text: "可吸入颗粒物走势图"
          },
          subtitle: {
            text: "非规律性时间内的变化"
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
      }
    });
  });
};

ctx.components = { myheader, mynav, myfooter,objectdetail };

export default ctx;
</script>
