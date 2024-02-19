import { Event, EventCategory } from '../model/Event';
import React from "react";
import FilterService from './FilterService';
import { AppUser } from '../model/AppUser';
export class EventService{
   
    private static eventsPath:string = "events";
    private static eventPath:string = "event";

    //update or insert an event to local storage
    public static saveEvent(event:Event){
        let path = EventService.eventPath + event.id;
        // add event id to event ids list
        let idsList = EventService.getEventsIdsList();
        idsList.push(event.id);
        EventService.saveEventIdsList(idsList);
        // save event object to local storage
        localStorage.setItem(path, JSON.stringify(event));
    }

    //remove an element from local storage
    public static removeEvent(event:Event){
        let path = EventService.eventPath + event.id;
        //get ids list and remove event id from that list
        let idsList = EventService.getEventsIdsList();
        let index = idsList.indexOf(event.id);
        if(index != -1){
            idsList.splice(index,1);
        }
        EventService.saveEventIdsList(idsList);
        // remove event object from local storage
        localStorage.removeItem(path);
    }
    
    //get a speciffic event by id from local storage
    public static getEvent(id:number):Event{
        let path = EventService.eventPath + id;
        return JSON.parse(localStorage.getItem(path) || "{}")
    }

    // get all events from local storage
    public static getAllEvents():Array<Event>{
        let idsList = EventService.getEventsIdsList();
        let eventsList = [];
        for(let id of idsList){
            let event = EventService.getEvent(id);
            eventsList.push(event);
        }
        return eventsList;
    }

    public static getFilteredEvents(search: string,filters:Array<string>):Array<Event>{
        let idsList = EventService.getEventsIdsList();
        let eventsList = [];
        for(let id of idsList){
            let event = EventService.getEvent(id);
            if(FilterService.filter(filters,event.categories) && FilterService.search(search,event.title))
                eventsList.push(event);
        }
        return eventsList;
    }
    
    public static getUserEvents(userId:number):Array<Event>{
        let idsList = EventService.getEventsIdsList();
        let eventsList = [];
        for(let id of idsList){
            let event = EventService.getEvent(id);
            if(event.ownerid === userId)
                eventsList.push(event);
        }
        return eventsList;
    }

    public static getAttendedEvents(user: AppUser): Array<Event> {
        let events = this.getAllEvents();
        let eventsList = [];
        for(let event of events){
            for(let att of event.attendanceList){
                if(att.user.id === user.id){
                    eventsList.push(event);
                }
            }
           
        }
        return eventsList;
    }

    private static getEventsIdsList():Array<number>{
        let events:Array<number> = JSON.parse(localStorage.getItem(EventService.eventsPath) || "[]");
        return events;
    }
    private static saveEventIdsList(eventList:Array<number>){
        var unique = eventList.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        localStorage.setItem("events", JSON.stringify(unique));
    }
    public static getNewID() :number{
        return 20 + Math.floor(Math.random() * 2000000);
    }
    public static getNewRating() :number{
        return  Math.floor(Math.random() * 5);
    }
}