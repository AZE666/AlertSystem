import { Injectable } from '@angular/core';
import { Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ApiConfig } from '../app/api.config'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/*
  Generated class for the Test provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonApi {

  constructor(public http: Http) {

  }



  //获取所有的广告
  public bannerlist(data, showLoadingModal: boolean = true) {
    var mod = 'common/bannerlist';
    var url = ApiConfig.getApiUrl() + mod;
    var headers = ApiConfig.GetHeader(url, data);
    let options = new RequestOptions({ headers: headers });

    let body = ApiConfig.ParamUrlencoded(data);

    let loading: Loading = null;
    if (showLoadingModal) {
      loading = ApiConfig.GetLoadingModal();
    }

    return this.http.post(url, body, options).toPromise()
      .then((res) => {
        if (ApiConfig.DataLoadedHandle(mod, data, res)) {
          if (showLoadingModal) {
            ApiConfig.DimissLoadingModal();
          }
          var retjson = res.json();
          console.log(retjson);
          return retjson;
        } else {
          console.log(res);
          return Promise.reject(res);
        }
      })
      .catch(err => {
        console.log(err);
        if (showLoadingModal) {
          ApiConfig.DimissLoadingModal();
        }
        return ApiConfig.ErrorHandle(mod, data, err);
      });


  }





  //获取所有的广告
  public resource(data, showLoadingModal: boolean = true) {
    var mod = 'common/resource';
    var url = ApiConfig.getApiUrl() + mod;
    var headers = ApiConfig.GetHeader(url, data);
    let options = new RequestOptions({ headers: headers });

    let body = ApiConfig.ParamUrlencoded(data);

    let loading: Loading = null;
    if (showLoadingModal) {
      loading = ApiConfig.GetLoadingModal();
    }

    return this.http.post(url, body, options).toPromise()
      .then((res) => {
        if (ApiConfig.DataLoadedHandle(mod, data, res)) {
          if (showLoadingModal) {
            ApiConfig.DimissLoadingModal();
          }
          var retjson = res.json();
          console.log(retjson);
          return retjson;
        } else {
          console.log(res);
          return Promise.reject(res);
        }
      })
      .catch(err => {
        console.log(err);
        if (showLoadingModal) {
          ApiConfig.DimissLoadingModal();
        }
        return ApiConfig.ErrorHandle(mod, data, err);
      });


  }



  //获取所有的广告
  public newslist(data, showLoadingModal: boolean = true) {
    var mod = 'common/newslist';
    var url = ApiConfig.getApiUrl() + mod;
    var headers = ApiConfig.GetHeader(url, data);
    let options = new RequestOptions({ headers: headers });

    let body = ApiConfig.ParamUrlencoded(data);

    let loading: Loading = null;
    if (showLoadingModal) {
      loading = ApiConfig.GetLoadingModal();
    }

    return this.http.post(url, body, options).toPromise()
      .then((res) => {
        if (ApiConfig.DataLoadedHandle(mod, data, res)) {
          if (showLoadingModal) {
            ApiConfig.DimissLoadingModal();
          }
          var retjson = res.json();
          console.log(retjson);
          return retjson;
        } else {
          console.log(res);
          return Promise.reject(res);
        }
      })
      .catch(err => {
        console.log(err);
        if (showLoadingModal) {
          ApiConfig.DimissLoadingModal();
        }
        return ApiConfig.ErrorHandle(mod, data, err);
      });


  }



  //获取所有的广告
  public news(data, showLoadingModal: boolean = true) {
    var mod = 'common/news';
    var url = ApiConfig.getApiUrl() + mod;
    var headers = ApiConfig.GetHeader(url, data);
    let options = new RequestOptions({ headers: headers });

    let body = ApiConfig.ParamUrlencoded(data);

    let loading: Loading = null;
    if (showLoadingModal) {
      loading = ApiConfig.GetLoadingModal();
    }

    return this.http.post(url, body, options).toPromise()
      .then((res) => {
        if (ApiConfig.DataLoadedHandle(mod, data, res)) {
          if (showLoadingModal) {
            ApiConfig.DimissLoadingModal();
          }
          var retjson = res.json();
          console.log(retjson);
          return retjson;
        } else {
          console.log(res);
          return Promise.reject(res);
        }
      })
      .catch(err => {
        console.log(err);
        if (showLoadingModal) {
          ApiConfig.DimissLoadingModal();
        }
        return ApiConfig.ErrorHandle(mod, data, err);
      });


  }


}
