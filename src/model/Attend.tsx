import React from 'react';
import internal from 'stream';
import { AppUser } from './AppUser';

export class Attend {
    public user: AppUser;
    public isChecked: boolean;

    constructor(
        user: AppUser,
        isChecked: boolean
    ) {
        this.user = user
        this.isChecked = isChecked
    } 
}   

export enum EventCategory {
    FOOTBALL, SWIMMING, TENNIS
}