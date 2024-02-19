import AppMessage from "../model/AppMessage";


export default class MessageService{
    private static messagesPath:string = 'messages'

    //insert an message to local storage
    public static saveMessage(message:AppMessage){
        let messageList = this.getMessagesList(message.idReceiver,message.idTransceiver);
        let path = this.getMessagePathByMessage(message);
        messageList.push(message);
        localStorage.setItem(path, JSON.stringify(messageList));
    }


    public static getMessagesList(idReceiver:number, idTransceiver:number):Array<AppMessage>{
        let path = this.getMessagePathByIds(idReceiver,idTransceiver);
        return JSON.parse(localStorage.getItem(path) || "[]")

    }
    private static getMessagePathByMessage(message:AppMessage):string{
        return this.getMessagePathByIds(message.idReceiver,message.idTransceiver);
    }
    private static getMessagePathByIds(idReceiver:number, idTransceiver:number):string{
        if(idReceiver <= idTransceiver)
            return this.messagesPath + idReceiver + "" + idTransceiver;
        return this.messagesPath + idTransceiver + "" + idReceiver;
    }

}