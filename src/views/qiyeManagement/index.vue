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
      <el-form-item label="街区">
        <el-select v-model="formInline.streetType" placeholder="审批状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="时尚文化街区" value="1"></el-option>
          <el-option label="时尚艺术街区" value="2"></el-option>
          <el-option label="时尚历史街区" value="3"></el-option>
          <el-option label="瑞丽轻奢街区" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="formInline.enterpriseName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insert">新建</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="streetType" label="街区"> </el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称">
      </el-table-column>
      <el-table-column prop="enterpriseEnterAddress" label="企业地址">
      </el-table-column>
      <el-table-column prop="enterpriseMobile" label="联系电话">
      </el-table-column>
      <el-table-column prop="enterpriseWeb" label="企业网站"> </el-table-column>
      <el-table-column prop="enterpriseDetail" label="企业详情">
      </el-table-column>

      <el-table-column prop="enterpriseQr" label="二维码">
        <template slot-scope="scope">
          <div class="moreImg">
            <el-image :src="scope.row.enterpriseQr"></el-image>
          </div>
        </template>
         </el-table-column>
      <el-table-column prop="enterpriseLogo" label="图片">
        <template slot-scope="scope">
          <div class="moreImg">
            <el-image :src="scope.row.enterpriseLogo"></el-image>
          </div>
        </template>
         </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="operation(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteOperation(scope.row)"
            type="text"
            size="small"
            >删除</el-button
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
          <el-form-item label="序号">
            <el-input v-model="form.orderNum"></el-input>
          </el-form-item>
          <el-form-item label="街区">
            <el-radio
              :label="item.code"
              v-for="(item, index) in streetList"
              :key="index"
              v-model="form.streetType"
            >
              {{ item.name }}
            </el-radio>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input v-model="form.enterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="企业地址：">
            <el-input v-model="form.enterpriseEnterAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input v-model="form.enterpriseMobile"></el-input>
          </el-form-item>
          <el-form-item label="企业网站：">
            <el-input v-model="form.enterpriseWeb"></el-input>
          </el-form-item>
          <el-form-item label="图片">
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
          <el-form-item label="企业二维码">
            <el-upload
              class="upload-demo"
              action="#"
              :before-upload="beforeAvatarUploadQr"
              multiple
              :limit="1"
              :on-exceed="handleExceedQr"
              :on-change="handleChangeQr"
              :file-list="fileListQr"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                限制一张图片，不超过10M
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业详情：">
            <el-input v-model="form.enterpriseDetail"></el-input>
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
      file: "",
      fileList: [],
      fileQr: "",
      fileListQr: [],
      streetList: [],
      page: 1,
      size: 10,
      total: 0,
      dialogFormVisible: false,
      tableData: [],
      form: {
        //新增
        id: "",
        orderNum: "",
        enterpriseName: "",
        enterpriseMobile: "",
        enterpriseQr: "",
        enterpriseWeb: "",
        enterpriseLogo: "",
        enterpriseEnterAddress: "",
        enterpriseDetail: "",
        streetType: "1",
      },
      formInline: {
        enterpriseName: "",
        streetType: "",
      },
    };
  },
  created() {
    this.$axios
      .get(`/enterpriseInfo/list?page=1&size=10`)
      .then(({ data }) => {
        console.log(JSON.stringify(data));
        this.tableData = data.data.list;
        this.total = data.data.total;
      })
      .catch((error) => {});
  },
  methods: {
    deleteOperation(row) {
      this.$axios
        .get(`/enterpriseInfo/delete?id=`+row.id)
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: data.message,
              type: "success",
            });
            this.query();
          } else {
            this.$message.error(data.message);
          }
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
    },
    query() {
      this.$axios
        .get(
          `/enterpriseInfo/list?page=${this.page}&size=${this.size}&enterpriseName=${this.formInline.enterpriseName}&streetType=${this.formInline.streetType}`
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
    insert() {
      this.dialogFormVisible = true;
      //获取下拉框值
      this.$axios
        .get(`/dict/street`)
        .then(({ data }) => {
          if (data.code == 0) {
            this.streetList = data.data;
          } else {
            this.$message.error(data.message);
          }
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
    },
    operation(row) {
      this.fileList = [];
      this.fileListQr = [];
      this.insert();
      //回显图片
      this.fileList.push({ name: "xxx.jpg", url: row.enterpriseLogo });
      this.fileListQr.push({ name: "bbb.jpg", url: row.enterpriseQr });
      this.form = {
        id: row.id,
        orderNum: row.orderNum,
        enterpriseName: row.enterpriseName,
        enterpriseMobile: row.enterpriseMobile,
        enterpriseWeb: row.enterpriseWeb,
        enterpriseEnterAddress: row.enterpriseEnterAddress,
        enterpriseDetail: row.enterpriseDetail,
        streetType: row.streetType + "",
      };
    },
    operationUpload() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("fileQr", this.fileQr);
      formData.append("id", this.form.id);
      formData.append("orderNum", this.form.orderNum);
      formData.append("enterpriseName", this.form.enterpriseName);
      formData.append("enterpriseMobile", this.form.enterpriseMobile);
      formData.append("enterpriseWeb", this.form.enterpriseWeb);
      formData.append(
        "enterpriseEnterAddress",
        this.form.enterpriseEnterAddress
      );
      formData.append("enterpriseDetail", this.form.enterpriseDetail);
      formData.append("streetType", this.form.streetType);
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios
        .post(`/enterpriseInfo/insert`, formData, requestConfig)
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
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
      this.fileList = [];
      this.fileListQr = [];
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
    beforeAvatarUploadQr(file) {
      this.fileQr = file;
      return false;
    },
    handleExceedQr(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    handleChangeQr(file, fileList) {
      this.fileListQr = fileList.slice(-3);
    },
  },
};
</script>

<style lang="less" scoped>
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
