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
        <el-form-item label="模板名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formInline.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insert">新建</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="templateName" label="模板名称" >
        </el-table-column>
        <el-table-column prop="templateId" label="模板ID" >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" >
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleClickTable(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" >
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
    <div class="detail-form">
      <el-dialog title="新建" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="模板名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="模板id：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
      currentPage3: 5,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        type1: [],
        type2: [],
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
      .get(`/template/list?page=1&size=10`)
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
    insert() {
      this.dialogFormVisible = true;
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
