const {RESTDataSource} = require('apollo-datasource-rest');
const {gateway} = require('../eureka/eureka_client')

class PostAPI extends RESTDataSource {
    constructor() {
        super();
        // gateway.observers.push(this)
        this.baseURL = gateway.ip;
    }

    async getPost(id) {
        let temp = await this.get(`/api/v1/post/post/${id}`)
        let post = {
            id: temp.postId,
            authorId: temp.postUserId,
            postTime: temp.postTime,
            content: temp.postContent,
            title: temp.postTitle,
            areaId: temp.postAreaId,
            likeCount: temp.postLikeCount,
            replyCount: temp.postReplyCount
        }
        return post
    }

    async getArea(id) {
        let list = await this.get(`/api/v1/post/area/${id}`)
        let ret = []
        for (let i = 0; i < list.length; i++) {
            let temp = list[i]
            ret.push({
                id: temp.postId,
                authorId: temp.postUserId,
                postTime: temp.postTime,
                content: temp.postContent,
                title: temp.postTitle,
                areaId: temp.postAreaId,
                likeCount: temp.postLikeCount,
                replyCount: temp.postReplyCount
            })
        }
        let area = null
        if (ret.length !== 0) {
            area = {
                id: id,
                posts: ret
            }
        }
        return area
    }

    async getReplyOfPost(postId) {
        let list = await this.get(`/api/v1/post/reply/post/${postId}`)
        let ret = []
        for (let i = 0; i < list.length; i++) {
            let temp = list[i]
            ret.push({
                id: temp.replyId,
                time: temp.replyTime,
                content: temp.replyContent,
                likeCount: temp.replyLikeCount,
                author: temp.replyLikeCount,
            })
        }
        return ret
    }

    // getReplyOfUser(userId) {
    //     return this.get(`/reply/user/${userId}`)
    // }

}

module.exports = PostAPI