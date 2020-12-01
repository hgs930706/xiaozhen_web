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
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="content" label="跳转地址"> </el-table-column>

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
            <el-input v-model="form.content"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      formInline: {
        user: "",
        region: "",
        date1: "",
        date2: "",
      },
      form: {
        id: "",
        name: "",
        content: "",
      },
    };
  },
  created() {
    this.query();
  },
  methods: {
    query(){
this.$axios
      .get(`/dict/maps`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data;
        this.total = data.data.total;
      })
      .catch((error) => {});
    },
    handleClickTable(row) {
      this.dialogFormVisible = true;
      this.form = {
        id: row.id,
        name: row.name,
        content: row.content,
      }
        console.log(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!"); 
      this.dialogFormVisible = false;
      this.$axios
        .post(`/dict/mapUpdate`, {
          id: this.form.id,
          name: this.form.name,
          content: this.form.content,
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: data.message,
              type: "success",
            });
            this.query();
          }else{
            this.$message.error(data.message);
          }
        }).catch((error) => {
            console.log('前端系统异常：' + error)
        });
    }    
  },
};
</script>

<style lang="less" scoped>
</style>
