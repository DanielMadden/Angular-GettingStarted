import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  pageTitle: string = 'Product Detail';
  products: IProduct[] = [];
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = '';

  ngOnInit(): void {
    // Since we don't have an actual API that returns a single item, I'm just going to get all the products and find the single one. I could do this in the service instead, but blegh.
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.product = products.find(product => product.productId == Number(this.route.snapshot.paramMap.get('id')))
      },
      error: err => this.errorMessage = err
    })
  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

}
