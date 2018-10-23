<template>
<!-- Automatic element centering -->
<div class="lockscreen-wrapper">
  <div class="lockscreen-logo">
    <a><b>{{titlename}}</b>{{projectname}}</a>
  </div>
  <!-- User name -->
  <div class="lockscreen-name text-red">{{tips}}</div>

  <!-- START LOCK SCREEN ITEM -->
  <div class="lockscreen-item">
    <!-- lockscreen image -->
    <!-- /.lockscreen-image -->

    <!-- lockscreen credentials (contains the form) -->
    <form class="lockscreen-credentials" @submit.prevent="submit">
      <div class="input-group">
        <input type="text" class="form-control border-bottom" placeholder="用户名或手机号码" v-model="loginname">
        <input type="password" class="form-control" placeholder="密码" v-model="password">
        <div class="input-group-btn">
          <button type="submit" class="btn" id="btnLogin"><i class="fa fa-arrow-right text-muted"></i></button>
        </div>
      </div>
    </form>
    <!-- /.lockscreen credentials -->

  </div>
  <!-- /.lockscreen-item -->
  <div class="help-block text-center">
    输入密码激活账号
  </div>
  <div class="lockscreen-footer text-center">
    Copyright &copy; 2014-2018 <b><a href="#" class="text-black">AZE</a></b><br>
    All rights reserved
  </div>
</div>
<!-- /.center -->
</template>

<script>
$("#bodyctx").addClass("lockscreen");
var base = new AppBase();
var ctx = base.Gen();
ctx.name = "Login";
ctx.methods.checkPermission = function() {};
ctx.methods.submit=function(){
    //alert(this.password);
    if(this.loginname.trim()==""){

            this.tips="用户名不能为空";
            return;
    }
    this.loadapi("inst","memberlogin",{loginname:this.loginname,password:this.password},(ret)=>{
        if(ret.code==0){
            var token=ret.return;
            this.setStore("UserToken",token);
            this.setStore("LastLoginName",this.loginname);
            window.location.href="/#/";
        }else{
            this.tips=ret.result;
        }
    });
};

ctx.methods.onMyShow=function(){
    var loginname=this.getStore("LastLoginName");
    if(loginname!=null){
        this.loginname=loginname;
    }
};


var data=base.GenData();
data.loginname="";
data.password="";
data.tips="";
ctx.data=function(){
    return data;
};




export default ctx;
</script>


<style>
.lockscreen-credentials{
    margin-left: 10px;
}
.border-bottom{
    border-bottom: 1px rgba(211,211,211,0.5) solid !important;
}
</style>