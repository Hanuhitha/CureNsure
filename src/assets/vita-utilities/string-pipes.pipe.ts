import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "nameCase",
  pure: true
})
export class NameCasePipe implements PipeTransform {

  transform(string: string) {
    if (string) { return string.replace(/\w\S*/g, (txt: string) =>txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); }
    else { return string; }
  }
}
