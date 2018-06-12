import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string;
  imagenPreview:string;
  imagen64:string;

  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              public _cap:CargaArchivoProvider) {
  }

  cerrar_modal() {
    this.viewCtrl.dismiss();
  }

  mostrar_camara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64=imageData;
    }, (err) => {
      // Handle error
      console.log("ERROR EN CAMARA", JSON.stringify(err));
    });
  }

  seleccionar_foto(){

    let opciones: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:2
    }
    
    this.camera.getPicture(opciones).then((result) => {
    this.imagenPreview = 'data:image/jpeg;base64,' + result;
    this.imagen64=result;
    }, (err) => { 

      console.log("Error en camara: " , JSON.stringify(err));
      
    });  

  }

  crear_post(){
    
    let archivo = {
      img:this.imagen64,
      titulo: this.titulo
    }

    this._cap.cargar_image_firebase(archivo);

  }

}
