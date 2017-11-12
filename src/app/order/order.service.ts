import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service';
import { LoginService } from '../security/login/login.service'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

import { Order , OrderItem } from '../order/order.model';

import { MEAT_API } from '../app.api';

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService ,
                private http: HttpClient,
                private loginService: LoginService){}


    cartItems() : CartItem[] {
        return this.cartService.items
    }
    increaseQuantity(item: CartItem) {
        this.cartService.increaseQuantity(item)
    }
    decreaseQuantity(item: CartItem) {
        this.cartService.decreaseQuantity(item)
    }
    remove(item: CartItem) {
        this.cartService.removeItem(item)
    }
    itemsValue(): number {
        return this.cartService.total()
    }
    checkOrder(order: Order):Observable<String>{
      let headers = new HttpHeaders()
      if(this.loginService.isLoggedIn()) {
        headers = headers.set('Authorization',`Bearer ${this.loginService.user.accessToken}`)
      }

        return this.http.post<Order>(`${MEAT_API}/orders`,order , {headers: headers})
        .map(order => order.id)
    }
    clear() {
        this.cartService.clear();
    }


}
