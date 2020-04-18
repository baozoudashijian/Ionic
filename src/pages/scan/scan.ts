import { Component } from '@angular/core';
import {  NavController, NavParams,AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public qrScanner: QRScanner) {
  }

  ionViewDidEnter() {
    this.scanQRCode();
  }
  // 实现二维码扫描
  scanQRCode() {
    this.qrScanner.prepare()
    .then((status:QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe ((text:string)=>{
          let alert = this.alertCtrl.create({
            title: "二维码内容",
            subTitle: text,
            buttons:['OK']
          });
          alert.present();
          scanSub.unsubscribe();
        });
        this.qrScanner.show();
      }else if(status.denied){
        // 提醒用户权限没有开
      }else{

      }
    })
    .catch((e:any)=>console.error('Error :',e));
  }
}
