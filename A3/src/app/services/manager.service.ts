import { Injectable } from '@angular/core';
import { PizzaService } from './../services/pizza.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  //lists of default values //need to access these from home to display/hold temp values of the pizza's topping&size choice
  pizzaToppingList = ["Pepperoni", "Mushrooms", "Banana Peppers", "Bell Peppers"];
  pizzaSizeList = ["Small", "Medium", "Large", "Extra-Large"];

  //holds the current pizzaOrder values //maybe make of type Pizza?
  pizzaOrder;
  //holds all previously made orders (when adding to this be sure to save) //maybe make of type array of Pizza objects?
  allOrders;

  //holds total cost and total # of pizzas
  totalCost: number;
  totalPizzas: number;

  constructor() { 
    this.totalCost = 0.0;//should I just do this above?
    this.totalPizzas = 0;
  }

  // getTotalCost(): Promise<any>{//if I have access to the manager class I can already do all of this
  //   return this.totalCost;
  // }
  // setTotalCost(tc:Number){
  //   this.totalCost = tc;
  // }
  // getTotalPizzas(): Promise<any>{
  //   return this.totalCost;
  // }
  // setTotalPizzas(tp:Number){
  //   this.totalPizzas = tp;
  // }

}
