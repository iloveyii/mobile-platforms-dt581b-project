
import Model from './Model';

class ActiveRecord extends Model {
    _mode = 'create';
    _uploadProgress = 0;
    _form = {};

    constructor(name) {
        super(name);
        this.debug = true;
        this.setUploadProgress = this.setUploadProgress.bind(this);
    }

    get __class() {
        return 'ActiveRecord';
    }

    set form(form) {
        this._form = {};
        for (let key in form) { // ?
            this._form[key] = form[key];
        }
        return this;
    }

    get form() {
        return this._form;
    }

    setUploadProgress(value) {
        this._uploadProgress = value;
        if(value > 95) this.resetForm();
        this._forceUpdate();
    }

    get uploadProgress() {
        return this._uploadProgress;
    }

    /**
     * Avoid problem of bound to unbound controls on form
     */
    resetForm() {
        Object.keys(this._form).forEach(key => {
            this._form[key] = '';
        });
        this._uploadProgress = 0;
        return this._form;
    }

    submitForm(createAction, updateAction) {
        const formData = new FormData();
        Object.keys(this.form).map(key => {
            formData.append(key, this.form[key]);
        });

        this.hasId ? updateAction({formData, action: this.setUploadProgress}) : createAction({
            formData,
            action: this.setUploadProgress
        });
    }

    get hasId() {
        if (this.form['id'] && this.form['id'].length > 0) return true;
        if (this.form['_id'] && this.form['_id'].length > 0) return true;
        return false;
    }

    errors = (actions) => {
      const errors = [];
      console.log(Object.keys(actions));
      Object.keys(actions).map(id => {
        if(actions[id].res && ( actions[id].res.status === 'fail' || actions[id].res.status === false ) ) {
          console.log('Err in RESP', actions[id].res);
          if( (!actions[id].res.shown) || (actions[id].res.shown === false) ) {
            errors.push(actions[id].res);
          }
          actions[id].res.shown = true;
        }
      });
      return errors;
    }

    create = (form) =>  {
      return true;
    }
}

export default ActiveRecord;
