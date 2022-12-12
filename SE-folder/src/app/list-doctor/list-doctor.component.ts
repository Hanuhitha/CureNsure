import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, filter, take, map, tap } from 'rxjs';
import { MedeAppointment, AppointmentStatus } from '../app.model';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent implements OnInit {
  @Input()
  mode!: string;
  @Input() reviewData: any;
  @Input()
  appointmentInfo!: MedeAppointment;
  timeSelected = false;
  @Output() scheduleDetails = new EventEmitter<number>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private authService: MedeAuthService,
    // private doctorsService: DoctorHelpService,
    // private appointmentService: AppointmentService,
    public dialog: MatDialog,
  ) {
  }

  date = new FormControl(moment());
  from: any;
  bookedApp: boolean=false;
  isAvailable!: boolean;
  to: any;
  morning: any;
  afternoon: any;
  evening: any;
  emailDate!: number;
  intervals!: any[];
  hasNoIntervals = false;
  selectedInterval!: { from: number; to: number; isAvailable: boolean; };
  interval!: { from: number; to: number; isAvailable: boolean; } [];
  isLoading = false;
  datee: any;
  appointments = [];
  appointmentStatus = AppointmentStatus;
  date1: any;
  symptomsAdded: boolean = false;
  ifSymptom: boolean=false;
  doctorIdd:any;
  appointmentId!: string;
  casesheetId!: string;
  consultedTime!: number;
  isReviewAppointment: boolean = false;
  scheduledSlots!: Observable<any>;
  selectedDateStartEpoch: any;
  slotsLoading: boolean = false;
  symptoms: any;
  selectedIndex=0;
  slotData : any[]=[];
  selectedSlot: any;
  casesheet: any;
  patientId: any;
  selectedDateEndEpoch: any;
  startDate = moment().startOf("day").unix();
  appointment!: MedeAppointment;
  dates!: any[];
  newAppointmentId: any;
  appointment$!: Observable<any>;
  doctorId!: string;
  appointmentDetails$!: Observable<any>;
  appointmentDetails:any;
  showloader = false;
  casesheetData: any;
  maxDob = moment((moment().startOf('day').unix() * 1000) + (101 * 365 * 86400 * 1000));
  minDob = moment().startOf('day');
  casesheet$!: Observable<any>;
  id: any;
  @ViewChild('target')
  private myScrollContainer!: ElementRef;
  others = new FormControl('', [Validators.required])
  ngOnInit(): void {

    this.interval = [
      {
        from: 1670384432,
        to: 1670384581,
        isAvailable: true
      }
    ] 
    console.log("is review", this.isReviewAppointment)
    this.hasNoIntervals = this.intervals?.length > 0 ? false : true;
    this.doctorIdd = this.reviewData?.doctorId;
    // ?.isReviewAppointment
    if(this.reviewData && this.reviewData?.isReviewAppointment){
      
      this.maxDob = moment().add(7, 'days').startOf('day');
    }
    else{
      this.maxDob = moment((moment().startOf('day').unix() * 1000) + (101 * 365 * 86400 * 1000));
    }
   
    
   
    this.id = this.doctorId || this.doctorIdd;
   
    this.date.valueChanges.subscribe((date) => {
      // this.dates = date.between(
      //   new Date(moment(date).startOf("day").toDate()), new Date(moment(date).endOf("day").toDate())
      // );
      // this.intervals = this.dates;
      // console.log("this.interval value changes", this.intervals);

      if (date) {
        this.dates
          .map((interval) => interval["slots"])
          .map((interval) => interval - 19800);
      }
      this.hasNoIntervals = this.intervals?.length > 0 ? false : true;
      console.log("value changes", this.dates, this.hasNoIntervals);


    });
    this.others.valueChanges.subscribe((value) => {
      console.log("complaintss", value);
      this.symptoms = value;
      if(this.symptoms){
        this.ifSymptom = true;
      }else{
        this.ifSymptom = false;
      }
    })


  



  }



  guidelines(){
 
    // dialogRef.afterClosed().subscribe(async result => {
    //   console.log("Result after dialog close ", result);
     
    //     // this.router.navigate(["dashboard"]);
    // })
  }

  ngOnChanges() {
    this.slotsLoading = true;
    console.log("mode", this.mode)
    this.scheduledDate();
  }
  convertIntervaltoMoment(date: moment.MomentInput) {
    // this.date1 = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    // this.datee = moment(date).toLocaleString();
    return moment(date).unix() - 19800;
  }
 
  scheduledDate() {




    this.slotsLoading = true;
  
    this.isLoading = true;
    
   
   


  }
slotBooked(interval: { from: any; }){
    if(this.slotData?.find((slot)=>slot===interval.from)) return true
    return false
  }
  selectTime(time: FormControl<moment.Moment | null>) {
    if (this.mode === 'Email') {
      this.date = time;
      this.selectedInterval = {
        from: moment(this.date.value).unix(),
        to: moment(this.date.value).add(1, 'days').unix(),
        isAvailable: true
      };
    } else {
      console.log("time", time);
      // this.selectedInterval = time;
 console.log("selectedInterval", this.selectedInterval.from , this.selectedInterval.to);
 console.log("appointments", this.appointments);
//  this.appointments = this.appointments.map(appointment => {

//   if (appointment?.scheduleAt ) {
    
//   } 
//   return appointment

// });







    }
    this.timeSelected = true;
    this.selectedSlot = this.selectedInterval.from;
    console.log("this.selectedIntervel.from", this.selectedInterval)
    this.scheduleDetails.emit(this.selectedInterval.from);

  }


  saveCasesheetComplaints(){
   
    
  }
  goToSummary() {
    
  }
  // bookReviewAppointment(casesheet){

  //   this.bookAppointment(this.appointmentDetails ,casesheet);
  // }

  bookAppointment(){
  
  }

  goAppointment(){
   
  }

  getMorningSlots(dates: any[]) {
    // console.log("date",this.from);
    const startOfDay = this.from;
    this.morning = this.dates.filter(interval => (interval.from - startOfDay) < (12 * 3600));

    if(this.morning.length<1){
      this.selectedIndex = 1;
    }
    else this.selectedIndex = 0;
    return this.morning;
  }

  getAfternoonSlots(dates: any[]) {
    const startOfDay = this.from;
    this.afternoon = this.dates.filter(interval => (interval.from - startOfDay) > (12 * 3600) && (interval.from - startOfDay) < (16 * 3600))
   if(this.afternoon.length<1){
    this.selectedIndex = 2;
    }else this.selectedIndex = 1;
    return this.afternoon;
  }

  getEveningSlots(dates: any[]) {
    const startOfDay = this.from;
    this.evening = this.dates.filter(interval => (interval.from - startOfDay) > (16 * 3600))
    // if(this.evening.length>0){
      
    // }
    return this.evening;
  }

  scrollToElement(el: any): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
