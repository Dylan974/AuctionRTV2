import { Product } from './product';

export class Enchere {
  public static i: number = 1;
  public id: number;
  // public date_annonce: string;
  // public date_compte_a_rebours: string;
  // public date_demarage: string;
  public prix_init: number;
  public prix_min: number;
  public price: number;
  public decrement: number;
  public status: string;
  public product: Product;
  public vendeur_id: string;

  constructor(status: string, price: number, decrement: number, prix_min: number, product: Product, vendeur_id: string) {
    this.id = Enchere.i;
    this.status = status;
    this.price = price;
    this.prix_init = price;
    this.prix_min = prix_min;
    this.decrement = decrement;
    this.product = product;
    this.vendeur_id = vendeur_id;
    Enchere.i++;
  }
}
