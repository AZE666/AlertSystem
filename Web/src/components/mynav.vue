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
                <span>超标数据统计分析</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li v-for="item in memberinfo.objectlist"><router-link v-bind:class="{ 'text-aqua':subnav=='exceed_'+item.id }" :to="{path:'/RPTExceed',query:{objectid:item.id}}"><i class="fa fa-circle-o"  v-bind:class="{ 'text-aqua':subnav=='exceed_'+item.id }" ></i> {{item.name}}</router-link></li>
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