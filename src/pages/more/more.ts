import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';
import { UserdatalistPage } from '../userdatalist/userdatalist';
import { SettingsProvider } from '../../providers/settings/settings';
import { ScanPage } from '../scan/scan';
import { VersionPage } from '../version/version';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userinfo: string[];
  selectedTheme: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public storage: Storage,public loadingCtrl: LoadingController,public rest: RestProvider,public settings: SettingsProvider) {
    super();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MorePage');
  // }
  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    // 解决了第一次登陆后不刷新父页面的问题
    modal.onDidDismiss(()=>{
      this.loadUserPage();
    })
    modal.present();
  }
  ionViewDidLoad() {
    this.loadUserPage();
  }
  loadUserPage() {
    this.storage.get('UserId').then((val)=>{
      if(val!=null){
        var loading = super.showLoading(this.loadingCtrl,'加载中...');
        this.rest.getUserInfo(val)
        .subscribe(
          userinfo => {
            this.userinfo = userinfo;
            this.headface = userinfo['UserHeadface'] + "?" + (new Date()).valueOf();/* 防止缓存 */
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          }
        )
        
      }else{
        this.notLogin = true;
        this.logined = false;
      }
    })
  }

  gotoDataList(type) {
    this.navCtrl.push(UserdatalistPage,{ "dataType": type});
  }
  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }
  // 切换夜间模式
  toggleChangeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    }else{
      this.settings.setActiveTheme('dark-theme');
    }
  }
  // 扫描二维码
  gotoScanQRCode() {
    // 加上这个animate参数，不然相机会加载不出来；
    this.navCtrl.push(ScanPage,null,{"animate":false})
  }
  // 版本信息
  gotoVersion() {
    this.navCtrl.push(VersionPage);
  }
}
