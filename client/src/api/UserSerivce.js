import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080"
})

class UserService {
    resource = "/users"
    instance = axiosInstance

    async RetrieveAll() {
        return this.instance.get(this.resource)
    }
}

export default UserService