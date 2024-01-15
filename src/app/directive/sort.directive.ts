import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input()appSort!: Array<any>;
  @Input() showicon: boolean;
  constructor(private renderer: Renderer2, private targetElem: ElementRef) {
    this.showicon = false;
  }

  @HostListener("click")
  sortData() {
    // Create Object of Sort Class
    const sort = new Sort();
    // Get Reference Of Current Clicked Element
    const elem = this.targetElem.nativeElement;

    // Get In WHich Order list should be sorted by default it should be set to desc on element attribute
    const order = elem.getAttribute("data-order");
    // Get The Property Type specially set [data-type=date] if it is date field
    const type = elem.getAttribute("data-type");
    // Get The Property Name from Element Attribute
    const property = elem.getAttribute("data-name");
    if (order === "desc") {
      console.log("if" + JSON.stringify(elem));
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");
      if (elem.classList.contains("fa-sort-up")) {
        console.log("ravi");
        elem.classList.remove("fa-sort-up");
        elem.classList.add("fa-sort-down");
      }
      //elem.style.display="none"
    } else {
      console.log("else" + elem.classList);
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
      if (elem.classList.contains("fa-sort-down")) {
        console.log("ravi");
        elem.classList.remove("fa-sort-down");
        elem.classList.add("fa-sort-up");
      }
    }
  }
}
