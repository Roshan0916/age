import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Input } from '@tarojs/components'
import './index.less'
import choosePng from '@assets/choose-bg.png'
import cPng from '@assets/button.png'
import avaterPng from '@assets/avater.png'
import shiyongPng from '@assets/shiyong.png'
import jianyiPng from '@assets/jianyi.png'
import womenPng from '@assets/women.png'
import yellowPng from '@assets/yellow.png'
import bluePng from '@assets/blue.png'
import redPng from '@assets/red.png'
import zanPng from '@assets/zan.png'
import zanonPng from '@assets/zan-on.png'
import closePng from '@assets/close.png'
import smilePng from '@assets/smile.png'
import popPng from '@assets/pop-bg.png'
import longclosePng from '@assets/long-close.png'
import { HOMEPARAM,ALLLIST,ADDLIST,LIKES,USER } from '@utils/api'
import { AtDrawer,AtFloatLayout,AtInput, AtForm,AtCurtain,AtButton } from 'taro-ui'
export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '',
    enablePullDownRefresh: true, 
  }
   state={
    first: true,//是否第一次登陆
    show: false,
    blueshow: false,
    payOpen: false,
    open: false,
    value:'',
    isOpened:false,
    againOpen:false,
    disabled: true,
    isZan: false,
    ageid:'',
    agelist: [],
    minage:'',
    maxage:'',
    HomeParam: [],
    bbs_introduce:'',
    agreement:'',
    cooperation:'',
    prepay_note:'',
    pay_confirm_note:'',
    commentslist:[],
    Commentslist:[],
    mycomment:{},
    commentId:'',
    INDEX:'',
    obj:'',
    member_category:'',
    current:1
   }
  componentWillMount () {
  }

  componentDidMount () {
    this.getLaw(),
    this.getComments(),
    this.getUser()
   }

  componentWillUnmount () { 

  }

  componentDidShow () { }

  componentDidHide () { }
  getUser () {
    Taro.request({
      url: USER,
      data: {   
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        this.setState({
          member_category: res.data.data.member_category
        })
      })
  }
  onshiyong () {
    this.setState({
      show: true
    })
  }
  onClose () {
    this.setState({
      show: false,
      blueshow: false,
      open: false,
      isOpened: false,
      payOpen: false,
      againOpen: false
    })
  }
  onjianyi () {
    this.setState({
      blueshow: true
    })
  }
  onwomen () {
    this.setState({
      open: true
    })
  }
  onagebox () {
    this.setState({
      isOpened: true
    })
  }
  ondetail (res) {
    console.log(res)
    if(this.state.member_category == -1) {
      this.setState({
        payOpen: true
      })
    }else{
      Taro.navigateTo({
        url:`/pages/result/index?id=${res}`
      })
      this.setState({
        isOpened: false
      })
    }
  }

  getLaw() {
    Taro.request({
      url: HOMEPARAM,
      data: {   
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data.data.data)
        this.setState({
          HomeParam: res.data.data.data
        })
        var age_min = res.data.data.data.find(function (obj) {
          return obj.id === 1
        })
        this.setState({
          minage: age_min.value
        })
        var age_max = res.data.data.data.find(function (obj) {
          return obj.id === 2
        })
        this.setState({
          maxage: age_max.value
        })
        //3,4没搞！8，10，12，13，14
        var bbs_introduce = res.data.data.data.find(function (obj) {
          return obj.id === 5
        })
        this.setState({
          bbs_introduce: bbs_introduce.value
        })
        var agreement = res.data.data.data.find(function (obj) {
          return obj.id === 6
        })
        this.setState({
          agreement: agreement.value
        })
        var cooperation = res.data.data.data.find(function (obj) {
          return obj.id === 7
        })
        this.setState({
          cooperation: cooperation.value
        })
        var prepay_note = res.data.data.data.find(function (obj) {
          return obj.id === 9
        })
        this.setState({
          prepay_note: prepay_note.value
        })
        var pay_confirm_note = res.data.data.data.find(function (obj) {
          return obj.id === 11
        })
        this.setState({
          pay_confirm_note: pay_confirm_note.value
        })
        this.agejson(age_min.value,age_max.value)
      })
    }

  changeRadio(text) {
    let items = this.state.agelist
    items.map(item => {
      if (item.text == text) {
        item.checked = true
        console.log(item.text)
        this.setState({
          ageid: item.text
        })
      } else {
        item.checked = false
      }
    })
    this.setState({
      items,
      disabled: false
    })
  }
  onPay(){
    this.setState({
      againOpen:true
    })
  }
  changeInfo(type,e){
    console.log(type,e)
    let mycomment = this.state.mycomment
    mycomment[type]=e.detail.value
    this.setState({
      mycomment:mycomment
    })
}
  addComments () {
    Taro.request({
      url:ADDLIST,
      method:'POST',
      data:{
        commentContent: this.state.mycomment.commentContent
      }
      }).then(res=>{
        console.log(this.state.mycomment.commentContent)
        this.setState({
          mycomment:''
        })
    })
  }

  getComments () {
    Taro.request({
      url: ALLLIST,
      data: {   
        page: this.state.current
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if(this.state.current < Math.ceil(res.data.data.total/10)+1) {
          this.setState({
            commentslist: this.state.commentslist.concat(res.data.data.data)
          },()=>{
            console.log(res.data.data.data'一次获取的')
            console.log(this.state.commentslist'总数据')
          })
        }else{
          console.log('没有更多数据了')
        } 
      })
  }
  getCommentsnew () {
    Taro.request({
      url: ALLLIST,
      data: {   
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        this.setState({
          commentslist: res.data.data.data
        },() => {})
      })
  }
  
  onZan (e) {
    this.setState({
      commentId: e
    },()=>{
    })
    Taro.request({
      url:LIKES,
      method:'POST',
      data:{
        commentId: e
      }
      }).then(res=>{
        console.log(e)
        this.getCommentsnew()
        for(let i=0;i<this.state.commentslist.length;i++) {
          if(e == this.state.commentslist[i].id) {
            this.setState({
              INDEX: i,
            }, () => {
            })
          }
        }
    })
    this.setState({
      isZan: !this.state.isZan
    })
  }
  agejson (res,req) {
    var minage = res
    var maxage = parseInt(req)+1
    for(var i=minage;i<maxage;i++){
      var data={"value":i,"text":i,"checked": false}
      this.state.agelist.push(data)
    }
    // console.log(this.state.agelist)
  }

  onMaskClick () {
    console.log(121)
  }
  onScrollToLower () {
    console.log('上滑')
    this.setState({
      current: this.state.current + 1
    },()=>{
      this.getComments()
    })
  }

  render () {
    const Threshold = 0
    const { moreList,agelist,disabled,minage,maxage,bbs_introduce,agreement,cooperation,prepay_note,pay_confirm_note,mycomment,commentslist} = this.state
    return (
      <View className='indexpage'>
        <Image src={choosePng} className="bg"/>
        <View className="box">
          <View className="avater-box">
            <OpenData className='avater' type='userAvatarUrl'></OpenData>
            <OpenData className='desc' type='userNickName' lang='zh_CN'></OpenData>
          </View>
          <Text className="g-content">输入贵庚，品一段名人过往</Text>
          
          <View className="choose-box" onClick={this.onagebox}>
            <Image src={cPng} className="choosebg" />
            <Text className="choose-desc" >请输入你的年龄</Text>
            <Text className="choose-content">目前仅支持{minage}至{maxage}岁年龄段的用户使用</Text>
          </View>
          <View className="icon-box">
            <View className="icon-box-item" onClick={this.onshiyong}>
              <Image src={shiyongPng} className="icon-img"/>
              <Text className="icon-desc">使用前必读</Text>
            </View>
            <View className="icon-box-item" onClick={this.onjianyi}>
              <Image src={jianyiPng} className="icon-img"/>
              <Text className="icon-desc">建议与合作</Text>
            </View>
            <View className="icon-box-item" onClick={this.onwomen}>
              <Image src={womenPng} className="icon-img"/>
              <Text className="icon-desc">我们都是同龄人</Text>
            </View>
          </View>
        </View>


      <View className="yellow">
        <AtDrawer
            show={this.state.show}
            mask
          >
            <View className="title-color-box">
              <Image className="title-img" src={yellowPng} />
              <Text className="title-english">READ  BEFORE  USE</Text>
              <View className="title-iconbox">
                <Image src={shiyongPng} className="yellow-icon"/>
                <Text className="yellow-desc">使用前必读</Text>
              </View>
              <View className="yellow-scroll">
              <ScrollView
              scrollY>
              <View className="yellow-content-box">
                <Text className="yellow-content">
                {agreement.replace(/\\n/g, "\n")}
                </Text>
              </View>
              </ScrollView>
              </View>
              <View className="yellow-button" onClick={this.onClose}>
              我已阅读并知晓
              </View>
            </View>      
          </AtDrawer>
      </View>

      <View className="blue">
        <AtDrawer
            show={this.state.blueshow}
            mask
            right
            className="blue"
          >
            <View className="title-color-box">
              <Image className="title-img" src={bluePng} />
              <Text className="title-english">ADVICE  &  COOPERATION</Text>
              <View className="title-iconbox">
                <Image src={jianyiPng} className="yellow-icon"/>
                <Text className="yellow-desc">建议与合作</Text>
              </View>
              <View className="blue-scroll">
              <ScrollView
              scrollY>    
                <View className="yellow-content-box">
                  <Text className="yellow-content">
                 {cooperation.replace(/\\n/g, "\n")}
                  </Text>
              </View>
              </ScrollView>
              </View>
              <View className="yellow-button" onClick={this.onClose}>
              我已阅读并知晓
              </View>
            </View>      
          </AtDrawer>
      </View>

      <View className="red">
        <AtFloatLayout isOpened={this.state.open}>
          <View className="title-color-box">
            <Image className="title-img" src={redPng} />
            <Text className="title-english">WE  ARE  PEERS</Text>
            <View className="title-iconbox">
              <Image src={womenPng} className="yellow-icon"/>
              <Text className="yellow-desc">我们是同龄人</Text>
            </View>
            <View className="close-img-box" onClick={this.onClose}>
              <Image src={closePng} className="close-img"/>   
            </View>
          </View>
          <View className="grey-title">前言</View> 
            <View className="we-content">{bbs_introduce}
            </View>
          <View className="grey-title">留言区</View> 
          <View className="we-scroll">
          <ScrollView
          onScrollToLower={this.onScrollToLower.bind(this)}
          lowerThreshold={Threshold}
          scrollY>
             {commentslist.map(item =>
                <View className="we-card">
                  <View className="we-avater">
                    <Image className="we-avater-img" src={item.avatar}/>
                  </View>
                  <View className="we-desc-box">
                    <View className="we-top">
                      <Text className="we-nickname">{item.nickname}</Text>
                      <Image className="we-zan" onClick={()=>this.onZan(item.id)} src={item.like_state==0 ? zanonPng : zanPng}/> 
                      <Text className="we-number">{item.likes_amount}</Text>
                    </View>
                    <View className="we-bottom">
                      #30岁#深圳#{item.content}
                    </View>
                  </View>
                </View>
              )}
              {/* <View className="noData">没有更多数据</View> */}
          </ScrollView> 
          </View>
          <View className="send">
            <Image src={smilePng} className="smile"/>
            <Input type='text' placeholder='写下你的留言...' placeholderStyle='color:#888888' className="input-box" 
            onChange={(e)=>this.changeInfo('commentContent',e)}
            value={mycomment.commentContent}/>
            <View className="send-desc" onClick={this.addComments}>发布</View>
          </View>           
        </AtFloatLayout>
        </View>

        <View>
          <AtCurtain
            isOpened={this.state.isOpened}
            onClose={this.onClose.bind(this)}
            closeBtnPosition="top-right"
          >
          <View className="age-box">
            <Image className="longclose" src={longclosePng} onClick={this.onClose}/>
            <View className="age-title">请选择年龄</View>
            <View className="age-item-box">
              {agelist.map(item =>
                <View key={item.text} onClick={() => this.changeRadio(item.text)}>
                  <View className={!item.checked ? 'age-item' : 'age-item age-item-choose'}>{item.text}</View>
                </View>
              )}    
            </View>           
            <AtButton disabled={disabled} className="age-button" onClick={() => this.ondetail(this.state.ageid)}>确定年龄</AtButton>
          </View>
          </AtCurtain>
        </View>

        <AtCurtain
        isOpened={this.state.payOpen}
        onClose={this.onClose.bind(this)}
        closeBtnPosition='top-right'
        >
          <Image src={popPng} className="pop-box" />
          <View className="content-box">
            <Text className="big-pop">{prepay_note}
            </Text>     
            <View className="button-box-1">
              <Button className="button-item1" onClick={this.onClose}>
              止步不前
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
              <Button className="button-item3" onClick={this.onPay}>
              勇往直前
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
            </View>
          </View>
        </AtCurtain>

        <AtCurtain
        isOpened={this.state.againOpen}
        onClose={this.onClose.bind(this)}
        closeBtnPosition='top-right'
        >
          <Image src={popPng} className="pop-box" />
          <View className="content-box">
            <Text className="big-pop">{pay_confirm_note}
            </Text>
            <View className="button-box-1">
              <Button className="button-item1" onClick={this.onClose}>
              姑且观望
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
              <Button className="button-item3">
              马不停蹄
                <View className="button-circle"></View>
                <View className="button-colmn"></View>
              </Button>
            </View>
          </View>
        </AtCurtain>
      </View>
    )
  }
}
