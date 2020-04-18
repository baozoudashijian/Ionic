import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController,LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {
  public mobile: any;
  public nickname: any;
  public password: any;
  public confirmPassword: any;
  public errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public rest: RestProvider, public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  dismiss() {
    this.navCtrl.pop();
  }
  doRegister() {
    if(!(/^1[34578]\d{9}$/.test(this.mobile))){
      super.showToast(this.toastCtrl,"您的手机号码格式不正确。")
    }else if(this.nickname.length < 3 || this.nickname.length > 10){
      super.showToast(this.toastCtrl,"昵称长度应该在 3 ~ 10 位之间")
    }else if(this.password.length < 6 || this.password.length > 20){
      super.showToast(this.toastCtrl,"密码的长度应该在 6 ~ 20 位之间。")
    }else if(this.password != this.confirmPassword) {
      super.showToast(this.toastCtrl,"两次输入密码不一致")
    }else{
      var loading = super.showLoading(this.loadingCtrl,'注册...');
      this.rest.register(this.mobile,this.nickname,this.password)
      .subscribe(
        f => {
          if(f["Status"]=="OK") {
            super.showToast(this.toastCtrl,'注册成功')
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
  }

}
