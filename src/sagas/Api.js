import axios from "axios";

const urlLogin = 'http://192.168.1.722:3002/language/login';

function loginUser(user) {
    return axios({
        method: "POST",
        url: urlLogin,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password,
        }),
    })
   
    // console.log('ra api');
    // yield console.log(`response = ${JSON.stringify(response)}`); 
    // return yield (response.status === 201);//true or false
}

export const Api = {
    loginUser,
}