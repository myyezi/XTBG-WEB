<template>
  <div class="white-bg" v-cloak>
      <el-radio-group v-model="isopen" style="padding:20px 20px 0">
        <el-radio :label="false">收起</el-radio>
        <el-radio :label="true">展开</el-radio>
      </el-radio-group>
      <dragTreeTable
        class="table-box"
        :data="treeData"
        :onDrag="onTreeDataChange"
        :isdraggable="true"
        :fixed="true"
        :isopen="isopen"
        :height="600">
      </dragTreeTable>
      <el-dialog title="模版标题" :visible.sync="dialogFormVisible" width="200">
          <el-form :model="templateForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="菜单名称" prop="code">
              <el-input v-model="templateForm.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="指标分值" prop="title">
              <el-input v-model="templateForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" prop="content">
              <el-input v-model="templateForm.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="指标分值" prop="indexScore">
              <el-input v-model="templateForm.indexScore" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="cancel">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import dragTreeTable from "@/components/treeTable/dragTreeTable.vue";
import ajax from '@/utils/request'
export default {
  name: "treeTable",
  data() {
    return {
      isopen:false,
      treeData: {
        columns: [],
        lists: [],
        custom_field: {
          id: 'id',
          lists: 'children',
          parent_id: 'parentId',
          order: 'sortNum',
          is_last:'isLast'
        }
      },
      dialogFormVisible:false,
      isAddFirst:false,// 是否是增加一级节点
      operationType:'',// 操作类型
      templateForm:{
        code:'', 
        title:'',
        content:'', 
        indexScore:'',
      },// 弹框内容
      rules: {
        code: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入score', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      tempType:1,
      formData:{},
      titleImg:require('@/styles/img/add.png')
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    onPreview(data) {
        window.open('https://view.officeapps.live.com/op/view.aspx?src=https://dev.zdsxc.com/group1/M00/00/05/rBCZsl0TKvuAQksEAACMAIQzCE0569.doc')
    },
    // 增加一级节点
    onAddFirst() {
      this.onAdd(1)
    },
     // 增加节点
    onAdd(data) {
        this.formData = {}
        this.isAddFirst = false
        if(data === 1) {
          // 新增一级节点
          this.isAddFirst = true
        } else {
          this.formData = data
        }
        this.clearValidate('ruleForm')
        this.operationType = 'add'
        this.dialogFormVisible = true
        console.log("新增", data);
    },
    // 复制节点
    onCopy(data) {
      console.log(data)
      let _this = this
      let str = ''
      this.operationType = 'copy'
      if (data.children&&data.children.length>0) {
          str = '该节点下有子节点，会统一复制，确定要复制吗？'
      } else {
          str = '确定要复制该节点吗？'
      }
      this.$confirm(str ,'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(function() {
      }).catch(function() {
      });
    },
    // 编辑节点
    onEdit(data) {
      this.clearValidate('ruleForm')
      this.formData = data
      this.operationType = 'edit'
      this.templateForm = {
        code:data.code, 
        title:data.title,
        content:data.content, 
        indexScore:data.indexScore,
      }
      this.dialogFormVisible = true
      console.log("编辑", data);
    },
    // 删除节点
    onDelete(data) {
      let _this = this
      let str = ''
      this.operationType = 'delete'
      if (data.children&&data.children.length>0) {
          str = '该节点下有子节点，会统一删除，确定要删除吗？'
      } else {
          str = '确定要删除该节点吗？'
      }
      this.$confirm(str ,'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(function() {
        _this.deleteProjectevaluatetemplate(data,_this.treeData.lists)
      }).catch(function() {
      });
    },
    // list:更新后的数据源
    // from: 当前被拖拽的行
    // to: 目标拖拽行
    // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
    onTreeDataChange(list, from, to, where) {
      this.treeData.lists = list;
      this.saveTemplate({
        json:JSON.stringify(this.treeData.lists)
      })
      console.log(this.treeData.lists)
    },
    // 点击单元格事件
    onClickCell(data) {
      console.log(data)
    },
    // 清楚弹窗内容以及警告信息
    clearValidate(formName) {
      this.templateForm = {
        code:'', 
        title:'',
        content:'', 
        indexScore:'',
      }
      if(this.$refs[formName]) {
        this.$refs[formName].clearValidate();
      }
    },
    // 确定新增或修改节点
    cancel() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let newChild = this.templateForm 
          newChild.type = this.tempType
          if(this.operationType === 'add') {
            // 新增传父级id
            newChild.parentId = this.isAddFirst?0:this.formData.id
          } else {
            // 编辑传id
            newChild.id = this.formData.id
          }
          this.addProjectevaluatetemplate(newChild)
        } else {
          return false;
        }
      });
    },
    // 勾选节点
    onCheckChange(data) {
      console.log(data)
    },
    // 获取树形结构
    getTemplateTree() {
        ajax.get('core/projectevaluatetemplate/templateTree/',{
          type:this.tempType
        }).then(rs => {
          if(rs.status === 0) {
            if(rs.data) {
              this.treeData.lists = rs.data
            }
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        });
    },
    // 树形结构添加和编辑节点
    addProjectevaluatetemplate(data) {
        ajax.post('core/projectevaluatetemplate',data).then(rs => {
          this.getNodeProcessing(data)
        });
    },
    // 删除节点
    deleteProjectevaluatetemplate(data,node) {
        ajax.delete('core/projectevaluatetemplate/'+ data.id).then(rs => {
            this.getNodeProcessing(data,node)
            this.$message({
              message: '删除成功',
              type: 'success'
            });
      });
    },
    // 树形结构整个保存
    saveTemplate(data) {
        ajax.post('core/projectevaluatetemplate/saveTemplate',data).then(rs => {
          // this.getNodeProcessing(data)
        });
    },
    // 前端删除和编辑节点时的处理（可以不用调查询接口），增加需调接口
    getNodeProcessing(data,node) {
        if(this.operationType === 'add' || this.operationType === 'copy') {
          this.$message({
            message: this.operationType === 'add'?'新增成功':'复制成功',
            type: 'success'
          });
          this.dialogFormVisible = false
          this.getTemplateTree()
          // if(this.isAddFirst) {
          //     this.treeData.lists.push(data)
          // } else {
          //   if (!this.formData.children) {
          //     this.$set(this.formData, 'children', []);
          //   }
          //   this.formData.children.push(data);
          // }
        } else if(this.operationType === 'delete') {
          node.forEach((item,index) => {
            if(item.id === data.id) {
              node.splice(index, 1);
            } else {
              if(item.children&&item.children.length>0) {
                this.getNodeProcessing(data,item.children)
              }
            }
          });
        } else {
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.dialogFormVisible = false
          // 弹窗表单修改的字段需要给formData中对应的字段附值
          this.formData.code = data.code
          this.formData.title = data.title
          this.formData.content = data.content
          this.formData.indexScore = data.indexScore
        }
    },
  },
  mounted() {
    // 自定义树形表格表头 type的值为selection会显示展开收缩图标，为action指操作栏
    // 自定义树形表格表头 align单元格对齐方式left、center、right，默认居左对齐
    // 自定义树形表格表头 field单元格内容取值使用与this.treeData.lists中字段相对应
    // disabledType 为 1 只有最后一级能操作，为 2 只有最后一级不能操作（前提是数据中必须有标识是否是最有一级的字段isLast）
    this.treeData.columns = [
      {
        title: "操作",
        type: "action",
        width: 200,
        align: "left",
        actions: [
          {
            text: "复制",
            onclick: this.onCopy,
            formatter: item => {
              return "<i>复制 </i>";
            }
          },
          {
            text: "新增",
            onclick: this.onAdd,
            disabledType:2,
            formatter: item => {
              return "<i>新增 </i>";
            }
          },
          {
            text: "编辑",
            onclick: this.onEdit,
            disabledType:1,
            formatter: item => {
              return "<i>编辑 </i>";
            }
          },
          {
            text: "删除",
            onclick: this.onDelete,
            formatter: item => {
              return "<i>删除 </i>";
            }
          },
          {
            text: "预览",
            disabledType:1,
            onclick: this.onPreview,
            formatter: item => {
              return "<i>预览 </i>";
            } 
          }
        ]
      },
      {
        type: 'checkbox',
        isContainChildren: true, //是否勾选子节点，默认false
        onChange: this.onCheckChange, // parmas selectRows
        width: 80,
        align: 'left'
      },
      {
        title: "指标序号",
        field: "code",
        width: 200,
        align: "left",
        isCellsClick:true,
        cellsClick:this.onClickCell,
        formatter: item => {
            return "<span style='cursor: pointer;color:#4781fe'>"+item.code+"</span>";
        }
      },
      {
        type: "selection",
        title: "评价指标",
        img:this.titleImg,
        field: "title",
        onclick: this.onAddFirst,
        width: 300,
        align: "left",
        formatter: item => {
          if(item.children&&item.children.length>0) {
            return '<img src="static/add.png" style="width:16px;height:16px;margin: -2px 5px 0;vertical-align: middle;"/>'+item.title;
          } else {
            return item.title;
          }
        }
      },
      {
        title: "考核内容及评分标准",
        field: "content",
        width: 300,
        align: "left",
        // isCutOut:true
      },
      {
        title: "指标分值",
        field: "indexScore",
        width: 80,
        align: "center"
      }
    ];
    this.getTemplateTree()
    // 树形表格数据
    // this.treeData.lists = [
    //     {
    //       id: 110,
    //       parent_id: 0,
    //       name: "客户管理",
    //       score: "1",
    //       children: [
    //         {
    //           id: 201,
    //           parent_id: 110,
    //           name: "联系人",
    //           score: "1",
    //           children: null,
    //         },
    //         {
    //           id: 173,
    //           parent_id: 110,
    //           name: "客户",
    //           score: "2",
    //           children: null
    //         },
    //         {
    //           id: 117,
    //           parent_id: 110,
    //           name: "客户维护记录",
    //           score: "2",
    //           children: null
    //         },
    //         {
    //           id: 383,
    //           parent_id: 110,
    //           name: "客户冲突",
    //           score: "3",
    //           children: [
    //             {
    //               id: 390,
    //               parent_id: 383,
    //               name: "个人冲突",
    //               score: "3",
    //               children: null
    //             },
    //             {
    //               id: 397,
    //               parent_id: 383,
    //               name: "团队冲突",
    //               score: "3",
    //               children: null
    //             },
    //             {
    //               id: 215,
    //               parent_id: 383,
    //               name: "客户查询",
    //               score: "3",
    //               children: null
    //             }
    //           ]
    //         },
    //         {
    //           id: 138,
    //           parent_id: 110,
    //           name: "线索管理",
    //           score: "4",
    //           children: null
    //         },
    //         {
    //           id: 159,
    //           parent_id: 110,
    //           name: "集团信息",
    //           score: "4",
    //           children: null
    //         }
    //       ]
    //     },
    //     {
    //       id: 404,
    //       parent_id: 0,
    //       name: "审核中心",
    //       score: "5",
    //       children: [
    //         {
    //           id: 187,
    //           parent_id: 404,
    //           name: "资质审核",
    //           score: "5",
    //           children: null
    //         }
    //       ]
    //     },
    //     {
    //       id: 306,
    //       parent_id: 0,
    //       name: "数据统计",
    //       score: "5",
    //       children: [
    //         {
    //           id: 222,
    //           parent_id: 306,
    //           name: "线索",
    //           score: "5",
    //           children: null
    //         },
    //         {
    //           id: 124,
    //           parent_id: 306,
    //           name: "客户",
    //           score: "5",
    //           children: null
    //         }
    //       ]
    //     },
    //     {
    //       id: 334,
    //       parent_id: 0,
    //       name: "基础数据",
    //       score: "6",
    //       children: [
    //         {
    //           id: 152,
    //           parent_id: 334,
    //           name: "行业信息",
    //           score: "6",
    //           children: null
    //         },
    //         {
    //           id: 166,
    //           parent_id: 334,
    //           name: "客户部门",
    //           score: "6",
    //           children: null
    //         }
    //       ]
    //     },
    //     {
    //       id: 9,
    //       parent_id: 0,
    //       name: "系统管理",
    //       score: "7",
    //       children: [
    //         {
    //           id: 313,
    //           parent_id: 9,
    //           name: "员工管理",
    //           score: "7",
    //           children: null
    //         },
    //         {
    //           id: 320,
    //           parent_id: 9,
    //           name: "部门管理",
    //           score: "7",
    //           children: null
    //         },
    //         {
    //           id: 23,
    //           parent_id: 9,
    //           name: "角色管理",
    //           score: "7",
    //           children: null
    //         },
    //         {
    //           id: 16,
    //           parent_id: 9,
    //           name: "权限管理",
    //           score: "7",
    //           children: null
    //         },
    //         {
    //           id: 2,
    //           parent_id: 9,
    //           name: "菜单管理",
    //           score: "8",
    //           children: null
    //         },
    //         {
    //           id: 107,
    //           parent_id: 9,
    //           name: "操作日志",
    //           score: "8",
    //           children: null
    //         }
    //       ]
    //     }
    //   ]

  }
};
</script>

<style lang="scss">

</style>