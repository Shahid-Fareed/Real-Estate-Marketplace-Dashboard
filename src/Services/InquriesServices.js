import requests from "./httpService"

const InquriesServices = {
  adminInquries(body) {
    return requests.get(`/inquiry`, body)
  },
  agencyOrUserInquries(body, id) {
    return requests.get(`/inquiry/userInquiries/${id}`, body)
  }
}

export default InquriesServices
