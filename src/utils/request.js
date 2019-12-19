import Taro from '@tarojs/taro';



export default (options = { method: 'GET', data: {},isLogin:false }) => {
    console.log(
        `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
          options.data
        )}`
      );
    let auth =''
    let uid=''
    let storeId = ''
    const stores = Taro.getStorageSync('store')
   const token = Taro.getStorageSync('loginInfo')
   if(token ){
       auth=token.token
       uid=token.uid
   }else{
     if(!options.isLogin){
      Taro.navigateTo({url:'/pages/login/login'})
     }
   }
   if(stores){
     storeId = stores.id
   }
   const ms =uid? {uid:uid} : {}
   const store = storeId ? {storeId:storeId}:{}
   if(process.env.TARO_ENV === 'weapp'){
    return Taro.request({
      url: options.url,
      data: {
        ...store,
        ...ms,
        ...options.data,
      },
      header: {
        'Content-Type': 'application/json',
        'cookie': 'PHPSESSID=' + Taro.getStorageSync("sessionId")
      }
    }).then(res => {
      const { statusCode, data } = res;
      Taro.hideLoading()
      if (statusCode >= 200 && statusCode < 300) {
          console.log(
            `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
            res.data
          );
        if (res.data.code !== 200) {
          if(res.data.code== 0){
            Taro.showToast({
              title: '登录过期即将重新登录',
              icon: 'none',
              mask: true,
            })
            Taro.clearStorageSync();
            setTimeout(()=>{
              Taro.navigateTo({url:'/pages/shouquan/index'})
            },1500)
          }else{
            Taro.showToast({
              title: `${data.result.message}~` || data.result.code,
              icon: 'none',
              mask: true,
            });
          }
        }else{
          return data.result;
        }
        
      } else {
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
      
    });
   }else{
    return  new Promise(function (resolve, reject) {
      my.request({
        url: options.url,
        data: {
          ...ms,
          ...options.data,
        },
        headers: {
          'Authorization': `Bearer ${auth}`,
        },
        success:(res)=>{
          console.log(res)
          const { status, data } = res;
          Taro.hideLoading()
          if (status >= 200 && status < 300) {
              console.log(
                `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
                res.data
              );
            if (res.data.code !== 200) {
              if(res.data.code==-999){
                Taro.showToast({
                  title: '登录过期即将重新登录',
                  icon: 'none',
                  mask: true,
                })
                Taro.clearStorageSync();
                setTimeout(()=>{
                  Taro.navigateTo({url:'/pages/shouquan/index'})
                },1500)
              }
              reject('')
            }else{
              resolve(data.result);
            }
            
          } else {
            reject(`网络请求错误，状态码${status}`);
          }
        },
        fail:(err)=>{
  
        }
      })
  }).then(function (r) {
      return r
  })
  }
  
};