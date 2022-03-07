import { Component,ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from "./product.modal";
import { ProductService } from "./products.service";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

private $modal: any;

baseUrl = 'http://localhost:3000/';
imageBaseUrl = 'http://localhost:3000/images/'
productForm!: FormGroup;
imageSrc: string = '';
imageUrl: any;
submitted = false;
products: any;
showProductDes: any = {};
formTitle: string = 'Add Product';

constructor(private productService: ProductService, private toastr: ToastrService, public auth: AuthService){}

  ngOnInit() {

    //Add Product form validations
    this.productForm = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required])
    });
    this.loadProducts()
  }

  // Get all products list
  loadProducts() {
    return this.productService.getPosts().subscribe((data: any) => {
      this.products = data.Product;
    });
  }

    // delete Product
    removeProduct(postId: string) {
        this.productService.deletePost(postId);
        this.toastr.success('Product Successfully Deleted.');
        this.loadProducts();
    }

    //update product
    updateProduct(product: Product) {
      console.log(product)
      this.imageSrc = this.imageBaseUrl + product.image;
      this.productForm.patchValue({
        _id: product._id,
        title: product.title,
        description: product.description,
        quantity: product.quantity,
        price: product.price
      });
      this.changeTitle('Update Product'); ;
    }
  
    //Add product form actions
    get f() { return this.productForm.controls; }

    onSubmit(value: Product) {
      this.submitted = true;
      // stop here if form is invalid
      if (this.productForm.invalid) {
          return;
      }
      //True if all the fields are filled
      if(this.submitted) {
        const formData = new FormData();
        formData.append('title', this.productForm.get('title')?.value);
        formData.append('image', this.imageUrl)
        formData.append('description', this.productForm.get('description')?.value);
        formData.append('quantity', this.productForm.get('quantity')?.value);
        formData.append('price', this.productForm.get('price')?.value);

        this.productService.addProduct(formData);
        setTimeout(()=>{                
          this.resetForm();
        }, 2000);
      }
    }

    onUpdate() {
        let id = this.productForm.value._id;
        const formData = new FormData();
        formData.append('title', this.productForm.get('title')?.value);
        formData.append('image', this.imageUrl)
        formData.append('description', this.productForm.get('description')?.value);
        formData.append('quantity', this.productForm.get('quantity')?.value);
        formData.append('price', this.productForm.get('price')?.value);
        this.productService.updateProduct(id, formData);
        setTimeout(()=>{                
          this.resetForm();
        }, 2000);
    }

  resetForm() {
    this.productForm.reset();
    this.changeTitle('Add Product');
    this.loadProducts();
    this.imageSrc = '';
  }

  onFileChange(event:any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const file:File = event.target.files[0];
      this.imageUrl = file
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }  
  }
    

  changeTitle(value: string) {
    this.formTitle = value;
  }
}
