<template>
      <p>{{time}}</p>
</template>

<script>
   export default{
       data () {
           return {
               flag : false,
              //  _endTime: '',
               startTime: new Date(),
               timeId: null,
               leftTime:0
           }
       },
       computed:{
         time(){
           let leftTime = this.leftTime;
           if(leftTime<=0){
            //  this.leftTime =0;
             return "时间结束";
           }
           let d = parseInt(leftTime/(24*60*60))
           let h = this.formate(parseInt(leftTime/(60*60)%24))
           let m = this.formate(parseInt(leftTime/60%60))
           let s = this.formate(parseInt(leftTime%60))
           //${d}天${h}小时
           return `${m}分${s}秒`;
         }
       },
       mounted () {
          this.reset();
       },
      watch:{
        timeSpan(newValue){
          this.leftTime = newValue;
          console.log(4)
          return newValue;
        }
      },
       props : {
           timeSpan : {
               type : Number
           }
       },

       methods : {

           formate (time) {
               if(time>=10){
                   return time
               }else{
                   return `0${time}`
               }
           },
           start(){
             var self = this;
             clearInterval(self.timeId);
             self.startTime = new Date();
             self.timeId = setInterval(()=>{
                 if(this.flag == true){
                     clearInterval(self.timeId)
                     self.timeId = null;
                    //  self.leftTime = 0;
                     return;
                 }
                 self.leftTime = self.timeSpan  - ((new Date())-self.startTime)/1000 ;

                 if(self.leftTime <= 0){
                     self.flag = true
                     self.$emit('time-end')
                 }
                self.$emit('time-process',Math.round( 100-(self.leftTime/self.timeSpan)*100 ));

             },500);
           },
           reset(){
            //  this._endTime = this.endTime;
             this.flag = false;
             this.timeId&&clearInterval(this.timeId);
             this.leftTime = this.timeSpan;
           },
           finsh(){
             this.flag = true;
             this.$emit('time-end');

           },
       }
   }
</script>
