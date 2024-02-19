import React from 'react';
import internal from 'stream';
import { AppUser } from './AppUser';
import { Attend } from './Attend';
import { Review } from './Review';

export class Event {
    public id: number;
    public ownerid: number
    public title: string;
    public imageUrl: string
    public rating: number;
    public categories: Array<EventCategory>;
    public description: string;
    public date: string;
    public location: string;
    public attendanceList: Array<Attend>;
    public reviews: Array<Review>


    constructor(
        id: number,
        ownerid: number,
        title: string,
        imageUrl: string,
        rating: number,
        categories: Array<EventCategory>,
        description: string,
        date: string,
        location: string,
        attendanceList: Array<Attend>,
        reviews: Array<Review>
    ) {
        this.id = id
        this.ownerid = ownerid
        this.title = title
        this.imageUrl = imageUrl
        this.rating = rating
        this.categories = categories
        this.description = description
        this.date = date
        this.location = location
        this.attendanceList = attendanceList
        this.reviews = reviews
    } 
}   

export enum EventCategory {
    FOOTBALL, SWIMMING, TENNIS, SKI
}