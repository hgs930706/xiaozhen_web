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
            type="datetime"
            placeholder="选择日期"
            v-model="formInline.createTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formInline.nickname"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="background-color: #f2f2f2; padding: 20px 20px 80px 20px;margin-right:20px">
      <div v-for="item in tableData" :key="item">
        <div style="width: 80%; background-color: #ffffff; padding: 10px;margin-bottom:20px">
          <p>{{ item.createTime }}<span style="padding-left: 50px;">{{ item.openId }}</span></p>
          <p>{{ item.remark }}</p>
        </div>        
      </div>
    </div>
    <div class="block">
      <el-pagination
        style="text-align: left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      size: 5,
      total: 0,
      test: [1, 2, 3],
      tableData: [],
      formInline: {
        nickname: "",
        createTime: "",
      },
    };
  },
  created() {
    this.$axios
      .get(`/feedback/list?page=1&size=5`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data.list;
        this.total = data.data.total;
      })
      .catch((error) => {});
  },
  methods: {
    query() {
      this.$axios
        .get(
          `/feedback/list?page=${this.page}&size=${this.size}&nickname=${this.formInline.nickname}&createTime=${this.formInline.createTime}`
        )
        .then(({ data }) => {
          this.tableData = data.data.list;
          this.total = data.data.total;
        })
        .catch((error) => {});
    },
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      this.query();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.query();
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
