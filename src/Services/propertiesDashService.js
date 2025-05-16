import requests from "./httpService"


const propertiesDashService = {
  allProperties(body) {
    return requests.get(`/properties`, body)
  },
  allPendingVerifiedProperties(body) {
    return requests.get(`/properties/properties-to-verify`, body)
  },
  updatePropertyVerify(body, pid, type) {
    return requests.get(`/properties/adminverifyProperty/${pid}/${type}`, body)
  },
  allUserProperties(body, id) {
    return requests.get(`/properties/user/${id}`, body)
  },
  allAgencyProperties(body, id) {
    return requests.get(`/properties/agency/${id}`, body)
  },
  boostProperty(body, Uid, Pid, type) {
    return requests.get(`/properties/boostProperty/${Uid}/${Pid}/${type}`, body)
  },
  allCities(body) {
    return requests.get(`/topsocities/allcities`, body)
  },
  areaByCity(body, id, key) {
    return requests.get(`/topsocities/cityArea?id=${id}&keyword=${key}`, body)
  },
  addProperty(body) {
    return requests.post(`/properties/create`, body)
  },
  updatePropertyStatus(body, id) {
    return requests.post(`/properties/updateStatus/${id}`, body)
  },
  deleteProperty(id,body) {
    return requests.get(`/properties/delete/${id}`, body)
  },
  getPropertyId(id,body) {
    return requests.get(`/properties/detail/${id}`, body)
  },
  updatePropertyId(id,body) {
    return requests.post(`/properties/update/${id}`, body)
  },
}

export default propertiesDashService
