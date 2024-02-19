import { Event, EventCategory } from "../model/Event";

export default class FilterService{
    public static search(search:String, title:string) :boolean{
        let filters = search.toLowerCase().match(/\b(\w+)\b/g) || '';
        for(const filter of filters){
            if(!title.toLowerCase().includes(filter))
                return false;
        }   
       
        return true;
    }
    public static filter(filters:Array<string>,categories:Array<EventCategory>){
        for(let filter of filters){
            let category = filter as unknown as EventCategory;
            category = EventCategory[category] as unknown as EventCategory;
            if(!categories.includes(category))
                return false;
        } 
        return true;
    }
}