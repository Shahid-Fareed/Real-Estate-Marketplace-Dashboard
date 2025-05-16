import requests from "./httpService"

const PermissionService = {
  allPermission(body, type) {
    return requests.get(`/permissions/${type}`, body)
  },
  getRole(body, type) {
    return requests.get(`/roles/${type}`, body)
  },
  getRoleAgency(body, type, agencyID) {
    return requests.get(`/roles/${type}?id=${agencyID}`, body)
  },
  editRole(body, id) {
    return requests.post(`/roles/update/${id}`, body)
  },
  createRole(body) {
    return requests.post(`/roles/create`, body)
  },
  getDetailRole(body, id) {
    return requests.get(`roles/detail/${id}`, body)
  },
  deleteRole(body, id) {
    return requests.get(`roles/delete/${id}`, body)
  }
}

export default PermissionService
