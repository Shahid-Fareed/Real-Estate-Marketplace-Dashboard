import requests from "./httpService"

const Users = {
  allUsers(body) {
    return requests.get(`/users`, body)
  },
  subUsers(body, id) {
    return requests.get(`/users/${id}`, body)
  },
  subUsersStatusChange(body, id) {
    return requests.get(`/users/updateStatus/${id}`, body)
  },
  getUserProfileDetail(body, id) {
    return requests.get(`/users/detail/${id}`, body)
  },
  updateUserProfileDetail(body, id) {
    return requests.post(`/users/update/${id}`, body)
  },
  createUser(body) {
    return requests.post(`/users/create`, body)
  },
  deleteUser(body, id) {
    return requests.get(`/users/delete/${id}`, body)
  },
  changeAgencyStatus(body, id) {
    return requests.post(`/users/updateTag/${id}`, body)
  },
  createPaymentContent(body) {
    return requests.get(`/create-payment-intent-customers`, body)
  },
  getAgencyStaff(id,body) {
    return requests.get(`/users/${id}`, body)
  },
  getAgencyProperty(id,body) {
    return requests.get(`/users/agencyProperties/${id}`, body)
  },
}

export default Users
