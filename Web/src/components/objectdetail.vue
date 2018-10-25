<template>
    


  <div class="modal fade" :id="'modal_device_'+devicedata.id" >
    <div class="modal-dialog" style="width:1000px">
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
                              <th>报警</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item, index) in devicedata.airdata">
                                <td>{{item.df}}时</td>
                                <td  v-bind:class="{ 'text-red':item.SO2>devicedata.exso2 }">{{item.SO2}}</td>
                                <td v-bind:class="{ 'text-red':item.NO2>devicedata.exno2 }">{{item.NO2}}</td>
                                <td v-bind:class="{ 'text-red':item.CO>devicedata.exco }">{{item.CO}}</td>
                                <td v-bind:class="{ 'text-red':item.H2S>devicedata.exh2s }">{{item.H2S}}</td>
                                <td v-bind:class="{ 'text-red':item.O3>devicedata.exo3 }">{{item.O3}}</td>
                                <td v-bind:class="{ 'text-red':item.TVOC>devicedata.extvoc }">{{item.TVOC}}</td>
                                <td v-bind:class="{ 'text-red':item.PM25>devicedata.expm25 }">{{item.PM25}}</td>
                                <td v-bind:class="{ 'text-red':item.PM10>devicedata.expm10 }">{{item.PM10}}</td>
                                <!--<td>{{item.FS}}</td>
                                <td>{{item.FX}}</td>
                                <td>{{item.WD}}</td>
                                <td>{{item.SD}}</td>
                                <td>{{item.SP}}</td>
                                <td>{{item.YL}}</td>
                                <td>{{item.ZS}}</td>-->
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

export default ctx
</script>