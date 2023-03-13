import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from 'src/app/model/Phone';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {

  phones: Array<Phone> = [];
  action: String='';
  selectedPhone: any;
  phonesRecieved: Phone[] = [];

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getPhones().subscribe(
      response => this.handleSuccessfulResponse(response)
    );

    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
	// get the parameter id. this will be the id of the book whose details 
	// are to be displayed when action is view.
	const id = params['id'];
	// if id exists, convert it to integer and then retrive the book from
	// the books array
        if (id) {
          this.selectedPhone = this.phones.find(phone => {
            return phone.id === +id;
          });
        }
      }
    );
  }



  handleSuccessfulResponse(response: Phone[]) {
    this.phones = new Array<Phone>();
    //get books returned by the api call
    this.phonesRecieved = response;
    for (const phone of this.phonesRecieved) {
    
      const phonewithRetrievedImageField = new Phone();
      phonewithRetrievedImageField.id = phone.id;
      phonewithRetrievedImageField.name = phone.name;
      //populate retrieved image field so that book image can be displayed
      phonewithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + phone.picByte;
      phonewithRetrievedImageField.description = phone.description;
      phonewithRetrievedImageField.price = phone.price;
      phonewithRetrievedImageField.picByte=phone.picByte;
      this.phones.push(phonewithRetrievedImageField);
    }
  }

  addPhone() {
    this.selectedPhone = new Phone();
    this.router.navigate(['admin', 'phones'], { queryParams: { action: 'add' } });
  }

  viewPhone(id: number) {
    this.router.navigate(['admin', 'phones'], { queryParams: { id, action: 'view' } });
  }
}
