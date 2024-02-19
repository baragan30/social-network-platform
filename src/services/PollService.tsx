import { Poll } from "../model/Poll";
import FilterService from "./FilterService";


export class PollService {
    private static pollsPath: string = "polls";
    private static pollPath: string = "poll";

    //update or insert a poll to local storage
    public static savePoll(poll: Poll) {
        let path = PollService.pollPath + poll.id;
        // add poll id to poll ids list
        let idsList = PollService.getPollsIdsList();
        idsList.push(poll.id);
        PollService.savePollIdsList(idsList);
        // save poll object to local storage
        localStorage.setItem(path, JSON.stringify(poll));
    }

    //remove an poll from local storage
    public static removePoll(poll: Poll) {
        let path = PollService.pollPath + poll.id;
        //get ids list and remove poll id from that list
        let idsList = PollService.getPollsIdsList();
        let index = idsList.indexOf(poll.id);
        if (index != -1) {
            idsList.splice(index, 1);
        }
        PollService.savePollIdsList(idsList);
        // remove poll object from local storage
        localStorage.removeItem(path);
    }

    //get a specific poll by id from local storage
    public static getPoll(id: number): Poll {
        let path = PollService.pollPath + id;
        return JSON.parse(localStorage.getItem(path) || "{}")
    }

    // get all polls from local storage
    public static getAllPolls(): Array<Poll> {
        let idsList = PollService.getPollsIdsList();
        let pollsList = [];
        for (let id of idsList) {
            let poll = PollService.getPoll(id);
            pollsList.push(poll);
        }
        return pollsList;
    }

    public static getFilteredPolls(search: string, filters: Array<string>): Array<Poll> {
        let idsList = PollService.getPollsIdsList();
        let pollsList = [];
        for (let id of idsList) {
            let poll = PollService.getPoll(id);
            if (FilterService.search(search, poll.title))
                pollsList.push(poll);
        }
        return pollsList;
    }

    private static getPollsIdsList(): Array<number> {
        let polls: Array<number> = JSON.parse(localStorage.getItem(PollService.pollsPath) || "[]");
        return polls;
    }

    private static savePollIdsList(pollList: Array<number>) {
        var unique = pollList.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        localStorage.setItem("polls", JSON.stringify(unique));
    }

    public static getNewID(): number {
        return 20 + Math.floor(Math.random() * 2000000);
    }

}