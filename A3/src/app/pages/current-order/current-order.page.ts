import { Component, OnInit } from '@angular/core';
import { ManagerService } from './../../services/manager.service';
import { PizzaService } from './../../services/pizza.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.page.html',
  styleUrls: ['./current-order.page.scss'],
})
export class CurrentOrderPage implements OnInit {

  
  constructor(private managerService:ManagerService) { }

  ngOnInit() {
    //console.log("CurrentOrderPage init test: "+this.managerService.totalCost);//it works!
  }

  //alert asking the user if they want to delete the item from the order //add to manager: deletePizza(pizza){currentOrder.Remove(pizza)}
  itemClicked(pizza: PizzaService){

  }

  //call 
  placeOrderClicked(){

  }

}
