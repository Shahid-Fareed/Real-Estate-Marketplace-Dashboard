import requests from "./httpService"

const dashboardApiServices = {
  dashApi(body) {
    return requests.get(`/properties/propertiesCount`, body)
  },
  dashAgencyApi(body, id) {
    return requests.get(`/properties/agencypropertiesCount/${id}`, body)
  },
  dashUserApi(body, id) {
    return requests.get(`/properties/userpropertiesCount/${id}`, body)
  }
}

export default dashboardApiServices
