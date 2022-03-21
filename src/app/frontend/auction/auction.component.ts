import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../shop/user.service';
import { Auction } from './auction.modal';
import { AuctionService } from './auctions.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Utils } from 'src/utils';
import { BidService } from './bid.service';
declare var $ : any;


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  baseUrl = 'https://www.faktury.dev/api';
  imageBaseUrl = 'https://www.faktury.dev/images/'

  auctionForm!: FormGroup;
  bidForm!: FormGroup;
  showAuctionForm: any = {};
  formTitle: string = 'Add Auction';
  auctions:any;
  fileUrl: any;
  videoUrl:any;
  submitted = false;
  fileSrc: string = '';
  videoSrc: string = '';
  userRole: any;
  userEmail: string;
  userId: any;
  isFormShown: boolean;

  // countdown testing
  days: number;
  hours: number;
  mins: number;
  secs: number;

  
  constructor(public auth: AuthService,public auctionService: AuctionService, 
    private toastr: ToastrService, private userService: UserService, private bidService: BidService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      if (user) {
        this.getUserData(user.email)
      }
    });
      var emailPattern = "^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{2,}$";

      this.bidForm = new FormGroup({
        address : new FormControl('', [Validators.required]),
        email: new FormControl('',    [Validators.required,
                                        Validators.email,
                                        Validators.pattern(emailPattern)]),
        xrpBid: new FormControl('', [Validators.required]),
        fakBid: new FormControl('', [Validators.required])
      })

      this.auctionForm = new FormGroup({
        _id: new FormControl(''),
        title: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        expiryTime: new FormControl('')
        });
        this.loadAuctions()
  }
  // convenience getter for easy access to auctionFrom fields
  get f() { return this.auctionForm.controls; }
  
  // convenience getter for easy access to bidFrom fields
  get g() { return this.bidForm.controls; }
  


    toggleShow() {

      this.isFormShown = ! this.isFormShown;
      
      }
    // $(".box__offer").css("display", "none");
       
  changeTitle(value: string) {
    this.formTitle = value;
  }
  resetForm() {
    this.auctionForm.reset();
    this.bidForm.reset();
    this.changeTitle('Add Product');
    this.loadAuctions();
    this.fileSrc = '';
  }
  bidsForm(bidForm, id){
      // stop here if form is invalid
      if (this.bidForm.invalid) {
          this.toastr.warning('please fill this form');
      }  else {
        bidForm.auctionId = id
        this.bidService.addBid(bidForm)
        setTimeout(()=>{         
          this.resetForm();
        }, 1000);
      }

  }

  getUserData(id: string) {
    this.userService.getUser(id).subscribe((res: any) => {
      this.userRole = res.User.role;
    });
  }
  //update auction
  updateAuction(auction: Auction) {
    this.fileSrc = this.imageBaseUrl + auction.file;
    this.auctionForm.patchValue({
      _id: auction._id,
      title: auction.title,
      description: auction.description
    });
    this.changeTitle('Update Auction'); ;
  }

  // delete Auction
  removeAuction(auctionId: string) {
    Swal.fire(Utils.swalConfig()).then(result => {
      if (result.value && result.value === true) {
      this.auctionService.deletePost(auctionId);
      setTimeout(()=>{                
      this.loadAuctions();
      Utils.showSwalLoader();
      this.toastr.success('Auction Successfully Deleted.');
      Utils.closeSwalLoader();
      }, 1000);
      }
    });
      
  }

  onUpdate(){
    let id = this.auctionForm.value._id;
      const formData = new FormData();
      formData.append('title', this.auctionForm.get('title')?.value);
      formData.append('file', this.fileUrl)
      formData.append('description', this.auctionForm.get('description')?.value);
      this.auctionService.updateAuction(id, formData);
      setTimeout(()=>{                
        this.loadAuctions();
      $('#auctionModal').modal('hide');          
      this.resetForm();
      }, 1000);
      
  }
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
        formData.append('file',  this.fileUrl);
        formData.append('expiryTime', this.auctionForm.get('expiryTime')?.value)
        formData.append('description', this.auctionForm.get('description')?.value);
        this.auctionService.addAuction(formData);
         // Close the stripe modal dialog window
      $('#auctionModal').modal('hide');
      setTimeout(()=>{                
        this.resetForm();
      }, 1000);
      }
  }
  onFileChange(event: any){
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const file:File = event.target.files[0];
      this.fileUrl = file
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileSrc = reader.result as string;
      };
    }  
  }
  loadAuctions() {
    return this.auctionService.getPosts().subscribe((data: any) => {
      this.auctions = data.Auction;

      const x = setInterval(() => {
        let date = new Date().getTime();
        let date2 = new Date(this.auctions[7].expiryTime).getTime();
        let distance = date2 - date;
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24 ));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24 )) / (1000 * 60 * 60));
        this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.secs = Math.floor((distance % (1000 * 60 )) / (1000));
        if (distance < 0) {
          this.days = this.hours = this.mins = this.secs = 0
            clearInterval(x)
        }
        }, 1000)
    });
  }
}
