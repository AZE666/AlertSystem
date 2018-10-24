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
			<section class="content">

                <div class="row">
                <div class="col-xs-12">
                <div class="box">

                <div v-for="obj in objects">
                    <div class="box-header">
                    <h3 class="box-title">{{obj.name}}</h3>
                    </div>
                        <div class="row">
                            <div class="col-md-12" :id="'exceedtd_1'+obj.id">
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
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="item in obj.airdata">
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
                              </tr>
                            </tbody>
                          </table>
                          </div>
                            <div class="col-md-6">

                      <div :id="'rpt1_exceed_'+obj.id" style="height:600px"></div>

                            </div>
                            <div class="col-md-6">

                      <div :id="'rpt2_exceed_'+obj.id" style="height:600px"></div>

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
ctx.name="RPTEXCEED";

var data=base.GenData();
data.mainnav="rpt";
data.subnav="rpt";
data.objects=[];
ctx.data=function(){
    return data;
};

ctx.methods.onMyShow=function(){
    
    var objectid=this.$route.query.objectid;
    
    if(objectid==undefined){
        this.subnav="exceed_";
    }else{
        this.subnav="exceed_"+objectid;
    }
  this.loadapi("airdata","exceed",{objectid:this.objectid},(objects)=>{
      this.objects=objects;

                    for(var k=0;k<objects.length;k++){
                        var object=objects[k];
                        var object_id=object.id;
                        
                    $("#exceedtd_"+object_id+" .dtexam").DataTable({
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : false,
                    'ordering'    : true,
                    'info'        : true,
                    'autoWidth'   : false,
                                "aLengthMenu" : [5, 20, 50],   
                                "iDisplayLength" : 5 
                    });
                    return;
                    var series=[{name:"SO2",data:[]},{name:"NO2",data:[]},{name:"CO",data:[]},{name:"H2S",data:[]}
                    ,{name:"O3",data:[]}];

                    for(var i=0;i<object.airdata.length;i++){
                        var item=object.airdata[i];
                        series[0].data.push([item.timespan*1000, Number( item.SO2)   ]);
                        series[1].data.push([item.timespan*1000, Number( item.NO2 )  ]);
                        series[2].data.push([item.timespan*1000, Number( item.CO  ) ]);
                        series[3].data.push([item.timespan*1000, Number( item.H2S )  ]);
                        series[4].data.push([item.timespan*1000, Number( item.O3  ) ]);
                    }
                    
                    //alert($("#rpt1_device_"+object_id).html());

                    var chart = Highcharts.chart("rpt2_exceed_"+object_id, {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: '空气污染物走势图'
                    },
                    subtitle: {
                        text: '48小时内非规律性时间内的变化'
                    },
                    xAxis: {
                        type: 'datetime',
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'ppm'
                        },
                        min: 0
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.y:.2f} ppm'
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


                    var series2=[{name:"TVOC(mg/m3)",data:[]},{name:"PM25(ug/m3)",data:[]},{name:"PM10(ug/m3)",data:[]}];

                    for(var i=0;i<object.airdata.length;i++){
                        var item=object.airdata[i];
                        series2[0].data.push([item.timespan*1000, Number( item.TVOC)   ]);
                        series2[1].data.push([item.timespan*1000, Number( item.PM25 )  ]);
                        series2[2].data.push([item.timespan*1000, Number( item.PM10  ) ]);
                    }
                var chart = Highcharts.chart("rpt2_exceed_"+object_id, {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: '可吸入颗粒物走势图'
                    },
                    subtitle: {
                        text: '48小时内非规律性时间内的变化'
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    yAxis: {
                        title: {
                            text: '浓度'
                        },
                        min: 0,
                        minorGridLineWidth: 0,
                        gridLineWidth: 0,
                        alternateGridColor: null,
                        plotBands: [{ // Light air
                            from: 0,
                            to: 35,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: '优',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Light breeze
                            from: 35,
                            to: 75,
                            color: 'rgba(0, 0, 0, 0)',
                            label: {
                                text: '良',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Gentle breeze
                            from: 75,
                            to: 115,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: '轻度污染',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Moderate breeze
                            from: 115,
                            to: 150,
                            color: 'rgba(0, 0, 0, 0)',
                            label: {
                                text: '中度污染',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Fresh breeze
                            from: 150,
                            to: 250,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: '重度污染',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Strong breeze
                            from: 250,
                            to: 1000,
                            color: 'rgba(0, 0, 0, 0)',
                            label: {
                                text: '严重污染',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }]
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
                            fontSize: '10px'
                        }
                    }
                });




                    }
  });

};

ctx.components={myheader,mynav,myfooter};

export default ctx;



</script>
