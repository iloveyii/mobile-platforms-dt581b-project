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

    validate = (form) => {
      this.form = form;
      return true;
    }
}

export default User;
