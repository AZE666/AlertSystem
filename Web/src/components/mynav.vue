<template>

<!-- Left side column. contains the logo and sidebar -->
  <div class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <!-- search form -->
      <form   class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="搜索...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
            <li  :data-toggle="ispc==false?'push-menu':''" role="button"  v-bind:class="{ 'active':mainnav=='home' }" @click="refresh()"><a href="#/" ><i class="fa fa-circle-o "></i> <span>总览</span></a></li>
            <li  :data-toggle="ispc==false?'push-menu':''" role="button"  v-bind:class="{ 'active':mainnav=='map' }" @click="refresh()"><a href="#/Map" ><i class="fa fa-map"></i> <span>地图</span></a></li>
            <li   :data-toggle="ispc==false?'push-menu':''" role="button" v-bind:class="{ 'active':mainnav=='carmap' }" @click="refresh()"><a href="#/CarMap" ><i class="fa fa-bus"></i> <span>监控车</span></a></li>
            <!--<li  v-bind:class="{ 'active':mainnav=='obj' }" @click="refresh()"><router-link to="/ObjectList" ><i class="fa fa-list"></i> <span>监控企业</span></router-link></li>-->
            <li   :data-toggle="ispc==false?'push-menu':''" role="button" v-bind:class="{ 'active':mainnav=='obj' }" @click="refresh()"><a href="#/ObjectList" ><i class="fa fa-pie-chart"></i> <span>监控企业</span></a></li>
            <li   :data-toggle="ispc==false?'push-menu':''" role="button" v-bind:class="{ 'active':mainnav=='rptalert' }"><a href="#/RPTAlert"><i class="fa fa-pie-chart"></i> <span>超标数据统计</span>
            <span class="pull-right-container">
              <small class="label pull-right bg-green">{{memberinfo.alertcount}}</small>
            </span>
            </a></li>
          </ul>
    </section>
    <!-- /.sidebar -->


    
  </div>


</template>


<script>



var base=new AppBase();
var ctx=base.GenComponent();
ctx.props.push("memberinfo");
ctx.props.push("mainnav");
ctx.props.push("subnav");
ctx.methods.refresh=function(){
    
};;

export default ctx
</script>