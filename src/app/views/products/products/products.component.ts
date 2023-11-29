import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  loading: boolean = false;

  private subscriptionProducts: Subscription | null = null;

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
        this.subscriptionProducts = this.productService.getProducts()
          .pipe(
            tap(() => {
              this.loading = false; // сработает и для next, и для error
            })
          )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )

    /* this.http.get<ProductType[]>('http://testologia.site/pizzas')
       .subscribe((data) => {
         this.products = data;
       })*/
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe()
  }

}
