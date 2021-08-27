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

  currentPizza: PizzaService; 
  url = "https://www.pngkey.com/png/full/140-1401618_pizza-planet-logo-pizza-planet-toy-story-logo.png";

  

  constructor(public managerService: ManagerService, public alertController: AlertController) {
    this.currentPizza = new PizzaService(0, "N/A", "N/A");//base display
  }

  //checks if New Order button has been clicked, if so, reset selected values to base and change the bool in manager back to false
  ngAfterViewChecked(){
    console.log("Home Page: ngAfterViewChecked() -  "+this.managerService.newOrderBool);
    if(this.managerService.newOrderBool){
      this.resetClicked();
      this.managerService.newOrderBool = false;
    }
  }

  //method that handles when a number is clicks, changing currentPizza.quantity
  async numberClicked(n:number){
    //if the quantity is triple digit
    if(this.currentPizza.quantity>99){
        const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error!',
        subHeader: '',
        message: 'The maximum number of pizzas you can order is 999.',
        buttons: ['OK']
      });

      await alert.present();
    }
    
    else if(this.currentPizza.quantity === 0){
      this.currentPizza.quantity = n;
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

  //checks if quantity, size and topping have been selected displaying an appropriate display 
  async buyClicked(){
    console.log("buyClicked");
    //if the quantity isn't selected
    if(this.currentPizza.quantity===0){
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        subHeader: '',
        message: 'Please select a Quantity.',
        buttons: ['OK']
      });

      await alert.present();

    }
    //if the size isn't selected
    else if(this.currentPizza.size ==="N/A"){
      
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        subHeader: '',
        message: 'Please select a Pizza Size.',
        buttons: ['OK']
      });
      
      await alert.present();

    }
    //if the topping isn't selected
    else if(this.currentPizza.topping ==="N/A"){
     
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert!',
        subHeader: '',
        message: 'Please select a Pizza Topping.',
        buttons: ['OK']
      });
      
      await alert.present();

    }
    //if all have been selected 
    else{
      //pushes this pizza to the current pizza order in manager
      this.managerService.pizzaOrder.push(this.currentPizza);

      this.currentPizza.pizzaCost(); 
      this.managerService.orderCostTotal();
      this.managerService.orderPizzaCountTotal();
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Success!',
        subHeader: '',
        message: 'Your '+this.currentPizza.quantity+' Pizzas, totalling: $' + this.currentPizza.cost +', have been added to your order. Your current order total is: $'+this.managerService.totalCost,
        buttons: ['OK']
      });

      
      this.resetClicked();

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
