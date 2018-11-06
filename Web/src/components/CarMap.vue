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
                  <div class="flex-row"   >
                    <div>
                      <input :id="'icheck_'+car.id" type="checkbox" class="flat-red" :checked="car.checked=='Y'">
                    </div>
                    <div class="flex-1 margin-left" @click="checkCar(car,false)" >
                      {{car.name}}{{car.checked}}
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
data.layer=null;
data.carlist=[];
data.datarunning=false;
data.datarunning2=false;
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
    this.loadCarTrack();
    var that=this;
    this.$nextTick(()=>{
        if(that.datarunning2==false){
          that.datarunning2=true;
          $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass   : 'iradio_flat-green'
          });
          $('input[type="checkbox"]').on('ifChecked', function(event){
              var id=event.target.id;
                for(let car of that.carlist){
                  if("icheck_"+car.id==id){
                    car.checked="Y";
                    that.checkCar(car,true);
                    break;
                  }
                }
          });
          $('input[type="checkbox"]').on('ifUnchecked', function(event){
              var id=event.target.id;
                for(let car of that.carlist){
                  if("icheck_"+car.id==id){
                    car.checked="N";
                    that.checkCar(car,true);
                    break;
                  }
                }
          });
        }
    });
  });
};

ctx.methods.loadCarTrack=function(){
  //alert(this.carlist.length);


  var list=[];
  for(let car of this.carlist){
    if(car.checked=='Y'){
      for(let item of car.trackline){
        list.push({coord:item.lng+","+item.lat,value:item.tvoc});
      }
    }
  }
  //{coord:"115,44",value:1}
  this.layer.setData(list, {
        lnglat: 'coord'
  });

   var colors = [
        '#499824',
        '#8AC732',
        '#FFFF44',
        '#EB7227',
        '#E41B1B'
    ];

    this.layer.setOptions({
        // 单位米
        unit: 'meter',
        style: {
            // 正多边形半径
            radius: 40,
            // 高度为 0 即可贴地面
            height: 0,
            // 顶面颜色
            color: {
                key: 'value',
                scale: 'quantile',
                value: colors
            },
            opacity: 0.85
        }
    });

    this.layer.render();
  
};

ctx.methods.checkCar=function(car,noture){
  if(noture!=true){
    car.checked=car.checked=="Y"?"N":"Y";
    if(car.checked=="Y"){
      $('#icheck_'+car.id).iCheck('check')
    }else{
      $('#icheck_'+car.id).iCheck('uncheck')
    }
  }
  this.loadCarTrack();
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

  // var map = new AMap.Map("map", {
  //   zoom: 12, //级别
  //   center: [114.061882, 22.534653], //中心点坐标
  //   viewMode: "3D" //使用3D视图
  // });
    var map = Loca.create('map', {
        mapStyle: 'amap://styles/midnight',
        viewMode: '3D',
        pitch: 50,
        zoom: 13,
        center: [114.061882, 22.534653],
        features: ['bg', 'road']
    });

  this.map = map;

  var layer = Loca.visualLayer({
        container: map,
        type: 'point',
        shape: 'prism',
        // 设置正多边形顶点数量。
        // 拆分 32 个顶点就可以近似看做是圆形，拆分越多越平滑，但会有性能损耗。
        vertex: 32
    });
  this.layer=layer;
  
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
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
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
