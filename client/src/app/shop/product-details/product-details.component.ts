import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product: IProduct;

  constructor(private shopService: ShopService, 
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    // this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product =>{
    //   this.product = product;
    // }, error =>{
    //   console.log(error);
    // })
    // or this
    this.activatedRoute.params.subscribe(params =>{
      this.shopService.getProduct(params['id']).subscribe(product =>{
        this.product = product;
        this.bcService.set('@productDetails', product.name);
      }, error =>{
        console.log(error);
      })
    })
  }
}
