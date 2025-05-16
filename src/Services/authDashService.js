import requests from "./httpService"

const Auth = {
  login(body) {
    return requests.post(`/users/login`, body)
  },
  signUp(body) {
    return requests.post(`/users/create`, body)
  },
  getUserDataByAuth(body, type) {
    return requests.get(`/authUser?token=${type}`, body)
  }
}

export default Auth
