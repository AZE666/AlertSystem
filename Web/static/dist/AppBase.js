function IsPC(){  
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var flag = true;  
    for (var v = 0; v < Agents.length; v++) {  
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
    }  
    return flag;  
}
function DT(spec,order,displaylength,searching){
    if(displaylength==undefined){
      displaylength=10;
    }
    if(searching==undefined){
      searching=false;
    }
    $(spec).DataTable({
        paging: true,
        lengthChange: false,
        searching: searching,
        ordering: true,
        order: order,
        info: true,
        autoWidth: false,
        retrieve: true,
        aLengthMenu: [3, 5, 10],
        iDisplayLength: displaylength,
        language: {
            sProcessing: "处理中...",
            sLengthMenu: "显示 _MENU_ 项结果",
            sZeroRecords: "没有匹配结果",
            sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            sInfoEmpty: "显示第 0 至 0 项结果，共 0 项",
            sInfoFiltered: "(由 _MAX_ 项结果过滤)",
            sInfoPostFix: "",
            sSearch: "搜索:",
            sUrl: "",
            sEmptyTable: "表中数据为空",
            sLoadingRecords: "载入中...",
            sInfoThousands: ",",
            oPaginate: {
            sFirst: "首页",
            sPrevious: "上页",
            sNext: "下页",
            sLast: "末页"
            },
            oAria: {
            sSortAscending: ": 以升序排列此列",
            sSortDescending: ": 以降序排列此列"
            }
        }
        });
}

function RPT4(id,title,series){
    var cats=[];
    var xray=[];
    var sdata=[];
    for(var i=0;i<series.length;i++){
        cats.push(series[i].name);
        var s=     {
                 name:series[i].name,
                 type:'line',
                 areaStyle: {},
                 data:[]
             };
        for(var j=0;j<series[i].data.length;j++){
            s.data.push(series[i].data[j][1]);
        }
        sdata.push(s);
    }
    //alert(JSON.stringify(cats));
    for(var i=0;i<series[0].data.length;i++){
        xray.push(series[0].data[i][0]);
    }
    var option = {
        title: {
            text: title
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:cats
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                boundaryGap : false,
                data : xray
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : sdata
    };
    var myChart = echarts.init(document.getElementById(id)); 
    myChart.setOption(option);
    return myChart;
}

function RPT3(id,title,data,marker){
    //alert(marker);
    var myChart = echarts.init(document.getElementById(id)); 


    var option = {
        title: {
            text:title
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: data.map(function (item) {
                return item[0];
            })
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        series: {
            name: title,
            type: 'line',
            data: data.map(function (item) {
                return item[1];
            }),
            markLine: {
                silent: true,
                data: [{
                    yAxis: marker[0]
                }, {
                    yAxis: marker[1]
                }, {
                    yAxis: marker[2]
                }, {
                    yAxis: marker[3]
                }, {
                    yAxis: marker[4]
                }, {
                    yAxis: marker[5]
                }]
            }
        }
    };
    if(IsPC()==true){
        option.visualMap={
            top: 10,
            right: 10,
            pieces: [{
                lte: parseInt( marker[0]),
                color: '#096'
            }, {
                lte:parseInt(  marker[1]),
                color: '#ffde33'
            }, {
                lte: parseInt( marker[2]),
                color: '#ff9933'
            }, {
                lte: parseInt( marker[3]),
                color: '#cc0033'
            }, {
                lte: parseInt( marker[4]),
                color: '#660099'
            }, {
                lte: parseInt( marker[5]),
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#7e0023'
            }
        };
    }
    myChart.setOption(option);
}




function Rpt1(id,title,subtitle,unit,series,color){
    
   var chartopt=  {
        chart: {
          type: "spline"
        },
        title: {
          text: title
        },
        subtitle: {
          text: subtitle
        },
        xAxis: {
          type: "datetime",
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: unit
          },
          min: 0
        },
        plotOptions: {
          spline: {
            lineWidth: 4,
            states: {
              hover: {
                lineWidth: 5
              }
            },
            marker: {
              enabled: false
            },
            pointInterval: 3600000, // one hour
            pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
          }
        },
        series: series
      };
      if(color!=undefined){
        chartopt.plotOptions.spline.lineColor=color;
      }
      var chart = Highcharts.chart(id,chartopt);
    return chart;
}

function Rpt2(id,title,subtitle,unit,series,type,color){
    var plotBands=[];
    console.log("series.length");
    console.log(series.length);
    for(var i=0;i<series.length;i++){
        console.log("series[i].length");
        console.log(series[i].data.length);
        for(var j=0;j<series[i].data.length;j++){
            series[i].data[j][0]=series[i].data[j][0]+8*3600*1000;
        }
    }
    if(type=="tvoc"){
        plotBands=[
            {
              // Light air
              from: 0,
              to: 300,
              color: "rgba(68, 170, 213,0.3)",
              label: {
                text: "优",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Light breeze
              from: 301,
              to: 600,
              color: "rgba(154,206,64,0.3)",
              label: {
                text: "良",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Gentle breeze
              from: 601,
              to: 2000,
              color: "rgba(255,253,85,0.3)",
              label: {
                text: "轻度污染",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Moderate breeze
              from: 2001,
              to: 4000,
              color: "rgba(241,134,51,0.3)",
              label: {
                text: "中度污染",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Fresh breeze
              from: 4001,
              to: 20000,
              color: "rgba(236,51,35,0.3)",
              label: {
                text: "重度污染",
                style: {
                  color: "#606060"
                }
              }
            }
          ];
    }else{
        plotBands=[
            {
              // Light air
              from: 0,
              to: 35,
              color: "rgba(68, 170, 213, 0.1)",
              label: {
                text: "优",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Light breeze
              from: 35,
              to: 75,
              color: "rgba(0, 0, 0, 0)",
              label: {
                text: "良",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Gentle breeze
              from: 75,
              to: 115,
              color: "rgba(68, 170, 213, 0.1)",
              label: {
                text: "轻度污染",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Moderate breeze
              from: 115,
              to: 150,
              color: "rgba(0, 0, 0, 0)",
              label: {
                text: "中度污染",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Fresh breeze
              from: 150,
              to: 250,
              color: "rgba(68, 170, 213, 0.1)",
              label: {
                text: "重度污染",
                style: {
                  color: "#606060"
                }
              }
            },
            {
              // Strong breeze
              from: 250,
              to: 1000,
              color: "rgba(0, 0, 0, 0)",
              label: {
                text: "严重污染",
                style: {
                  color: "#606060"
                }
              }
            }
          ];
    }


    var chartopt={
        chart: {
          type: "spline"
        },
        title: {
          text: title
        },
        subtitle: {
          text: subtitle
        },
        xAxis: {
          type: "datetime",
          labels: {
            overflow: "justify"
          }
        },
        yAxis: {
          title: {
            text: unit
          },
          min: 0,
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotBands: plotBands
        },
        plotOptions: {
          spline: {
            lineWidth: 4,
            states: {
              hover: {
                lineWidth: 5
              }
            },
            marker: {
              enabled: false
            }
          }
        },
        series: series,
        navigation: {
          menuItemStyle: {
            fontSize: "10px"
          }
        }
      };
      if(color!=undefined){
        chartopt.plotOptions.spline.lineColor=color;
      }
      var chart = Highcharts.chart(id, chartopt);
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
                              try{

                                var json = JSON.parse(result);
                                console.log(json);
                                callback(json);
                              }catch(e){

                                console.log(result);
                                callback(result);
                              }
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

$(document).ready(function(){
    $("#dialog_boxBtnChangePassword").click(function ()
    {
        var oldpassword = $("#dialog_password_oldpassword").val();
        var newpassword = $("#dialog_password_newpassword").val();

        var json = { oldpassword: oldpassword, newpassword: newpassword };
        var headers={
            'Content-Type':"application/x-www-form-urlencoded"
        };
        var token = window.localStorage.getItem("UserToken");
        if (token != null) {
            headers.TOKEN=token;
        }
        $.ajax({
            type: "POST",
            url: "https://cmsdev.app-link.org/alucard263096/aze/api/inst/changepassword",
            data: json,
            headers:headers,
            success: function (data) {
                if (data == "current_password_diff")
                {
                    $("#dialog_boxBtnChangePassword_tips").text("当前密码错误，请重新输入，注意大小写");
                } else if (data == "success")
                {
                    $("#dialog_password").modal('hide');
                } else
                {
                    $("#dialog_boxBtnChangePassword_tips").text("系统错误，请联系管理员" + data);
                }
            }
        });
    });
});