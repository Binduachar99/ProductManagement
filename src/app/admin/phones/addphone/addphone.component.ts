import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from 'src/app/model/Phone';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-addphone',
  templateUrl: './addphone.component.html',
  styleUrls: ['./addphone.component.css']
})
export class AddphoneComponent implements OnInit {
  @Input()
  phone: Phone = new Phone;

  @Output()
  phoneAddedEvent = new EventEmitter();


  selectedFile: any;
  imgURL: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  public onFileChanged(event:any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  savePhone() {
    if (this.phone.id == null){
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:8082/api/uploadimage', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addPhone(this.phone).subscribe(
            (phone) => {
              this.phoneAddedEvent.emit();
              this.router.navigate(['admin', 'phones']);
            }
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
      }
      );
      
  }

  else {
    this.httpClientService.updatePhone(this.phone).subscribe(
      (book) => {
        this.phoneAddedEvent.emit();
        this.router.navigate(['admin', 'phones']);
      }
    );
  }
}
}

