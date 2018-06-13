import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';

//import { AngularFireDatabase } from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';
import { SocialSharing } from '@ionic-native/social-sharing';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //posts: Observable<any[]>;
  moreData:boolean = true;

  constructor(private modalCtrl:ModalController,
              private _cap:CargaArchivoProvider,
              private socialSharing: SocialSharing) {  
    //this.posts = afDB.list('post').valueChanges();

  }

  mostrar_modal(){
    let modal =this.modalCtrl.create(SubirPage);
    modal.present();
  }
  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this._cap.cargar_imagenes().then(
      (moreData:boolean) =>{
        console.log(moreData);
        this.moreData=moreData;

        infiniteScroll.complete()
      }
      
    )
  }

  share_facebook(post:any){
    this.socialSharing.shareViaFacebook(post.titulo,post.img,post.img).then(() =>{
      console.log(post + " Compartido en Facebook");
    }).catch(
      (error) =>{
        console.log(error);
      }
    )
  }

}
