const Vue = window.Vue
Vue.config.productionTip =false
//需求：在页面实时显示当前的时间
//在月份，日期，小时 小于10 的时候补0
let plusData=function(value){
  return value<10?'0'+value:value
}

new Vue({
    data: {
      data: new Date()
    },
    template: `
      <div>
      原数据：
        {{data}}
        </br>
        处理后的数据：
        // {{data | formatData}}
      </div>
    `,
    filters:{
      //这里的value 就是需要过滤的数据
      formatData(value){
        //将字符串转化为data类型
        let data =new Date(value)
        let year =data.getFullYear()
        let month=plusData(data.getMonth()+1)
        let day=plusData(data.getDate())
        let hours =plusData(data.getHours())
        let min =plusData(data.getMinutes())
        let sec =plusData(data.getSeconds())
        //将整理好的数据返回
        return year +'年 '+month +'月 '+day +'日 '+hours +' : ' +min+' : '+sec
        
      }
    },
    mounted(){
      let _this=this
      // setInterval() 定时器
      this.timer=setInterval(function(){
        _this.data =new Date()
      },1000)
    },
    beforeDestory(){
      //清楚定时器
      if(this.timer){
        clearInterval(this.timer)
      }
    }
  }).$mount("#app");