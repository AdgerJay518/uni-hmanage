<template>
  <div class="hm-news-detail">
    <div class="hd">
      <img class="yunshu" :src="options.yunshu" />
      <div class="container">
        <div class="outer">
          <span class="author">{{ options.author }}</span>
          <div class="wrap">
            <img class="like" :src="options.like" />
            <img class="share" :src="options.share" />
          </div>
        </div>
        <text class="time">{{options.time}}</text>
      </div>
    </div>
    <span class="title">{{ options.title }}</span>
	<span class="title2">浏览次数:{{options.readCount}}次</span>
    <div class="main">
      <div class="entryPicWrap"><img class="img" :src="options.img" /></div>
    </div>
    <div class="ft">
      <span class="content">{{ options.content }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmNewsDetail',
  filters:{
  	formateDate(date){
  		var nDate=new Date(date)
  		const year=nDate.getFullYear()
  		const month=nDate.getMonth()+1
  		const months=month.INT+1
  		const day=nDate.getDate().toString().padStart(2,0)
  		return year+'年'+'-'+month+'月'+'-'+day+'日'
  	}
  },
  props: {
    dataId: {
      type: String,
      default: 'hm-news-detail'
    },
    options: {
      type: Object,
      default: function() {
        return {
          yunshu:
            '/static/hm-news-detail/images/img_22946_0_0.png',
          author: '毫末科技',
          like:
            '/static/hm-news-detail/images/img_22946_0_1.png',
          share:
            '/static/hm-news-detail/images/img_22946_0_2.png',
          time: '2 minutes ago',
          title: '如何用 Python 在笔记本上分析100GB 数据',
          img:
            '/static/hm-news-detail/images/img_22946_0_3.png',
          content:
            '第 1 种是对数据进行子抽样，但它有一个明显缺点：可能因忽略部分数据而错失关键信息，甚至误解数据表达的含义。第 2 种是使用分布式计算。虽然在某些情况下这是一种有效的方法，但是管理和维护集群会带来巨大开销。想象一下，要为一个刚超出内存大小、大概 30-50GB 的数据集就建立一套集群，对我来说，这似乎有点“用力过猛”。'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    
  }
};
</script>
<style>
@import './index.response.css';
</style>
