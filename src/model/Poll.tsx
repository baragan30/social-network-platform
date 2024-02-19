export class Poll {
    public id: number;
    public ownerid: number
    public title: string;
    public imageUrl: string
    public options: Array<Option>;
    public description: string;


    constructor(
        id: number,
        ownerid: number,
        title: string,
        imageUrl: string,
        options: Array<Option>,
        description: string,
    ) {
        this.id = id
        this.ownerid = ownerid
        this.title = title
        this.imageUrl = imageUrl
        this.options = options
        this.description = description
    }
}

export class Option {
    public optionName: String;
    public votes: Array<Number>;

    constructor(optionName: String, votes: Array<Number>) {
        this.optionName = optionName
        this.votes = votes
    }

    public static hasVoted(option:Option,id: Number): boolean {
        return option.votes.includes(id);
    }
    public static  vote(option:Option,id: Number,vote:boolean) {
        if(vote == Option.hasVoted(option,id))
            return;
        if(vote == true){
            option.votes.push(id);
        }else{
            const index = option.votes.indexOf(id, 0);
            if (index > -1) {
                option.votes.splice(index, 1);
            }
        }
    }
    public static getNoVotes(option:Option):Number{
        return option.votes.length;
    }
}
