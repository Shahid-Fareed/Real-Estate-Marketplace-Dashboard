import requests from "./httpService"

const PackageServices = {
  createPackage(body) {
    return requests.post(`/packages/create`, body)
  },
  getAllPackage(body) {
    return requests.get(`/packages`, body)
  },
  getPackageByUsertype(body, type) {
    return requests.get(`/packages/${type}`, body)
  },
  getPackageDetails(body, id) {
    return requests.get(`/packages/detail/${id}`, body)
  },
  deletePackage(body, id) {
    return requests.get(`/packages/delete/${id}`, body)
  },
  updatePackageDetails(body, id) {
    return requests.post(`/packages/update/${id}`, body)
  }
}

export default PackageServices
