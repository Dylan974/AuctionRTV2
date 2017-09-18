export class Product {
  public static i: number = 1;
  private id: number;
  public name: string;
  public img: string [];
  public description: string;
  public categorieId: number;

  constructor(name: string, description: string, categorieId: number) {
    this.name = name;
    // this.img = img;
    this.description = description;
    this.categorieId = categorieId;
    this.id = Product.i;
    Product.i++;
  }
}
