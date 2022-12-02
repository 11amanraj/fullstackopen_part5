import axios from "axios";
const baseUrl = '/api/login';

const login = async (userData) => {
    const response = await axios.post(baseUrl, userData)
    // console.log(response.data.error);
    return response.data
}

export default { login }