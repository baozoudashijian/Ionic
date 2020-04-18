import { Component } from '@angular/core';
import { NavController,ModalController,Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  feeds: string[];
  errorMessage: string;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public loadingCtrl: LoadingController,public rest: RestProvider) {
    super();
  }
  ionViewDidLoad() {
    this.getFeeds();
  }
  // 打开提问的模态框
  gotoQuestion() {
    let modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }
  // 点击图标跳转到tab聊天的tab页面
  gotoChat() {
    this.selectTab(2);
  }
  selectTab(index: number) {
    var t: Tabs = this.navCtrl.parent;
    t.select(index);
  }
  // 获取后台的提问，回答的信息
  getFeeds() {
    var loading = super.showLoading(this.loadingCtrl,'用户数据加载中...');
    this.rest.getFeeds()
    .subscribe(
      f => {
        this.feeds = f;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error
    )
  }
  // 点击提问进入到详情页
  gotoDetails(questionId) {
    // 跳转的时候传递参数带下一个页面
    this.navCtrl.push(DetailsPage,{id : questionId})
  }
}
