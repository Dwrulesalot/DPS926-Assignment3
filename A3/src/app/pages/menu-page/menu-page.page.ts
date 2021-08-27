import { Component, OnInit } from '@angular/core';
import { ManagerService } from './../../services/manager.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.page.html',
  styleUrls: ['./menu-page.page.scss'],
})
export class MenuPagePage implements OnInit {

  constructor(private managerService:ManagerService) { }

  ngOnInit() {
  }

  //Changes boolean in the manager service which is then caught by home.page in ngOnChanges() and will reset the values
  newOrderClicked(){
    this.managerService.newOrderBool = true;
    console.log(this.managerService.newOrderBool);
  }
}
