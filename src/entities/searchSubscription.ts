

export class searchSubscription{
    constructor(
        public readonly name:string,
        public readonly maxCount:number,
        public readonly price:number,
        public readonly timePeriod:number,
        public readonly description:string,
        public readonly imageUrl:string
    ){}
}