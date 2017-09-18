import { Product } from './product';

export class Enchere {
  public id: string;
  public date_annonce: string;
  public date_compte_a_rebours: string;
  public date_demarage: string;
  public prix_init: number;
  public prix_min: number;
  public price: number;
  public decrement: number;
  public status: string;
  public product: Product;
  public vendeur_id: number;

  constructor(id: string, status: string, price: number, product: Product) {
    this.id = id;
    this.status = status;
    this.price = price;
    this.product = product;
  }
}
