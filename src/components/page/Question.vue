<template>
<div class="question-wrapper">
        <div>
            <div class="m_q_sidebar">
                <div>
                  <h4>选择分组：</h4>
                  <el-select groupselector v-model="currentSelectGroupId" @change="handerChangeGroup" placeholder="请选择分组">
                      <el-option v-for="item in studentGroupList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
                </div>
                <div>
                  <h4>分组成员列表：</h4>
                  <user-list :list="studentList"></user-list>
                </div>
            </div>
            <div class="content_message">
                <!-- <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor> -->
                <div>
                  <h4>题目内容：</h4>
                  <el-input
                    placeholder="题目"
                    icon="caret-right"
                    v-model="content"
                    :on-icon-click="handlequestionClick">
                  </el-input>
                </div>
                <div>
                  <h4>小组讨论记录：</h4>
                  <message style="max-height:500px;" :message-list = "messageList"></message>
                </div>
                <el-input
                  placeholder="发送消息"
                  icon="caret-right"
                  v-model="input2"
                  :on-icon-click="handleIconClick">
                </el-input>
            </div>
            <div class="clear:both;"></div>
        </div>


        <div>

        </div>

        <!-- <mt-actionsheet cancel-text="'取消'" :actions="actions" v-if="sheetVisible">
    </mt-actionsheet> -->
</div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';
import Message from './Message.vue';
import UserList from './UserList.vue';
import * as types from 'src/store/types';

export default {
    created() {
        var self = this;
        self.loading('连接中。。。');
        this.$store.dispatch(types.FETCH_STUDENT_GROUPS).then(sgs => {
            self.studentGroupList = sgs;
            if (sgs.length > 0) {
                self.currentSelectGroupId = sgs[0].id;
            }
        });
        self.loading('连接中。。。');
        this.$store.dispatch(types.FETCH_STUDENT_BY_IDS).then(ss => {
            self.m_users = ss;
            window.m_users =ss;
            self.messageList = self.$store.getters.chatRecord;
            self.loaded();
        });
    },
    data() {
      var self = this;
        return {
            studentGroupList: [],
            m_users:[],
            content:'',
            input2:'',
            currentSelectGroupId: -1,
            studentList: [],
            messageList:[],
            socketEvents: {
                '/topic/chat': function(frame) {
                    self.$store.getters.chatRecord.push(JSON.parse(frame.body));
                },
              },
            // configs: {
            //     status: true,
            //     initialValue: '',
            //     height:20,
            //     renderingConfig: {
            //         codeSyntaxHighlighting: true,
            //         highlightingTheme: 'atom-one-light'
            //     }
            // }
        }
    },
    components: {
        UserList,
        Message,

    },
    methods: {

      handlequestionClick(){
        var self = this;
        self.$stomp.send(`/topic/question`, {}, JSON.stringify({
          text:self.content,
          date:new Date,
          from:self.$store.getters.currentUser.id,
          groupid: self.currentSelectGroupId
        }));
      },

      handleIconClick(){
        var self = this;
        self.$stomp.send(`/topic/chat`, {}, JSON.stringify({
          text:self.input2,
          date:new Date,
          from:self.$store.getters.currentUser.id,
          groupid: self.currentSelectGroupId
        }));
        self.input2='';
      },
        handerChangeGroup() {
            let self = this;

            var studentIds = self.studentGroupList.find(item => item.id === this.currentSelectGroupId).studentIds;
            this.$store.dispatch(types.FETCH_STUDENT_BY_IDS, studentIds).then(students => {
                self.studentList = students;
            });
        }
    }
}
</script>

<style>
.question-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}


.m_q_sidebar {
    width: 200px;
    float: left;
}

.content_message {
    float: left;
}
</style>
