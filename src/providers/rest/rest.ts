import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";
  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";
  constructor(public http: Http) {
    // console.log('Hello RestProvider Provider');
  }
  // 在provide中定义的login，用于登录的验证，
  login(mobile,password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password="+ password)
  }
  // 在provide中定义注册
  register(mobile,nickname,password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile="+ mobile +"&nickname=" + nickname + "&password=" + password);
  }
  // 获取头像的方法
  getUserInfo(userId):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
  }
  // 更换昵称
  updateNickName(userId,nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid="+ userId + "&nickname=" + nickname)
  }
  // 提问的方法
  saveQuestion(userId,title,content): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
  }
  // 获取提问的信息方法
  getFeeds(): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlFeeds);
  }
  //获取提问回答的耳机页面的开发的
  getQuestion(id): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" +id);
  }
  // 判断用户是否关注了该问题
  getQuestionWithUser(questionId,userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?Id="+ questionId + "&userid="+ userId);
  }
  // 处理关注的方法
  saveFavourite(questionId,userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionId=" + questionId + "&userid=" + userId);
  }
  // 回答问题的方法
  answer(userId,questionId,content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer+"?userid="+ userId +"&questionid="+ questionId + "&content=" + content);
  }
  // 发现页面的提问方法
  getQuestions(): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlQuestionList);
  }
  // 通知页面的方法
  getUserNotifications(userId): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUserNotifications + "?userid=" + userId);
  }
  // more页面的个人中心
  getUserQuestionList(userId,type): Observable<string[]> {
    return this.getUrlReturn(this.apiGetUserQuestionList + "?userid=" + userId + "&type=" + type);
  }

  private getUrlReturn(url:string): Observable<string[]>{
    return this.http.get(url)
    .map(this.extractData)
    .catch(this.handleError)
  }
  private extractData(res:Response){
    let body = res.json();
    return JSON.parse(body) || {};
  }
  private handleError(error:Response | any){
    let errMsg: string;
    if(error instanceof Response) {
      let body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
    
  }

}
