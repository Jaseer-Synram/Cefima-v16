import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
  pure: true,
})
export class SortPipe implements PipeTransform {
  transform(list: any[], column: string): any {
    console.log("sorted");
    let sortedArray = list.sort((a, b) => {
      if (a[column] > b[column]) {
        console.log(a[column]);
      }
      if (a[column] < b[column]) {
        return -1;
      }
      return 0;
    });
    return sortedArray;
  }
}
