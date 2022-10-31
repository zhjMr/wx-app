import Http from "../utils/request"

const getBanner = () => {
  return Http.request({
    url: '/app/banner',
    method: 'GET'
  })
}

const getNav = () => {
  return Http.request({
    url: '/app/nav',
    method: 'GET'
  })
}


export default {
  getBanner,
  getNav
}