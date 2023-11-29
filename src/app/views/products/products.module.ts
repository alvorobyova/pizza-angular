import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductComponent} from "./product/product.component";
import {ProductsComponent} from "./products/products.component";
import {ProductCardComponent} from "../../shared/components/product-card/product-card.component";
import {TitleComponent} from "../../shared/components/title/title.component";
import {WordUpperPipe} from "../../shared/pipes/word-upper.pipe";
import {ProductService} from "../../shared/services/product.service";
import {SharedModule} from "../../shared/shared.module";
import {HomeRoutingModule} from "../home/home-routing.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductsRoutingModule
  ],
  providers: [
    ProductService
  ],
  exports: [
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
