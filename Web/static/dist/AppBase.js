function IsPC(){  
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}
var ispc=IsPC();
class AppBase {
    GenData() {
        return {
            api: "https://cmsdev.app-link.org/alucard263096/aze/api/",
            uploadpath: "https://alioss.app-link.org/alucard263096/aze/",
            fileupload: "https://cmsdev.app-link.org/alucard263096/aze/fileupload",
            name: "安志环保监控",
            titlename: "安志",
            projectname: "环保监控",
            msg: 'Hello Vue!',
            ispc:ispc,
            memberinfo: {name:"",position:"",instinfo:{name:""}},
            mainnav:"",
            subnav:""
        }
    }

    Gen() {
        return {
            methods: {
                onMyLoad: function () {
                    console.log("on my load");
                },
                onMyShow: function () {
                    console.log("on my show");
                },
                getMyInfo(callback) {

                    this.loadapi("member", "info", {}, (info) => {

                        if (callback != undefined) {
                            callback(info);
                        }
                    });
                },
                loadapi: function (modu, action, postData, callback) {
                    var url = this.api + modu + "/" + action;
                    console.log(url);

                    var that = this;

                    var headers={
                        'Content-Type':"application/x-www-form-urlencoded"
                    };
                    var token = that.getStore("UserToken");
                    if (token != null) {
                        headers.TOKEN=token;
                    }
                    //alert(headers);

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: postData,
                        headers:headers,
                        success: function (result) {
                            console.log(result);
                            if (callback != undefined) {
                                var json = JSON.parse(result);
                                console.log(json);
                                callback(json);
                            }
                        }
                    });
                },
                GetLoginInfo() {

                },
                getStore(key) {
                    return window.localStorage.getItem(key);
                },
                setStore(key, val) {
                    window.localStorage.setItem(key, val);
                },
                checkPermission() {
                    var token = this.getStore("UserToken");
                    //alert(token);
                    if (token != null) {
                        //alert(this.memberinfo.status);
                        if (this.memberinfo.status!="A") {
                            window.location.href = "/#/Login";
                        }
                    } else {
                        window.location.href = "/#/Login";
                    }
                }
            },
            data() {
                return {};
            },
            watch:{},
            created: function () {
                this.onMyLoad();
            },
            mounted: function () {
                $("#bodyctx").addClass("darkbg");
                $("#bodyctx").removeClass("lockscreen");
                this.getMyInfo((memberinfo) => {
                    //this.lastloginname=this.getStore("lastloginname");
                    //this.msg="funck";
                    this.memberinfo=memberinfo;
                    this.checkPermission();
                    this.onMyShow();
                });
            }
        };
    }


    GenComponent(){
        return {
            props:[],
            methods: {
                loadapi: function (modu, action, postData, callback) {
                    var url = this.api + modu + "/" + action;
                    console.log(url);

                    var that = this;

                    var headers={
                        'Content-Type':"application/x-www-form-urlencoded"
                    };
                    var token = that.getStore("UserToken");
                    if (token != null) {
                        headers.TOKEN=token;
                    }
                    //alert(headers);

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: postData,
                        headers:headers,
                        success: function (result) {
                            console.log(result);
                            if (callback != undefined) {
                                var json = JSON.parse(result);
                                console.log(json);
                                callback(json);
                            }
                        }
                    });
                },
                getStore(key) {
                    return window.localStorage.getItem(key);
                },
                setStore(key, val) {
                    window.localStorage.setItem(key, val);
                }
            },
            data() {
                return {
                    api: "https://cmsdev.app-link.org/alucard263096/aze/api/",
                    uploadpath: "https://alioss.app-link.org/alucard263096/aze/",
                    fileupload: "https://cmsdev.app-link.org/alucard263096/aze/fileupload",
                    name: "安志环保监控",
                    titlename: "安志",
                    ispc:ispc,
                    projectname: "环保监控",
                    msg: 'Hello Vue!',
                    mainnav:"",
                    subnav:""
                };
            }
        };
    }

}
