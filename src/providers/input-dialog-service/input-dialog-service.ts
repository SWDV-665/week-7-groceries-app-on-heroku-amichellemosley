import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { AlertController, ModalController } from 'ionic-angular';



@Injectable()
export class InputDialogServiceProvider {
  modalPage;
  constructor(public dataService: GroceriesServiceProvider, public alertCtrl: AlertController, public modalCtrl : ModalController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  public openModal(item?, index?) {
    console.log('Open');
    var data = {
      modalTitle: item ? 'Edit Item' : 'Add Item',
      modalMessage : item ? 'Please edit item' : 'Please enter item',
      name : item ? item.name : null,
      quantity : item ? item.quantity : null,
      _id : item ? item._id : null,
    };
    this.modalPage = this.modalCtrl.create('ModalPage', data);
    this.modalPage.onDidDismiss(returnedDataFromModal => {
      if(returnedDataFromModal!=undefined) {
        if(index !== undefined) {
          this.dataService.editItem(returnedDataFromModal, index);
        } else {
          this.dataService.addItem(returnedDataFromModal);
        }
      }
    });
    this.modalPage.present();
  }}
