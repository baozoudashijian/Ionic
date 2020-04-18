import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { HeadfacePage } from '../headface/headface';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  headface: string;
  nickname: string;
  errorMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public loadingCtrl: LoadingController,public rest: RestProvider,public toastCtrl: ToastController,public viewCtrl: ViewController) {
    super();
  }
  ionViewDidEnter() {
    this.loadUserPage();
  }
  // 加载信息
  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl,'加载中...');
        this.rest.getUserInfo(val)
        .subscribe(
          userinfo => {
            this.nickname = userinfo['UserNickName'];
            this.headface = userinfo['UserHeadface'] + '?' + (new Date()).valueOf();
            loading.dismiss();
          }
        )
      }
    })
  }
  // 修改用户昵称
  updateNickName() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl,"修改中...");
        this.rest.updateNickName(val, this.nickname)
        .subscribe(
          f => {
            if (f['Status'] == "OK") {
              loading.dismiss();
              super.showToast(this.toastCtrl,"昵称修改成功");
              this.viewCtrl.dismiss();
            }else{
              loading.dismiss();
              super.showToast(this.toastCtrl,f['StatusContent'])
            }
          },
          error => this.errorMessage = <any>error
        )
      }
    })
  }
  // 注销
  logout() {
    this.storage.remove('UserId');
    this.viewCtrl.dismiss();
  }
  // 切换到修改头像的界面
  gotoHeadface() {
    this.navCtrl.push(HeadfacePage);
  }
}
