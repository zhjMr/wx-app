import {
  config
} from "../config/config"
import {
  wxToPromis
} from "./wxTopomser"

class Http {
  // 公有方法
  static request({
    url,
    method = "GET",
    data = {},
    header = {}
  }) {
    return Http._request({
      url,
      method,
      data,
      header
    })
  }

  // 私有方法
  static async _request({
    url,
    method,
    data,
    header
  }) {
    const res = await wxToPromis("request", {
      url: config.baseUrl + url,
      method,
      data,
      header: {
        devicetype: config.devicetype,
        ...header
      }
    })

    console.log(res.statusCode)
    if (res.statusCode < 400) {
      return res
    }
  }


}

export default Http