import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }



  /* #####################   Post login email id and password to validate  ##################### **/

  postLoginCredentials(loginData: any) {
    console.log("in post service", environment.loginApi.url + environment.loginApi.login);
  
    return this.http.post(environment.loginApi.url + environment.loginApi.login, loginData)
        .pipe(
          tap(res => {console.log("Tap loginn a", res);}),
          map((res) => {
            if(res){
              console.log("ressss",res)
            }
      return res;
    }
    )
    );
}

 /* #####################   Complete list of details  ############################# **/

 getListDetails() {
  console.log("in service", environment.loginApi.url + environment.loginApi.list);

  return this.http.get<any>(environment.loginApi.url + environment.loginApi.list)
      .pipe(
        tap(res => {console.log("Tap ", res);}),
        map((res) => {
      if (res) {
        console.log('response', res);
    } else{
      console.log('no response', res);
    }
    return res;
  }
  )
  );
}


 /* #####################   Complete list of details by id  ############################## **/

 getListDetailsById(id: any) {

  const options = {

    params: {
      id
    }
    };

  console.log("in get list by id service", environment.loginApi.url + environment.loginApi.list);

  return this.http.get<any>(environment.loginApi.url + environment.loginApi.list , options)
      .pipe(
        tap(res => {console.log("Tap ", res);}),
        map((res) => {
    return res;
  }
  )
  );
}


 /* #####################   

/* #####################   Complete list of details  ############################# **/

appointmentDetails() {
  console.log("in service", environment.loginApi.url + environment.loginApi.list);

  return this.http.get<any>(environment.loginApi.url + environment.loginApi.list)
      .pipe(
        tap(res => {console.log("Tap ", res);}),
        map((res) => {
      if (res) {
        console.log('response', res);
    } else{
      console.log('no response', res);
    }
    return res;
  }
  )
  );
}


 /* #####################   Complete list of details by id  ############################## **/

 AppointmentList(id: any) {

  const options = {

    params: {
      id
    }
    };

  console.log("in get list by id service", environment.loginApi.url + environment.loginApi.list);

  return this.http.get<any>(environment.loginApi.url + environment.loginApi.list , options)
      .pipe(
        tap(res => {console.log("Tap ", res);}),
        map((res) => {
    return res;
  }
  )
  );
}


 /* #####################   
  @  Filter by Name
  @  Speciality
  @  Hospital
  @  Doctors who support COVID 
  ############################## **/

 postAppointment(data : any) {
 console.log("in filter by doctor service", environment.loginApi.url + environment.loginApi.filterByDoctor);

  return this.http.post(environment.loginApi.url + environment.loginApi.filterByDoctor, data)
      .pipe(
        tap(res => {console.log("Tap ", res);}),
        map((res) => {
      if (res) {
        console.log('response', res);
    }
    return res;
  }
  )
  );
}
}


