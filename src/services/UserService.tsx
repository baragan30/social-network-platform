import { AppUser } from '../model/AppUser';
import { PopulationService } from './PopulationService';


export default class UserService{
    private static usersPath:string = 'users'
    private static userPath:string = 'user'
    private static authentificateUserPath:string = 'authentificateuser'

    //update or insert an user to local storage
    public static saveUser(user:AppUser){
        let path = UserService.userPath + user.id;
        // add user id to user ids list
        let idsList = UserService.getUsersIdsList();
        idsList.push(user.id);
        UserService.saveUserIdsList(idsList);
        // save user object to local storage
        localStorage.setItem(path, JSON.stringify(user));
    }


    //save user id if it's an user with this username and password in local storage/
    // throw an Error else
    public static authentificateUser(username:string,password:string){
        let users = this.getAllUsers();
        for (let user of users){
            if(user.username === username && user.password === password){
                localStorage.setItem(this.authentificateUserPath, JSON.stringify(user.id));
                return;
            }
        }
        throw new Error("Username or password are incorect");
    }

    public static registerUser(username: string, password: string, repeatPassword: string) {
        if(password === repeatPassword) {
            const index = PopulationService.USERS.length;
            const newUser = new AppUser(
                index+1,
                username,
                password,
                "I'm Trotus with you if you are Trotus with me",
                "data:image/jpeg;base64,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",
            );
            this.saveUser(newUser);
        }
        else throw new Error("Passwords do not match");       
    }
    
    public static getAuthentificatedUser():AppUser{
        let userId = JSON.parse(localStorage.getItem(this.authentificateUserPath) || "-1") as number;
        if(userId === -1)
            throw new Error("No user authentificated");
        return this.getUser(userId);
    }


    //remove an element from local storage
    public static removeUser(user:AppUser){
        let path = UserService.userPath + user.id;
        //get ids list and remove user id from that list
        let idsList = UserService.getUsersIdsList();
        let index = idsList.indexOf(user.id);
        if(index != -1){
            idsList.splice(index,1);
        }
        UserService.saveUserIdsList(idsList);
        // remove user object from local storage
        localStorage.removeItem(path);
    }
    
    //get a speciffic user by id from local storage
    public static getUser(id:number):AppUser{
        let path = UserService.userPath + id;
        return JSON.parse(localStorage.getItem(path) || "{}")
    }

    // get all users from local storage
    public static getAllUsers():Array<AppUser>{
        let idsList = UserService.getUsersIdsList();
        let usersList = [];
        for(let id of idsList){
            let user = UserService.getUser(id);
            usersList.push(user);
        }
        return usersList;

    }

    // get curent user friends from local storage
    public static getCurentUserFriends():Array<AppUser>{
        let curentUserId = this.getAuthentificatedUser().id;
        let idsList = UserService.getUsersIdsList();
        let usersList = [];
        for(let id of idsList){
            if(id != curentUserId){
                let user = UserService.getUser(id);
                usersList.push(user);     
            }

        }
        return usersList;
    }

    private static  getUsersIdsList():Array<number>{
        let users:Array<number> = JSON.parse(localStorage.getItem(UserService.usersPath) || "[]");
        return users;
    }

    private static saveUserIdsList(userList:Array<number>){
        var unique = userList.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        localStorage.setItem(UserService.usersPath, JSON.stringify(unique));
    }
}