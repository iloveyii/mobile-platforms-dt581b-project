import Mongo from "./base/Mongo";
import { Database } from "./base/Database";

type QuestionT = {
    id: string,
    response: number
};

type QuizT = {
    id: number,
    questions: QuestionT[],
    result: number,
    total: number
};

type UserT = {
    _id?: string;
    email: string;
    password: string;
    quiz?: QuizT[];
};

const COLLECTION = "users";

class User extends Mongo {

    constructor(private user?: UserT) {
        super(COLLECTION, user);
    }

    rules() {
        return {
            email: "required|email",
            name: "required",
        };
    }
}

export default User;