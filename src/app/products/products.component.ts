import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from './ProductsService';
import { Products } from '../Model/Product';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ProductList?: Observable<Products[]>;
  ProductList1?: Observable<Products[]>;
  productForm: any;
  massage = "";
  prodCategory = "";
  productId = 0;

  constructor(private formbulider: FormBuilder,
    private productService: ProductsService,private router: Router,
    private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

    ngOnInit() {
      this.prodCategory = "0";
      this.productForm = this.formbulider.group({
        productName: ['', [Validators.required]],
        productCost: ['', [Validators.required]],
        productDescription: ['', [Validators.required]],
        productStock: ['', [Validators.required]]
      });
      this.getProductList();
    }

    getProductList() {
      this.ProductList1 = this.productService.getProductList();
      //alert(this.ProductList1);
      this.ProductList = this.ProductList1;
    }

    PostProduct(product: Products) {
           const product_Master = this.productForm.value;
           this.productService.postProductData(product_Master).subscribe(() => {
           this.getProductList();
           this.productForm.reset();
           this.toastr.success('Data Saved Successfully');
           });
    }

    UpdateProduct(product: Products) {
      product.productId = this.productId;
      const product_Master = this.productForm.value;
      this.productService.updateProductData(product_Master).subscribe(() =>{
        this.getProductList();
        this.productForm.reset();
        this.toastr.success('Data updated Successfully');
      });
      
    }

    ProductDetailsToEdit(id: string) {
      this.productService.getProductDetailsById(id).subscribe(productResult => {
        this.productId = productResult.productId;
        this.productForm.controls['productName'].setValue(productResult.productName);
        this.productForm.controls['productCost'].setValue(productResult.productCost);
        this.productForm.controls['productDescription'].setValue(productResult.productDescription);
        this.productForm.controls['productStock'].setValue(productResult.productStock);
      });
    }

    Clear(product: Products){
      this.productForm.reset();
    }

    DeleteProduct(id: number){
      if (confirm('Do you want to delete this product?')) {
        this.productService.deleteProductById(id).subscribe(() => {
          this.toastr.success('Data Deleted Successfully');
          this.getProductList();
        });
      }
    }

    public logOut = () => {
      localStorage.removeItem("jwt");
      this.router.navigate(["/"]);
    }

    isUserAuthenticated() {
      const token = localStorage.getItem("jwt");
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      else {
        return false;
      }
    }
}
