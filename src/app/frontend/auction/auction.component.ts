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
import { environment } from '../../../environments/environment';
declare var $ : any;
import * as _ from 'lodash';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  baseUrl = environment.apiUrl;
  imageBaseUrl = environment.imageBaseUrl;

  auctionForm!: FormGroup;
  bidForm!: FormGroup;
  showAuctionForm: any = {};
  formTitle: string = 'Add Auction';
  auctions:any;
  bids: any;
  fileUrl: any;
  videoUrl:any;
  submitted = false;
  fileSrc: string = '';
  videoSrc: string = '';
  userRole: any;
  userEmail: string;
  userId: any;
  isFormShown: boolean;
  highest__bid: any;
  highest__bid__user: any;
  highestBidArr: any[] = [];

  
  constructor(public auth: AuthService,public auctionService: AuctionService, 
    private toastr: ToastrService, private userService: UserService, private bidService: BidService) { }

  ngOnInit(): void {

    this.auth.user$.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
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
        file: new FormControl(''),
        description: new FormControl(''),
        expiryTime: new FormControl('', [Validators.required])
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
    this.ngOnInit()
    this.bidForm.reset();
    this.changeTitle('Add Product');
    // this.loadAuctions();
    this.fileSrc = '';
  }
  bidsForm(id, bidForm){
      // stop here if form is invalid
      if (this.bidForm.invalid) {
          this.toastr.warning('please fill this form');
      }  else {
        bidForm.userId = this.userId
        this.auctionService.updateAuction(id, bidForm).subscribe((res: any) => {
          this.toastr.success(res.message);
        }, err => {
          this.toastr.error(err.error.message);
        })
        setTimeout(()=>{         
          this.resetForm();
        });
      }

  }

  getUserData(id: string) {
    this.userService.getUser(id).subscribe((res: any) => {
      this.userId = res.User._id;
      this.userRole = res.User.role;
    });
  }
  //update auction
  updateAuction(auction: Auction) {
    this.fileSrc = this.imageBaseUrl + auction.file;
    this.auctionForm.patchValue({
      _id: auction._id,
      title: auction.title,
      expiryTime: new Date(auction.expiryTime),
      description: auction.description
    });
    this.changeTitle('Update Auction'); ;
  }

  //get auction bid
  getBid(auctionId: string) {
    this.auctionService.getAuctionBid(auctionId).subscribe((data: any) => {
      this.bids = data.Bids.bids;
    });
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

    // approve Bid
    editBid(bid, auction) {
      Swal.fire(Utils.updateConfig()).then(result => {
        if (result.value && result.value === true) {
          let auctionId = auction._id
          let data = {
            title: auction.title,
            description: auction.description,
            expiryTime: auction.expiryTime,
            file: auction.file,
            address: bid.address,
            email: bid.email,
            xrpBid: bid.xrpBid,
            fakBid: bid.fakBid,
            createdAt: bid.createdAt,
            bidId: bid._id,
            // userId: bid.userId,
            is_winner : true,
            status : 'purchased'
          }
        this.auctionService.updateAuctionBid(auctionId, data).subscribe((res: any) => {
          this.toastr.success(res.message);
        }, err => {
          this.toastr.error(err.error.message);
        });
        setTimeout(()=>{
        $('#myModal').modal('hide');                
        Utils.showSwalLoader();
        this.loadAuctions();
        Utils.closeSwalLoader();
        }, 1000);
        }
      });  
    }

  onUpdate(){
      let id = this.auctionForm.value._id;
      const formData = new FormData();
      formData.append('title', this.auctionForm.get('title')?.value);
      formData.append('expiryTime', this.auctionForm.get('expiryTime')?.value);
      formData.append('file', this.fileUrl)
      formData.append('description', this.auctionForm.get('description')?.value);
      this.auctionService.updateAuction(id, formData).subscribe((res: any) => {
        this.toastr.success(res.message)
      });
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
      }, 2000);
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
    Utils.showSwalLoader();
    return this.auctionService.getPosts().subscribe((data: any) => {
      this.auctions = data.Auction;
      if (this.auctions.length <= 0) {
        Utils.closeSwalLoader()
      }
      let greaterBid = 0;
      let greaterBidUser = '';
      for (let i = 0; i < this.auctions.length; i++) {
        if (this.auctions[i].bids.length != 0) {
        greaterBid = this.auctions[i].bids[0].xrpBid;
        greaterBidUser = this.auctions[i].bids[0].email;
        for (let j = 0; j < this.auctions[i].bids.length; j++) {
          if ( i+j <= j) {
            if (greaterBid >= this.auctions[i].bids[i+j].xrpBid) {
              this.highest__bid = greaterBid;
              this.highest__bid__user = greaterBidUser;
            } else {
              this.highest__bid = this.auctions[i].bids[i+j].xrpBid;
              this.highest__bid__user = this.auctions[i].bids[i+j].email;
              greaterBid = this.auctions[i].bids[i+j].xrpBid;
              greaterBidUser = this.auctions[i].bids[i+j].email;
            }
          }
        }
        this.auctions[i].highestBidUser = greaterBidUser;
        this.auctions[i].highestBidAmount = greaterBid;
      }
        
      }
      
      setTimeout(() => {
        this.auctions = this.auctions.map((a) => {
          Utils.closeSwalLoader();
          return {
            ...a,
            timer: this.auctionCountdownTimer(a.expiryTime, a.status)
          }
        })
      }, 1000)
    });
  }
  auctionCountdownTimer (timer, status) {
    let days = 0, hours = 0, mins = 0,  secs = 0;
    let date = new Date().getTime();
    let date2 = new Date(timer).getTime();
    let diff = date2 - date;
    days = Math.floor(diff / (1000 * 60 * 60 * 24 ));
    hours = Math.floor((diff % (1000 * 60 * 60 * 24 )) / (1000 * 60 * 60));
    mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    secs = Math.floor((diff % (1000 * 60 )) / (1000));
    if (diff < 0) {
      return `<div class="auctionExpiryClass"> Expired </div>`
    }
    if (status == 'purchased') {
      return `<div class="auctionPurchasedClass"> Purchased </div>`
    }
    return `<div class="js-days" class="number">
    <span class="current">${days}</span></div>
    <div class="js-hours" class="number">
    <span class="current">${hours}</span></div>
    <div class="sub__min">
        <div class="js-minutes" class="number">
        <span class="current">${mins}</span></div>
        <div class="dotts">:</div>
        <div class="js-seconds" class="number">
        <span class="current">${secs}</span></div>
    </div>`
      
  }

  obscureEmail = email => {
    const [name, domain] = email.split("@");
    return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
  };

  isLoggedIn() {
    if (this.userEmail == undefined) {
      this.toastr.warning("You need to login to access this functionality.");
      return true;
    } else {
      return false
    }
    
  }

  loadBids() {
    return this.bidService.getBids().subscribe((data: any) => {
      this.bids = data.Bids;
    });
  }
}
