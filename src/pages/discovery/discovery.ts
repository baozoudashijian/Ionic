import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';
/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  questions: string[];
  errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider,public loadingCtrl:LoadingController,public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }
  getQuestions() {
    var loading = super.showLoading(this.loadingCtrl,"加载中...");
    this.rest.getQuestions()
    .subscribe(
      q => {
        this.questions = q;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error
    )
  }
  // 刷新的组件
  doRefresh(refresher) {
    this.getQuestions();
    refresher.complete();
  }
  // 发现页去详情页
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage,{id : questionId});
  }
}
