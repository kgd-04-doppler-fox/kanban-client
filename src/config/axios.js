import axios from 'axios'
const instance = axios.create({
    baseURL: "https://evening-shelf-06351.herokuapp.com",
})

export default instance