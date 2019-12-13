import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Canvas,Button，RichText } from '@tarojs/components'
import './index.less'
import { TaroCanvasDrawer  } from 'taro-plugin-canvas'
import { AtCurtain,AtButton } from 'taro-ui'
import blackPng from '@assets/black-logo.png'
import savePng from '@assets/save-icon.png'
import quitPng from '@assets/back-icon.png'
import againPng from '@assets/again-icon.png'
import popPng from '@assets/pop-bg.png'
import avaterPng from '@assets/avater.png'
import detailPng from '@assets/detail-img.png'
import redlogoPng from '@assets/red-logo.png'
import circlePng from '@assets/circle.png'
import {Loading}from '@components'
import {RESULT,AGESTORY,AGEIMG} from '@utils/api'


export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: ''
  }
   state={
    isOpened: false,
    canvasColor: "",
    type: '',
    loading:false,
    DetailList:[],
    Storylist:{},
    routerid: this.$router.params.id,
    timer: null,
    image_url_show:'',
    isOpened1: false,
      // 绘图配置文件
      config: null,
      // 绘制的图片
      shareImage: null,
      // TaroCanvasDrawer 组件状态
      canvasStatus: false,
      rssConfig: {
        width: 750,
        height: 750,
        backgroundColor: '#fff',
        debug: false,
        blocks: [
          {
            x: 0,
            y: 0,
            width: 750,
            height: 750,
            paddingLeft: 0,
            paddingRight: 0,
            borderWidth: 0,
            backgroundColor: '#fff',
            borderRadius: 0,
          },
      //     {
      //       x: 15,
      //       y: 15,
      //       width: 720,
      //       height: 700,
      //       paddingLeft: 0,
      //       paddingRight: 0,
      //       borderWidth: 0,
      //       // borderColor: '#ccc',
      //       backgroundColor: '#dbeff6',
      //       borderRadius: 12,
      //     }
      //   ],
      //   texts: [
      //     {
      //       x: 30,
      //       y: 118,
      //       text: '华语乐坛流行天王周杰伦 19 岁的时候仍过着在音乐公司睡地板的日子'
      //       ,
      //       fontSize: 24,
      //       color: '#000',
      //       opacity: 1,
      //       baseLine: 'middle',
      //       lineHeight: 48,
      //       lineNum: 100,
      //       textAlign: 'left',
      //       width: 650,
      //       zIndex: 999,
      //     },
      //     {
      //       x: 600,
      //       y: 60,
      //       text: '贵庚',
      //       fontSize: 50,
      //       color: '#fff',
      //       fontFamily: 'Kai',
      //       opacity: 1,
      //       baseLine: 'middle',
      //       textAlign: 'left',
      //       lineHeight: 36,
      //       lineNum: 1,
      //       zIndex: 999,
      //     },
      //     {
      //       x: 600,
      //       y: 100,
      //       text: 'GUI GENG',
      //       fontSize: 19,
      //       color: '#fff',
      //       fontFamily: 'Kai',
      //       opacity: 1,
      //       baseLine: 'middle',
      //       textAlign: 'left',
      //       lineHeight: 36,
      //       lineNum: 1,
      //       zIndex: 999,
      //     },
      //   ],
      //   images: [
      //     {
      //       url: ImageTextList.uurl,
      //       width: 676,
      //       height: 350,
      //       y: 600,
      //       x: 40,
      //       borderRadius: 12,
      //       zIndex: 10,
      //       // borderRadius: 150,
      //       // borderWidth: 10,
      //       borderColor: 'red',
      //     }
      //   ],
      //   lines: [
      //     {
      //       startY: 540,
      //       startX: 80,
      //       endX: 670,
      //       endY: 541,
      //       width: 1,
      //       color: '#eee',
      //     }
        ]
      },
   } 
  componentWillMount () {
    var a = Math.round(Math.random()*2)
    console.log(a)
    if(a == 0) {
      console.log(0)
      this.setState({
        canvasColor: '#faf5e4'
      },()=>{
        console.log(this.state.canvasColor)
      })
    } else if (a == 1) {
      console.log(1)
      this.setState({
        canvasColor: '#dbeff6'
      },()=>{
        console.log(this.state.canvasColor)
      })
    } else if (a == 2) {
      console.log(2)
      this.setState({
        canvasColor: '#fbdcdc'
      },()=>{
        console.log(this.state.canvasColor)
      })
    }
    this.setState({
      type: a
    })
    this.getDetail()
    console.log(this.state.routerid)
  }

  componentDidMount () {
    this.getAgeImg()
  }

  componentWillUnmount () { 

  }

  componentDidShow () { }

  componentDidHide () { }
  handleChange () {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }

  getDetail() {
    this.setState({
      loading: true 
     })
    Taro.request({
      url: `https://testssl.microdemo.net/api/member/as/list?age=${this.state.routerid}`,
      // url: AGESTORY,
      // url: 'https://testssl.microdemo.net/api/member/as/list?age=23',
      data: {
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        console.log(res.data.data)   
        setTimeout(()=>{
          this.setState({
            Storylist: res.data.data,
            loading: false
          })
        },2000)
        // if (res.data.statusCode == 200) {
        //   // console.log(res)
        //   this.setState({
        //     DetailList: res.data.data.lists,
        //     loading: false
        //   })
        // } 
      })
  }
  getAgeImg () {
    Taro.request({
      url: `https://testssl.microdemo.net/api/member/asi/list?age=${this.state.routerid}`,
      data: {   
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data.data.image_url_show)
        this.setState({
          image_url_show: res.data.data.image_url_show
        })
      })
  }
  initDrawRssConfig(){
    // console.log('绘画')
    this.setState({
      rssConfig: {
        width: 750,
        height: 750,
        backgroundColor: '#fff',
        debug: false,
        blocks: [
          {
            x: 0,
            y: 0,
            width: 750,
            height: 1250,
            paddingLeft: 0,
            paddingRight: 0,
            borderWidth: 0,
            backgroundColor: '#fff',
            borderRadius: 0,
          },
          {
            x: 40,
            y: 40,
            width: 670,
            height: 1040,
            paddingLeft: 0,
            paddingRight: 0,
            borderWidth: 0,
            backgroundColor: this.state.canvasColor,
            borderRadius: 12,
          }
        ],
        texts: [
          {
            x: 80,
            y: 180,
            text: this.state.Storylist.story_content,
            // text: '你好\n听闻你贵庚二十有\n1992年初，二十三岁的雷军进入了初创不久的金山软件公司工作，员工编号是6号。这位上大学时就以爱泡机房而闻名的年轻人，进入职场后更是表现出了惊人的干劲。一周七天，每天工作十六个小时，以极大的热情投入到新软件研发之中的程序员雷军很快就被同事们称为“北京中关村劳模”。从1992到2007，雷军身上的“劳模”工作习惯一直伴随着他在金山服务的十六个年头。这期间，雷军历任金山北京开发部经理、北京分公司经理、金山公司总经理、总裁，并于2007年成功实现金山在香港上市的规划。离开金山后的雷军转去做天使投资人，后于2010年创办了小米公司，进入智能手机领域。即使已经年过四十，雷军仍然每天工作十二个小时。很快，他就带领小米成为行业的颠覆者，最巅峰的时刻，小米手机的出货量一度排名全国第一，全球第三。',
            fontSize: 24,
            color: '#000',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 48,
            lineNum: 12,
            textAlign: 'left',
            width: 580,
            zIndex: 999,
          },
          {
            x: 80,
            y: 1140,
            text: '长按扫描二维码进入小程序',
            fontSize: 24,
            color: '#666',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
          },
          {
            x: 80,
            y: 1190,
            text: '分享来自 「 贵庚 」',
            fontSize: 24,
            color: '#666',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 36,
            lineNum: 1,
            zIndex: 999,
          }
        ],
        images: [
          {
            url: this.state.image_url_show,
            width: 650,
            height: 320,
            y: 740,
            x: 50,
            borderRadius: 12,
            zIndex: 10,
          },
          {
            url:this.state.image_url_show,
            width: 110,
            height: 110,
            y: 1120,
            x: 560,
            // borderRadius: 100,
            borderWidth: 0,
            zIndex: 10,
          },
        ],
        lines: [
          {
            startY: 540,
            startX: 80,
            endX: 670,
            endY: 541,
            width: 1,
            color: '#eee',
          }
        ]
      }
    },()=>{
      this.canvasDrawFunc(this.state.rssConfig)
    })
   
  }
  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = (config = this.state.rssConfig) => {
    // console.log('绘画第二')
    console.log(this.state.rssConfig)
    this.setState({
      canvasStatus: true,
      config: config,
    })
    Taro.showLoading({
      title: '绘制中...'
    })
  }

  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    this.setState({
      isOpened1: true
    })
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null
      })
      this.saveToAlbum()
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' });
      console.log(errMsg);
    }
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null
    })
    console.log(error);
  }

   // 保存图片至本地
  saveToAlbum = () => {
    Taro.getSetting({  complete(){
      console.log(444)
    }}).then(res=>{
    if (res.authSetting['scope.writePhotosAlbum']) {
      Taro.saveImageToPhotosAlbum({
        filePath:this.state.shareImage
      }).then(res=>{
        console.log(res)
        Taro.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000,
        });
      })
    }else {
      Taro.authorize({
        scope: 'scope.writePhotosAlbum',
      }).then(()=>{
        Taro.saveImageToPhotosAlbum({
          filePath:this.state.shareImage
        }).then(res=>{
          Taro.showToast({
            title: '保存图片成功',
            icon: 'success',
            duration: 2000,
          })
        })
      })
    }
  }).catch((e)=>{
    console.log(e)
  })
  }



  handleChange () {
    Taro.navigateTo({
      url:'/pages/home/index'
    })
  }
  onClose () {
    this.setState({
      isOpened1: false
    })
  }
  onShareAppMessage () {
    var that = this;
    var shareimg = [
      // "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRcaISLHUAAaIAQtVJyoAAf_UAJK9e8ABogZ224.jpg",
      // "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRciIK04QAAPSUiTmb7UAAf_UAJRfggAA9Jq257.jpg",
      // "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRciIGHuyAAIISdSwzIYAAf_UAJ1MKkAAghh731.jpg"
    ]
    var randomImg = shareimg[Math.floor(Math.random() * shareimg.length)];
    return {
      title: '贵庚',
      desc: '名人与你同龄时都在做什么，点击进入，发现精彩',
      path: '路径',
      imageUrl: randomImg,
      success: function (res) {
        // 转发成功
        Taro.showToast({
          title: '分享成功',
          icon: "none"
        });
      },
      fail: function (res) {
        // 转发失败
        Taro.showToast({
          title: '分享失败',
          icon: "none"
        })
      }
    }
  }

  
  render () {
    const { Storylist,image_url_show } = this.state
    return (
      <View className="page-content">
        <View className={this.state.loading ? "" : "hidden"}>
           <Loading></Loading>
        </View>
        <AtCurtain
        isOpened={this.state.isOpened1}
        onClose={this.onClose.bind(this)}
        closeBtnPosition='top-right'
        >
          <Image src={popPng} className="pop-box" />
          <View className="content-box">
            <Text className="big-pop">去朋友圈转发您的同龄名人故事，或直接将【贵庚】小程序分享给您的好友或微信群吧，更多励志名人及新年寄语等您来发现！         
            </Text>   
            <View className='shareImage-cont'>
            <Image
              className='shareImage'
              src={this.state.shareImage}
              mode='widthFix'
              lazy-load
            />
            {
              this.state.canvasStatus &&
              (<TaroCanvasDrawer
                config={this.state.config} // 绘制配置
                onCreateSuccess={this.onCreateSuccess} // 绘制成功回调
                onCreateFail={this.onCreateFail} // 绘制失败回调
              />
              )
            }
          </View>               
            <View className="button-box-1">
              <Button className="button-item3" open-type="share">
              分享给好友
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
            </View>
          </View>
        </AtCurtain>



        <View>
          <View className='indexpage' style={this.state.type==0 ? 'background: #faf5e4' : this.state.type==1 ? 'background: #dbeff6' : this.state.type==2 ? 'background: #fbdcdc' : ''}>
            <View className="avater-top">       
              <OpenData className='avater-box' type='userAvatarUrl'></OpenData>
              <View className="avater-desc">
                <Text className={this.state.type==0 ? "avater-desc-top" : "avater-desc-top-white"}>贵庚</Text>
                <Text className={this.state.type==0 ? "avater-desc-bottom" : "avater-desc-bottom-white"}>GUI  GENG</Text>
              </View>
            </View>
            <View className="content">
              <OpenData className='content-name' type='userNickName' lang='zh_CN'></OpenData>
              <Text className="content-detail">
              {Storylist.story_content}
              {/* 你好，\n听闻你贵庚二十有三\n1992年初，二十三岁的雷军进入了初创不久的金山软件公司工作，员工编号是6号。这位上大学时就以爱泡机房而闻名的年轻人，进入职场后更是表现出了惊人的干劲。一周七天，每天工作十六个小时，以极大的热情投入到新软件研发之中的程序员雷军很快就被同事们称为“北京中关村劳模”。从1992到2007，雷军身上的“劳模”工作习惯一直伴随着他在金山服务的十六个年头。这期间，雷军历任金山北京开发部经理、北京分公司经理、金山公司总经理、总裁，并于2007年成功实现金山在香港上市的规划。离开金山后的雷军转去做天使投资人，后于2010年创办了小米公司，进入智能手机领域。即使已经年过四十，雷军仍然每天工作十二个小时。很快，他就带领小米成为行业的颠覆者，最巅峰的时刻，小米手机的出货量一度排名全国第一，全球第三。 */}
              </Text>
              <Image src={circlePng} className={this.state.type==2 ? "circle-box" :"hidden"}/>
              <View className={this.state.type==2 ? "circle-desc" : "hidden"}>贵庚寄语</View>
              <Image className="img-box" src={image_url_show}/>
              <Image src={redlogoPng} className={ this.state.type==1 ? "red-logo" : "hidden"}/>
              <Text className="content-detail">
              {Storylist.story_motto}
              </Text>
              <Image src={blackPng} className={ type==0 ? "logo" : "hidden"} />
            </View>
            <View className="ps">素材均整理自网络，侵权必删。</View>
          </View>
          <View className="button-box">
            <View className="button-bg b-green" onClick={this.initDrawRssConfig.bind(this, this.state.rssConfig)}>
              <Image src={savePng} className="button-icon"/>
              <Text className="button-desc">相册留存</Text>
            </View>
            <Navigator class='item' open-type='exit' target="miniProgram">
              <View className="button-bg b-yellow">
                <Image src={quitPng} className="button-icon"/>
                <Text className="button-desc">拂袖而去</Text>
              </View>
            </Navigator>
            <View className="button-bg b-blue" onClick={this.handleChange}>
              <Image src={againPng} className="button-icon"/>
              <Text className="button-desc">卷土重来</Text>
            </View>
          </View>
        </View>
        

        




{/* 
        <AtCurtain
        isOpened={this.state.isOpened}
        onClose={this.onClose.bind(this)}
        closeBtnPosition='top-right'
        >
          <Image src={popPng} className="pop-box" />
          <View className="content-box">
            <Text className="pop-title">再测一次</Text>
            <Text className="pop-desc">免费测的机会已经用完啦，可以通过以下方法获得再测一次的机会:</Text>
            <Text className="pop-content">(1)分享至朋友圈（注：通过此方法一天只能获得1次机会\n
            (2)支付0.88元即可再次获得再测一次机会（此方法一天无上限）
            </Text>
         
            <View className="button-box-1">
              <Button className="button-item1" onClick={this.onClose}>
                不玩了
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
              <Button open-type="share" className="button-item2">
                去分享
                  <View className="button-circle"></View>
                  <View className="button-colmn"></View>
              </Button>
              <Button className="button-item3">
               去购买
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
            </View>
          </View>
        </AtCurtain> */} 
         {/* <Painter></Painter>
      <Button>保存</Button> */}
      </View>
    )
  }
}
