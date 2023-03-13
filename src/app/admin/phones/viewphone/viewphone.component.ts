import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from 'src/app/model/Phone';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-viewphone',
  templateUrl: './viewphone.component.html',
  styleUrls: ['./viewphone.component.css']
})
export class ViewphoneComponent implements OnInit {

  @Input()
  phone: Phone = new Phone;

  @Output()
  bookDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

  ngOnInit(): void {
  }

  deletePhone() {
    this.httpClientService.deletePhone(this.phone.id).subscribe(
      (phone) => {
        this.bookDeletedEvent.emit();
        this.router.navigate(['admin', 'phones']);
      }
    );
  }

  editPhone() {
    this.router.navigate(['admin', 'phones'], { queryParams: { action: 'edit', id: this.phone.id } });
  }
}
