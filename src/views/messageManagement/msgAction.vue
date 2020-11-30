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
        <el-form-item label="消息类型">
          <el-select v-model="formInline.region" placeholder="审批状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审批" value="0"></el-option>
            <el-option label="同意" value="1"></el-option>
            <el-option label="拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="审批状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审批" value="0"></el-option>
            <el-option label="同意" value="1"></el-option>
            <el-option label="拒绝" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="openId" label="发送至"> </el-table-column>
        <el-table-column prop="nickname" label="微信昵称"> </el-table-column>
        <el-table-column prop="msgType" label="消息类型"> </el-table-column>
        <el-table-column prop="name" label="预约名称"> </el-table-column>
        <el-table-column prop="receiveAddress" label="预约地址">
        </el-table-column>
        <el-table-column prop="bookingTime" label="预约时间"> </el-table-column>

        <el-table-column prop="createTime" label="消息发送时间">
        </el-table-column>

        <el-table-column prop="sendStatus" label="发送状态"> </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleClickTable(scope.row)"
              type="text"
              size="small"
              >详情</el-button
            >
            <el-button type="text" size="small">添加场次</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
     <el-pagination
        style="text-align: right"
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
      size: 10,
      total: 0,  
      currentPage3: 5,
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
      .get(`/msgAction/list?page=1&size=10`)
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
        .get(`/activityBooking/list?page=${this.page}&size=${this.size}`)
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
