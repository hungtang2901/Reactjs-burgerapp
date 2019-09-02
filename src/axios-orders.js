import axios from 'axios';

const instance = axios.create({
    baseURL: "https://reactburger-81f5a.firebaseio.com/"
})

export default instance;