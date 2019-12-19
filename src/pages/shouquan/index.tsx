import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Input } from '@tarojs/components'
import Logo from '@assets/logo3.png'
import './index.less'
import { API_LOGIN,QUICK_LOGIN } from '@utils/api'
import Request from '@utils/request'
export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录'
  }
   state={
     err: ''
   }
  componentWillMount () {
    
  }

  componentDidMount () {
    this.QuickLogin()
    // const token = Taro.getStorageSync('loginInfo')
    // if(token){
    //   Taro.showLoading({
    //     title: '自动登录中',
    //     mask:true,
    //   })
    //   setTimeout(()=>{
    //     Taro.navigateTo({
    //       url:'/pages/home/index'
    //     })
    //   },1000)
    // }
  }
  QuickLogin () {
    console.log(Taro.getStorageSync("encryptShow"))
    Taro.request({
      url:QUICK_LOGIN,
      method:'POST',
      data:{
        open_id_encrypt: Taro.getStorageSync("encryptShow")
      }
    }).then((data)=>{
     if(data.data.code ==0) {
      Taro.showLoading({
        title: '自动登录中',
        mask:true,
      })
      setTimeout(()=>{
        Taro.navigateTo({
          url:'/pages/index/index'
        })
      },1000)
     }
    })
  }

  componentWillUnmount () { 

  }

  componentDidShow () { }

  componentDidHide () { }
  getUser(e){
    console.log('登录',e)
    // console.log(e.detail.userInfo)
    if(e.detail.userInfo && Object.keys(e.detail.userInfo).length!=0){
      Taro.showLoading({
        title: '登录中',
        mask:true,
      })
      Taro.login().then((res)=>{
        // console.log(res.code)
        // console.log(e.detail.encryptedData)
        // console.log(e.detail.iv)
        if(Taro.checkSession()) {
          Taro.login().then((res)=>{
            Taro.getUserInfo().then(function (i){
              // console.log(i)
              // console.log(i.encryptedData)
              // console.log(i.iv)
              console.log(1111111111)
              Taro.request({
                url:API_LOGIN,
                method:'POST',
                data:{
                  code: res.code,
                  encryptedData: i.encryptedData,
                  iv: i.iv
                }
              }).then((data)=>{
                // console.log(data.data.data.message)
                // console.log('sessionId:'+data.data.data.sessionId)
                // console.log('encryptShow:'+data.data.data.encryptShow)
                Taro.removeStorageSync("sessionId")
                Taro.setStorageSync("sessionId",data.data.data.sessionId)
                Taro.setStorageSync("encryptShow",data.data.data.encryptShow)
                Taro.hideLoading()
                Taro.setStorageSync('userInfo', data.data.data.message)
                Taro.setStorageSync('loginInfo', data.data)
                Taro.navigateTo({
                  url:'/pages/index/index'
                })
              }).catch(err=>{
                console.log('错误回调'+err)
                this.setState({
                  err: err
                })
              })
            })
          })
        }else{
          Taro.request({
            url:API_LOGIN,
            method:'POST',
            data:{
              code: res.code,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv
            }
          }).then((data)=>{
            Taro.hideLoading()
            // console.log(data.data)
            Taro.setStorageSync('loginInfo', data.data)
            Taro.navigateTo({
              url:'/pages/index/index'
            })
          })
        }
      })
    }else{
      
      Taro.showToast({
        title: '授权失败，请重试',
        icon: 'none',
        duration: 2000
      })
    }
  }

  render () {

    return (
      <View className='index'>
      <Image className='logo' src={Logo}></Image>
      <View className='title'>GUI GENG{this.state.err}</View>
      <View className='cont'></View>
      <Button className='mybtn' onGetUserInfo={this.getUser} openType='getUserInfo'>授权微信登录</Button>
    </View>
    )
  }
}
