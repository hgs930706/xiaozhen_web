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
      <el-form-item label="场地名称">
        <el-input v-model="formInline.meetingName"></el-input>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="formInline.bookingStartTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">至</el-col>
        <el-col :span="11">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="formInline.bookingEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
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
      <el-table-column prop="name" label="会议室"> </el-table-column>
      <el-table-column prop="openId" label="用户名"> </el-table-column>
      <el-table-column prop="bookingUnit" label="预约单位"> </el-table-column>
      <el-table-column prop="bookingPerson" label="预约人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="joinPeople" label="参会人数"> </el-table-column>

      <el-table-column prop="createTime" label="提交预约时间">
      </el-table-column>

      <el-table-column prop="bookingStartTime" label="预约会议时间">
      </el-table-column>
      <el-table-column prop="approvalStatusStr" label="状态"> </el-table-column>

      <el-table-column label="操作" width="150">
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
      <el-dialog title="预约申请" :visible.sync="dialogFormVisible">
        <el-form :model="detail">
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <labe>{{ detail.openId }}</labe>
          </el-form-item>
          <el-form-item label="预约单位：" :label-width="formLabelWidth">
            <labe>{{ detail.bookingUnit }}</labe>
          </el-form-item>
          <el-form-item label="预约人：" :label-width="formLabelWidth">
            <labe>{{ detail.bookingPerson }}</labe>
          </el-form-item>
          <el-form-item label="联系电话：" :label-width="formLabelWidth">
            <labe>{{ detail.mobile }}</labe>
          </el-form-item>
          <el-form-item label="参会人数：" :label-width="formLabelWidth">
            <labe>{{ detail.joinPeople }}</labe>
          </el-form-item>
          <el-form-item label="预约会议时间：" :label-width="formLabelWidth">
            <labe
              >{{ detail.bookingStartTime }}--{{ detail.bookingEndTime }}</labe
            >
          </el-form-item>
          <el-form-item label="提交预约时间：" :label-width="formLabelWidth">
            <labe>{{ detail.createTime }}</labe>
          </el-form-item>
          <el-form-item label="会议室名称：" :label-width="formLabelWidth">
            <labe>{{ detail.meetingName }}</labe>
          </el-form-item>
          <el-form-item label="会议室地址：" :label-width="formLabelWidth">
            <labe>{{ detail.meetingAddress }}</labe>
          </el-form-item>
          <el-form-item label="会议室类型：" :label-width="formLabelWidth">
            <labe>{{ detail.meetingType }}</labe>
          </el-form-item>
          <el-form-item label="会议室桌型需求：" :label-width="150">
            <labe>{{ detail.meetingTable }}</labe>
          </el-form-item>
          <el-form-item label="会议室物品需求：" :label-width="150">
            <labe>{{ detail.meetingGoods }}</labe>
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
          <el-button type="primary" @click="onSubmit()">{{
            status ? "拒绝" : "确 定"
          }}</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="detail-form">
      <el-dialog title="会议场地详情" :visible.sync="dialogFormVisibleDetail">
        <el-form :model="form2">
          <el-form-item label="序号：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="用户名：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="预约单位：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="预约人：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="联系电话：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="参会人数：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="预约会议时间：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="提交预约时间：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室名称：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室地址：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室类型：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室桌型需求：" :label-width="150">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室物品需求：" :label-width="150">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
        </el-form>
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
      dialogFormVisibleDetail: false,
      form2: {
        name: "123",
      },
      tableData: [],
      formInline: {
        meetingName: "",
        bookingStartTime: "",
        bookingEndTime: "",
        approvalStatus: "",
      },
      status: false,
      reason: "",
      detail: {
        id: "",
        openId: "",
        bookingUnit: "",
        bookingPerson: "",
        mobile: "",
        joinPeople: "",
        bookingStartTime: "",
        bookingEndTime: "",
        meetingTable: "",
        meetingType: "",
        meetingGoods: "",
        remark: "",
        meetingName: "",
        meetingAddress: "",
      },
    };
  },
  created() {
    this.$axios
      .get(`/meetingAreaBooking/list?page=1&size=10`)
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
        .get(`/meetingAreaBooking/list`, {
          params: {
            page: this.page,
            size: this.size,
            meetingName: this.formInline.meetingName,
            bookingStartTime: this.formInline.bookingStartTime,
            bookingEndTime: this.formInline.bookingEndTime,
            approvalStatus: this.formInline.approvalStatus,
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
    handleClickTable(row, status) {
      this.status = status;
      this.dialogFormVisible = true;
      this.$axios
        .get(`/meetingAreaBooking/detail?id=` + row.id)
        .then(({ data }) => {
          if (data.code == 0) {
            let obj = data.data;
            this.detail = {
              id: row.id,
              openId: obj.openId,
              bookingUnit: obj.bookingUnit,
              bookingPerson: obj.bookingPerson,
              mobile: obj.mobile,
              joinPeople: obj.joinPeople,
              bookingStartTime: obj.bookingStartTime,
              bookingEndTime: obj.bookingEndTime,
              meetingTable: obj.meetingTable,
              meetingType: obj.meetingType,
              meetingGoods: obj.meetingGoods,
              remark: obj.remark,
              meetingName: obj.meetingName,
              meetingAddress: obj.meetingAddress,
            };
          } else {
            this.$message.error(data.message);
          }
        });
      console.log(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      this.dialogFormVisible = false;
      //拒绝
      this.$axios
        .post(`/meetingAreaBooking/approval`, {
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
          } else {
            this.$message.error(data.message);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.detail-form .el-form-item {
  margin-bottom: 2px;
}
</style>
