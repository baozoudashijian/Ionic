import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  notificationList: string[];
  errorMessage: any;
  isNotification: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public loadingCtrl: LoadingController,public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if(val != null) {
        var loading = super.showLoading(this.loadingCtrl,'加载中...');
        this.rest.getUserNotifications(val)
        .subscribe(
          n => {
            this.notificationList = n;
            this.isNotification = true;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error
        )
      }
    })
  }
  // 去向详情页
  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId })
  }

}
