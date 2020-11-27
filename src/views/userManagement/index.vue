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
        <el-input v-model="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="角色">
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
        <el-button type="primary" @click="insert">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
     <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="realName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="realName" label="角色" width="120"> </el-table-column>
      <el-table-column prop="username" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="isStatus" label="状态" width="120"> </el-table-column>
      <el-table-column prop="userImage" label="头像" width="120"> 
         <template slot-scope="scope">
          <div class="moreImg">
            <el-image :src="scope.row.userImage"></el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" width="120">
      </el-table-column>

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
      <el-dialog title="新建" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="用户名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="超级管理员" name="type"></el-checkbox>
              <el-checkbox label="场地管理员" name="type"></el-checkbox>
            </el-checkbox-group>
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
      dialogFormVisible: false,
      tableData: [],
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
  created() {
    this.$axios
      .get(`/adminUser/list?page=1&size=10`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data.list;
      })
      .catch((error) => {});
  },
  methods: {
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
