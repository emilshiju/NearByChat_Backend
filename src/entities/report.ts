
export class report{
    constructor(
        public readonly reporter:string,
        public readonly reportedUser:string,
        public readonly reason:string
    ){}
}