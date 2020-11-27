<!--
 * @Author: ShenYuQiang
 * @Date: 2020-11-22 01:51:10
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-22 01:52:29
 * @FilePath: \yishangxiaozhen\src\views\businessManagement\index.vue
-->
<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
       
        <el-form-item label="时间">         
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.date1"
              style="width: 100%"
            ></el-date-picker>         
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
      
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
     
    </div>
    <div v-for="item in tableData" :key="item">
      <div style="background-color:#ccc">
          <p>{{item.createTime}}</p>
          <p>{{item.openId}}</p>
          <p>{{item.remark}}</p>
      </div>        
    </div>
    <div class="block">
      <el-pagination
       style="text-align:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage3: 5,
        test:[1,2,3],
      tableData: [],
      formInline: {
        user: "",
        region: "",
        date1: "",
        date2: "",
      },
    };
  },
   created() {
    this.$axios
      .get(`/feedback/list?page=1&size=10`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data.list;
      })
      .catch((error) => {});
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    handleClickTable(row) {
      console.log(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
</style>
