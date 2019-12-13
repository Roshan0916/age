import Taro, { Component, Config, navigateTo } from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import './index.less'
import bgPng from '@assets/index-bg.png'
import postPng from '@assets/postmark.png'
import upPng from '@assets/up.png'
import {RESULT} from '@utils/api'
// import {throttle} from '@utils/tool.js'
// import Request from '@utils/request'
export default class Index extends Component {


  config: Config = {
    navigationBarTitleText: '首页',
    onReachBottomDistance:0
  }
  state={
    text:'',
    text1:'',
    shi:'',
    na:'',
    tur:true
  }
  componentWillMount () {
    var that=this
    var story2 = "时"
      var q = 0;
      var time1 = setInterval(function () {
        var shi = story2.substring(0, q);
        q++;
        that.setState({
          shi: shi
        });
        if (shi.length == story2.length) {
          clearInterval(time1);
          var story = "光匆匆，岁月流转。\n而今的你，贵庚几何？\n所遇何人，所行何事？"
          var i = 0;
          var time = setInterval(function () {
            var text = story.substring(0, i);
            i++;
            that.setState({
              text: text
            });
            if (text.length == story.length) {
              clearInterval(time);
              var story3 = "\n\n那"
              var w = 0;
              var time3 = setInterval(function () {
                var na = story3.substring(0, w);
                w++;
                that.setState({
                  na: na
                });
                if (na.length == story3.length) {
                  clearInterval(time3);
                  var story1 = "各路名人，本亦是常人，\n当其与你同龄时，\n思何物，语何言，举何为？\n且进入\"贵庚\"，与你慢慢道来......"
                  var j = 0;
                  var time1 = setInterval(function () {
                    var text1 = story1.substring(0, j);
                    j++;
                    that.setState({
                      text1: text1
                    });
                    if (text1.length == story1.length) {
                      clearInterval(time1);
                    }
                  }, 100)
                }
              }, 100)
            }
          }, 100)   
        }
      }, 100)
  }

  componentDidMount () { }

  componentWillUnmount () { 
  }

  componentDidShow () { }

  componentDidHide () { }

  onScrollToLower () {
    console.log('上滑')
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }




  render () {
    const {text,text1,shi,na} = this.state
    const Threshold = 0
    return (
      <View className='indexpage'>
        <Image className='bg' src={bgPng} />
        <View className='title'>
          <Text className="big">{shi}</Text>
          <Text className="small">{text}</Text>
          <Text className="big">{na}</Text>
          <Text className="small">{text1}</Text>
        </View>
        <Image src={postPng} className="postmark" />
        <Text className="up-title">向上滑动进入</Text>

        <ScrollView
          className='scrollview'
          onScrollToLower={this.onScrollToLower.bind(this)}
          lowerThreshold={Threshold}
          scrollY
        >
           <View className="up-icon-box">
            <Image src={upPng} className="up-icon"/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
