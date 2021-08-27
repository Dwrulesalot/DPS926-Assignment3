import { Component } from '@angular/core';
import { ManagerService } from './../../services/manager.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.page.html',
  styleUrls: ['./menu-page.page.scss'],
})
export class MenuPagePage {

  constructor(private managerService:ManagerService) { }

  //Changes boolean signalling a reset to base values on the current order page
  newOrderClicked(){
    this.managerService.newOrderBool = true;
    console.log(this.managerService.newOrderBool);
  }
}
