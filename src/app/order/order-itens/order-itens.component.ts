import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-itens',
  templateUrl: './order-itens.component.html'

})
export class OrderItensComponent implements OnInit {

  @Input() items : CartItem[]

  @Output() increaseQuantity = new EventEmitter<CartItem>()
  @Output() decreaseQuantity = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }


  emitterIncreaseQuantity(item: CartItem) {
    this.increaseQuantity.emit(item);
  }
  emitterDecreaseQuantity(item: CartItem) {
    this.decreaseQuantity.emit(item);
  }
  emitterRemove(item: CartItem) {
    this.remove.emit(item);
  }


}
