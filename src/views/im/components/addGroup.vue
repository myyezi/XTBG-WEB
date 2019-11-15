<template>
    <div v-loading="loading">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="groupUser" class="im_chat_group_input"></el-input>
      <div class="clearfix" >
            <div class="im_chat_group_form">
                <el-form ref="groupForm" :model="groupForm" label-width="80px">
                  <el-form-item
                    label="群名称:"
                    prop="name"
                    :rules="[
                      { required: true, message: '请输入群名称', trigger: 'blur' },
                      { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: ['blur', 'change'] }
                    ]">
                      <el-input v-model="groupForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="群头像:">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="headers"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                  </el-form-item>
              </el-form>
            </div>
            <el-tree
              :data="userFriendList"
              show-checkbox
              default-expand-all
              node-key="id"
              :filter-node-method="filterNode"
              :default-checked-keys = "seletedKeys"
              ref="tree"
              class="group_tree"
              @check-change="handleCheckChange"
              :props="defaultProps">
              <span class="custom-tree-node clearfix" slot-scope="{ node, data }">
                  <img :src="data.portrait?data.portrait:defaultPic" v-if="data.type === 1">
                  <span :title="node.label ">{{ node.label }}</span>
              </span>
          </el-tree>
      </div>
      <div class="clearfix im_chat_group_footer">
          <el-button size="small" @click="back" style="float:left">取消</el-button>
          <el-button size="small" style="background-color: #29c9bb;border-color: #29c9bb;color: #FFF;float:left" @click="onSubmit('groupForm')"  :disabled="seleteUserList.length<1">创建</el-button>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Bus from "@/utils/eventBus.js";
  import ajax from '@/utils/request'
  export default {
    data() {
      return {
          uploadUrl: process.env.BASE_API + "file/upload/multipart",
          headers:{
              "Authorization": 'Bearer ' + this.$store.getters.token
          },
          groupUser:'',
          seletedKeys:[],
          userFriendList:[],
          seleteUserList:[],
          defaultProps: {
              children: 'children',
              label: 'name'
          },
          loading: true,
          defaultPic:require('@/styles/img/morentx.png'),
          groupForm:{
            name:''
          },
          imageUrl: '',
          accept:"png,jpg,jpeg,gif"
      };
    },
    computed: {
      ...mapGetters([
          'user',
      ])
    },
    watch: {
        groupUser(val) {
            this.$refs.tree.filter(val);
        }
    },
    created() {
        this.getAllOrganization()
    },
    methods: {
      beforeAvatarUpload(file) {
        // 限制20M
        if(this.accept && this.accept.toLowerCase().indexOf(file.name.toLowerCase().split(".")[(file.name.toLowerCase().split(".").length - 1)]) == -1) {
            this.$message("请上传 "+this.accept+" 的文件");
            return false;
        } else if(file.size > 1024*1024*2){
            this.$message("请上传2M以下的文件");
            return false;
        }  else {
            this.loading = true;
            return true;
        }
      },
      handleAvatarSuccess(res, file) {
        this.loading = false;
        if(res.status == 0){
            this.imageUrl = res.data.filedomain + res.data.path
        }
      },
      handleCheckChange(data, checked, indeterminate) {
          let objArr = this.$refs.tree.getCheckedNodes()
          this.seleteUserList = objArr.filter((item)=> {
            return item.type === 1
          })
      },
      back() {
          this.$emit('close-add-group')
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let groupInfo = {
                name: this.groupForm.name,
                portrait:this.imageUrl,
                owner:this.user.userId,
                type:0
            }
            let groupMembers = [{memberId:this.user.userId,type:2,alias:this.user.name}]
            this.seleteUserList.forEach((item)=>{
                groupMembers.push({
                    memberId:item.id,
                    alias:item.name,
                    type:0 //0普通成员，1管理员，2群主
                })
            })
            let notifyContent = {
                type:1,
                content:this.user.name+'创建了一个群',
                pushContent:this.user.name+'创建了一个群',
            }
            let obj ={
              groupInfo:groupInfo,
              groupMembers:groupMembers,
              notifyContent:notifyContent
            }
            let objArr = {
                obj:obj,
                subTopic:'GC'
            }
            this.$store.commit('sendMessage', objArr);
            this.$emit('close-add-group')
          } else {
            return false;
          }
        });
      },
      filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
      },
      getAllOrganization() {
        ajax.get('/upms/organization/orgUserTree/').then(rs => {
            if(rs.status === 0) {
                this.seletedKeys.push(this.user.userId)
                this.userFriendList = rs.data
                this.getDisabledData(this.user.userId,this.userFriendList)
                this.loading = false
            }
        });
      },
      getDisabledData(id,data) {
          data.forEach((item)=>{
              if(item.id == id) {
                  item.disabled = true
              } else {
                  if(item.children&&item.children.length>0) {
                      this.getDisabledData(id,item.children)
                  }
              }
          })
      }
    }
  };
</script>
<style lang="scss">
    .im_chat_group_form {
        float:left;
        margin-top: 20px;
        height: 500px;
        border-right:1px solid #999;
        padding-right:10px;
        width: 270px;
        box-sizing: border-box;
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 64px;
          height: 64px;
          line-height: 64px;
          text-align: center;
        }
        .avatar {
          width: 64px;
          height: 64px;
          display: block;
        }
    }
    .group_tree {
      float:left;
      margin: 20px auto 0;
      height: 500px;
      width: 329px;
      overflow: auto;
      .el-tree-node__content {
          height:30px
      }
      .custom-tree-node{
          img {
            float:left;
            width:26px;
            height:26px;
            margin-right:5px;
            border-radius: 50%;
          }
          span {
            float:left;
            height: 26px;
            line-height: 26px;
          }
      }
    }
    .im_chat_group_footer {
      width:125px;
      margin:20px auto 0
    }
</style>
