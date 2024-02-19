import Shop  from '../model/Shop';
import React from "react";
import FilterService from './FilterService';
import { Product } from '../model/Product';

export class ShopService{
    private static shopsPath:string = "shops";
    private static shopPath:string = "shop";

    //update or insert an shop to local storage
    public static saveShop(shop:Shop){
        let path = ShopService.shopPath + shop.id;
        // add shop id to shop ids list
        let idsList = ShopService.getShopsIdsList();
        idsList.push(shop.id);
        ShopService.saveShopIdsList(idsList);
        // save shop object to local storage
        localStorage.setItem(path, JSON.stringify(shop));
    }

    //remove an element from local storage
    public static removeShop(shop:Shop){
        let path = ShopService.shopPath + shop.id;
        //get ids list and remove shop id from that list
        let idsList = ShopService.getShopsIdsList();
        let index = idsList.indexOf(shop.id);
        if(index != -1){
            idsList.splice(index,1);
        }
        ShopService.saveShopIdsList(idsList);
        // remove shop object from local storage
        localStorage.removeItem(path);
    }
    
    //get a speciffic shop by id from local storage
    public static getShop(id:number):Shop{
        let path = ShopService.shopPath + id;
        return JSON.parse(localStorage.getItem(path) || "{}")
    }

    // get all shops from local storage
    public static getAllShops():Array<Shop>{
        let idsList = ShopService.getShopsIdsList();
        let shopsList = [];
        for(let id of idsList){
            let shop = ShopService.getShop(id);
            shopsList.push(shop);
        }
        return shopsList;
    }

    public static getFilteredShops(search: string,filters:Array<string>):Array<Shop>{
        let idsList = ShopService.getShopsIdsList();
        let shopsList = [];
        for(let id of idsList){
            let shop = ShopService.getShop(id);
            if(FilterService.filter(filters,shop.categories) && FilterService.search(search,shop.title))
                shopsList.push(shop);
        }
        return shopsList;
    }
    public static getUserShops(userId:number):Array<Shop>{
        let idsList = ShopService.getShopsIdsList();
        let shopsList = [];
        for(let id of idsList){
            let shop = ShopService.getShop(id);
            if(shop.ownerid === userId)
                shopsList.push(shop);
        }
        return shopsList;
    }

    private static  getShopsIdsList():Array<number>{
        let shops:Array<number> = JSON.parse(localStorage.getItem(ShopService.shopsPath) || "[]");
        return shops;
    }
    private static saveShopIdsList(shopList:Array<number>){
        var unique = shopList.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        localStorage.setItem("shops", JSON.stringify(unique));
    }
    public static getNewID() :number{
        return 20 + Math.floor(Math.random() * 2000000);
    }
    public static getNewRating() :number{
        return  Math.floor(Math.random() * 5);
    }

    public static findProductInShop(id: number, product: string): any{
        let shop = this.getShop(id);
        console.log(id);
        console.log(shop.title);
        console.log(shop.products);
        if(shop.products.length != 0){
            for(let prod of shop.products) {
                if(prod.name == product){
                    return prod;
                }
            }
        }
        
    }

}