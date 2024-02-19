export default class AppMessage {
    public idTransceiver: number;
    public idReceiver: number;
    public message: string
    constructor(idTransceiver: number, idReceiver: number, message: string) {
        this.idTransceiver = idTransceiver
        this.idReceiver = idReceiver
        this.message = message
    }
}