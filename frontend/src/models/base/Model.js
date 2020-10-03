import {call, put} from 'redux-saga/effects';
import axios from "axios";
import shortid from "shortid";
import {apiServer} from "../../common/constants";

class Model {

    // Constructor - Name, forceUpdate
    constructor(name) {
        this.name = name;
        this.forceUpdate = () => null;
        this.server = apiServer + '/api/v1/' + name;
        this.debug = true;
    }

    forceUpdate = () => null;

    log(msg) {
        if (this.debug) console.log(msg);
    }

    // Subscribers


    // CRUD constants
    get types() {
        return {
            create: this.name + '.create',
            create_success: this.name + '.create.success',
            create_fail: this.name + '.create.fail',

            read: this.name + '.read',
            read_success: this.name + '.read.success',
            read_fail: this.name + '.read.fail',

            edit: this.name + '.edit',
            edit_success: this.name + '.edit.success',
            edit_fail: this.name + '.edit.fail',

            update: this.name + '.update',
            update_success: this.name + '.update.success',
            update_fail: this.name + '.update.fail',

            delete: this.name + '.delete',
            delete_success: this.name + '.delete.success',
            delete_fail: this.name + '.delete.fail',
        }
    }

    // ACTIONS
    get actions() {
        return {
            create: (form) => ({type: this.types.create,payload: {id:shortid.generate(), type:this.types.create, form, list:[], method:'POST'}}),
            create_success: (action, response) => ({type: this.types.create_success, payload: {id:action.payload.id, type: action.payload.type, status:'success', form: response.data, list:response.data, errors: {}} }),
            create_fail: (action, error) => ({type: this.types.create_fail, payload: {id:action.payload.id, type: action.payload.type, status:'fail', form:action.payload.form, list:[], errors: [{msg: error}]}}),


            //{id, type, form, list, method} - REQUEST
            read: (form) => ({type: this.types.read, payload: {id:shortid.generate(), type:this.types.read, form, list:[], method:'GET'}}),
            // {id, type, status, form, list, errors} - RESPONSE
            read_success: (action, response) => ({type: this.types.read_success, payload: {id:action.payload.id, type: action.payload.type, status:'success', form: response.data, list:response.data, errors: {}} }),
            // {id, status, form, list, errors}
            read_fail: (action, error) => ({type: this.types.read_fail, payload: {id:action.payload.id, type: action.payload.type, status:'fail', form:action.payload.form, list:[], errors: [{msg: error}]}}),

            update: (form) => ({type: this.types.update, payload: {id:shortid.generate(), type:this.types.delete, form, list:[], method:'PUT'}}),
            update_success: (action, response) => ({type: this.types.update_success, payload: {id:action.payload.id, type: action.payload.type, status:'success', form: response.data, list:response.data, errors: {}} }),
            update_fail: (action, error) => ({type: this.types.update_fail, payload: {id:action.payload.id, type: action.payload.type, status:'fail', form:action.payload.form, list:[], errors: [{msg: error}]}}),

            edit: (data) => ({type: this.types.edit, payload: {data}}),
            edit_success: (data) => ({type: this.types.edit_success, payload: {data}}),
            edit_fail: (data) => ({type: this.types.edit_fail, payload: {data}}),

            delete: (form) => ({type: this.types.delete, payload: {id:shortid.generate(), type:this.types.delete, form, list:[], method:'DELETE'}}),
            delete_success: (action, response) => ({type: this.types.delete_success, payload: {id:action.payload.id, type: action.payload.type, status:'success', form: response.data, list:response.data, errors: {}} }),
            delete_fail: (action, error) => ({type: this.types.delete_fail, payload: {id:action.payload.id, type: action.payload.type, status:'fail', form:action.payload.form, list:[], errors: [{msg: error}]}}),

        };
    }

    // REDUCERS
    get reducers() {
        const initState = {
            form: {},
            list: [],
            actions:
                {
                  id1: {
                    req: {id: 1, type: 'user.read', form:{}, list:[], method: 'get'},
                    res: {id: 1,status: 'success', form:{}, list:[], errors:{}}
                  },
                  id2: {
                    req: {id: 2, type: 'user.read', form:{}, list:[], method: 'get'},
                    res: {id: 2,status: 'success', form:{}, list:[], errors:{}}
                  }
                },
        };

        let newState = {};

        const reducer = (state = initState, action = {}) => {

            switch (action.type) {
                case this.types.update: // Place action in state's actions
                case this.types.delete:  // Place action in state's actions
                case this.types.create : // Place action in state's actions
                case this.types.read:
                    this.log('Inside Reducer read action is :  ');
                    this.log(action);
                    var {id, type, form, list, method} = action.payload;
                    // Place action in state's actions
                    newState = {...state};
                    newState.actions[id] = {
                      req: action.payload
                    };
                    return newState;
                    break;

                case this.types.create_success : // Put data in list
                case this.types.read_success:
                    console.log('READ/CREATE SUCCESS HERE ', action)
                    var {id, type, status, form, list, errors} = action.payload;
                    if(status === 'success') { // Put data in list
                      newState = {...state, list, form}; // fill both list and form from new data
                      if(newState.actions[id]) {
                        newState.actions[id]['res'] = action.payload;
                      }
                    } else { // Place res in action's res success === fail is on server side and not http error
                      console.log('ID not exist in actions');
                      newState = {...state}; // there was an error (server side) therefore don't touch list and form
                      if(newState.actions[id]) {
                        newState.actions[id]['res'] = action.payload;
                      }
                    }

                    return newState;
                    break;

                case this.types.update_success: // Put data in list
                case this.types.delete_success: // Put data in list
                  console.log('DELETE SUCCESS HERE ', action)
                  var {id, type, status, form, list, errors} = action.payload;
                  if(status === 'success') { // Put data in list
                    newState = {...state}; // fill both list and form from new data
                    if(newState.actions[id]) {
                      newState.actions[id]['res'] = action.payload;
                    }
                  } else { // Place res in action's res success === fail is on server side and not http error
                    console.log('ID not exist in actions');
                    newState = {...state}; // there was an error (server side) therefore don't touch list and form
                    if(newState.actions[id]) {
                      newState.actions[id]['res'] = action.payload;
                    }
                  }

                  return newState;
                  break;

                case this.types.update_fail: // handle http exceptions
                case this.types.delete_fail: // handle http exceptions
                case this.types.create_fail : // handle http exceptions
                case this.types.read_fail: // handle http exceptions
                    console.log('READ FAIL in redu', action);
                    var {id, type, status, form, list, errors} = action.payload;
                    // Place res in action's res success === fail is on server side and not http error
                    newState = {...state};
                    if(newState.actions[id]) {
                      newState.actions[id]['res'] = action.payload;
                    } else {
                      console.log('Action with id not found', action)
                    }
                    return newState;
                    break;

                default:
                    this.log('Inside default reducer of class ' + this.name );
                    return state;
            }
        };

        return reducer;
    }


    // SAGAS
    get sagas() {
        const $this = this;// new Model('show');

        const create = function* (action) {
            console.log('Action in saga', action.payload);
            try {
                const response = yield call($this.api.create, action.payload);
                console.log('CREATE ', response);
                if (true || response && Array.isArray(Object.keys(response))) {
                    console.log('CREATE if', response);
                    yield put($this.actions.create_success(action, response));
                    // yield put($this.actions.read());
                } else {
                    console.log('CREATE fail', response);
                    yield put($this.actions.create_fail(action, response));
                }
            } catch (err) {
                console.log('CREATE err', err);
                yield put($this.actions.create_fail(action, err.message));
            }
        };

        const read = function* (action) {
            try {
                const response = yield call($this.api.read, action.payload);
                if (true || Array.isArray(response)) {
                    console.log('READ saga data received ', response)
                    yield put($this.actions.read_success(action, response));
                } else {
                    yield put($this.actions.read_fail(action, response));
                }
            } catch (err) {
                console.log('ERROR read : ', err.message);
                yield put($this.actions.read_fail(action, err.message));
            }
        };

        const update = function* (action) {
            try {
                const data = yield call($this.api.update, {
                    formData: action.payload.data.formData,
                    action: (d) => action.payload.data.action ? action.payload.data.action(d) : null
                });
                if (data && Array.isArray(Object.keys(data))) {
                    yield put($this.actions.update_success(data));
                    yield put($this.actions.read());
                } else {
                    yield put($this.actions.update_fail(data));
                }
            } catch (err) {
                console.log(err);
                yield put($this.actions.update_fail(err));
            }
        };

        const deleted = function* (action) {
            try {
                // IF reset
                    console.log('deleted saga ', action)
                    const response = yield call($this.api.delete, action.payload);
                    if (true || Array.isArray(Object.keys(response))) {
                        yield put($this.actions.delete_success(action, response));
                    } else {
                        yield put($this.actions.delete_fail(action, response));
                    }
            } catch (err) {
                yield put($this.actions.delete_fail(action, err.message));
            }
        };

        return {
            create,
            read,
            update,
            deleted,
        }
    }

    // API
    get api() {
        return {
            read: (payload) => console.log('API read', payload) ||
                axios.get(payload.form.id ? this.server + `/${payload.form.id}` : this.server).then(res => res.data).catch(error => {
                    console.dir(error);
                    throw new Error(error);
                }),
            create: (payload) => {
                const config = {
                    onUploadProgress: function (progressEvent) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        payload.action && payload.action(percentCompleted);
                    }
                };
                console.log('API create', payload);
                return axios.post(this.server, payload.form, config).then(res => res.data).catch(error => {
                    console.dir(error);
                    throw new Error(error);
                })
            },
            delete: (payload) =>
                axios.delete(this.server + '/' + payload.form.id).then(res => res.data).catch(error => {
                    console.dir(error);
                    throw new Error(error);
                }),
            update: (data) => {
                const formData = data.formData;
                const config = {
                    onUploadProgress: function (progressEvent) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        data && data.action(percentCompleted);
                    }
                };
                return axios.put(this.server + '/' + formData.getAll('_id'), formData, config).then(res => {
                    console.log('Update response: ', res);
                    return res.data;
                }).catch(error => {
                    throw new Error(error);
                    console.dir(error);
                })
            }
        }
    }

}

export default Model;
