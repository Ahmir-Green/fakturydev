import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Auction } from './auction.modal';
import { AuctionService } from './auctions.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  auctionForm!: FormGroup;
  bidForm!: FormGroup;
  showProductDes: any = {};
  formTitle: string = 'Add Auction';
  auctions:any;
  imageUrl: any;
  videoUrl:any;
  submitted = false;
  imageSrc: string = '';
  videoSrc: string = '';

  
  constructor(public auth: AuthService,public auctionService: AuctionService) { }

  ngOnInit(): void {
      var emailPattern = "^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$";

      // this.auctionForm = new FormGroup({
      //   address : new FormControl('', [Validators.required]),
      //   email: new FormControl('',    [Validators.required,
      //                                   Validators.email,
      //                                   Validators.pattern(emailPattern)]),
      //   xrpBid: new FormControl('', [Validators.required]),
      //   fakBid: new FormControl('', [Validators.required])
      // })

      this.auctionForm = new FormGroup({
        _id: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        image: new FormControl(''),
        description: new FormControl('', [Validators.required]),
        video: new FormControl('', [Validators.required])
        });
  }
  // convenience getter for easy access to Registration fields
  get f() { return this.auctionForm.controls; }
  


  show: boolean = false;
  clickEvent(){
    this.show = true;       
  }
  changeTitle(value: string) {
    this.formTitle = value;
  }
  resetForm() {
    this.auctionForm.reset();
    this.changeTitle('Add Product');
    this.loadAucitons();
    this.imageSrc = '';
  }
  bidsForm(){

  }
  onUpdate(){}
  onSubmit(value: Auction){
    this.submitted = true;
      // stop here if form is invalid
      if (this.auctionForm.invalid) {
          return;
      }
      //True if all the fields are filled 
      if(this.submitted) {
        const formData = new FormData();
        formData.append('title', this.auctionForm.get('title')?.value);
        formData.append('image',  this.imageUrl)
        formData.append('description', this.auctionForm.get('description')?.value);
        formData.append('image', this.videoUrl);
        //formData.append('price', this.auctionForm.get('price')?.value);

        this.auctionService.addAuction(formData);
        setTimeout(()=>{                
          this.resetForm();
        }, 2000);
      }
  }
  onFileChange(event: any){
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
  onVideoChange(event: any){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const file:File = event.target.files[0];
      this.videoUrl = file
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.videoSrc = reader.result as string;
      };
    }  
  }
  loadAucitons() {
    return this.auctionService.getPosts().subscribe((data: any) => {
      this.auctions = data.Auction;
    });
  }
}
