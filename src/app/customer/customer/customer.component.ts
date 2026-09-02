import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatToolbar],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
   name: string = '';
    constructor(private customerService: CustomerService) {}
    ngOnInit(): void 
    {
      this.getName();
    }
    getName() 
    {
       this.customerService.getName().subscribe({
        next: (result) => {
          this.name = result;
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
      });
    }
}
