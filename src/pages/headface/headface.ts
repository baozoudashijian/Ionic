import { Component } from '@angular/core';
import {  NavController, NavParams,ActionSheetController,Platform, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
// 导入四个操作native的组件
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera'; 

declare var cordova: any;/* 导入第三方库，定义到TS文件的中 */
/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  userId: string;
  errorMessage: string;
  lastImage: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, public storage: Storage,public camera: Camera,public transfer: Transfer,public file: File, public filePath: FilePath,public platform: Platform,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public viewCtrl: ViewController) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val)=>{
      if (val != null) {
        this.userId = val;
      }
    })
  }
  // 点击选择图片弹出actionSheet组件
  selectActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [{
        text: '从图库中选择',
        handler: ()=>{
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
    {
      text: '使用相机',
      handler: ()=>{
        this.takePicture(this.camera.PictureSourceType.CAMERA);
      }
    },
{
  text: '取消',
  role: 'cancel',
  handler: ()=>{}
}]
    })
  actionSheet.present();
  }
// 相机操作等代码
takePicture(sourceType) {
// 定义相机的一些参数
var options = {
  quality: 100,
  sourceType: sourceType,
  saveToPhotoAlbum: false,
  correctOrientation: true
};
this.camera.getPicture(options).then((imagePath)=>{
  // 特别处理android平台文件路径的问题
  if (this.platform.is('android') && this.camera.PictureSourceType.PHOTOLIBRARY) {
    this.filePath.resolveNativePath(imagePath)/* 获取android平台下的真是路径 */
    .then(filePath=>{
      // 获取正确的路径
      let correctPath = filePath.substr(0,filePath.lastIndexOf('/')+1);
      // 获取正确的文件名
      let currectName = imagePath.substr(imagePath.lastIndexOf('/')+1,imagePath.lastIndexOf('?'));
      this.copyFileToLocalDir(correctPath,currectName,this.createFileName());

    })

  }else{
    let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/')+1);
    let currectName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    this.copyFileToLocalDir(correctPath,currectName,this.createFileName());
  }
},(err) => {
  super.showToast(this.toastCtrl,"选择图片出现错误，请在APP中操作");
})
}
copyFileToLocalDir(namePath,currentName,newFileName) {
  this.file.copyFile(namePath,currentName,cordova.file.dataDirectory,newFileName).then(success=>{
    this.lastImage = newFileName;
  },error=>{
    super.showToast(this.toastCtrl,'存储图片到本地失败');
  });

}
createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName = n + ".jpg";
  return newFileName

}

// 图片上传
pathForImage(img) {
  if (img == null) {
    return "";
  }else {
    return cordova.file.dataDirectory + img;
  }
}

uploadImage() {
  var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
  var targetPath = this.pathForImage(this.lastImage);
  var filename = this.userId + ".jpg";
  // 上传的参数
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params: {"fileName":filename,"userid":this.userId}
  };

  const fileTransfer: TransferObject = this.transfer.create();
  var loading = super.showLoading(this.loadingCtrl,"上传中...");

  // 开始正式上传
  fileTransfer.upload(targetPath,url,options).then(data => {
    loading.dismiss();
    super.showToast(this.toastCtrl,"图片上传成功。");
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 3000);
  },err => {
    loading.dismiss();
    super.showToast(this.toastCtrl,"图片上传发生错误，请重试。");
  })
}
}
