<template>
  <div>
    <myheader v-bind:memberinfo="memberinfo"></myheader>

    <mynav v-bind:memberinfo="memberinfo" v-bind:mainnav="mainnav" v-bind:subnav="subnav"></mynav>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          总览
          <small>控制台</small>
        </h1>
      </section>

      <!-- Main content -->
      <section class="content">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          <div class="col-lg-4 col-xs-6">
            <!-- small box -->
            <div class="small-box bg-aqua">
              <div class="inner">
                <h3>{{memberinfo.alertcount}}</h3>
                <p>新预警</p>
              </div>
              <div class="icon">
                <i class="ion ion-alert"></i>
              </div>
              <router-link to="/RPTAlert" class="small-box-footer">
                更多
                <i class="fa fa-arrow-circle-right"></i>
              </router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-4 col-xs-6">
            <!-- small box -->
            <div class="small-box bg-green">
              <div class="inner">
                <h3>{{memberinfo.objectcount}}</h3>

                <p>企业数量</p>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <router-link to="/ObjectList" class="small-box-footer">
                更多
                <i class="fa fa-arrow-circle-right"></i>
              </router-link>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-4 col-xs-6">
            <!-- small box -->
            <div class="small-box bg-yellow">
              <div class="inner">
                <h3>{{memberinfo.exceedcount}}</h3>
                <p>超标监控</p>
              </div>
              <div class="icon">
                <i class="ion ion-person-add"></i>
              </div>
              <router-link to="/RPTExceed" class="small-box-footer">
                更多
                <i class="fa fa-arrow-circle-right"></i>
              </router-link>
            </div>
          </div>
          <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          <section class="col-lg-12 connectedSortable" id="soutttable">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                <li
                  data-target="#carousel-example-generic"
                  data-slide-to="0"
                  :class="{active:index==0}"
                  v-for="(item,index) in objects"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="item" :class="{active:index==0}" v-for="(item,index) in objects">
                  <div style="height:400px;" :id="'pm25_chart_'+item.id" class="pm25_chart"></div>
                </div>
              </div>
              <a
                class="left carousel-control"
                href="#carousel-example-generic"
                data-slide="prev"
                style="height: 100px;top: 100px;"
              >
                <span class="fa fa-angle-left" style="color:black;"></span>
              </a>
              <a
                class="right carousel-control"
                href="#carousel-example-generic"
                data-slide="next"
                style="height: 100px;top: 100px;"
              >
                <span class="fa fa-angle-right" style="color:black;"></span>
              </a>
            </div>
          </section>

          <section class="col-lg-12 connectedSortable">
            <div class="row">
              <div class="col-md-8">
                <div style="width:100%;height:600px" id="map"></div>
              </div>
              <div class="col-md-4">
                <div class="box box-info">
                  <div class="box-header with-border">
                    <h3 class="box-title">各区空气质量综合指数排名</h3>

                  </div>
                  <!-- /.box-header -->
                  <div class="box-body">
                    <div class="table-responsive">
                      <table class="table no-margin">
                        <thead>
                          <tr>
                            <th>区</th>
                            <th>AQI</th>
                            <th>等级</th>
                            <th>描述</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for=" item of cityarea">
                            <td>{{item.name}}</td>
                            <td>{{item.value}}</td>
                            <td><span
                      class="aqijibie"
                      v-bind:style="{'background-color':item.aqicolor}"
                    >{{item.aqijibie}}</span></td>
                            <td v-html="item.content"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- /.table-responsive -->
                  </div>
                </div>
                <!-- /.box -->
              </div>
            </div>
          </section>
          <!-- /.Left col -->
          <!-- right col (We are only adding the ID to make the widgets sortable)-->
          <section class="col-lg-12 connectedSortable" style="margin-top:20px;">
            <div class="row">
              <div class="col-md-6">
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active">
                      <a href="#tab_1" data-toggle="tab">过去24小时</a>
                    </li>
                    <li>
                      <a href="#tab_2" data-toggle="tab">过去30天</a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                      <div id="anzhuangpie" class="whlikebelow"></div>
                    </div>
                    <div class="tab-pane" id="tab_2">
                      <div id="anzhuangpie2" class="whlikebelow"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="nav-tabs-custom">
                  <ul class="nav nav-tabs">
                    <li class="active hide">
                      <a href="#tab_3" data-toggle="tab"></a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tab_3">
                      <div style="height:44px;"></div>
                      <div id="anzhuangdiqupie" class="whlikebelow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="col-lg-12 connectedSortable">
            <table class="table table-bordered table-hover" id="dtshishi">
              <thead>
                <tr>
                  <th>企业名称</th>
                  <th>设备编号</th>
                  <th>当前实时时间</th>
                  <th>PM2.5</th>
                  <th>AQI</th>
                  <th>等级</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for=" item of cbdata">
                  <td>{{item.objname}}</td>
                  <td>{{item.machineid}}</td>
                  <td>{{item.df}}时</td>
                  <td>{{item.PM25}}</td>
                  <td>{{item.aqi}}</td>
                  <td>
                    <span
                      class="aqijibie"
                      v-bind:style="{'background-color':item.aqicolor}"
                    >{{item.aqijibie}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
        <!-- /.row (main row) -->
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <myfooter v-bind:memberinfo="memberinfo"></myfooter>

    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar-->
    <div class="control-sidebar-bg"></div>
  </div>
</template>

<script>
import myheader from "./myheader";
import mynav from "./mynav";
import myfooter from "./myfooter";

var base = new AppBase();
var ctx = base.Gen();
ctx.name = "Home";

var data = base.GenData();
data.mainnav = "home";
data.objects = [];
data.cbdata = [];
data.cityarea=[];
ctx.data = function() {
  return data;
};

ctx.methods.onMyShow = function() {
  this.loadapi("airdata", "summary", { daydetail: "Y" }, objects => {
    this.objects = objects;
    this.$nextTick(() => {
      var width = $("#soutttable").width();
      //alert(width);
      for (var i = 0; i < this.objects.length; i++) {
        /* Morris.js Charts */
        // Sales chart
        var obj = this.objects[i];

        var date = [];
        var data = [];
        var seriespm25 = [];
        var airdataline = obj.airdata;
        for (var line of airdataline) {
          //alert(line);
          //break;
          //1370131200000
          //1540800420
          //console.log();
          var pm25 = Number(line.PM25);
          if (pm25 > 0) {
            date.push(line.df2);
            data.push(pm25);

            seriespm25.push([line.df2, Number(pm25)]);
          }
        }

        //alert(data.length);
        //alert(data[0][1]);
        console.log(data);
        $("#pm25_chart_" + obj.id).width(width);
        //alert(obj.name);

        RPT3(
          "pm25_chart_" + obj.id,
          obj.name + " - PM2.5可吸入颗粒物走势图",
          seriespm25,
          [
            this.memberinfo.alertset.pm25_avg_d_1,
            this.memberinfo.alertset.pm25_avg_d_2,
            this.memberinfo.alertset.pm25_avg_d_3,
            this.memberinfo.alertset.pm25_avg_d_4,
            this.memberinfo.alertset.pm25_avg_d_5,
            this.memberinfo.alertset.pm25_avg_d_6
          ]
        );
      }
    });
  });

  // Make the dashboard widgets sortable Using jquery UI
  $(".connectedSortable").sortable({
    placeholder: "sort-highlight",
    connectWith: ".connectedSortable",
    handle: ".box-header, .nav-tabs",
    forcePlaceholderSize: true,
    zIndex: 999999
  });
  $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css(
    "cursor",
    "move"
  );

  // jQuery UI sortable for the todo list
  $(".todo-list").sortable({
    placeholder: "sort-highlight",
    handle: ".handle",
    forcePlaceholderSize: true,
    zIndex: 999999
  });

  // bootstrap WYSIHTML5 - text editor
  $(".textarea").wysihtml5();

  $(".daterange").daterangepicker(
    {
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment()
            .subtract(1, "month")
            .startOf("month"),
          moment()
            .subtract(1, "month")
            .endOf("month")
        ]
      },
      startDate: moment().subtract(29, "days"),
      endDate: moment()
    },
    function(start, end) {
      window.alert(
        "You chose: " +
          start.format("MMMM D, YYYY") +
          " - " +
          end.format("MMMM D, YYYY")
      );
    }
  );

  /* jQueryKnob */
  $(".knob").knob();

  // Sparkline charts
  var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
  $("#sparkline-1").sparkline(myvalues, {
    type: "line",
    lineColor: "#92c1dc",
    fillColor: "#ebf4f9",
    height: "50",
    width: "80"
  });
  myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
  $("#sparkline-2").sparkline(myvalues, {
    type: "line",
    lineColor: "#92c1dc",
    fillColor: "#ebf4f9",
    height: "50",
    width: "80"
  });
  myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
  $("#sparkline-3").sparkline(myvalues, {
    type: "line",
    lineColor: "#92c1dc",
    fillColor: "#ebf4f9",
    height: "50",
    width: "80"
  });

  // The Calender
  $("#calendar").datepicker();

  // SLIMSCROLL FOR CHAT WIDGET
  $("#chat-box").slimScroll({
    height: "250px"
  });

  // Fix for charts under tabs
  $(".box ul.nav a").on("shown.bs.tab", function() {
    area.redraw();
    donut.redraw();
    line.redraw();
  });

  /* The todo list plugin */
  $(".todo-list").todoList({
    onCheck: function() {
      window.console.log($(this), "The element has been checked");
    },
    onUnCheck: function() {
      window.console.log($(this), "The element has been unchecked");
    }
  });

  var width = $("#anzhuangdiqupie").width();
  $(".whlikebelow").width(width);
  $(".whlikebelow").height(width);

  var data = [];
  data.push({ name: "超标企业", value: 5 });
  data.push({ name: "正常企业", value: 28 });
  RPTPie("anzhuangpie", "过去24小时超标分析", data);

  var data = [];
  data.push({ name: "超标企业", value: 7 });
  data.push({ name: "正常企业", value: 26 });
  RPTPie("anzhuangpie2", "过去30天超标分析", data);

  var data = [];
  data.push({
    name: "福田区",
    value: 36,
    description: "油烟监控：20<br />监控车：10<br />定点监控：6"
  });
  data.push({
    name: "罗湖区",
    value: 35,
    description: "油烟监控：12<br />监控车：10<br />定点监控：13"
  });
  data.push({
    name: "南山区",
    value: 46,
    description: "油烟监控：20<br />监控车：22<br />定点监控：4"
  });
  data.push({
    name: "盐田区",
    value: 16,
    description: "油烟监控：5<br />监控车：10<br />定点监控：1"
  });
  data.push({
    name: "宝安区",
    value: 12,
    description: "油烟监控：2<br />监控车：10<br />定点监控：0"
  });
  data.push({
    name: "龙岗区",
    value: 16,
    description: "油烟监控：10<br />监控车：2<br />定点监控：4"
  });
  data.push({
    name: "龙华区",
    value: 6,
    description: "油烟监控：2<br />监控车：1<br />定点监控：3"
  });
  data.push({
    name: "坪山区",
    value: 6,
    description: "油烟监控：4<br />监控车：0<br />定点监控：2"
  });
  data.push({
    name: "光明区",
    value: 6,
    description: "油烟监控：1<br />监控车：1<br />定点监控：5"
  });
  RPTPie("anzhuangdiqupie", "企业安装设备数量", data);

  this.loadapi("airdata", "staticdata", {}, cbdata => {
    this.cbdata = cbdata;
    this.$nextTick(() => {
      DT("#dtshishi");
    });
  });

  this.loadapi("airdata", "cityarea", {orderby:"r_main.value desc"}, data => {
    for(var i=0;i<data.length;i++){
      data[i].content=data[i].content.replace(/\n/g, "<br />");
    }
      this.cityarea=data;
    MapAQI("map", "深圳各区的空气质量排名", data, 0, 500, tips => {
      console.log(tips);
      var ct = tips.name + "<br />";
      ct += tips.data.content;
      return ct;
    });
  });
};

ctx.components = { myheader, mynav, myfooter };

export default ctx;
</script>
<style scoped>
.aqijibie {
  color: white;
  padding: 2px 6px 2px 6px;
  border-radius: 2px;
}
</style>

