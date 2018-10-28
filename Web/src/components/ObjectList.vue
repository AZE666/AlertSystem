<template>
    <div>
      <myheader v-bind:memberinfo="memberinfo"></myheader>
  
      <mynav v-bind:memberinfo="memberinfo"  v-bind:mainnav="mainnav"  v-bind:subnav="subnav" ></mynav>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">




			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					监控企业
					<small>列表数据</small>
				</h1>
			</section>

			<!-- Main content -->
			<section class="content">

                <div class="row">
                <div class="col-xs-12">
                <div class="box">

                    <div class="box-header">
                    <h3 class="box-title"></h3>
                    </div>
                        <div style="padding:20px">
                        <div class="row">
                            <div class="col-md-12" >
                        <table class="table table-bordered table-hover dtexam">
                            <thead>
                            <tr>
                              <th>#</th>
                              <th>设备号</th>
                              <th>设备名称</th>
                              <th>公司名称</th>
                              <th>历史数据</th>
                              <th>报警历史</th>
                            </tr>
                            </thead>
                            <tbody id="dtDr" >
                              <tr v-for="(item,index) in devicelist">
                                <td>{{index+1}}</td>
                                <td>{{item.machineid}}</td>
                                <td>{{item.device_name}}</td>
                                <td>{{item.name}}</td>
                                <td><router-link :to="'/ObjectA?id='+item.id">查看详情</router-link></td>
                                <td><router-link :to="'/RPTExceed?objectid='+item.id">查看预警历史</router-link></td>
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
ctx.name="ObjectList";

var data=base.GenData();
data.mainnav="obj";
data.devicelist=[];
ctx.data=function(){
    return data;
};

ctx.methods.onMyShow=function(){
  
    this.loadapi("obj","list",{needdevice:"Y"},(devicelist)=>{
        this.devicelist=devicelist;
    });
};

ctx.components={myheader,mynav,myfooter};

export default ctx;



</script>
<style>
.table-bordered{border:1px solid #f4f4f4}
.table-bordered>thead>tr>th,.table-bordered>tbody>tr>th,.table-bordered>tfoot>tr>th,.table-bordered>thead>tr>td,.table-bordered>tbody>tr>td,.table-bordered>tfoot>tr>td
{border:1px solid #f4f4f4}
.table-bordered>thead>tr>th,.table-bordered>thead>tr>td{border-bottom-width:2px}
</style>
