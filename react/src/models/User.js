import ActiveRecord from './base/ActiveRecord';

class User extends ActiveRecord {

    constructor(name) {
        super(name);
        this.form = {
            email: '',
            password: '',
            quiz: [],
        };
    }
}

export default User;
