import { ChangeDetectorRef, Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from "./product.modal";
import { ProductService } from "./products.service";
import { CheckoutService } from './checkout.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@auth0/auth0-angular';
import Swal from 'sweetalert2';
import { Utils } from 'src/utils';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
//import * as $ from 'jquery';
declare var $ : any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

private stripe: Stripe
private $modal: any;

baseUrl = 'https//localhost:3000/api';
imageBaseUrl = 'https//localhost:3000/api/images/'
productForm!: FormGroup;
stripeForm!: FormGroup;
imageSrc: string = '';
imageUrl: any;
submitted = false;
products: any;
showProductDes: any = {};
formTitle: string = 'Add Product';
paymentHandler: any = null;
success: boolean = false
failure:boolean = false
card: any;
cardHandler = this.onChange.bind(this);
cardError = true;
productTitle: any;
productPrice: any;
@ViewChild('cardInfo') cardElement: HTMLElement;
userEmail: string;
userId: any;
userRole: any;


constructor(private productService: ProductService, private userService: UserService, private toastr: ToastrService,
            private router: Router, public auth: AuthService, private checkout: CheckoutService, 
            private el: ElementRef,private cd: ChangeDetectorRef, private orderService: OrderService){ }


  
  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.getUserData(user.email)
      }
    });

    //Add Product form validations
    this.productForm = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required])
    });

    //Add Stripe form validations
    this.stripeForm = new FormGroup({
      _id: new FormControl(''),
      billingAddress: new FormControl('', [Validators.required]),
      shippingAddress: new FormControl('', [Validators.required]),
      });
    this.loadProducts()
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.initiateCardElement();
    }, 3000);
  }

  getUserData(id: string) {
    this.userService.getUser(id).subscribe((res: any) => {
      this.userId = res.User._id;
      this.userRole = res.User.role;
    });
  }

  // ngAfterViewChecked() {
  //  this.initiateCardElement();
  // }

  async initiateCardElement()  {
    this.stripe = await loadStripe('pk_test_PqR8Oy50z90tAdw9a1tkFG9S');
      const elements = this.stripe.elements();
      const cardStyle = {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
      };

      this.card = await elements.create('card', {style: cardStyle});
      
      // Add an instance of the card Element into the `card-element` <div>.
      this.card.mount('#card-element');
      this.card.addEventListener('change', this.cardHandler);
  }


  async createStripeToken(value:any) {
    const {token, error} = await this.stripe.createToken(this.card);
    if (token) {
        this.onSuccess(token, value);
    }
    else {
        this.onError(error);
    }
  }

  

  
  paymentstripe(data: any, value: any) {
    this.checkout.makePayment(data).subscribe((data: any) => {
      if (data.data === "success") {
        this.success = true
        let orderObj = {
          userId: this.userId,
          product: this.productTitle,
          price: this.productPrice,
          billingAddress: value.billingAddress,
          shippingAddress: value.shippingAddress,
          status: "paid",
          method: "stripe"
        }
        this.orderService.saveOrder(orderObj);
        // Close the stripe modal dialog window
        $('#stripeModal').modal('hide');
        
        setTimeout(()=>{                
          this.resetForm();
        }, 1000);
        }
      else {
        this.failure = true
      }
    });
  };


  onSuccess(token, value) {
    var payload = {
      token: token,
      amount: this.productPrice,
      title: this.productTitle
    }
    this.paymentstripe(payload, value);
  }

  onError(error) {
    if (error.message) {
      this.cardError = error.message;
    }
  }
  // Get all products list
  loadProducts() {
    return this.productService.getPosts().subscribe((data: any) => {
      this.products = data.Product;
    });
  }

  // delete Product
  removeProduct(postId: string) {
    Swal.fire(Utils.swalConfig()).then(result => {
      if (result.value && result.value === true) {
      this.productService.deletePost(postId);
      Utils.showSwalLoader();
      this.toastr.success('Product Successfully Deleted.');
      this.loadProducts();
      Utils.closeSwalLoader();
      }
    });
      
  }

  //update product
  updateProduct(product: Product) {
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
  //Add stripe form actions
  get g() { return this.stripeForm.controls; }

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
      // Close the stripe modal dialog window
      $('#exampleModal2').modal('hide');
      setTimeout(()=>{                
        this.resetForm();
      }, 1000);
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
      $('#exampleModal2').modal('hide');          
      this.resetForm();
  }

  resetForm() {
    this.productForm.reset();
    this.stripeForm.reset();
    this.changeTitle('Add Product');
    this.imageSrc = '';
    this.loadProducts();
    setTimeout(()=>{
      this.initiateCardElement();
    }, 1000);
    
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

  onChange({error}) {
    this.cardError = error ? error.message : null;
    this.cd.detectChanges();
  }

  clickEvent(title, price) {
    this.productTitle = title;
    this.productPrice = price
  }

  buyProduct() {
    if (this.userEmail == undefined) {
      this.toastr.warning("You need to login to access this functionality.");
    }
  }
}
