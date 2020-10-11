import ActiveRecord from './base/ActiveRecord';

class Permission extends ActiveRecord {

    constructor(name) {
        super(name);
        this._form = {
            name: '',
            email: '',
            building: '',
            room_number: '',
            status: ''
        };
    }

    validate = (form) => {
      this.form = form;
      return true;
    }

    messages (type) {
      switch (type) {
        case this.types.create_success:
          return [{type: 'success', msg : 'Created Permission successfully'}];
        case this.types.read_success:
            return [{type: 'info', msg : 'Read all Permissions successfully'}];
        case this.types.update_success:
          return [{type: 'warning', msg : 'Updated Permissions successfully'}];
        case this.types.delete_success:
          return [{type: 'error', msg : 'DeletedPermissionr successfully'}];
        default:
          return [{type: 'success', msg : 'Permission success'}];
      }
    }
}

export default Permission;
