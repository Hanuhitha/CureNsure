import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DateToEpochPipe,
  EpochToAgePipe, EpochToCalendar, EpochToTimeWithoutMeridian, EpochToMeridian, EpochToDatePipe, EpochToDay, EpochToLLFormat, EpochToMonth, EpochToTime, TaskTimingToTime,
  TimeOfDayToTime,
  EpochToLLLFormat,
  FreeText, EpochToWeeksAndDaysPipe
} from './epoch-pipes.pipe';
import { SafePipe } from './safe.pipe';
import {NameCasePipe} from "./string-pipes.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateToEpochPipe,
    EpochToDatePipe,
    EpochToDay,
    EpochToMonth,
    EpochToCalendar,
    EpochToLLFormat,
    EpochToLLLFormat,
    TimeOfDayToTime,
    EpochToAgePipe,
    EpochToTime,
    TaskTimingToTime,
    EpochToMeridian,
    FreeText,
    EpochToTimeWithoutMeridian,
    EpochToWeeksAndDaysPipe,
    SafePipe,
    NameCasePipe,
  ],
  exports: [
    DateToEpochPipe,
    EpochToDatePipe,
    EpochToDay,
    EpochToMonth,
    EpochToCalendar,
    EpochToLLFormat,
    EpochToLLLFormat,
    TimeOfDayToTime,
    EpochToAgePipe,
    EpochToTime,
    TaskTimingToTime,
    FreeText,
    EpochToWeeksAndDaysPipe,
    SafePipe,
    NameCasePipe,
    EpochToTimeWithoutMeridian
  ]
})
export class VitaUtilitiesModule { }
