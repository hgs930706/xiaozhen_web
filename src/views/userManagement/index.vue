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
      <el-form-item label="用户名">
        <el-input v-model="formInline.username"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formInline.role" placeholder="角色">
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.name" :value="item.id"  v-for="(item, index) in rolesList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.isStatus" placeholder="审批状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
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
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="realName" label="姓名"> </el-table-column>
      <el-table-column prop="roles" label="角色"> </el-table-column>
      <el-table-column prop="isStatus" label="状态"> </el-table-column>
      <el-table-column prop="userImage" label="头像">
        <template slot-scope="scope">
          <div class="moreImg">
            <el-image :src="scope.row.userImage"></el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间"> </el-table-column>

      <el-table-column label="操作" width="100">
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
          <el-form-item label="用户名：">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="form.realName"></el-input>
          </el-form-item>

          <el-form-item label="图片：">
            <el-upload
              class="upload-demo"
              action="#"
              :before-upload="beforeAvatarUpload"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="handleChange"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                限制一张图片，不超过10M
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="角色：">
            <el-checkbox-group v-model="form.roles">
              <el-checkbox
                :label="item.id"
                v-for="(item, index) in rolesList"
                :key="index"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="状态：">
            <el-radio v-model="form.isStatus" label="1">正常</el-radio>
            <el-radio v-model="form.isStatus" label="0">停用</el-radio>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="operationUpload">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      file: "",
      fileList: [],
      page: 1,
      size: 10,
      total: 0,
      dialogFormVisible: false,
      tableData: [],
      formInline: {
        username: "",
        role: "",
        isStatus: "",
      },
      form: {  
        id:'',      
        username: "",
        password: "",
        realName: "",
        userImage: "",
        isStatus: "1",
        roles:[]
      },
    };
  },
  created() {
    this.$axios
      .get(`/adminUser/list?page=1&size=10`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data.list;
        this.total = data.data.total;
      })
      .catch((error) => {});
      //初始化，查询下拉条件
       this.$axios
        .get(`/role/list`)
        .then(({ data }) => {
          if (data.code == 0) {
            this.rolesList = data.data;
          } else {
            this.$message.error(data.message);
          }
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
  },
  methods: {
    beforeAvatarUpload(file) {
      this.file = file;
      return false;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    query() {
      this.$axios
        .get(`/adminUser/list`, {
          params: {
            page: this.page,
            size: this.size,
            username: this.formInline.username,
            role: this.formInline.role,
            isStatus: this.formInline.isStatus,
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
    insert() {
      this.dialogFormVisible = true;     
    },
    operation(row) {
      this.fileList = [];
      this.insert();
      //回显图片
      this.fileList.push({ name: "xxx.jpg", url: row.userImage });
      let a = row.roleIds.split(",");
      this.form = {  
        id: row.id,      
        username: row.username,
        password:'000000',
        realName: row.realName,
        isStatus: row.isStatus + '',
        roles: a,
      }
    },
    operationUpload() {      
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("id", this.form.id);
      formData.append("username", this.form.username); 
      formData.append("password", this.form.password);     
      formData.append("realName", this.form.realName);
      formData.append("isStatus", this.form.isStatus);
      formData.append("roles", this.form.roles);
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios
        .post(`/adminUser/insert`, formData, requestConfig)
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: data.message,
              type: "success",
            });
            this.dialogFormVisible = false;
            this.query();            
          } else {
            this.$message.error(data.message);
          }
          this.fileList = [];
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
      
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
</style>
