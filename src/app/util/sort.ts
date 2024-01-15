export class Sort {
  private sortOrder = 1;
  private collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
  });
  constructor() {}

  public startSort(proerty: any, order: any, type = '') {
    console.log(order);
    if (order === 'asc') {
      this.sortOrder = -1;
    }
    return (a: any, b: any) => {
      if (type === 'date') {
        return this.sortData(new Date(a[proerty]), new Date(b[proerty]));
      } else {
        return this.collator.compare(a[proerty], b[proerty]) * this.sortOrder;
      }
    };
  }
  private sortData(a: any, b: any) {
    if (a < b) {
      return -1 * this.sortOrder;
    } else if (a > b) {
      return 1 * this.sortOrder;
    } else {
      return 0 * this.sortOrder;
    }
  }
}
