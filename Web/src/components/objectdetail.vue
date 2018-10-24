<template>
    


  <div class="modal fade" id="modal-default" >
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
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-1" data-toggle="tab">污染物数据历史走势图</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-2" data-toggle="tab">实时大气污染物组成</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-3" data-toggle="tab">污染来源预测</a></li>
                      <li role="presentation" class="divider"></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-4" data-toggle="tab">周污染物浓度同期比较</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-4" data-toggle="tab">月污染物浓度同期比较</a></li>
                      <li role="presentation"><a role="menuitem" tabindex="-1" href="#tab_4-4" data-toggle="tab">季污染物浓度同期比较</a></li>
                    </ul>
                  </li>
                  <li class="pull-left header"><i class="fa fa-th"></i> 标记点001</li>
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

                        <table id="example2" class="table table-bordered table-hover">
                            <thead>
                            <tr>
                              <th>时间</th>
                              <th>SO2</th>
                              <th>CO</th>
                              <th>H2S</th>
                              <th>O3</th>
                              <th>TVOC</th>
                              <th>PM2.5</th>
                              <th>PM10</th>
                              <th>风速</th>
                              <th>风向</th>
                              <th>温度</th>
                              <th>湿度</th>
                              <th>压力</th>
                              <th>雨量</th>
                              <th>噪声</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr">
                              <tr  v-for="item in devicedata.airdata">
                                <td>{{item.upload_time}}</td>
                                <td>{{item.SO2}}</td>
                                <td>{{item.CO}}</td>
                                <td>{{item.H2S}}</td>
                                <td>{{item.O3}}</td>
                                <td>{{item.TVOC}}</td>
                                <td>{{item.PM25}}</td>
                                <td>{{item.PM10}}</td>
                                <td>{{item.FS}}</td>
                                <td>{{item.FX}}</td>
                                <td>{{item.WD}}</td>
                                <td>{{item.SD}}</td>
                                <td>{{item.SP}}</td>
                                <td>{{item.YL}}</td>
                                <td>{{item.ZS}}</td>
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
                      <h3 class="timeline-header"><a href="#">广东省深圳市福田区上步北路1028号</a></h3>

                      <div class="timeline-body">
                          <video controls="controls" src="" style="width:640px;height:400px;"></video>
                      </div>
                  </div>
                  <div class="tab-pane" id="tab_4-1">
                      <div id="p1" style="min-width:700px;height:500px"></div>
                  </div>
                  <div class="tab-pane" id="tab_4-2">
                      <div id="p2" style="min-width:700px;height:500px"></div>
                  </div>
                  <div class="tab-pane" id="tab_4-3">
                    
                      <div id="p3" style="min-width:700px;height:500px"></div>
                  </div>
                  <div class="tab-pane" id="tab_4-4">
                    
                      <div id="p4" style="min-width:700px;height:500px"></div>
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
export default
{
    props:["devicedata"],
    methods:{
        
    }
}
</script>