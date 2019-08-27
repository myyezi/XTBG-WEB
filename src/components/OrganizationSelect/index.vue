<template>
      <div class="form-group">
          <label class="control-label">组织</label>
          <div class="input-group">
              <el-select v-model="searchParam.companyId" filterable clearable placeholder="请选择组织">
                  <el-option
                      v-for="item in companyList"
                      :key="item.value"
                      :label="item.name"
                      :change="test()"
                      :value="item.id">
                  </el-option>
              </el-select>
          </div>
      </div>
</template>
<script>

import ajax from '@/utils/request'
import { tool } from '@/utils/common'

export default {
  name: "OrganizationSelect",
  mixins: [tool],
  props: {
    isShow: Boolean
  },
  data() {
    return {
      isShowMore: false,
      showSearch: false,
      selectedData: {},
      dialogVisible: false,
      companyList:[]
    }
  },

  mounted() {
    this.getCompanyList();
  },
  methods: {
      //获取组织
      getCompanyList() {
          ajax.get('personnel/personnelattendancegroup/getCompanyList').then(rs => {
              this.companyList = rs.data;
          });
      },
      test(rs){
          console.log(rs)
      }
  }
};
</script>
