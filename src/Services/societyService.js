import requests from "./httpService"

const SocietyService = {
    getSociety(body) {
        return requests.get(`/topsocities/`, body)
    },
    createSociety(body) {
        return requests.post(`/topsocities/create`, body)
    },
    deleteSociety(id, body) {
        return requests.get(`/topsocities/delete/${id}`, body)
    },
    updateSocietyStatus(id, body) {
        return requests.post(`/topsocities/updateStatus/${id}`, body)
    },
    detail(id,body) {
        return requests.get(`/topsocities/detail/${id}`, body)
    },
    update(id,body) {
        return requests.post(`/topsocities/update/${id}`, body)
    },
}

export default SocietyService
