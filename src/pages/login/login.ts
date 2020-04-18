import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {
  // 定义属性获取用户在输入框输入的数据，双向数据绑定
  public mobile: any;
  public password: any;
  public errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public loadingCtrl: LoadingController,public rest: RestProvider,public toastCtrl: ToastController,public storage: Storage) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // 关闭掉modal
  dismiss() {
    this.viewCtrl.dismiss();
  }
  // 点击登录
  login() {
    var loading = super.showLoading(this.loadingCtrl,"登录中...");
    this.rest.login(this.mobile,this.password)
    .subscribe(
      f => {
        if (f["Status"] == "OK") {
          // 处理登录成功的跳转
          this.storage.set('UserId',f["UserId"]);
          loading.dismiss();
          this.dismiss();
        }else{
          loading.dismiss();
          super.showToast(this.toastCtrl,f["StatusContent"]);
        }
      },
      error => this.errorMessage = <any>error
    )
  }
  // 跳转到注册界面
  register() {
    this.navCtrl.push(RegisterPage);
  }

}
