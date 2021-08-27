import { Component } from '@angular/core';
import { ManagerService } from './../../services/manager.service';
import { PizzaService } from './../../services/pizza.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage {

  constructor(private managerService:ManagerService, public alertController: AlertController) { }

  //shows alert asking the user if they want to delete the item from the order if yes then call deletePizza(pizza) from manager
  async itemClicked(pizza: PizzaService){
    console.log('CurrentOrder: itemClicked');
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Deletion!',
      message: 'You are about to delete these pizzas from the current pizza order, are you sure you want to do this?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('CurrentOrder: Cancelled Deletion');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.managerService.deletePizza(pizza);//pizza deletion happens here

            console.log('CurrentOrder: Confirmed Deletion');
          }
        }
      ]
    });

    await alert.present();
  }

  //call add to history and clear current order + alert
  async placeOrderClicked(){
        
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Order!',
      subHeader: '',
      message: 'Thank you for your order! Your total is: $'+this.managerService.totalCost+' for a total of '+this.managerService.totalPizzas+' pizzas',
      buttons: ['OK']
    });

    console.log('CurrentOrder: placeOrderClicked-  ',this.managerService);
    
    this.managerService.addToHistory();
    await alert.present();
    
    

  }


}
