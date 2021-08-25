import { Component } from '@angular/core';
import { ManagerService } from './../services/manager.service';
import { PizzaService } from './../services/pizza.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentPizza: PizzaService; //will need to wipe this when making a new order - or handle this in manager?
  url = "https://www.pngkey.com/png/full/140-1401618_pizza-planet-logo-pizza-planet-toy-story-logo.png";

  

  constructor(private managerService: ManagerService, public alertController: AlertController) {
    this.currentPizza = new PizzaService(0, "N/A", "N/A");//this is the base display
  }

  //method that handles number clicks, changing currentPizza.quantity
  numberClicked(n:number){
    if(this.currentPizza.quantity>99){//if the quantity is triple digit
      //alert
    }
    else if(this.currentPizza.quantity === 0){
      this.currentPizza.quantity = n;//if quantity is currently 0 change to the inputted number
    }
    else{
      //concats the number clicked to the currentPizza.quantity
      this.currentPizza.quantity *= 10;//pushes the number one space ie 69 -> 690
      this.currentPizza.quantity += n;//puts n at the end of the number ie 690 -> 695
    }
  } 

  //resets this.currentPizza to base display
  resetClicked(){
    this.currentPizza = new PizzaService(0, "N/A", "N/A");
  }

  //alerts fail/sucess, if sucess sends this.currentPizza to the manager
  async buyClicked(){
    console.log("buyClicked");
    if(this.currentPizza.quantity===0){//if the quantity isn't selected
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        subHeader: '',
        message: 'Please select a Quantity.',
        buttons: ['OK']
      });

      await alert.present();

    }
    else if(this.currentPizza.size ==="N/A"){//if the siz isn't selected
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        subHeader: '',
        message: 'Please select a Pizza Size.',
        buttons: ['OK']
      });
      
      await alert.present();

    }
    else if(this.currentPizza.topping ==="N/A"){//if the topping isn't selected
     
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        subHeader: '',
        message: 'Please select a Pizza Topping.',
        buttons: ['OK']
      });
      
      await alert.present();

    }
    else{//if all have been selected 
      
      this.managerService.pizzaOrder.push(this.currentPizza);//pushes this pizza to the current pizza order in manager

      this.currentPizza.pizzaCost(); //updates the pizza 'cost' with the currentPizza variables
      this.managerService.orderCostTotal(); //updates the order total cost

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Success!',
        subHeader: '',
        message: 'Your '+this.currentPizza.quantity+' Pizzas, totalling: $' + this.currentPizza.cost +', have been added to your order. Your current order total is: $'+this.managerService.totalCost,
        buttons: ['OK']
      });

      
      this.resetClicked();//resets the current page

      await alert.present();

    }
  }

  //handler for when a topping is clicked from the topping list
  toppingClicked(t:string){
    this.currentPizza.topping=t;
  }

  //handler for when a size is clicked from the size list
  sizeClicked(s:string){
    this.currentPizza.size=s;
  }
}
