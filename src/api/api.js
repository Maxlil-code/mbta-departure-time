import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api-v3.mbta.com',
})

export default apiClient;