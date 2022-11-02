
import { cache } from '../../enum/cache'
import ShoppingModel from "../../model/indexModel"
import { addCart } from "../../common/cart"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    spriceNum: 0,
  },
  bule(e) {
   
  },
  //开启扫码
  GoAdd() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        const { result } = res
        this.getviewCode(result)
      }
    })
  },
  // 方法做的事情: 根据商品条形码获取商品信息
  async getviewCode(code) {
    try {
      let data = { qcode: code }
      const response = await ShoppingModel.getProductInfo(data)
      console.log(response, 'response');
      if (response.length > 0) {
        addCart(response[0])
      } else {
        //商品信息提示
        wx.showToast({
          title: '商品信息获取不到',
          icon: "none"
        })
      }
      this.getCartList()
      this.countPrice()
    } catch (error) {
      console.log(error);
    }
  },
  getCartList() {
    const carts = wx.getStorageSync(cache.CARTS)
    console.log('carts=>', carts)
    this.setData({
      cartList: carts
    })
  },
  //减
  addCard(e) {
    let index = e.currentTarget.dataset.index
    const num = this.data.cartList[index].num
    //传递参数
    this.removeCard(num, index)
    if (num > 1) {
      this.data.cartList[index].num -= 1
    }
    this.SETDARTA() //更新数据
    this.countPrice()
    this.setStorageSync()//本地存储
  },
  //加
  minCard(e) {
    const index = e.currentTarget.dataset.index
    this.data.cartList[index].num += 1
    this.SETDARTA() //更新数据
    this.countPrice()
    this.setStorageSync()
  },
  //本地存储
  setStorageSync() {
    wx.setStorageSync(cache.CARTS, this.data.cartList)
  },
  //数据更新
  SETDARTA() {
    this.setData({
      cartList: this.data.cartList
    })
  },
  //减一 提示弹框删除当前数据
  removeCard(num, index) {
    console.log(num, index);
    if (num == 1) {
      wx.showModal({
        content: '确定要删除此商品吗？',
        success: (res) => {
          if (res.confirm) {
            this.data.cartList.splice(index, 1)
            this.SETDARTA() //更新数据
            this.setStorageSync()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
  },
  //计算价格
  countPrice() {
    let spriceNum = 0
    this.data.cartList.forEach(item => {
      spriceNum += item.num * item.price
    })
    this.setData({
      spriceNum: spriceNum.toFixed(2)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    this.countPrice()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})