import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AnswerPage } from '../answer/answer';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {
  id: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavourite: any;
  userId: string;
  isMyQuestion: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest: RestProvider,public loadingCtrl: LoadingController,public storage: Storage,public toastCtrl: ToastController,public modalCtrl: ModalController) {
    super();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }
  // 加载评论
  loadQuestion(id) {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl, '加载中...');
        this.rest.getQuestionWithUser(id,val)
          .subscribe(
            q => {
              this.question = q;
              this.answers = q["Answers"];
              this.isFavourite = q["IsFavourite"];
              this.isMyQuestion = (q["OwnUserId"] == val);
              loading.dismiss();
            },
            error => this.errorMessage = <any>error
          )
      }
    })
    
  }
  // 关注的逻辑开发
  saveFavourite() {
    var loading =  super.showLoading(this.loadingCtrl,"请求中...");
    this.rest.saveFavourite(this.id,this.userId)
    .subscribe(
      f => {
        if(f["Status"] == "OK"){
          loading.dismiss();
          super.showToast(this.toastCtrl,this.isFavourite ? "取消关注成功" : "关注问题成功");
          this.isFavourite = !this.isFavourite;
        }
      },
      error => this.errorMessage = <any>error
    )
  }
// 去到回答问题的界面
showAnswerPage() {
  let modal = this.modalCtrl.create(AnswerPage,{id : this.id});
  modal.onDidDismiss(() => {
    this.loadQuestion(this.id);
    
  })
  modal.present();
}
}
