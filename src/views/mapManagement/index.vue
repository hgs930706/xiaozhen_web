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
      <el-form-item label="地图管理"></el-form-item>
      
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="序号" width="150"> </el-table-column>
      <el-table-column prop="name" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="province" label="跳转地址" width="120">
      </el-table-column>

      <el-table-column prop="zip" label="创建时间" width="120"> </el-table-column>  
       <el-table-column prop="zip" label="修改时间" width="120"> </el-table-column>       

      <el-table-column label="操作" width="100">
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
    <div class="detail-form">
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址：">
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
      dialogFormVisible:false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      formInline: {
        user: "",
        region: "",
        date1: "",
        date2: "",
      },
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
    };
  },
  methods: {
    handleClickTable(row) {
      this.dialogFormVisible = true
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
