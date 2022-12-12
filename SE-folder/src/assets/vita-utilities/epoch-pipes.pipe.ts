import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "dateToEpoch"
})
export class DateToEpochPipe implements PipeTransform {
  transform(value: moment.MomentInput) {
    if (value) { return moment(value).unix(); }
    else { return 0; }
  }
}


@Pipe({
  name: "epochToDate"
})
export class EpochToDatePipe implements PipeTransform {
  montharr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    if (value === 9999999999) { return '-'; }

    const date = new Date(value * 1000);

    return date.getDate() + " " + this.montharr[date.getMonth()] + "'" + date.getFullYear().toString().substring(2);
  }
}

@Pipe({
  name: "epochToCalendar"
})
export class EpochToCalendar implements PipeTransform {
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    moment.locale("en", {
      calendar : {
        lastDay : "[Yesterday at] LT",
        sameDay : "[Today at] LT",
        nextDay : "[Tomorrow at] LT",
        lastWeek : "[Last] dddd [at] LT",
        nextWeek : "dddd [at] LT",
        sameElse : "ll [at] LT"
      }
    });
    return moment(value * 1000).calendar();
  }
}

@Pipe({
  name: "epochToLLFormat"
})
export class EpochToLLFormat implements PipeTransform {
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    return moment(value * 1000).format("LL");
  }
}

@Pipe({
  name: "epochToLLLFormat"
})
export class EpochToLLLFormat implements PipeTransform {
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    return moment(value * 1000).format("LLL");
  }
}

@Pipe({
  name: "epochToDay"
})
export class EpochToDay implements PipeTransform {
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    return moment(value * 1000).date();
  }
}

@Pipe({
  name: "epochToMonth"
})
export class EpochToMonth implements PipeTransform {
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    return this.months[moment(value * 1000).month()];
  }
}

@Pipe({
  name: "timeOfDayTotime"
})
export class TimeOfDayToTime implements PipeTransform {
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    return moment((moment().startOf("day").unix() + value) * 1000).format("h:mm a");
  }
}

@Pipe({
  name: "epochToAge"
})
export class EpochToAgePipe implements PipeTransform {

  transform(value: number){
    if (typeof value !== "number"){
      return null;
    }

    const ageDate = new Date(value * 1000);
    return moment().year() - ageDate.getFullYear();
  }
}

@Pipe({
  name: "epochToWeeksAndDays"
})
export class EpochToWeeksAndDaysPipe implements PipeTransform {

  transform(epoch: number){
    const today = moment().startOf("day").unix();
    const diff = today - epoch;
    const weeks = Math.floor(diff / (86400 * 7));
    const days = Math.round(diff % (86400 * 7)  / 86400);
    return `${weeks} weeks and ${days} days`;
  }
}


@Pipe({
  name: "epochToTime"
})
export class EpochToTime implements PipeTransform {
  transform(value: number) {
    if (typeof value !== "number") {
      return "--";
    }
    return moment(value * 1000).format("h:mm a");
  }
}

@Pipe({
  name: "epochToTimeWithoutMeridian"
})
export class EpochToTimeWithoutMeridian implements PipeTransform {
  transform(value: number) {
      if (typeof value !== "number") {
          return "--";
      }
      return moment(value * 1000).format("h:mm");
  }
}

@Pipe({
  name: "epochToMeridian"
})
export class EpochToMeridian implements PipeTransform {
  transform(value: number) {
      if (typeof value !== "number") {
          return "--";
      }
      return moment(value * 1000).format("a");
  }
}

@Pipe({
  name: "taskTimingToTime",
  pure: true
})
export class TaskTimingToTime implements PipeTransform {

  transform(vitaTaskTiming: VitaTaskTiming) {
    return moment().hour(vitaTaskTiming.byhour || 0).minute(vitaTaskTiming.byminute || 0).format("h:mm A");
  }
}

@Pipe({
  name: "freetext",
})
export class FreeText implements PipeTransform {

  transform(text: undefined) {
    if (text === undefined)
    {
      return "";
    }
    else{
      return text;
    }
  }
}

export class VitaTaskTiming {
  title?: string;

  byhour?: number;
  byminute?: number;
  dose ? = 1;
}
