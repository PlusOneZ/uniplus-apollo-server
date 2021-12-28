const { RESTDataSource } = require('apollo-datasource-rest');
const {gateway} = require('../eureka/eureka_client')

class UserAPI extends RESTDataSource {
    constructor() {
        super();
        // gateway.observers.push(this)
        this.baseURL = "http://" + /*gatewayService[0].ipAddr*/ "112.124.59.163" + ":31012/";
    }

    getUser(id) {
        console.log(this.baseURL)
        return this.get(`/api/v1/user/${id}`)
    }

    setUrl(url) {
        // console.log(url)
        this.baseURL = url
        console.log("this url", this.baseURL)
    }


}

module.exports = UserAPI

