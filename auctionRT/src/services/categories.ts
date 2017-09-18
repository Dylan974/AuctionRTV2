import { Categorie } from '../models/categorie';

export class CategoriesService {

  private categories: Categorie[] = [];

  addCategorie(categorie: Categorie){
    if(this.categories.length == 0)
      this.categories.push(categorie);
  }

  addCategories(categories: Categorie[]){
    if(this.categories.length == 0)
      this.categories.push(...categories);
  }

  removeCategorie(index: number){
    this.categories.splice(index, 1);
  }

  removeAllCategories(){
    this.categories = [];
  }

  getCategories(){
    return this.categories;
  }

  getCategorieName(id: number){
    console.log(this.categories);
    return this.categories.find((categorie: Categorie) => {
      return id == categorie.id;
    }).name;
  }

}
