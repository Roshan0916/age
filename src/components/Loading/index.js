import Taro, { Component } from '@tarojs/taro'
import { View ,Image} from '@tarojs/components'
import choosePng from '@assets/choose-bg.png'
import './index.less'




class Index extends Component {
  state={
    agetext:[
      {id:0,value:'周杰伦19岁时还在……'},
      {id:1,value:'24岁的李白……'},
      {id:2,value:'2003年，郭德纲30岁……'},
      {id:3,value:'马云在自己35岁已经……'},
      {id:4,value:'孔子在他47岁这年……'},
      {id:5,value:'周杰伦19岁时还在……'},
    ],
    agetext1:[
      {id:0,value:'周杰伦19岁时还在……'},
      {id:1,value:'周杰伦19岁时还在……'},
      {id:2,value:'24岁的李白……'},
      {id:3,value:'2003年，郭德纲30岁……'},
      {id:4,value:'马云在自己35岁已经……'},
      {id:5,value:'孔子在他47岁这年……'},
    ],
    agetext2:[
      {id:0,value:'周杰伦19岁时还在……'},
      {id:1,value:'孔子在他47岁这年……'},
      {id:2,value:'周杰伦19岁时还在……'},
      {id:3,value:'24岁的李白……'},
      {id:4,value:'2003年，郭德纲30岁……'},
      {id:5,value:'马云在自己35岁已经……'},
    ],
    agetext3:[
      {id:0,value:'周杰伦19岁时还在……'},
      {id:1,value:'马云在自己35岁已经……'},
      {id:2,value:'孔子在他47岁这年……'},
      {id:3,value:'周杰伦19岁时还在……'},
      {id:4,value:'24岁的李白……'},
      {id:5,value:'2003年，郭德纲30岁……'},
    ],
    agetext4:[
      {id:0,value:'周杰伦19岁时还在……'},
      {id:1,value:'24岁的李白……'},
      {id:2,value:'孔子在他47岁这年……'},
      {id:3,value:'2003年，郭德纲30岁……'},
      {id:4,value:'马云在自己35岁已经……'},
      {id:5,value:'周杰伦19岁时还在……'},
    ],
    agetext5:[
      {id:0,value:'周杰伦19岁时还在……'},
      {id:1,value:'孔子在他47岁这年……'},
      {id:2,value:'周杰伦19岁时还在……'},
      {id:3,value:'24岁的李白……'},
      {id:4,value:'2003年，郭德纲30岁……'},
      {id:5,value:'马云在自己35岁已经……'},
    ],
    currenttext:{},
    currenttext1:{},
    currenttext2:{},
    currenttext3:{},
    currenttext4:{},
    currenttext5:{}
  }


  componentWillMount () {

  }

  componentWillReact () {
  }

  componentDidMount () {
    // this.textchange()
   }

  componentWillUnmount () {
  }

  componentDidShow () { }

  componentDidHide () {}

  // textchange () {
  //   var total = this.state.agetext.length
  //   var _this = this
  //   for(var i=1;i<total;i++){
  //     if(i<total){
  //       (function(a){
  //         setInterval(()=>{
  //           console.log(a)
  //           _this.setState({
  //             currenttext: _this.state.agetext[a],
  //             currenttext1: _this.state.agetext1[a],
  //             currenttext2: _this.state.agetext2[a],
  //             currenttext3: _this.state.agetext3[a],
  //             currenttext4: _this.state.agetext4[a],
  //             currenttext5: _this.state.agetext5[a]
  //           })
  //         },a * 200)
  //       })(i)
  //     }
  //   }
  // }

  render () {
    const {currenttext,index} = this.state
    return (
      <View className="loading-box">
        <Image src={choosePng} className="bg"/>

        <View className="message">
          {/* <View className="message1">{currenttext.value}</View>
          <View className="message2">{currenttext1.value} </View>
          <View className="message3">{currenttext2.value}</View>
          <View className="message4">{currenttext3.value}</View>
          <View className="message5">{currenttext4.value}</View>
          <View className="message6">{currenttext5.value}</View> */}
           <View className="message1">周杰伦19岁时还在……</View>
          <View className="message2">李白24岁第一次…… </View>
          <View className="message3">1998年，马化腾27岁……</View>
          <View className="message4">郭德纲30岁的时候……</View>
          <View className="message5">马云35岁那年……</View>
          <View className="message6">16岁的王源……</View>
          <View className="message7">任正非43岁的时候……</View>
          <View className="message8">孔子在他47岁这年……</View>
          <View className="message9">1977年，49岁的李嘉诚……</View>
        </View>
        <View className="bottom-desc">
          <Text>您的贵庚同龄故事正追星赶月而来\n请稍后⋯⋯</Text>
        </View>
      </View>
    )
  }
}

export default Index 
