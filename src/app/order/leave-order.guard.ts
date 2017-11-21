import { ActivatedRoute } from '@angular/router/src/router_state';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { OrderComponent } from './order.component';


export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

    canDeactivate(orderComponent: OrderComponent,
                  activatedRoute: ActivatedRouteSnapshot,
                  routerState: RouterStateSnapshot):boolean {
        if(!orderComponent.isOrderCompleted()) {
           return window.confirm('Deseja desistir da compra ?')
        }else {
           return true; 
        }            
    }
}