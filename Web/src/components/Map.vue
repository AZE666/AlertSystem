<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="bodycontent">



      <div style="width:100%;height:100%;" id="map"></div>


	
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

var base=new AppBase();
var ctx=base.Gen();
ctx.name="Map";

var data=base.GenData();
data.mainnav="map";
data.map=null;
data.lastmapheight=0;
data.datarunning=false;
data.objects=[];
ctx.data=function(){
    return data;
};
ctx.methods.onMyLoad=function(){
}
ctx.methods.loaddata=function(){
    var that=this;
if(this.map==null){
                return;
            }
            this.loadapi("airdata","summary",{},(objects)=>{
                this.map.clearMap();
                this.objects=objects;
                var markers = [];
            for (var i = 0; i < objects.length; i++) {
                var object=objects[i];
                
                var zoomStyleMapping1 = {
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: 0,
                    9: 0,
                    10: 0,
                    11: 0,
                    12: 0,
                    13: 0,
                    14: 0,
                    15: 0,
                    16: 0,
                    17: 0,
                    18: 0,
                    19: 0,
                    20: 0
                };
                var imgurl= this.uploadpath+"object/"+objects[i].cover;
                //console.log(objects[i]);
                var position=new AMap.LngLat(parseFloat(objects[i].lng), parseFloat(objects[i].lat));
                var icon = new AMap.Icon({
                    size: new AMap.Size(50, 50),    // 图标尺寸
                    image: this.uploadpath+"object/"+objects[i].cover,  // Icon的图像
                    imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
                    imageSize: new AMap.Size(50, 50)   // 根据所设置的大小拉伸或压缩图片
                });
                
                var marker = new AMap.ElasticMarker({
                    position:position,
                    zooms:[12,20],
                    styles:[{
                            icon:{
                                img:imgurl,
                                size:[30,30],//可见区域的大小
                                ancher:[8,16],//锚点
                                fitZoom:12,//最合适的级别
                                scaleFactor:10,//地图放大一级的缩放比例系数
                                maxScale:2,//最大放大比例
                                minScale:0.125//最小放大比例
                            }
                        }],
                    zoomStyleMapping:zoomStyleMapping1,
                    clickable:true
                });
                marker.object=object;
                marker.on('click', function(ev){
                    
                    var target = ev.target;// 触发事件的对象
                    var lnglat = ev.lnglat;// 触发事件的地理坐标，AMap.LngLat 类型
                    var pixel = ev.pixel;// 触发事件的像素坐标，AMap.Pixel 类型
                    var type = ev.type;// 触发事件类型
                    console.log(ev);
                    var object=ev.target.object;
                    var object_id=object.id;
                    //alert(that.devicedata.lastupdatetime);
                    $("#modal_device_"+object_id).modal("show");
                    
                    if(object.inited!=undefined){
                        return;
                    }
                    object.inited=true;


                    $("#modal_device_"+object_id+" .dtexam").DataTable({
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : false,
                    'ordering'    : true,
                    "order": [[ 0, "desc" ]],
                    'info'        : true,
                    'autoWidth'   : false,
                    retrieve: true,
                                "aLengthMenu" : [5, 20, 50],   
                                "iDisplayLength" : 5 ,
                                language: {
                            "sProcessing": "处理中...",
                            "sLengthMenu": "显示 _MENU_ 项结果",
                            "sZeroRecords": "没有匹配结果",
                            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                            "sInfoPostFix": "",
                            "sSearch": "搜索:",
                            "sUrl": "",
                            "sEmptyTable": "表中数据为空",
                            "sLoadingRecords": "载入中...",
                            "sInfoThousands": ",",
                            "oPaginate": {
                                "sFirst": "首页",
                                "sPrevious": "上页",
                                "sNext": "下页",
                                "sLast": "末页"
                            },
                            "oAria": {
                                "sSortAscending": ": 以升序排列此列",
                                "sSortDescending": ": 以降序排列此列"
                            }
                        }
                    });

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

                    var chart = Highcharts.chart("rpt1_device_"+object_id, {
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
                var chart = Highcharts.chart("rpt2_device_"+object_id, {
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

                    
                });
                markers.push(marker);
            }
            //alert(markers.length);
            this.map.add(markers);
            });
}
ctx.methods.onMyShow=function(){
    //alert();
    var bodyheight = $(".content-wrapper").height();
    if(bodyheight>this.lastmapheight){
        this.lastmapheight=bodyheight;
    }
    var c=document.documentElement.clientHeight-50-51;
    //alert(this.lastmapheight);
    $("#map").height(c);

    var map = new AMap.Map('map', {
        zoom: 12,//级别
        center: [114.061882, 22.534653],//中心点坐标
        viewMode: '3D'//使用3D视图
    });
    AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.MapType',
        'AMap.Geolocation'
    ], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar());
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale());
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(new AMap.OverView({ isOpen: true }));
        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        map.addControl(new AMap.MapType());
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.addControl(new AMap.Geolocation());
    });
    this.map=map;
    this.loaddata();
    if(this.datarunning==false){
        this.datarunning=true;
        setInterval(()=>{
            
            this.loaddata();
        },1000*60);
    }

};

ctx.components={myheader,mynav,myfooter,objectdetail};

export default ctx;



</script>
