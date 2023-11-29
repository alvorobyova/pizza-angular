import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  constructor(private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  formValues = {
    productTitle: '',
    address: '',
    phone: ''
  }

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  ngOnInit(): void {
    // if (this.cartService.product) this.formValues.productTitle = this.cartService.product;

    // Подписка на Observable
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.productTitle = params['product'];
      }
    })

    // Snapshot
    // const productParam = this.activatedRoute.snapshot.queryParamMap.get('product');
    // if(productParam) {
    //   this.formValues.productTitle = productParam
    // }


  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  // Отписка

  test() {
    this.subscription?.unsubscribe();
  }

  createOrder(): void {
    if (!this.formValues.productTitle) {
      alert('Вы не выбрали пиццу!');
      return;
    }
    if (!this.formValues.address) {
      alert('Заполните адрес доставки');
      return;
    }
    if (!this.formValues.phone) {
      alert('Введите номер телефона')
      return;
    }

    this.subscriptionOrder = this.productService.createOrder({
      product: this.formValues.productTitle,
      address: this.formValues.address,
      phone: this.formValues.phone,
    })
      .subscribe(response => {
        if (response.success && !response.message) {
          alert('Спасибо за заказ!');

          this.formValues = {
            productTitle: '',
            address: '',
            phone: '',
          }
        } else {
          alert('Ошибка!')
        }
      })
  }
}
