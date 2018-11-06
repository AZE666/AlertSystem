<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" id="bodycontent">



      <div style="width:100%;height:100%;" id="map"></div>

      <div class="carlist">
        <div class="flex-row">
          <div class="padding " >
            <div class="flex-row bg-car">
              <div v-for="car of carlist">
                <div class="padding car-item">
                  <div>
                    <img class="carlogo" :src="uploadpath+'car/'+car.logo">
                  </div>
                  <div class="flex-row">
                    <div>
                      <input type="checkbox" class="flat-red" @click="checkCar(car)" :checked="car.checked=='Y'">
                    </div>
                    <div class="flex-1 margin-left">
                      {{car.name}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>

	
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

var base = new AppBase();
var ctx = base.Gen();
ctx.name = "CarMap";

var data = base.GenData();
data.mainnav = "carmap";
data.map = null;
data.carlist=[];
data.datarunning=false;
ctx.data = function() {
  return data;
};
ctx.methods.onMyLoad = function() {};
ctx.methods.loaddata = function() {
  this.loadapi("car", "summary", {}, carlist => {
    if(this.carlist.length==0){
      for(let car of carlist){
        car.checked="Y";
      }
    }else{
      
      for(let car of carlist){
        for(var i=0;i<this.carlist.length;i++){
          if(this.carlist[i].id==car.id){
            car.checked=this.carlist[i].checked;
            break;
          }
        }
      }
    }
    this.carlist=carlist;
    this.$nextTick(()=>{
        $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
          checkboxClass: 'icheckbox_flat-green',
          radioClass   : 'iradio_flat-green'
        })
    });
  });
};

ctx.methods.checkCar=function(car){
  car.checked=car.checked=="Y"?"N":"Y";
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
      //map.addControl(new AMap.Scale());
      // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
      map.addControl(new AMap.OverView({ isOpen: true }));
      // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
      map.addControl(new AMap.MapType());
      // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
      //map.addControl(new AMap.Geolocation());
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

ctx.components = { myheader, mynav, myfooter };

export default ctx;
//background: red;
</script>


<style>
.carlist{
  position: absolute;
  width:100%;
  margin-top:-200px;
}
.flex-row{
  display: flex;
}
.flex-1{
  flex:1;
}
.padding{
  padding:10px;
}
.bg-car{
  
}
.car-item{
  width:150px;
}
.car-item .carlogo{
  width:100px;
  height:100px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.margin-left{
  margin-left: 5px;
}
</style>
