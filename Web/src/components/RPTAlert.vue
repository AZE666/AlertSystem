<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">




			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					预警数据记录
					<small>数据报表</small>
				</h1>
			</section>

			<!-- Main content -->
			<section class="content" >

                <div class="row">
                <div class="col-xs-12">
                <div class="box">

                        <div style="padding:20px">
                        <div class="row">
                            <div class="col-md-12" >
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>预警对象</th>
                              <th>设备</th>
                              <th>机器编号</th>
                              <th>提交时间</th>
                              <th>报警时间</th>
                              <th>SO2</th>
                              <th>NO2</th>
                              <th>CO</th>
                              <th>H2S</th>
                              <th>O3</th>
                              <th>TVOC</th>
                              <th>PM2.5</th>
                              <th>PM10</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr  v-for="(item,index) in alertdata">
                                <td>{{item.objectname}}</td>
                                <td>{{item.devicename}}</td>
                                <td>{{item.machineid}}</td>
                                <td>{{item.submit_time}}</td>
                                <td >{{item.df}}时</td>
                                <td  v-bind:class="{ 'text-red':item.SO2>item.exso2 }">{{item.SO2}}</td>
                                <td v-bind:class="{ 'text-red':item.NO2>item.exno2 }">{{item.NO2}}</td>
                                <td v-bind:class="{ 'text-red':item.CO>item.exco }">{{item.CO}}</td>
                                <td v-bind:class="{ 'text-red':item.H2S>item.exh2s }">{{item.H2S}}</td>
                                <td v-bind:class="{ 'text-red':item.O3>item.exo3 }">{{item.O3}}</td>
                                <td v-bind:class="{ 'text-red':item.TVOC>item.extvoc }">{{item.TVOC}}</td>
                                <td v-bind:class="{ 'text-red':item.PM25>item.expm25 }">{{item.PM25}}</td>
                                <td v-bind:class="{ 'text-red':item.PM10>item.expm10 }">{{item.PM10}}</td>

                              </tr>
                            </tbody>
                          </table>
                          </div>
                            

                        </div>

                        </div>
                </div>


                
                </div>
                </div>
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
ctx.name="RPTAlert";

var data=base.GenData();
data.mainnav="rptalert";
data.subnav="rpt";
data.alertdata=[];
ctx.data=function(){
    return data;
};


ctx.methods.onMyShow=function(){
    
  this.loadapi("airdata","alertdata",{objectid:this.objectid},(alertdata)=>{
    this.alertdata=alertdata;
    //alert(alertdata.length);
    var that=this;
    this.$nextTick(()=>{
                    
                        
                    $(".dtexam").DataTable({
                    'paging'      : true,
                    'lengthChange': false,
                    'searching'   : false,
                    'ordering'    : true,
                    "order": [[ 3, "desc" ]],
                    'info'        : true,
                    'autoWidth'   : false,
                    retrieve: true,
                                "aLengthMenu" : [20, 50, 100],   
                                "iDisplayLength" : 20,
                                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                }
                    });
                    




                    
    });
  });

};

ctx.components={myheader,mynav,myfooter};

export default ctx;



</script>
