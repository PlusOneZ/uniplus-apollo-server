const { RESTDataSource } = require('apollo-datasource-rest');
const {gateway} = require('../eureka/eureka_client')

class UserAPI extends RESTDataSource {
    constructor() {
        super();
        // gateway.observers.push(this)
        this.baseURL = gateway.ip
    }

    async getUser(id) {
        let temp = await this.get(`/api/v1/user/${id}`)
        let user = {
            id: temp.userId,
            schoolId: temp.userSchoolId,
            nickname: temp.userNickName,
            phone: temp.userPhone,
            createTime: temp.userCreateTime,
            gender: temp.userGender ?  "女" : "男",
            avatarLink: temp.userAvatarLink,
            role: temp.userRole,
            realName: temp.userRealName,
        }
        return user
    }

    setUrl(url) {
        // console.log(url)
        this.baseURL = url
        console.log("this url", this.baseURL)
    }
}

module.exports = UserAPI

