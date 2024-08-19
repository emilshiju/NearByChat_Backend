


interface TotalSum {
    _id: null;
    totalSum: number;
  }
  
  interface DataCount {
    date: string;
    count: number;
  }
  
 export  interface ResponseData {
    totalAmountDaily: TotalSum[];
    countAlluser: number;
    countPayment: number;
    results: DataCount[];
    countReport:number;
    resultsOfSubscribed: DataCount[];
  }
