import axios from "axios";

// create axios instance and specify the baseURL parameter.
// put in the url of the backend server
export default axios.create({
    baseURL: "http://localhost:3000/api/v1/restaurants",
});