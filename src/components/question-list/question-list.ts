import { Component, Input } from '@angular/core';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController } from 'ionic-angular';
import { DetailsPage } from '../../pages/details/details';
/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI {

  questions: string[];
  errorMessage: any;

  @Input('dataType') dataSourceType;
  constructor(public storage: Storage,public rest: RestProvider,public loadingCtrl: LoadingController,public navCtrl: NavController) {
    super();
  }

  ngAfterContentInit() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl,'加载中...');
        this.rest.getUserQuestionList(val,this.dataSourceType)
        .subscribe(
          q => {
            this.questions = q;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error
        )
      }
    })
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId })
  }

}
