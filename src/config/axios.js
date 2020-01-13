import axios from 'axios';

const ClienteAxios = axios.create({
    baseURL: 'http://localhost:4000'
})

export default ClienteAxios;