import { AppUser } from "./AppUser";

export class Review {
    public user: AppUser;
    public review: string;
    public rating: number;
  

    constructor(
        user: AppUser,
        review: string,
        rating: number,
    ) {
        this.user = user
        this.review = review
        this.rating = rating
    } 
}   
