import ActiveRecord from './base/ActiveRecord';

class User extends ActiveRecord {

    constructor(name) {
        super(name);
        this._form = {
            name: '',
            email: '',
            address: ''
        };
    }

    validate = (form) => {
      this.form = form;
      return true;
    }
}

export default User;
