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
  allOrders: any[];//holds an array of the manager which contains each order array //make sure that this works // this doesn't work as all manager services are the same
  //if this doesn't work test with type any^^

  //holds total cost and total # of pizzas for the current order
  totalCost: number;
  totalPizzas: number;

  //holds total cost and total # of pizzas of all Orders
  allOrderTotalCost: number;
  allOrderTotalPizzas: number;

  //dateTime of when the order is submitted (set when added to history/ order was submitted)
  dateTime:Date;

  //boolean that when true, makes the HomePage Reset values - used by MenuPage when clicking 'New Order'
  newOrderBool = false;

  constructor() {
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
    console.log('orderCostTotal: initial total cost: '+this.totalCost);
    this.totalCost = 0;

    for (let pizza of this.pizzaOrder){
      console.log("test");
      pizza.pizzaCost();
      this.totalCost += pizza.cost;
      console.log('orderCostTotal: for loop this.totalCost: '+this.totalCost);
      console.log('orderCostTotal: for loop pizza.cost: '+this.totalCost);
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
  //loops through each pizza in the allOrders array and adds each cost to this.allOrderTotalCost and returns the value
  historyCostTotal(): number{
    
    this.allOrderTotalCost = 0;

    for (let pizza of this.allOrders){
      
      this.allOrderTotalCost += pizza[1].cost;
    }

    return this.allOrderTotalCost;
  }

  //loops through each pizza in the allOrders array and adds the quantity of each pizza in the order to this.allOrderTotalPizzas
  historyPizzaCountTotal(): number{
    this.allOrderTotalPizzas = 0;

    for (let pizza of this.allOrders){
      this.allOrderTotalPizzas += pizza[2].pizzas;
    }
    
    return this.allOrderTotalPizzas;
  }

  //sumbits the order to the history, setting the time and totalCost/totalPizzas - then calls reset
  addToHistory(){
    this.dateTime = new Date();//sets the date/time of the current order to the device's current date/time

    this.allOrders.push([{date : this.dateTime}, {cost : this.totalCost}, {pizzas: this.totalPizzas}]);//pushes each var into the array and labels them so that they can be accessed later
    console.log('ManagerService: addToHistory- ', this.allOrders);

    this.resetCurrentOrder();//calls the below function, figured it'd be better to keep this functionality separate

  }

  //method called in addToHistory to reset pizzeOrder array, and cost/ pizza count values
  resetCurrentOrder(){
    console.log('ManagerService: resetCurrentOrder- ', this);
    this.pizzaOrder.forEach((p, index) => {
      this.pizzaOrder.splice(index);
   });
   this.orderPizzaCountTotal();
   this.orderCostTotal();
  
  }
  //loops through the pizza order and removes the corresponding pizza from the array
  deletePizza(pizza: PizzaService){
    console.log('Manager Sercive: deletePizza- ', pizza);

    this.pizzaOrder.forEach((p, index) => {
      if(p==pizza){
        this.pizzaOrder.splice(index, 1);//splice>delete as delete keeps the item in the array and sets it to undefined which i don't want
      }
   });
    
  }

}
