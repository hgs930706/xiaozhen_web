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
          type="date"
          placeholder="选择日期"
          v-model="formInline.date1"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="接待预约时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formInline.date2"
          style="width: 100%"
        ></el-date-picker>
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
      <el-table-column prop="openId" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="bookingCompany" label="预约单位" width="120">
      </el-table-column>
      <el-table-column prop="bookingName" label="预约人" width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="预约提交时间" width="120">
      </el-table-column>
      <el-table-column prop="bookingTime" label="预约接待时间" width="120">
      </el-table-column>

      <el-table-column prop="visitCount" label="参观人数" width="120">
      </el-table-column>

      <el-table-column prop="visitType" label="参观方式" width="120">
      </el-table-column>
       <el-table-column prop="images" label="图片" width="200">
        <template slot-scope="scope">
          <div class="wrap" :class="{ moreImg: scope.row.images.length > 1 }">
            <el-image
              v-for="(item, index) in scope.row.images"
              :key="index"
              :src="item.imgeUrl"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120"> </el-table-column>
      <el-table-column prop="approvalStatusStr" label="状态" width="120"> </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClickTable(scope.row)"
            type="text"
            size="small"
            >同意</el-button
          >
          <el-button type="text" size="small">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="detail-form">
      <el-dialog title="同意预约申请" :visible.sync="dialogFormVisible">
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
          <el-form-item label="参观人数：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="参观方式：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="预约时间：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="提交预约时间：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="图片：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="备注：" :label-width="formLabelWidth">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        user: "",
        region: "",
        date1: "",
        date2: "",
      },
    };
  },
  created() {
    this.$axios
      .get(`/receiveBooking/list?page=1&size=10`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data.list;
      })
      .catch((error) => {});
  },
  methods: {
    handleClickTable(row) {
      this.dialogFormVisible = true;
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
