import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'university-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name!: string;
  sName!: string;
  address!: string;
  phone!: string;
  message:any;
  errorMessage:any;
  constructor(private http: HttpClient){
  
  }
  ngOnInit(){
  }
  saveUniversity()
  {
  var data = {
          "Name": this.name,
          "Address": this.address,
          "Phone": this.phone
          }
    console.log(data);
    const jsonData = JSON.parse(JSON.stringify(data))
    if (!this.name) {
      alert("University name required!");
      return false;
  }
  if (!this.address ) {
      alert("Address required");
      return false;
  }
  if (!this.phone) {
      alert("Phone required");
      return false;
  }
  
      this.http.post<any>('http://dev.cs.smu.ca:9898/addUniversity',
      jsonData).subscribe({
          next:data=>{
              this.message=data.message;
                console.log(this.message);
                },
          error:error=>{
              this.errorMessage=error.message;
                  console.log('Error is ',this.errorMessage);
                }
      })  
      return true;         
  }
  removeUniversity()
  {
  const data = {
          'Name': this.name,
          }
      this.http.post<any>('http://dev.cs.smu.ca:9898/deleteUniversity',
          data).subscribe( 
          (res) => {if(res.n==0){
            alert('University not found')
          }else{
            alert('University deleted Successfully')
          }
        },
          (err) => console.log(err)
      );          
  }
  searchUniversity()
  {
  const data = {
          'Name': this.sName,
          }
      this.http.post<any>('http://dev.cs.smu.ca:9898/searchUniversity',
          data).subscribe( 
          (res) => {if(res.n==0){
            alert('University not found')
          }else{
            console.log(res)
          }
        },
          (err) => console.log(err)
      );          
  }
  searchAllUniversity()
  {
  const data = {}
      this.http.post<any>('http://dev.cs.smu.ca:9898/searchAllUniversity',
          data).subscribe( 
          (res) => {if(res.n==0){
            alert('University not found')
          }else{
            alert('University deleted Successfully')
          }
        },
          (err) => console.log(err)
      );          
  }
}
