import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Input } from '@tarojs/components'
import Logo from '@assets/logo3.png'
import './index.less'
import { API_LOGIN } from '@utils/api'
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
   
   }
  componentWillMount () {
    
  }

  componentDidMount () {
    const token = Taro.getStorageSync('loginInfo')
    if(token){
      Taro.showLoading({
        title: '自动登录中',
        mask:true,
      })
      setTimeout(()=>{
        Taro.navigateTo({
          url:'/pages/home/index'
        })
      },1000)
    }
  }

  componentWillUnmount () { 

  }

  componentDidShow () { }

  componentDidHide () { }
  getUser(e){
    console.log('微信登录',e)
    if(e.detail.userInfo && Object.keys(e.detail.userInfo).length!=0){
      Taro.showLoading({
        title: '登录中',
        mask:true,
      })
      Taro.login().then((res)=>{
        Taro.request({
          url:API_LOGIN,
          method:'POST',
          // isLogin:true,
          data:{
            code:res.code,
            encryptedData:e.detail.encryptedData,
            iv:e.detail.iv,
          }
        }).then((data)=>{
          Taro.hideLoading()
          Taro.setStorageSync('loginInfo', data.data)
          Taro.navigateTo({
            url:'/pages/home/index'
          })
        })
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
      <View className='title'>GUI GENG</View>
      <View className='cont'></View>
      <Button className='mybtn' onGetUserInfo={this.getUser} openType='getUserInfo'>授权微信登录</Button>
    </View>
    )
  }
}
