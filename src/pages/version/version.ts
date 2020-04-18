import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the VersionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-version',
  templateUrl: 'version.html',
})
export class VersionPage {

  AppName: string;
  AppPackage: string;
  VersionCode: string;
  VersionNumber: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    this.appVersion.getAppName().then(val => {
      this.AppName = val;
    });
    this.appVersion.getPackageName().then(val => {
      this.AppPackage = val;
    });
    this.appVersion.getVersionCode().then(val => {
      this.VersionCode = val;
    });
    this.appVersion.getVersionNumber().then(val => {
      this.VersionNumber = val;
    });
  }

}
