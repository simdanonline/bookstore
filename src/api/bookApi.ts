import axios from "axios";

export default axios.create({
    baseURL: "https://api.itbook.store/1.0"
})

// export const secondApi = axios.create({
//     baseURL: "http://private-anon-52de9c0b70-bookstore.apiary-mock.com"
// })