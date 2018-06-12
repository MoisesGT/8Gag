import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';

@Injectable()
export class CargaArchivoProvider {

  constructor(private toastCtrl: ToastController) {

  }

  cargar_image_firebase(archivo: ArchivoSubir) {

    let promesa = new Promise((resolve, reject) => {
      this.mostrar_toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = 
          storeRef.child(`img/${nombreArchivo}`)
                  .putString(archivo.img, 'base64', { contentType: 'image/jpeg'});
          
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          
            () =>{}, //Saber el % de cuantos MB se han subido 
            (error) =>{
                
                //Manejo de error
                console.log("ERROR EN LA CARGA");
                console.log(JSON.stringify(error));
                this.mostrar_toast(JSON.stringify(error));
                reject();
            },
            () =>{

              //TODO BIEN!
              console.log("Archivo subido");
              this.mostrar_toast("Imagen cargada correctamente!");  

              resolve();

            }

          )
    });

    return promesa;

  }

  mostrar_toast(mensaje:string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    }).present();
  }



}

interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}