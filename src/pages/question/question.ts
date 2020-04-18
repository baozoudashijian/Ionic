import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {
  title: any;
  content: any;
  errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public storage: Storage,public rest: RestProvider,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    super();
  }

  // modal的关闭按钮
  dismiss() {
    this.viewCtrl.dismiss();
  }
  // 提交问题的方法
  submitQuestion() {
    // 在web中获取存贮的东西一定要看清大小写
    this.storage.get('UserId').then((val) => {
      if(val != null) {
        var loading = super.showLoading(this.loadingCtrl,'发表中...');
        this.rest.saveQuestion(val,this.title,this.content)
        .subscribe(
          f => {
            if(f['Status'] == 'OK') {
              loading.dismissAll();
              this.dismiss();
            }else{
              loading.dismissAll();
              super.showToast(this.toastCtrl,f['StatusContent']);
            }
          },
          error => this.errorMessage = <any>error
        )
      }else{
        super.showToast(this.toastCtrl,'请登录后在提问！！！');
      }
      console.log(val);
    })
  }

}
