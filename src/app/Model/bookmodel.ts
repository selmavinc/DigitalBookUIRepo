export interface Book {
    bookId: number;
    bookName : string;
    categoryId : number;
    price : number;
    publisher : string;
    userId : number;
    publishedDate : Date,
    description : string,
    active : boolean
}