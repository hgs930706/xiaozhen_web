<!--
 * @Author: ShenYuQiang
 * @Date: 2020-11-22 01:51:10
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-22 01:52:29
 * @FilePath: \yishangxiaozhen\src\views\businessManagement\index.vue
-->
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="提交预约时间">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="formInline.createTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="接待预约时间">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="formInline.bookingTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="formInline.approvalStatus" placeholder="审批状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="待审批" value="0"></el-option>
          <el-option label="同意" value="1"></el-option>
          <el-option label="拒绝" value="2"></el-option>
        </el-select>
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
      <el-table-column prop="openId" label="用户名"> </el-table-column>
      <el-table-column prop="bookingCompany" label="预约单位">
      </el-table-column>
      <el-table-column prop="bookingName" label="预约人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="createTime" label="预约提交时间">
      </el-table-column>
      <el-table-column prop="bookingTime" label="预约接待时间">
      </el-table-column>

      <el-table-column prop="visitCount" label="参观人数"> </el-table-column>

      <el-table-column prop="visitType" label="参观方式"> </el-table-column>
      <el-table-column prop="images" label="图片" width="200">
        <template slot-scope="scope">
          <div class="moreImg">
            <el-image
              v-for="(item, index) in scope.row.images"
              :key="index"
              :src="item.imageUrl"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column prop="approvalStatusStr" label="状态"> </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClickTable(scope.row, false)"
            type="text"
            size="small"
            >同意</el-button
          >
          <el-button
            @click="handleClickTable(scope.row, true)"
            type="text"
            size="small"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
    <div class="detail-form">
      <el-dialog title="同意预约申请" :visible.sync="dialogFormVisible">
        <el-form :model="detail">
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <labe>{{ detail.openId }}</labe>
          </el-form-item>
          <el-form-item label="预约单位：" :label-width="formLabelWidth">
            <labe>{{ detail.bookingCompany }}</labe>
          </el-form-item>
          <el-form-item label="预约人：" :label-width="formLabelWidth">
            <labe>{{ detail.bookingName }}</labe>
          </el-form-item>
          <el-form-item label="联系电话：" :label-width="formLabelWidth">
            <labe>{{ detail.mobile }}</labe>
          </el-form-item>
          <el-form-item label="参观人数：" :label-width="formLabelWidth">
            <labe>{{ detail.visitCount }}</labe>
          </el-form-item>
          <el-form-item label="参观方式：" :label-width="formLabelWidth">
            <labe>{{ detail.visitType }}</labe>
          </el-form-item>
          <el-form-item label="预约时间：" :label-width="formLabelWidth">
            <labe>{{ detail.bookingTime }}</labe>
          </el-form-item>
          <el-form-item label="提交预约时间：" :label-width="formLabelWidth">
            <labe>{{ detail.createTime }}</labe>
          </el-form-item>
          <el-form-item label="图片：" :label-width="formLabelWidth">
            <labe>
              <div class="moreImg">
                <el-image
                  v-for="(item, index) in detail.images"
                  :key="index"
                  :src="item.imageUrl"
                ></el-image>
              </div>
            </labe>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <labe>{{ detail.remark }}</labe>
          </el-form-item>
          <el-form-item
            v-if="status"
            label="拒绝原因："
            :label-width="formLabelWidth"
          >
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="reason"
            >
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit()">{{status ? "拒绝" : "确 定"}}</el-button>
        </div>
      </el-dialog>
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
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form2: {
        name: "123",
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [],
      formInline: {
        bookingTime: "",
        createTime: "",
        approvalStatus: "",
      },
      detail: {
        id: "",
        openId: "",
        bookingCompany: "",
        bookingName: "",
        mobile: "",
        visitCount: "",
        visitType: "",
        bookingTime: "",
        createTime: "",
        remark: "",
        images: [],
      },
      status: false,
      reason: "",
    };
  },
  created() {
    this.$axios
      .get(`/receiveBooking/list?page=1&size=10`)
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
          `/receiveBooking/list?page=${this.page}&size=${this.size}&bookingTime=${this.formInline.bookingTime}&createTime=${this.formInline.createTime}&approvalStatus=${this.formInline.approvalStatus}`
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
    handleClickTable(row, status) {
      this.status = status;
      this.dialogFormVisible = true;
      this.$axios
        .get(`/receiveBooking/detail?id=` + row.id)
        .then(({ data }) => {
          let obj = data.data;
          this.detail = {
            id: row.id,
            openId: obj.openId,
            bookingCompany: obj.bookingCompany,
            bookingName: obj.bookingName,
            mobile: obj.mobile,
            visitCount: obj.visitCount,
            visitType: obj.visitType,
            bookingTime: obj.bookingTime,
            createTime: obj.createTime,
            remark: obj.remark,
            images: obj.images,
          };
        })
        .catch((error) => {});    
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      this.dialogFormVisible = false;
      //拒绝
      this.$axios
        .post(`/receiveBooking/approval`, {
          id: this.detail.id,
          approvalRemark: this.reason,
          approvalStatus: this.status ? 2 : 1,
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: data.message,
              type: "success",
            });
          }else{
            this.$message.error(data.message);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  img {
    width: 100%;
    height: 100%;
  }
}
.moreImg {
  display: flex;
  flex-wrap: wrap;
  .el-image {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    margin-top: 5px;
  }
}
.detail-form .el-form-item {
  margin-bottom: 2px;
}
</style>
