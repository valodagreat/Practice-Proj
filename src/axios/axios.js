import axios from "axios";

const instance = axios.create({
    baseURL: "https://immense-bastion-62742.herokuapp.com",
});

export default instance;