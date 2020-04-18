import { Loading, LoadingController, ToastController, Toast } from 'ionic-angular';

export abstract class BaseUI {
    constructor() {
        
    }
    // 定义弹框
    protected showLoading(loadingCtrl: LoadingController,message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }
    // 定义一个toast
    protected showToast(toastCtrl: ToastController,message: string):Toast{
        let toast = toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        })
        toast.present();
        return toast;
    }
}