import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  quantity:number;
  topping:string;
  size:string;
  cost:number;

  constructor(q:number, t:string, s:string) { 
    this.quantity = q;
    this.topping = t;
    this.size = s;
    this.pizzaCost();
  }

  //sets&calculates the pizza cost based on the size, topping, and multiplies it by the quantity
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
    
    this.cost *=this.quantity;
    
  }
}
