export class AppUser {
    public id: number;
    public username: string;
    public password: string;
    public description: string;
    public imageUrl: string;


    constructor(
        id: number,
        username: string,
        password: string,
        description: string,
        imageUrl: string,
    ) {
        this.id = id
        this.username = username
        this.password = password
        this.description = description
        this.imageUrl = imageUrl
    }

}