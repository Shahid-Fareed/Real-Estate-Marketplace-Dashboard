import requests from "./httpService"

const Blog = {
    List(body) {
        return requests.get(`/news/`, body)
    },
    create(body) {
        return requests.post(`/news/create`, body)
    },
    delete(id,body) {
        return requests.get(`/news/delete/${id}`, body)
    },
    details(id,body) {
        return requests.get(`/news/detail/${id}`, body)
    },
    update(id,body) {
        return requests.post(`/news/update/${id}`, body)
    }
}

export default Blog
