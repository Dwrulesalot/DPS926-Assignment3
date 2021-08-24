import { Component } from '@angular/core';
import { ManagerService } from './../services/manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currentItems; //will need to wipe this when making a new page - or handle this in manager?

  constructor(private managerService: ManagerService) {}

}
