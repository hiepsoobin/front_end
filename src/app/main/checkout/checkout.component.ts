import { Component } from '@angular/core';
import { FormArray,FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // product:any;
  product_cart:any=[];
  items: any = [];
  total :any;
  total_payment :any;
  totalQuantity: number;
  quantity:number;
  constructor(
    public cartService: CartService,
    public userServire: UserService,
    private router: Router


  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
    const quantities = this.items.map((item: any) => item.quantity);
    this.totalQuantity = quantities.reduce((total: number, quantity: number) => total + quantity, 0);
    console.log('dya',this.total_payment);
    this.items.forEach((item: any) => {
      const orderDetail = new FormGroup({
        product_id: new FormControl(item.product.product.id),
        size_id: new FormControl(item.size.id),
        color_id: new FormControl(item.color.id),
        price: new FormControl(item.product.product.price),
        quantity: new FormControl(item.quantity),
        img_oder: new FormControl(item.product.image[0].img_product)
      });
  
      (this.checkout_from.get('oder_detail') as FormArray).push(orderDetail);
    });
    this.total_payment = this.total_money + 30000;
    this.checkout_from.get('totalMoney').setValue(this.total_money + 30000);

  }
  checkout_from: FormGroup = new FormGroup({

    order_note: new FormControl(),
    totalMoney: new FormControl(),
    name: new FormControl(),
    adress: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    oder_detail: new FormArray([]),
    // oder_detail: new FormControl(this.product),
  });
 

   onSubmit(): void {
    console.log('checkout_from',this.checkout_from.value);
    this.userServire.check_out(this.checkout_from.value).subscribe(
      data => {
        localStorage.removeItem('cart');
        console.log('Order success', data);
        alert('Thanh toán thành công');
        this.router.navigate(['/']);
      },
      error => {
        console.log('Order error', error);
        alert('Thanh toán thất bại');
      }
    );
  }
  
  get product(){
    this.cartService.loadCart();
    // this.product_cart = this.cartService.getItems();
    return this.product_cart=this.cartService.getCartItems();
  }

  // get total_money(){
  //   return this.total = this.items.reduce(
  //     (sum: number, item: any) => (sum + item.quantity * item.product.product.price),
  //     0
  //   );
  // }
  get total_money() {
    return this.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.product.product.price,
      0
    );
  }
  getQuantity(item: any): number {
    return item.quantity;
  }
  // test:any;
  // get total_money2(){
  //   return this.test= this
  // }
}
