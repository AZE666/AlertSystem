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
					<section class="col-lg-7 connectedSortable" id="soutttable">
						<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
							<ol class="carousel-indicators">
							<li data-target="#carousel-example-generic" data-slide-to="0" :class="{active:index==0}" v-for="(item,index) in objects"></li>
							</ol>
							<div class="carousel-inner">

							<div class="item" :class="{active:index==0}" v-for="(item,index) in objects">
								<div style="height:400px;" :id="'pm25_chart_'+item.id" class="pm25_chart">
									
								</div>
							</div>
							</div>
							<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev" style="height: 100px;top: 100px;">
							<span class="fa fa-angle-left" style="color:black;"></span>
							</a>
							<a class="right carousel-control" href="#carousel-example-generic" data-slide="next" style="height: 100px;top: 100px;">
							<span class="fa fa-angle-right"  style="color:black;"></span>
							</a>
						</div>



						<!-- solid sales graph -->
						<div class="box box-solid ">
							<div class="box-header">
								<i class="fa fa-th"></i>

								<h3 class="box-title">监控设备安装</h3>

								<div class="box-tools pull-right">
									<button type="button" class="btn bg-teal btn-sm" data-widget="collapse"><i class="fa fa-minus"></i>
									</button>
									<button type="button" class="btn bg-teal btn-sm" data-widget="remove"><i class="fa fa-times"></i>
									</button>
								</div>
							</div>
							<div class="box-body border-radius-none">
								<div class="chart" id="line-chart" style="height: 350px;"></div>
							</div>
							<!-- /.box-footer -->
						</div>
						<!-- /.box -->

					</section>
					<!-- /.Left col -->
					<!-- right col (We are only adding the ID to make the widgets sortable)-->
					<section class="col-lg-5 connectedSortable">


						
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
			var width=$("#soutttable").width();
			//alert(width);
			for(var i=0;i<this.objects.length;i++){
				/* Morris.js Charts */
				// Sales chart
				var obj=this.objects[i];
				
				var date=[];
				var data=[];
				var airdataline=obj.airdata;
				for(var line of airdataline){
					//alert(line);
					//break;
					//1370131200000
					//1540800420
					//console.log();
					var pm25=Number( line.PM25);
					if(pm25>0){
						date.push(line.df2);
						data.push(pm25);
					}
				}
				//alert(data.length);
				//alert(data[0][1]);
				console.log(data);
				$('#pm25_chart_'+obj.id).width(width);
				//alert(obj.name);
				RPT5('pm25_chart_'+obj.id,'24小时内PM2.5走势图 - '+obj.name,date,data);

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


var dataMap = {};
function dataFormatter(obj) {
    var pList = ['南山','福田','罗湖','盐田','龙岗','宝安','龙华','坪山','光明','大鹏'];
    var temp;
    for (var year = 2017; year <= 2018; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[year][i] = {
                name : pList[i],
                value : temp[i]
            }
		}
        obj[year + 'max'] = Math.floor(max / 100) * 100;
        obj[year + 'sum'] = sum;
    }
    return obj;
}

dataMap.dataGDP = dataFormatter({
    //max : 60000,
    2018:[16251.93,11307.28,24515.76,11237.55,14359.88,22226.7,10568.83,12582,19195.69,49110.27,32318.85,15300.65,17560.18,11702.82,45361.85,26931.03,19632.26,19669.56,53210.28,11720.87,2522.66,10011.37,21026.68,5701.84,8893.12,605.83,12512.3,5020.37,1670.44,2102.21,6610.05],
    2017:[14113.58,9224.46,20394.26,9200.86,11672,18457.27,8667.58,10368.6,17165.98,41425.48,27722.31,12359.33,14737.12,9451.26,39169.92,23092.36,15967.61,16037.96,46013.06,9569.85,2064.5,7925.58,17185.48,4602.16,7224.18,507.46,10123.48,4120.75,1350.43,1689.65,5437.47],
   
});

dataMap.dataPI = dataFormatter({
    //max : 4000,
    2018:[136.27,159.72,2905.73,641.42,1306.3,1915.57,1277.44,1701.5,124.94,3064.78,1583.04,2015.31,1612.24,1391.07,3973.85,3512.24,2569.3,2768.03,2665.2,2047.23,659.23,844.52,2983.51,726.22,1411.01,74.47,1220.9,678.75,155.08,184.14,1139.03],
    2017:[124.36,145.58,2562.81,554.48,1095.28,1631.08,1050.15,1302.9,114.15,2540.1,1360.56,1729.02,1363.67,1206.98,3588.28,3258.09,2147,2325.5,2286.98,1675.06,539.83,685.38,2482.89,625.03,1108.38,68.72,988.45,599.28,134.92,159.29,1078.63],

});

dataMap.dataSI = dataFormatter({
    //max : 26600,
    2018:[3752.48,5928.32,13126.86,6635.26,8037.69,12152.15,5611.48,5962.41,7927.89,25203.28,16555.58,8309.38,9069.2,6390.55,24017.11,15427.08,9815.94,9361.99,26447.38,5675.32,714.5,5543.04,11029.13,2194.33,3780.32,208.79,6935.59,2377.83,975.18,1056.15,3225.9],
    2017:[3388.38,4840.23,10707.68,5234,6367.69,9976.82,4506.31,5025.15,7218.32,21753.93,14297.93,6436.62,7522.83,5122.88,21238.49,13226.38,7767.24,7343.19,23014.53,4511.68,571,4359.12,8672.18,1800.06,3223.49,163.92,5446.1,1984.97,744.63,827.91,2592.15],
  
});
var d=new Date();
var kvc=[];
for(var i=-11;i<=0;i++){
	var k=new Date(d.getTime()+i*30*24*3600*1000);
	var mon=k.getMonth()+1;
	mon=mon>9?mon.toString():"0"+mon.toString();
	kvc.push(k.getFullYear()+"/"+mon);
}

var option = {
    baseOption: {
		timeline: {
            // y: 0,
            axisType: 'category',
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 1000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: kvc,
            label: {
                formatter : function(s) {
                    return s;
                }
            }
        },
        title: {
            subtext: '数据来自安志环保监控'
        },
        tooltip: {
        },
        legend: {
            x: 'right',
            data: ['空气监测', '监控车', '水污染']
        },
        calculable : true,
        grid: {
            top: 80,
            bottom: 100,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.replace('\n', '');
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data': ['南山','福田','罗湖','盐田','龙岗','宝安','龙华','坪山','光明','大鹏'],
                splitLine: {show: false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '数量'
            }
        ],
        series: [
            {name: '空气监测', type: 'bar'},
            {name: '监控车', type: 'bar'},
            {name: '水污染', type: 'bar'},
            {
                name: 'GDP占比',
                type: 'pie',
                center: ['75%', '35%'],
                radius: '28%',
                z: 100
            }
        ]
    },
    options: [
        {
            series: [
                {data: dataMap.dataGDP['2017']},
                {data: dataMap.dataPI['2017']},
                {data: dataMap.dataSI['2017']},
                {data: [
                    {name: '空气监测', value: dataMap.dataGDP['2017sum']},
                    {name: '监控车', value: dataMap.dataPI['2017sum']},
                    {name: '水污染', value: dataMap.dataSI['2017sum']}
                ]}
            ]
        },
        {
            series: [
                {data: dataMap.dataGDP['2018']},
                {data: dataMap.dataPI['2018']},
                {data: dataMap.dataSI['2018']},
                {data: [
                    {name: '空气监测', value: dataMap.dataGDP['2018sum']},
                    {name: '监控车', value: dataMap.dataPI['2018sum']},
                    {name: '水污染', value: dataMap.dataSI['2018sum']}
                ]}
            ]
        }
    ]
};


    var myChart = echarts.init(document.getElementById("line-chart")); 
    myChart.setOption(option);


};

ctx.components={myheader,mynav,myfooter};

export default ctx;



</script>
