import { EventCategory } from "./Event";
import { Product } from "./Product";

export default class Shop {
  public id: number;
  public ownerid: number
  public title: string;
  public imageUrl: string
  public schedule: string;
  public categories: Array<EventCategory>;
  public description: string;
  public location: string;
  public products: Array<Product>;


  constructor(
    id: number,
    ownerid: number,
    title: string,
    imageUrl: string,
    schedule: string,
    categories: Array<EventCategory>,
    description: string,
    location: string,
    products: Array<Product>
  ) {
    this.id = id
    this.ownerid = ownerid
    this.title = title
    this.imageUrl = imageUrl
    this.schedule = schedule
    this.categories = categories
    this.description = description
    this.location = location
    this.products = products
  }
}