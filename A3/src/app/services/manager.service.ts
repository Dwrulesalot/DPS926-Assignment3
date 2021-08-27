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
  allOrders: any[];//todo in future - make this data persist

  //holds total cost and total # of pizzas for the current order
  totalCost: number;
  totalPizzas: number;

  //holds total cost and total # of pizzas of all Orders
  allOrderTotalCost: number;
  allOrderTotalPizzas: number;

  //dateTime of when the order is submitted 
  dateTime:Date;

  //boolean that when true, makes the HomePage Reset values
  newOrderBool = false;

  constructor() {
    this.totalCost = 0.0;
    this.totalPizzas = 0;
    this.pizzaOrder = [];
    this.allOrders = [];
  }
  
  //adds the pizza to the current order array
  addPizza(pza: PizzaService){
    this.pizzaOrder.push(pza);
  }

  //loops through each pizza in the order and adds each cost to this.totalCost and returns the value
  orderCostTotal(): number{
    console.log('orderCostTotal: initial total cost: '+this.totalCost);
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

    this.dateTime = new Date();

    //pushes each var into the array and labels them so that they can be accessed by ionic/in the html
    this.allOrders.push([{date : this.dateTime}, {cost : this.totalCost}, {pizzas: this.totalPizzas}]);
    console.log('ManagerService: addToHistory- ', this.allOrders);

    this.resetCurrentOrder();

  }

  //Resets the pizzaOrder array, aswell as cost/pizza count values
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
        this.pizzaOrder.splice(index, 1);
      }
   });
   this.orderPizzaCountTotal();
   this.orderCostTotal();
   this.historyCostTotal();
   this.historyPizzaCountTotal();
  }

}
