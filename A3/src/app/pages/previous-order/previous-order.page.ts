import { Component} from '@angular/core';
import { ManagerService } from './../../services/manager.service';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.page.html',
  styleUrls: ['./previous-order.page.scss'],
})
export class PreviousOrderPage {

  constructor(private managerService:ManagerService) { }
    
}
