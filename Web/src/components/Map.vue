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

var base = new AppBase();
var ctx = base.Gen();
ctx.name = "Map";

var data = base.GenData();
data.mainnav = "map";
data.map = null;
data.lastmapheight = 0;
data.datarunning = false;
data.objects = [];
data.isdefaultcenter=false;
ctx.data = function() {
  return data;
};
ctx.methods.onMyLoad = function() {};
ctx.methods.loaddata = function() {
  var that = this;
  if (this.map == null) {
    return;
  }
  this.loadapi("airdata", "summary", {}, objects => {
    this.map.clearMap();
    this.objects = objects;
    var markers = [];
    var clat=0;
    var clng=0;
    
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i];
      clat+=Number(object.lat);
      clng+=Number(object.lng);
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

    var icons = [];
    
      var logo = this.uploadpath + "object/" + objects[i].cover;
      var imgurl = this.uploadpath + "resource/" +object.statuslogo;

      //if(object)

      //console.log(objects[i]);
      var position = new AMap.LngLat(
        parseFloat(objects[i].lng),
        parseFloat(objects[i].lat)
      );
      var icon = new AMap.Icon({
        size: new AMap.Size(50, 50), // 图标尺寸
        image: imgurl, // Icon的图像
        imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(50, 50) // 根据所设置的大小拉伸或压缩图片
      });

      var aqi=objects[i].aqi;
      var color="";
      if(aqi=="-"){
        aqi="无";
      }else{
        aqi=parseInt(aqi);
        if(aqi<=50){
          color="background-color:#096";
        }else if(50<aqi&&aqi<=100){
          color="background-color:#ffde33";
        }else if(100<aqi&&aqi<=150){
          color="background-color:#ff9933";
        }else if(150<aqi&&aqi<=200){
          color="background-color:#cc0033";
        }else if(200<aqi&&aqi<=300){
          color="background-color:#660099";
        }else{
          color="background-color:#7e0023";
        }
      }

      var marker = new AMap.Marker({
        position: position,
        zooms: [12, 20],
        content:"<div class='ocg' style='"+color+"'>"+aqi+"</div>",
        zoomStyleMapping: zoomStyleMapping1,
        clickable: true
      });
      marker.object = object;
      marker.on("click", function(ev) {
        var target = ev.target; // 触发事件的对象
        var lnglat = ev.lnglat; // 触发事件的地理坐标，AMap.LngLat 类型
        var pixel = ev.pixel; // 触发事件的像素坐标，AMap.Pixel 类型
        var type = ev.type; // 触发事件类型
        console.log(ev);
        var object = ev.target.object;
        var object_id = object.id;
        //alert(that.devicedata.lastupdatetime);
        $("#modal_device_" + object_id).modal("show");
        
        if (object.inited != undefined) {
          return;
        }
        object.inited = true;

        $("#modal_device_" + object_id + " .dtexam").DataTable({
          paging: true,
          lengthChange: false,
          searching: false,
          ordering: true,
          order: [[0, "desc"]],
          info: true,
          autoWidth: false,
          retrieve: true,
          aLengthMenu: [5, 20, 50],
          iDisplayLength: 5,
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
          { name: "SO2(ppm)", data: [] },
          { name: "NO2(ppm)", data: [] },
          { name: "CO(ppm)", data: [] },
          { name: "H2S(ppm)", data: [] },
          { name: "O3(ppm)", data: [] }
        ];

        for (var i = 0; i < object.airdata.length; i++) {
          var item = object.airdata[i];
          series[0].data.push([item.df2, Number(item.SO2)]);
          series[1].data.push([item.df2, Number(item.NO2)]);
          series[2].data.push([item.df2, Number(item.CO)]);
          series[3].data.push([item.df2, Number(item.H2S)]);
          series[4].data.push([item.df2, Number(item.O3)]);
        }

        //alert($("#rpt1_device_"+object_id).html());
        if(IsPC()){
          var width= $("#modal_device_"+object_id+" .modal-dialog").width()*0.9;
        }else{

          var width= $("#modal_device_"+object_id+"").width()*0.8;
        }
        
        $("#rpt1_device_" + object_id).width(width).height(GetHeight(width));


        RPT4("rpt1_device_" + object_id,"空气污染物走势图",series);


        var series2 = [
          { name: "TVOC(mg/m3)", data: [] },
          { name: "PM25(ug/m3)", data: [] },
          { name: "PM10(ug/m3)", data: [] }
        ];

        for (var i = 0; i < object.airdata.length; i++) {
          var item = object.airdata[i];
          series2[0].data.push([item.df2, Number(item.TVOC)]);
          series2[1].data.push([item.df2, Number(item.PM25)]);
          series2[2].data.push([item.df2, Number(item.PM10)]);
        }

        $("#rpt2_device_" + object_id).width(width).height(GetHeight(width));
        
        RPT4("rpt2_device_" + object_id,"可吸入颗粒物走势图",series2);
        
      });
      markers.push(marker);
    }

    if(this.isdefaultcenter==false&&objects.length>0){
      clat=clat/objects.length;
      clng=clng/objects.length;

      var position = new AMap.LngLat(clng, clat);  // 标准写法
      // 简写 var position = [116, 39]; 
      this.map.setCenter(position);
      this.isdefaultcenter=true;
    }

    //alert(markers.length);
    this.map.add(markers);
  });
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

  var map = new AMap.Map("map", {
    zoom: 12, //级别
    center: [114.061882, 22.534653], //中心点坐标
    viewMode: "3D" //使用3D视图
  });
  AMap.plugin(
    [
      "AMap.ToolBar",
      "AMap.Scale",
      "AMap.OverView",
      "AMap.MapType",
      "AMap.Geolocation"
    ],
    function() {
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
    }
  );
  this.map = map;
  this.loaddata();
  if (this.datarunning == false) {
    this.datarunning = true;
    setInterval(() => {
      this.loaddata();
    }, 1000 * 60);
  }
};

ctx.components = { myheader, mynav, myfooter, objectdetail };

export default ctx;
</script>

<style>
.ocg{
  background:#ccc;
  width:40px;
  height:40px;
  text-align: center;
  color:white;
  padding:10px;
  border-radius: 50%;
}
</style>
