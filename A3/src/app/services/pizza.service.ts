import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {//Technically should name this PizzaOrderService cuz it holds a whole order's info but meh

  //all the values a pizza must have
  quantity:number;
  topping:string;
  size:string;
  cost:number;

  //constructor taking the order
  constructor(q:number, t:string, s:string) { 
    this.quantity = q;
    this.topping = t;
    this.size = s;
    this.pizzaCost();// calculates cost of the pizza right away and sets this.cost
  }

  //sets/calculates the pizza cost based on the quantity, topping, and size
  pizzaCost(){
    
    this.cost = 0.0;

    if (this.size.toString() === "Small")
    {
      this.cost +=  7.99;
    }
    else if (this.size.toString() === "Medium")
    {
      this.cost += 9.49;
    }
    else if (this.size.toString() === "Large")
    {
      this.cost += 11.99;
    }
    else if (this.size.toString() === "Extra-Large")
    {
      this.cost += 14.99;
    }
    else//therefore it's "N/A"
    {
      //cost is already 0.0
    }
    if (this.topping.toString() === "Pepperoni")
    {
      this.cost += 2.0;
    }
    else if (this.topping.toString() === "Mushrooms")
    {
      this.cost += .75;
    }
    else if (this.topping.toString() === "Banana Peppers")
    {
      this.cost += 1.5;
    }
    else if (this.topping.toString() === "Bell Peppers")
    {
      this.cost += 1.5;
    }
    else//therefore it's "N/A"
    {
      //cost is already 0.0
    }

    //at this point cost = the price of 1 pizza with this.size & this.topping
    this.cost *=this.quantity;//multiplying cost of one pizza by the quantity of pizzas
    
  }
}
