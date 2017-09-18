export class Categorie {
  public static i: number = 1;
  public id: number;
  public name: string;

  constructor(name:string){
    this.name = name;
    this.id = Categorie.i;
    Categorie.i++;
  }
}
