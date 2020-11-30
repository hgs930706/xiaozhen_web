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
      <el-form-item label="会议场地名称">
        <el-input v-model="formInline.meetingName"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="formInline.isStatus" placeholder="审批状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
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
      <el-table-column prop="meetingName" label="会议室"> </el-table-column>
      <el-table-column prop="meetingAddress" label="会议室地址">
      </el-table-column>
      <el-table-column prop="meetingDateil" label="会议室简介">
      </el-table-column>
      <el-table-column prop="meetingCapacity" label="可容纳人数">
      </el-table-column>
      <el-table-column prop="meetingImage" label="图片" width="200">
        <template slot-scope="scope">
          <div class="moreImg">
            <el-image :src="scope.row.meetingImage"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="meetingRemark" label="会议室备注">
      </el-table-column>

      <el-table-column prop="isStatus" label="状态"> </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClickTable(scope.row)"
            type="text"
            size="small"
            >详情</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
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
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会议室名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会议室地址">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会议室简介">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="可容纳人数">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="场地桌型">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="课桌式" name="type"></el-checkbox>
              <el-checkbox label="分组式" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="可用会议类型">
            <el-checkbox-group v-model="form.type1">
              <el-checkbox label="企业会议" name="type"></el-checkbox>
              <el-checkbox label="公务接待" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="可用场地物品">
            <el-checkbox-group v-model="form.type2">
              <el-checkbox label="矿泉水" name="type"></el-checkbox>
              <el-checkbox label="茶杯" name="type"></el-checkbox>
              <el-checkbox label="咖啡" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="form.resource">
              <el-radio label="正常"></el-radio>
              <el-radio label="停用"></el-radio>
            </el-radio-group>
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
    <div class="detail-form">
      <el-dialog title="场地详情" :visible.sync="dialogFormVisibleDetail">
        <el-form :model="form2" label-width="120px">
          <el-form-item label="序号：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室名称：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室地址：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室简介：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="可容纳人数：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="备注：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="可用会议类型：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室桌型：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议物品：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="图片：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="状态">
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
      formData: new FormData(),
      imageUrl: "",
      dialogFormVisible: false,
      dialogFormVisibleDetail: false,
       page: 1,
      size: 10,
      total: 0,
      tableData: [],
      formInline: {
        isStatus: "",
        meetingName: ""
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
      form2: {
        name: "123",
      },
    };
  },
  created() {
    this.$axios
      .get(`/meetingArea/list?page=1&size=10`)
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
        .get(`/meetingArea/list`,{
          params: {
            page:this.page,
            size:this.size,
            meetingName: this.formInline.meetingName,
            isStatus: this.formInline.isStatus
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
    handleClickTable(row) {
      this.dialogFormVisibleDetail = true;
      console.log(row);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      this.formData.append("file", file);
      this.formData.append("file", file2);
      this.formData.append("file", file3);
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return false;
    },
    insert() {
      this.dialogFormVisible = true;
    },
    onSubmit() {
      console.log("submit!");
      this.formData.append("file", file);
      this.formData.append("meetingName", "第-个会议场地");
      this.formData.append("属性1", "第一个会议场地");
      this.formData.append("属性2", "第2个会议场地");
      this.formData.append("属性3", "第3个会议场地");
      this.formData.append("属性4", "第4个会议场地");
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios
        .post(`/meetingArea/insert`, this.formData, requestConfig)
        .then(({ data }) => {
          console.log(JSON.stringify(data));
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.detail-form .el-form-item {
  margin-bottom: 6px;
}
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
