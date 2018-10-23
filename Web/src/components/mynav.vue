<template>
     <div id="head-template">

<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
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
            <li v-bind:class="{ 'active':mainnav=='home' }"><router-link to="/"><i class="fa fa-circle-o "></i> <span>总览</span></router-link></li>
            <li  v-bind:class="{ 'active':mainnav=='map' }"><router-link to="/Map"><i class="fa fa-map"></i> <span>地图</span></router-link></li>
  
            <li class="treeview">
              <a href="#">
                <i class="fa fa-pie-chart"></i>
                <span>数据报表</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li><a href="rpt1.html"><i class="fa fa-circle-o"></i> 污染物数据历史走势图</a></li>
                <li><a href="rpt2.html"><i class="fa fa-circle-o"></i> 实时大气污染物组成</a></li>
                <li><a href="rpt3.html"><i class="fa fa-circle-o"></i> 污染来源预测</a></li>
              </ul>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-pie-chart"></i>
                <span>数据比较</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li><a href="rpt4.html"><i class="fa fa-circle-o"></i> 周污染物浓度同期比较</a></li>
                <li><a href="rpt4.html"><i class="fa fa-circle-o"></i> 月污染物浓度同期比较</a></li>
                <li><a href="rpt4.html"><i class="fa fa-circle-o"></i> 季污染物浓度同期比较</a></li>
              </ul>
            </li>
          </ul>
    </section>
    <!-- /.sidebar -->
  </aside>


</div>
</template>


<script>
export default
{
    props:["memberinfo","mainnav","subnav"],
    methods:{
        
    }
}
</script>