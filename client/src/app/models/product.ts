export class Product{
   constructor(
      public _id: string,
      public name: string,
      public description: string,
      public image: string,
      public prize: number,
      public stock: number,
      public category: string
   ){}
}
