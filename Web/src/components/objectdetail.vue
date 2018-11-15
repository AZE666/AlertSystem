<template>
    


  <div class="modal fade" :id="'modal_device_'+devicedata.id" >
    <div class="modal-dialog" :class="{t100:ispc}">
      <div class="modal-content"  >
        <!--
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">监控点</h4>
        </div>
        -->
        <div class="modal-body">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs pull-right">
                  <li class="active"><a :href="'#tab_1-1_'+devicedata.id" data-toggle="tab">数据</a></li>
                  <li><a :href="'#tab_2-2_'+devicedata.id" data-toggle="tab">实时图片</a></li>
                  <li><a :href="'#tab_3-2_'+devicedata.id" data-toggle="tab">实时视频</a></li>
                  <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                      图表 <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                      <li role="presentation"><a role="menuitem" tabindex="-1" :href="'#tab_4-1_'+devicedata.id" data-toggle="tab">空气污染物走势图</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" :href="'#tab_4-2_'+devicedata.id" data-toggle="tab">可吸入颗粒物走势图</a></li>
                    </ul>
                  </li>
                  <li class="pull-left header"><i class="fa fa-th"></i> {{devicedata.name}}</li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" :id="'tab_1-1_'+devicedata.id">
                      
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

                    </div>
                  </div>
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>时间</th>
                              <th v-if="ispc==false">污染因子</th>
                              <th v-if="ispc==true">SO2</th>
                              <th v-if="ispc==true">NO2</th>
                              <th v-if="ispc==true">CO</th>
                              <th v-if="ispc==true">H2S</th>
                              <th v-if="ispc==true">O3</th>
                              <th v-if="ispc==true">TVOC</th>
                              <th v-if="ispc==true">PM2.5</th>
                              <th v-if="ispc==true">PM10</th>
                              <th >AQI</th>
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
                                <td v-if="ispc==false" >
                                  
                                  <span  v-bind:class="{ 'text-red':item.SO2_s=='l4','text-yellow':item.SO2_s=='l3','text-blue':item.SO2_s=='l2','text-green':item.SO2_s=='l1' }">SO2:{{item.SO2}}</span>
                                  <span  v-bind:class="{ 'text-red':item.NO2_s=='l4','text-yellow':item.NO2_s=='l3','text-blue':item.NO2_s=='l2','text-green':item.NO2_s=='l1' }">NO2:{{item.NO2}}</span>
                                  <span  v-bind:class="{ 'text-red':item.CO_s=='l4','text-yellow':item.CO_s=='l3','text-blue':item.CO_s=='l2','text-green':item.CO_s=='l1' }">CO:{{item.CO}}</span>
                                  <span  v-bind:class="{ 'text-red':item.H2S_s=='l4','text-yellow':item.H2S_s=='l3','text-blue':item.H2S_s=='l2','text-green':item.H2S_s=='l1' }">H2S:{{item.H2S}}</span>
                                  <span   v-bind:class="{ 'text-red':item.O3_s=='l4','text-yellow':item.O3_s=='l3','text-blue':item.O3_s=='l2','text-green':item.O3_s=='l1' }">O3:{{item.O3}}</span>
                                  <span   v-bind:class="{ 'text-red':item.TVOC_s=='l4','text-yellow':item.TVOC_s=='l3','text-blue':item.TVOC_s=='l2','text-green':item.TVOC_s=='l1' }">TVOC:{{item.TVOC}}</span>
                                  <span   v-bind:class="{ 'text-red':item.PM25_s=='l4','text-yellow':item.PM25_s=='l3','text-blue':item.PM25_s=='l2','text-green':item.PM25_s=='l1' }">PM25:{{item.PM25}}</span>
                                  <span  v-bind:class="{ 'text-red':item.PM10_s=='l4','text-yellow':item.PM10_s=='l3','text-blue':item.PM10_s=='l2','text-green':item.PM10_s=='l1' }">PM10:{{item.PM10}}</span>

                                </td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.SO2_s=='l4','text-yellow':item.SO2_s=='l3','text-blue':item.SO2_s=='l2','text-green':item.SO2_s=='l1' }">{{item.SO2}}</td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.NO2_s=='l4','text-yellow':item.NO2_s=='l3','text-blue':item.NO2_s=='l2','text-green':item.NO2_s=='l1' }">{{item.NO2}}</td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.CO_s=='l4','text-yellow':item.CO_s=='l3','text-blue':item.CO_s=='l2','text-green':item.CO_s=='l1' }">{{item.CO}}</td>
                                <td  v-if="ispc==true" v-bind:class="{ 'text-red':item.H2S_s=='l4','text-yellow':item.H2S_s=='l3','text-blue':item.H2S_s=='l2','text-green':item.H2S_s=='l1' }">{{item.H2S}}</td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.O3_s=='l4','text-yellow':item.O3_s=='l3','text-blue':item.O3_s=='l2','text-green':item.O3_s=='l1' }">{{item.O3}}</td>
                                <td v-if="ispc==true"  v-bind:class="{ 'text-red':item.TVOC_s=='l4','text-yellow':item.TVOC_s=='l3','text-blue':item.TVOC_s=='l2','text-green':item.TVOC_s=='l1' }">{{item.TVOC}}</td>
                                <td  v-if="ispc==true" v-bind:class="{ 'text-red':item.PM25_s=='l4','text-yellow':item.PM25_s=='l3','text-blue':item.PM25_s=='l2','text-green':item.PM25_s=='l1' }">{{item.PM25}}</td>
                                <td  v-if="ispc==true" v-bind:class="{ 'text-red':item.PM10_s=='l4','text-yellow':item.PM10_s=='l3','text-blue':item.PM10_s=='l2','text-green':item.PM10_s=='l1' }">{{item.PM10}}</td>
                                <td  >{{item.aqi}}</td>
                                <!--<td>{{item.FS}}</td>
                                <td>{{item.FX}}</td>
                                <td>{{item.WD}}</td>
                                <td>{{item.SD}}</td>
                                <td>{{item.SP}}</td>
                                <td>{{item.YL}}</td>
                                <td>{{item.ZS}}</td>-->
                                <td >
                                  <a href="#" v-if="item.showenv!='Y'" @click="clickToShowEnv(item)" >查看</a>
                                <div  v-if="item.showenv=='Y'" >
                                  <div>风速：{{item.FS}}m/s</div>
                                  <div>风向：{{item.FX}}&#176;</div>
                                  <div>温度：{{item.WD}}&#8451;</div>
                                  <div>湿度：{{item.SD}}RH%</div>
                                  <div>压力：{{item.SP}}百帕</div>
                                  <div>雨量：{{item.YL}}mm</div>
                                  <div>噪声：{{item.ZS}}dB</div>
                                  <a href="#" v-if="item.showenv=='Y'" @click="clickToShowEnv(item)" >收起</a>
                                </div>
                                </td>
                                <td >
                                  <small v-if="item.aqi<=50" class="label" style="background:#096">优</small>
                                  <small v-if="50<item.aqi&&item.aqi<=100"  class="label" style="background:#ffde33">良</small>
                                  <small v-if="100<item.aqi&&item.aqi<=150"  class="label" style="background:#ff9933">轻度污染</small>
                                  <small v-if="150<item.aqi&&item.aqi<=200"  class="label" style="background:#cc0033">中度污染</small>
                                  <small v-if="200<item.aqi&&item.aqi<=300"  class="label" style="background:#660099">重度污染</small>
                                  <small v-if="300<item.aqi"  class="label" style="background:#7e0023">严重污染</small>
                                </td>
                                <td><button v-if="index>0&&item.alert_id==0&&(item.SO2>devicedata.exso2||
                                    item.NO2>devicedata.exno2||
                                    item.CO>devicedata.exco||
                                    item.H2S>devicedata.exh2s||
                                    item.O3>devicedata.exo3||
                                    item.TVOC>devicedata.extvoc||
                                    item.PM25>devicedata.expm25||
                                    item.PM10>devicedata.expm10)"
                                     type="button" class="btn  btn-warning btn-xs" @click="alert(item,'A')">报警</button>
                                     <button v-if="index>0&&item.alert_id==0&&(item.SO2>devicedata.exso2||
                                    item.NO2>devicedata.exno2||
                                    item.CO>devicedata.exco||
                                    item.H2S>devicedata.exh2s||
                                    item.O3>devicedata.exo3||
                                    item.TVOC>devicedata.extvoc||
                                    item.PM25>devicedata.expm25||
                                    item.PM10>devicedata.expm10)"
                                     type="button" class="btn btn-default btn-xs" @click="alert(item,'B')">忽略</button>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='A'"  class="label bg-blue">已报警</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='B'"  class="label bg-yellow">不处理</small>
                                     <small v-if="item.alert_id>0&&item.alertstatus=='C'"  class="label bg-green">已完成</small>
                                     </td>
                              </tr>
                            </tbody>
                          </table>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane"  :id="'tab_2-2_'+devicedata.id">
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
                  <div class="tab-pane"  :id="'tab_3-2_'+devicedata.id">
                      <h3 class="timeline-header"><a href="#">{{devicedata.address}}</a></h3>

                      <div class="timeline-body">
                          <video controls="controls" src="" style="height:400px;width:100%;"></video>
                      </div>
                  </div>
                  <div class="tab-pane"  :id="'tab_4-1_'+devicedata.id">
                      <div :id="'rpt1_device_'+devicedata.id"></div>
                  </div>
                  <div class="tab-pane"  :id="'tab_4-2_'+devicedata.id">
                      <div :id="'rpt2_device_'+devicedata.id" ></div>
                  </div>
                    
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div>
              <!-- nav-tabs-custom -->



              
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" v-if="false" class="btn btn-primary">报警</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>
<script>

var base=new AppBase();
var ctx=base.GenComponent();
ctx.props.push("devicedata");

ctx.methods.alert=function(item,status){
    item.alert_id=1;
    item.alertstatus=status;
    this.loadapi("airdata","alert",{airdata_id:item.df_id,status:status,object_id:item.object_id},(ret)=>{
        console.log(ret);
    });
};;
ctx.methods.clickToShowEnv=function(item){
    item.showenv=item.showenv=="Y"?"N":"Y";
    //alert(item.showenv);
};;
export default ctx
</script>

<style>
td,th{
  font-size: 12px;
}
</style>
