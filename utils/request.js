import { config } from "../config/config"
import { wxToPromis } from "./wxTopomser"
import { Errormessage } from "../config/Error_messsage"
class Http {
  // 公有方法
  static request({ url, method = "GET", data = {}, header = {} }) {
    //loading加载
    wx.showLoading({
      title: '加载中',
    })
    return Http._request({ url, method, data, header })
  }

  // 私有方法
  static async _request({ url, method, data, header }) {
    try {
      const res = await wxToPromis("request", {
        url: config.baseUrl + url,
        method,
        data,
        header: {
          devicetype: config.devicetype,
          ...header
        }
      })
      //请求成功，将结果返回出来
      if (res.statusCode == 200) {
        return res.data.result
      }
      //请求失败，错误信息进行提示
      Http._showErrormessage(res.statusCode, res.data.msg)
    } catch (error) {
      console.log(error);
    } finally {
      //关闭loading加载
      wx.hideLoading()
    }
  }
  static _showErrormessage(error, msg) {
    let title = Errormessage[error] || msg || '未知错误'
    wx.showToast({
      title: title,
      icon: "none",
      duration: 3000
    })
  }
}

export default Http