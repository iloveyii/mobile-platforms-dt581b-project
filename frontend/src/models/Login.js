import ActiveRecord from './base/ActiveRecord';
import axios from "axios";

class Login extends ActiveRecord {
    _adminList = [
        {
            value: '1',
            label: 'Yes'
        },
        {
            value: '0',
            label: 'No'
        },
    ];

    constructor(name) {
        super(name);
        this.form = {
            email: 'root',
            password: 'root',
            authenticated: false
        };
    }
    // INTERFACE Select
    onSelect2 = (item) => {
        this.form.admin = item.value;
    };

    newApiRead = (user) => {
        console.log('Inside api newApiRead', user);
        // Check if GET api/v1/logins OR api/v1/logins/1 is called
        let auth = {}, headers = {}, suffix = '';

        if(user && user.data && Object.keys(user.data).length > 0) {
            console.log('Inside api newApiRead if', JSON.stringify(user));
            auth =  {
                email: user.data.email,
                password: user.data.password
            };
            headers = {
                email: user.data.email,
                password: user.data.password
            };
            suffix = '/1';
        }
        return axios.get(this.server + suffix, {
            auth: auth,
            headers: headers
        }).then(res => res.data).catch(error => {
            throw new Error(error);
            console.dir(error);
        });
    };

    get api() {
        const newApi = super.api;
        newApi.read = this.newApiRead;
        return newApi;
    }

}

export default Login;
