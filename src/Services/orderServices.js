import requests from "./httpService"

const OrderServices = {
  createOrder(body) {
    return requests.post(`/orders/create`, body)
  },
  allOrders(body) {
    return requests.get(`/orders`, body)
  },
  userOrders(body, id) {
    return requests.get(`/orders/user/${id}`, body)
  },
  updateOrderStatus(body, id) {
    return requests.post(`/orders/updateStatus/${id}`, body)
  },
  getUserQuota(body, id) {
    return requests.get(`/orders/userqouta/${id}`, body)
  },
  updateOrderPaidStatus(id,body) {
    return requests.post(`/orders/updatePaidStatus/${id}`, body)
  }
}

export default OrderServices
