<template>
 <!-- v-scroll-bottom="chatRecords" -->
  <div class="m-message" id="m-message">
      <ul>
          <li v-for="item in messageList">
              <p class="time"><span>{{item.date?item.data:new Date() | time}}</span></p>
              <div class="main" :class="{ self: item.from == 1 }">
                  <img class="avatar" width="30" height="30" :src="userPhoto(item.from)" />
                  <div>
                      <span class="userName">{{item.from | idToUserName}}</span><br/>
                      <div class="text">{{item.text}}</div>
                  </div>

              </div>
          </li>
      </ul>
  </div>



</template>

<script>

export default{
  components:{
  },
  props : {
      messageList : {
          type : Array
      },
      // 筛选出用户头像

  },
  methods:{

    userPhoto(id){
       var m_users = window.m_users;
      if(!m_users) return "";
      if(!id){
        return '';
      }
      return m_users.find((item)=>item.id ==id).logo;
    }
  },
  filters: {


            time (date) {
                date = date || new Date();
                if (typeof date === 'string') {
                    date = new Date(date);
                }
                return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },

            idToUserName (id) {
                 var m_users = window.m_users;
                if(!m_users) return "";
                if(!id){
                  return '';
                }
                return m_users.find((item)=>item.id ==id).realname;
            },
          },
        }
</script>


<style lang="less">
    .m-message {

        padding: 10px 15px;
        overflow-y: scroll;
        /*background-color: rgba(20, 20, 20, 0.5);*/


        li {
            margin-bottom: 15px;
            list-style: none;
        }
        .time {
            margin: 7px 0;
            text-align: center;

            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #2f2f2f;
                border-radius: 2px;
                background-color: #dcdcdc;
            }
        }
        .avatar {
            float: left;
            margin: 0 10px 0 0;
            border-radius: 3px;
        }
        .userName {
            font-size: 10px;
            color: #999;
        }
        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: ~'calc(100% - 40px)';
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
            }
            .text {
                background-color: #b2e281;

                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: #b2e281;
                }
            }
        }
    }
</style>
