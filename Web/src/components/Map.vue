<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="bodycontent">



      <div style="width:100%;height:100%;min-height:600px;" id="map"></div>


	
  </div>
  <!-- /.content-wrapper -->

      <myfooter v-bind:memberinfo="memberinfo"></myfooter>

  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
    
      <objectdetail v-bind:devicedata="devicedata"></objectdetail>

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
data.datarunning=true;
data.devicedata={lastupdatetime:"aa"};
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
                    that.devicedata=ev.target.object;
                    
                    //alert(that.devicedata.lastupdatetime);
                    $("#modal-default").modal("show");
                    
                });
                markers.push(marker);
            }
            //alert(markers.length);
            this.map.add(markers);
            });
}
ctx.methods.onMyShow=function(){
    var bodyheight = $(".content-wrapper").height();
    if(bodyheight>0){
        this.lastmapheight=bodyheight;
    }
    //alert(this.lastmapheight);
    $("#map").height(this.lastmapheight);

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
        },3000);
    }

};

ctx.components={myheader,mynav,myfooter,objectdetail};

export default ctx;



</script>
