import { Injectable } from '@angular/core';
import { PizzaService } from './../services/pizza.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  //lists of default values //need to access these from home to display/hold temp values of the pizza's topping&size choice
  pizzaToppingList = ["Pepperoni", "Mushrooms", "Banana Peppers", "Bell Peppers"];
  pizzaSizeList = ["Small", "Medium", "Large", "Extra-Large"];

  //holds the pizza's in the current pizzaOrder 
  pizzaOrder:PizzaService[];
  //holds all previously made orders (when adding to this be sure to save) 
  allOrders: ManagerService[];//holds an array of the manager which contains each order array //make sure that this works
  //if this doesn't work test with type any^^

  //holds total cost and total # of pizzas
  totalCost: number;
  totalPizzas: number;

  //dateTime of when the order is submitted (set when added to history/ order was submitted)
  dateTime:Date;

  constructor() { // I don't need private pizzaService: PizzaService
    this.totalCost = 0.0;//should I just do this above?
    this.totalPizzas = 0;
    this.pizzaOrder = [];//definitions
    this.allOrders = [];
  }
  
  //adds the pizza to the current order array
  addPizza(pza: PizzaService){
    this.pizzaOrder.push(pza);
    console.log(this.pizzaOrder);//console output to confirm pizza was added
  }

  //loops through each pizza in the order and adds each cost to this.totalCost and returns the value
  orderCostTotal(): number{
    this.totalCost = 0;

    for (let pizza of this.pizzaOrder){

      pizza.pizzaCost();
      this.totalCost += pizza.cost;
    }

    return this.totalCost;
  }

  //loops through each pizza in the order and adds the quantity of each pizza in the order to this.totalPizzas
  orderPizzaCountTotal(): number{
    this.totalPizzas = 0;

    for (let pizza of this.pizzaOrder){
      this.totalPizzas += pizza.quantity;
    }
    
    return this.totalPizzas;
  }
  //todo history cost total & history pizza count total as extra


  //sumbits the order to the history, setting the time and totalCost/totalPizzas 
  addToHistory(m: ManagerService){
    m.dateTime = new Date();//sets the date/time of the current order to the device's current date/time
    this.allOrders.push(m);
    console.log(this.allOrders);
  }
}
