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
            <li v-bind:class="{ 'active':mainnav=='home' }"><router-link to="/"><i class="fa fa-circle-o "></i> <span>总览</span></router-link></li>
            <li  v-bind:class="{ 'active':mainnav=='map' }"><router-link to="/Map"><i class="fa fa-map"></i> <span>地图</span></router-link></li>
  
            <li class="treeview"  v-bind:class="{ 'active':mainnav=='rpt' }">
              <a href="#">
                <i class="fa fa-pie-chart"></i>
                <span>数据报表</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li ><router-link to="/rpt1"><i class="fa fa-circle-o"  v-bind:class="{ 'text-aqua':subnav=='rpt1' }" ></i> 污染物数据历史走势图</router-link></li>
                <li><router-link to="/rpt2"><i class="fa fa-circle-o" v-bind:class="{ 'text-aqua':subnav=='rpt2' }" ></i> 实时大气污染物组成</router-link></li>
                <li><router-link to="/rpt3"><i class="fa fa-circle-o" v-bind:class="{ 'text-aqua':subnav=='rpt3' }" ></i> 污染来源预测</router-link></li>
              </ul>
            </li>
          </ul>
    </section>
    <!-- /.sidebar -->


    
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