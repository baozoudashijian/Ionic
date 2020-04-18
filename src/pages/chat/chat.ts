import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chatdetailsPage: any;
  userinfo: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // 以另一种方式，跳转页面以及传递参数
    this.userinfo = {
      userid: '1787009',
      username: '冯提莫'
    }
    this.chatdetailsPage = ChatdetailsPage;
  }

}
