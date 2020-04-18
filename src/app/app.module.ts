import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { HeadfacePage } from '../pages/headface/headface';
import { QuestionPage } from '../pages/question/question';
import { DetailsPage } from '../pages/details/details';
import { AnswerPage }  from '../pages/answer/answer';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { UserdatalistPage } from '../pages/userdatalist/userdatalist';
import { ScanPage } from '../pages/scan/scan';
import { VersionPage } from '../pages/version/version';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ComponentsModule } from '../components/components.module';
import { SettingsProvider } from '../providers/settings/settings';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdatalistPage,
    ScanPage,
    VersionPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回'
    }),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdatalistPage,
    ScanPage,
    VersionPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    QRScanner,
    AppVersion,
    File,
    Transfer,
    FilePath,
    Camera,
    EmojiProvider,
    SettingsProvider
  ]
})
export class AppModule {}
