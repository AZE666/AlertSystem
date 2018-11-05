<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

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
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-aqua">
							<div class="inner">
								<h3>{{memberinfo.alertcount}}</h3>
								<p>新预警</p>
							</div>
							<div class="icon">
								<i class="ion ion-alert"></i>
							</div>
							<router-link to="/RPTAlert" class="small-box-footer">更多<i class="fa fa-arrow-circle-right"></i></router-link>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-green">
							<div class="inner">
								<h3>{{memberinfo.objectcount}}</h3>

								<p>企业数量</p>
							</div>
							<div class="icon">
								<i class="ion ion-stats-bars"></i>
							</div>
							<router-link to="/ObjectList"  class="small-box-footer">更多<i class="fa fa-arrow-circle-right"></i></router-link>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-yellow">
							<div class="inner">
								<h3>{{memberinfo.exceedcount}}</h3>
								<p>超标监控</p>
							</div>
							<div class="icon">
								<i class="ion ion-person-add"></i>
							</div>
							<router-link to="/RPTExceed" class="small-box-footer">更多 <i class="fa fa-arrow-circle-right"></i></router-link>
						</div>
					</div>
					<!-- ./col -->
					<div class="col-lg-3 col-xs-6">
						<!-- small box -->
						<div class="small-box bg-red">
							<div class="inner">
								<h3>0</h3>

								<p>暂未开放</p>
							</div>
							<div class="icon">
								<i class="ion ion-pie-graph"></i>
							</div>
							<a href="#" class="small-box-footer">更多 <i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
					<!-- ./col -->
				</div>
				<!-- /.row -->
				<!-- Main row -->
				<div class="row">
					<!-- Left col -->
					<section class="col-lg-7 connectedSortable">
						<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
							<ol class="carousel-indicators">
							<li data-target="#carousel-example-generic" data-slide-to="0" :class="{active:index==0}" v-for="(item,index) in objects"></li>
							</ol>
							<div class="carousel-inner">

							<div class="item" :class="{active:index==0}" v-for="(item,index) in objects">
								<div style="height:400px;width:100%" :id="'pm25_chart_'+item.id" class="pm25_chart">
									
								</div>
							</div>
							</div>
							<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev" style="height: 100px;top: 100px;">
							<span class="fa fa-angle-left"></span>
							</a>
							<a class="right carousel-control" href="#carousel-example-generic" data-slide="next" style="height: 100px;top: 100px;">
							<span class="fa fa-angle-right" ></span>
							</a>
						</div>

						<!-- Chat box -->
						<div class="box box-success">
							<div class="box-header">
								<i class="fa fa-comments-o"></i>

								<h3 class="box-title">互动</h3>

								<div class="box-tools pull-right" data-toggle="tooltip" title="Status">
									<div class="btn-group" data-toggle="btn-toggle">
										<button type="button" class="btn btn-default btn-sm active"><i class="fa fa-square text-green"></i>
										</button>
										<button type="button" class="btn btn-default btn-sm"><i class="fa fa-square text-red"></i></button>
									</div>
								</div>
							</div>
							<div class="box-body chat" id="chat-box">
								<!-- chat item -->
								<div class="item">
									<img src="static/dist/img/user4-128x128.jpg" alt="user image" class="online">

									<p class="message">
										<a href="#" class="name">
											<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15</small>
											腾菲
										</a>
										今天完成了10家企业的监控管理，其中有3家做的非常好，我们可以将他做为案例继续深化。
									</p>
									<div class="attachment">
										<h4>附件:</h4>

										<p class="filename">
											2018-9-13 企业监控报告.xlsx
										</p>

										<div class="pull-right">
											<button type="button" class="btn btn-primary btn-sm btn-flat">打开</button>
										</div>
									</div>
									<!-- /.attachment -->
								</div>
								<!-- /.item -->
								<!-- chat item -->
								<div class="item">
									<img src="static/dist/img/user3-128x128.jpg" alt="user image" class="offline">

									<p class="message">
										<a href="#" class="name">
											<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:15</small>
											申博士
										</a>
										5天后讲会展开世界环保会，请需要前去的同志在我这里进行报名。
									</p>
								</div>
								<!-- /.item -->
								<!-- chat item -->
								<div class="item">
									<img src="static/dist/img/user2-160x160.jpg" alt="user image" class="offline">

									<p class="message">
										<a href="#" class="name">
											<small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
											褚工
										</a>
										监控设备安装良好，放心
									</p>
								</div>
								<!-- /.item -->
							</div>
							<!-- /.chat -->
							<div class="box-footer">
								<div class="input-group">
									<input class="form-control" placeholder="输入消息...">

									<div class="input-group-btn">
										<button type="button" class="btn btn-success"><i class="fa fa-plus"></i></button>
									</div>
								</div>
							</div>
						</div>
						<!-- /.box (chat box) -->

						<!-- TO DO List -->
						<div class="box box-primary">
							<div class="box-header">
								<i class="ion ion-clipboard"></i>

								<h3 class="box-title">代办事务</h3>

								<div class="box-tools pull-right">
									<ul class="pagination pagination-sm inline">
										<li><a href="#">&laquo;</a></li>
										<li><a href="#">1</a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><a href="#">&raquo;</a></li>
									</ul>
								</div>
							</div>
							<!-- /.box-header -->
							<div class="box-body">
								<!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->
								<ul class="todo-list">
									<li>
										<!-- drag handle -->
										<span class="handle">
											<i class="fa fa-ellipsis-v"></i>
											<i class="fa fa-ellipsis-v"></i>
										</span>
										<!-- checkbox -->
										<input type="checkbox" value="">
										<!-- todo text -->
										<span class="text">批准安装新的设备</span>
										<!-- Emphasis label -->
										<small class="label label-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
										<!-- General tools such as edit or delete-->
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
									</li>
									<li>
										<span class="handle">
											<i class="fa fa-ellipsis-v"></i>
											<i class="fa fa-ellipsis-v"></i>
										</span>
										<input type="checkbox" value="">
										<span class="text">今天罗湖区的数据正常</span>
										<small class="label label-info"><i class="fa fa-clock-o"></i> 4 hours</small>
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
									</li>
									<li>
										<span class="handle">
											<i class="fa fa-ellipsis-v"></i>
											<i class="fa fa-ellipsis-v"></i>
										</span>
										<input type="checkbox" value="">
										<span class="text">今天福田区的数据正常</span>
										<small class="label label-warning"><i class="fa fa-clock-o"></i> 1 day</small>
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
									</li>
									<li>
										<span class="handle">
											<i class="fa fa-ellipsis-v"></i>
											<i class="fa fa-ellipsis-v"></i>
										</span>
										<input type="checkbox" value="">
										<span class="text">新闻大厦附近数据出现异常</span>
										<small class="label label-success"><i class="fa fa-clock-o"></i> 3 days</small>
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
									</li>
									<li>
										<span class="handle">
											<i class="fa fa-ellipsis-v"></i>
											<i class="fa fa-ellipsis-v"></i>
										</span>
										<input type="checkbox" value="">
										<span class="text">世界环保博览会成功举办，请确认重要事项。</span>
										<small class="label label-primary"><i class="fa fa-clock-o"></i> 1 week</small>
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
									</li>
									<li>
										<span class="handle">
											<i class="fa fa-ellipsis-v"></i>
											<i class="fa fa-ellipsis-v"></i>
										</span>
										<input type="checkbox" value="">
										<span class="text">Apple开发者账户申请</span>
										<small class="label label-default"><i class="fa fa-clock-o"></i> 1 month</small>
										<div class="tools">
											<i class="fa fa-edit"></i>
											<i class="fa fa-trash-o"></i>
										</div>
									</li>
								</ul>
							</div>
							<!-- /.box-body -->
							<div class="box-footer clearfix no-border">
								<button type="button" class="btn btn-default pull-right"><i class="fa fa-plus"></i> 新增事项</button>
							</div>
						</div>
						<!-- /.box -->

						

					</section>
					<!-- /.Left col -->
					<!-- right col (We are only adding the ID to make the widgets sortable)-->
					<section class="col-lg-5 connectedSortable">


						<!-- solid sales graph -->
						<div class="box box-solid bg-teal-gradient">
							<div class="box-header">
								<i class="fa fa-th"></i>

								<h3 class="box-title">企业数</h3>

								<div class="box-tools pull-right">
									<button type="button" class="btn bg-teal btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
									</button>
									<button type="button" class="btn bg-teal btn-sm" data-widget="remove"><i class="fa fa-times"></i>
									</button>
								</div>
							</div>
							<div class="box-body border-radius-none">
								<div class="chart" id="line-chart" style="height: 250px;"></div>
							</div>
							<!-- /.box-body -->
							<div class="box-footer no-border">
								<div class="row">
									<div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
										<input type="text" class="knob" data-readonly="true" value="20" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">已申请</div>
									</div>
									<!-- ./col -->
									<div class="col-xs-4 text-center" style="border-right: 1px solid #f4f4f4">
										<input type="text" class="knob" data-readonly="true" value="50" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">已安装</div>
									</div>
									<!-- ./col -->
									<div class="col-xs-4 text-center">
										<input type="text" class="knob" data-readonly="true" value="30" data-width="60" data-height="60" data-fgColor="#39CCCC">

										<div class="knob-label">已完成</div>
									</div>
									<!-- ./col -->
								</div>
								<!-- /.row -->
							</div>
							<!-- /.box-footer -->
						</div>
						<!-- /.box -->

						<!-- Calendar -->
						<div class="box box-solid bg-green-gradient">
							<div class="box-header">
								<i class="fa fa-calendar"></i>

								<h3 class="box-title">任务日历</h3>
								<!-- tools box -->
								<div class="pull-right box-tools">
									<!-- button with a dropdown -->
									<div class="btn-group">
										<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">
											<i class="fa fa-bars"></i></button>
										<ul class="dropdown-menu pull-right" role="menu">
											<li><a href="#">添加新事件</a></li>
											<li><a href="#">清楚事件</a></li>
											<li class="divider"></li>
											<li><a href="#">浏览日历</a></li>
										</ul>
									</div>
									<button type="button" class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
									</button>
									<button type="button" class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i>
									</button>
								</div>
								<!-- /. tools -->
							</div>
							<!-- /.box-header -->
							<div class="box-body no-padding">
								<!--The calendar -->
								<div id="calendar" style="width: 100%"></div>
							</div>
							<!-- /.box-body -->
							<div class="box-footer text-black">
								<div class="row">
									<div class="col-sm-6">
										<!-- Progress bars -->
										<div class="clearfix">
											<span class="pull-left">罗湖区</span>
											<small class="pull-right">90%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 90%;"></div>
										</div>

										<div class="clearfix">
											<span class="pull-left">福田区</span>
											<small class="pull-right">70%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 70%;"></div>
										</div>
									</div>
									<!-- /.col -->
									<div class="col-sm-6">
										<div class="clearfix">
											<span class="pull-left">南山区</span>
											<small class="pull-right">60%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 60%;"></div>
										</div>

										<div class="clearfix">
											<span class="pull-left">龙岗区</span>
											<small class="pull-right">40%</small>
										</div>
										<div class="progress xs">
											<div class="progress-bar progress-bar-green" style="width: 40%;"></div>
										</div>
									</div>
									<!-- /.col -->
								</div>
								<!-- /.row -->
							</div>
						</div>
						<!-- /.box -->

					</section>
					<!-- right col -->
				</div>
				<!-- /.row (main row) -->

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
ctx.name="Home";

var data=base.GenData();
data.mainnav="home";
data.objects=[];
ctx.data=function(){
    return data;
};

ctx.methods.onMyShow=function(){

	this.loadapi("airdata", "summary", {daydetail:"Y"}, objects => {
		this.objects=objects;
		this.$nextTick(()=>{
			var width=0;
			for(var i=0;i<this.objects.length;i++){
				/* Morris.js Charts */
				// Sales chart
				var obj=this.objects[i];
				
				var data=[];
				var airdataline=obj.airdataline;
				for(var line of airdataline){
					//alert(line);
					//break;
					//1370131200000
					//1540800420
					//console.log();
					var pm25=Number( line.PM25);
					if(pm25>0){
						data.push([line.timespan*1000,pm25]);
					}
				}
				//alert(data[0][1]);
				var chart = Highcharts.chart('pm25_chart_'+obj.id, {
						chart: {
							zoomType: 'x'
						},
						title: {
							text: '24小时内PM2.5走势图 - '+obj.name
						},
						subtitle: {
							text: document.ontouchstart === undefined ?
							'鼠标拖动可以进行缩放' : '手势操作进行缩放'
						},
						xAxis: {
							type: 'datetime',
							dateTimeLabelFormats: {
								millisecond: '%H:%M:%S.%L',
								second: '%H:%M:%S',
								minute: '%H:%M',
								hour: '%H:%M',
								day: '%m-%d',
								week: '%m-%d',
								month: '%Y-%m',
								year: '%Y'
							}
						},
						tooltip: {
							dateTimeLabelFormats: {
								millisecond: '%H:%M:%S.%L',
								second: '%H:%M:%S',
								minute: '%H:%M',
								hour: '%H:%M',
								day: '%Y-%m-%d',
								week: '%m-%d',
								month: '%Y-%m',
								year: '%Y'
							}
						},
						yAxis: {
							title: {
								text: 'PM2.5'
							}
						},
						legend: {
							enabled: false
						},
						plotOptions: {
							area: {
								fillColor: {
									linearGradient: {
										x1: 0,
										y1: 0,
										x2: 0,
										y2: 1
									},
									stops: [
										[0, Highcharts.getOptions().colors[0]],
										[1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
									]
								},
								marker: {
									radius: 2
								},
								lineWidth: 1,
								states: {
									hover: {
										lineWidth: 1
									}
								},
								threshold: null
							}
						},
						series: [{
							type: 'area',
							name: 'PM2.5(mg/m3)',
							data: data
						}]
					});
			}
		});
	});
  
  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.box-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  });
  $('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder         : 'sort-highlight',
    handle              : '.handle',
    forcePlaceholderSize: true,
    zIndex              : 999999
  });

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').wysihtml5();

  $('.daterange').daterangepicker({
    ranges   : {
      'Today'       : [moment(), moment()],
      'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month'  : [moment().startOf('month'), moment().endOf('month')],
      'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
  }, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  });

  /* jQueryKnob */
  $('.knob').knob();


  // Sparkline charts
  var myvalues = [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021];
  $('#sparkline-1').sparkline(myvalues, {
    type     : 'line',
    lineColor: '#92c1dc',
    fillColor: '#ebf4f9',
    height   : '50',
    width    : '80'
  });
  myvalues = [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921];
  $('#sparkline-2').sparkline(myvalues, {
    type     : 'line',
    lineColor: '#92c1dc',
    fillColor: '#ebf4f9',
    height   : '50',
    width    : '80'
  });
  myvalues = [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21];
  $('#sparkline-3').sparkline(myvalues, {
    type     : 'line',
    lineColor: '#92c1dc',
    fillColor: '#ebf4f9',
    height   : '50',
    width    : '80'
  });

  // The Calender
  $('#calendar').datepicker();

  // SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').slimScroll({
    height: '250px'
  });



  // Fix for charts under tabs
  $('.box ul.nav a').on('shown.bs.tab', function () {
    area.redraw();
    donut.redraw();
    line.redraw();
  });

  /* The todo list plugin */
  $('.todo-list').todoList({
    onCheck  : function () {
      window.console.log($(this), 'The element has been checked');
    },
    onUnCheck: function () {
      window.console.log($(this), 'The element has been unchecked');
    }
  });

  var line = new Morris.Line({
    element          : 'line-chart',
    resize           : true,
    data             : [
      { y: '2016 Q1', item1: 2666, item2: 2666 },
      { y: '2016 Q2', item1: 2778, item2: 2294 },
      { y: '2016 Q3', item1: 4912, item2: 1969 },
      { y: '2016 Q4', item1: 3767, item2: 3597 },
      { y: '2017 Q1', item1: 6810, item2: 1914 },
      { y: '2017 Q2', item1: 5670, item2: 4293 },
      { y: '2017 Q3', item1: 4820, item2: 3795 },
      { y: '2017 Q4', item1: 15073, item2: 5967 },
      { y: '2018 Q1', item1: 10687, item2: 4460 },
      { y: '2018 Q2', item1: 8432, item2: 5713 }
    ],
    xkey             : 'y',
    ykeys            : ['item1'],
    labels           : ['Item 1'],
    lineColors       : ['#efefef'],
    lineWidth        : 2,
    hideHover        : 'auto',
    gridTextColor    : '#fff',
    gridStrokeWidth  : 0.4,
    pointSize        : 4,
    pointStrokeColors: ['#efefef'],
    gridLineColor    : '#efefef',
    gridTextFamily   : 'Open Sans',
    gridTextSize     : 10
  });


};

ctx.components={myheader,mynav,myfooter};

export default ctx;



</script>
