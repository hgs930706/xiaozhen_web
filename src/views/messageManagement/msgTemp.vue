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
          <el-input v-model="formInline.templateName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
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
          <el-button type="primary" @click="insert">新建</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="templateName" label="模板名称">
        </el-table-column>
        <el-table-column prop="templateId" label="模板ID"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="operation(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
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
    <div class="detail-form">
      <el-dialog title="新建" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="模板名称：">
            <el-input v-model="form.templateName"></el-input>
          </el-form-item>
          <el-form-item label="模板id：">
            <el-input v-model="form.templateId"></el-input>
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
       page: 1,
      size: 10,
      total: 0,
      dialogFormVisible: false,
      form: {
        id:'',
        templateName: "",
        templateId: "",       
      },
      tableData: [],
      formInline: {
        templateName: "",
        createTime: ""
      },
    };
  },
  created() {
    this.$axios
      .get(`/template/list?page=1&size=10`)
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
        .get(`/template/list?page=${this.page}&size=${this.size}&templateName=${this.formInline.templateName}&createTime=${this.formInline.createTime}`)
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
    insert() {
      this.dialogFormVisible = true;
    },
    operation(row){
      this.insert();
       this.form = {
        id:row.id,
        templateName: row.templateName,
        templateId: row.templateId,       
      }
    },
    onSubmit() {
      this.$axios
        .post(`/template/insert`, {
          id: this.form.id,
          templateName: this.form.templateName,
          templateId: this.form.templateId,
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: data.message,
              type: "success",
            });
            this.dialogFormVisible = false;
            this.query();
          }else{
            this.$message.error(data.message);
          }
        }).catch((error) => {
            console.log('前端系统异常：' + error)
        });
      console.log("submit!");
    },
    handleClickTable(row) {
      console.log(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    
  },
};
</script>

<style lang="less" scoped>
</style>
