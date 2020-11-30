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
          <el-select v-model="formInline.msgType" placeholder="消息类型">
            <el-option label="全部" value=""></el-option>
             <el-option label="活动消息" value="1"></el-option>
            <el-option label="接待预约消息" value="2"></el-option>
            <el-option label="会议场地预约消息" value="3"></el-option>
           
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.sendStatus" placeholder="审批状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="失败" value="0"></el-option>
            <el-option label="成功" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发送时间">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="formInline.createTime"
           value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
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
      tableData: [],
      formInline: {
        createTime: "",
        sendStatus: "",
        msgType: ""
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
        .get(`/msgAction/list`,{
          params: {
            page:this.page,
            size:this.size,
            createTime: this.formInline.createTime,
            sendStatus: this.formInline.sendStatus,
            msgType: this.formInline.msgType
          },
        })
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
