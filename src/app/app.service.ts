import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  role:any;

  /* #####################   Post login email id and password to validate  ##################### **/

  postLoginCredentials(loginData: any) {
    console.log("in post service", environment.loginApi.url + environment.loginApi.login);
  
    return this.http.post(environment.loginApi.url + environment.loginApi.login, loginData)
        .pipe(
          tap(res => {console.log("Tap loginn a", res);}),
          map((res: any) => {
            if(res.Login_Success){

              localStorage.setItem("user_id", res.id);
              console.log("res id", res.id)
            this.getListDetailsById(res.id).pipe(
                tap(res => {console.log("id details " ,res);
              }),
                map((res) => {
                  console.log('hanuhitha', res);
                  this.role = res.role_id;
                  localStorage.setItem("role_id", this.role); 
                })
              ).subscribe();
              
            }
      return res;
    }
    )
    );
}

postSignUpCredentials(loginData: any) {
  console.log("in post service", environment.loginApi.url + environment.loginApi.login);

  return this.http.post(environment.loginApi.url + environment.loginApi.login, loginData)
      .pipe(
        tap(res => {console.log("Tap loginn a", res);}),
        map((res: any) => {
          if(res.success){

            localStorage.setItem("user_id", res.id);
            console.log("res id", res.id)
          this.getListDetailsById(res.id).pipe(
              tap(res => {console.log("id details " ,res);
            }),
              map((res) => {
                console.log('hanuhitha', res);
                this.role = res.role_id;
                localStorage.setItem("role_id", this.role); 
              })
            ).subscribe();
            
          }
    return res;
  }
  )
  );
}



postInsurance(data: any) {
  console.log("in post service",data,  environment.loginApi.url + environment.loginApi.insurance);

  return this.http.post<any>(environment.loginApi.url + environment.loginApi.insurance, data)
      .pipe(
        tap(res => {console.log("Tap insurance a", res);}),
        map((res) => {
          if(res){
            console.log("ressss",res)
          }
    return res;
  }
  )
  );
}

postViewPatientAppointments(data: any) {
  console.log("in post service",data,  environment.loginApi.url + environment.loginApi.appointment);

  return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
      .pipe(
        tap(res => {console.log("Patient Appointment", res);}),
        map((res) => {
          if(res){
            console.log("ressss",res)
          }
    return res;
  }
  )
  );
}

postUpcomingDoctorAppointments(data: any) {
  console.log("in post service",data,  environment.loginApi.url + environment.loginApi.appointment);

  return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
      .pipe(
        tap(res => {console.log("Doctor Appointment", res);}),
        map((res) => {
          if(res){
            console.log("ressss",res)
          }
    return res;
  }
  )
  );
}
postUpcomingPatientAppointments(data: any) {
  console.log("in post service",data,  environment.loginApi.url + environment.loginApi.appointment);

  return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
      .pipe(
        tap(res => {console.log("Patient Appointment", res);}),
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
        tap(res => {console.log("Tap in servce", res);}),
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

  // const options = {

  //   params: {
  //     id
  //   }
  //   };

  console.log("in get list by id service",id, environment.loginApi.url + environment.loginApi.list);

  return this.http.get<any>(environment.loginApi.url + environment.loginApi.list + "?"+ "id=" + id)
      .pipe(
        tap(res => {console.log(" Tap in list service ", res);}),
        map((res: any) => {
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
  viewDoctorAppointments(data: []) {
    console.log("in filter by doctor service", environment.loginApi.url + environment.loginApi.appointment);
   
     return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
         .pipe(
           tap(res => {console.log("doctor", res);}),
           map((res) => {
         if (res) {
           console.log('response', res);
       }
       return res;
      }));
  }


  viewUpcomingDoctorAppointments(data: []) {
    console.log("upcoming doctor", environment.loginApi.url + environment.loginApi.appointment);
   
     return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
         .pipe(
           tap(res => {console.log("doctor", res);}),
           map((res) => {
         if (res) {
           console.log('response', res);
       }
       return res;
      }));
  }

  viewUpcomingPatientAppointments(data: []) {
    console.log("upcoming patient", environment.loginApi.url + environment.loginApi.appointment);
   
     return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
         .pipe(
           tap(res => {console.log("patient", res);}),
           map((res) => {
         if (res) {
           console.log('response', res);
       }
       return res;
      }));
  }

  postAppointment(data: []) {
    console.log("in filter by doctor service", environment.loginApi.url + environment.loginApi.appointment);
   
     return this.http.post<any>(environment.loginApi.url + environment.loginApi.appointment, data)
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


