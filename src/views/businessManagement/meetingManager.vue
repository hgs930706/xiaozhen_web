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
          <el-button @click="detailInfo(scope.row)" type="text" size="small"
            >详情</el-button
          >
          <el-button @click="operation(scope.row)" type="text" size="small"
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
          <el-form-item label="序号">
            <el-input v-model="form.orderNum"></el-input>
          </el-form-item>
          <el-form-item label="会议室名称">
            <el-input v-model="form.meetingName"></el-input>
          </el-form-item>
          <el-form-item label="会议室地址">
            <el-input v-model="form.meetingAddress"></el-input>
          </el-form-item>
          <el-form-item label="会议室简介">
            <el-input v-model="form.meetingDateil"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.meetingRemark"></el-input>
          </el-form-item>
          <el-form-item label="可容纳人数">
            <el-input v-model="form.meetingCapacity"></el-input>
          </el-form-item>

          <el-form-item label="场地桌型">
            <el-checkbox-group v-model="form.meetingTable">
              <el-checkbox
                :label="item.name"
                v-for="(item, index) in meetingTableList"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="可用会议类型">
            <el-checkbox-group v-model="form.meetingType">
              <el-checkbox
                :label="item.name"
                v-for="(item, index) in meetingTypeList"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="可用场地物品">
            <el-checkbox-group v-model="form.meetingGoods">
              <el-checkbox
                :label="item.name"
                v-for="(item, index) in meetingGoodsList"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio v-model="form.isStatus" label="1">正常</el-radio>
            <el-radio v-model="form.isStatus" label="0">停用</el-radio>
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
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="operationUpload">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="detail-form">
      <el-dialog title="场地详情" :visible.sync="dialogFormVisibleDetail">
        <el-form :model="form2" label-width="120px">
          <el-form-item label="序号：">
            <labe>{{ form2.orderNum }}</labe>
          </el-form-item>
          <el-form-item label="会议室名称：">
            <labe>{{ form2.meetingName }}</labe>
          </el-form-item>
          <el-form-item label="会议室地址：">
            <labe>{{ form2.meetingAddress }}</labe>
          </el-form-item>
          <el-form-item label="会议室简介：">
            <labe>{{ form2.meetingDateil }}</labe>
          </el-form-item>
          <el-form-item label="可容纳人数：">
            <labe>{{ form2.meetingCapacity }}</labe>
          </el-form-item>
          <el-form-item label="备注：">
            <labe>{{ form2.meetingRemark }}</labe>
          </el-form-item>
          <el-form-item label="可用会议类型：">
            <labe>{{ form2.meetingType }}</labe>
          </el-form-item>
          <el-form-item label="会议室桌型：">
            <labe>{{ form2.meetingTable }}</labe>
          </el-form-item>
          <el-form-item label="会议物品：">
            <labe>{{ form2.meetingGoods }}</labe>
          </el-form-item>
          <el-form-item label="图片：">
            <labe>
              <div class="moreImg">
                <el-image :src="form2.meetingImage"></el-image>
              </div>
            </labe>
          </el-form-item>
          <el-form-item label="状态：">
            <labe>{{ form2.isStatus == 1 ? "正常" : "停用" }}</labe>
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
      meetingTableList: [],
      meetingTypeList: [],
      meetingGoodsList: [],
      file: "",
      fileList: [],
      dialogFormVisible: false,
      dialogFormVisibleDetail: false,
      page: 1,
      size: 10,
      total: 0,
      tableData: [],
      formInline: {
        isStatus: "",
        meetingName: "",
      },
      form: {
        //新增
        id: "",
        orderNum: "",
        meetingName: "",
        bookingStartTime: "",
        booingEndTime: "",
        meetingAddress: "",
        meetingDateil: "",
        meetingCapacity: "",
        meetingRemark: "",
        meetingImage: "",
        meetingTable: [],
        meetingType: [],
        meetingGoods: [],
        isStatus: "1",
      },
      form2: {
        //详情
        orderNum: "",
        meetingName: "",
        bookingStartTime: "",
        booingEndTime: "",
        meetingAddress: "",
        meetingDateil: "",
        meetingCapacity: "",
        meetingRemark: "",
        meetingImage: "",
        meetingTable: "",
        meetingType: "",
        meetingGoods: "",
        isStatus: "",
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
        .get(`/meetingArea/list`, {
          params: {
            page: this.page,
            size: this.size,
            meetingName: this.formInline.meetingName,
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
    handleClickTable(row) {
      this.dialogFormVisibleDetail = true;
      console.log(row);
    },
    detailInfo(row) {
      this.dialogFormVisibleDetail = true;
      this.$axios
        .get(`/meetingArea/detail?id=` + row.id)
        .then(({ data }) => {
          if (data.code == 0) {
            this.form2 = {
              //详情
              orderNum: data.data.orderNum,
              meetingName: data.data.meetingName,
              bookingStartTime: data.data.bookingStartTime,
              booingEndTime: data.data.booingEndTime,
              meetingAddress: data.data.meetingAddress,
              meetingDateil: data.data.meetingDateil,
              meetingCapacity: data.data.meetingCapacity,
              meetingRemark: data.data.meetingRemark,
              meetingImage: data.data.meetingImage,
              meetingTable: data.data.meetingTable,
              meetingType: data.data.meetingType,
              meetingGoods: data.data.meetingGoods,
              isStatus: data.data.isStatus,
            };
          } else {
            this.$message.error(data.message);
          }
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
    insert() {
      this.dialogFormVisible = true;
      //获取下拉框值
      this.$axios
        .get(`/dict/meetingParams`)
        .then(({ data }) => {
          if (data.code == 0) {
            this.meetingTableList = data.data.table_type;
            this.meetingTypeList = data.data.meeting_type;
            this.meetingGoodsList = data.data.goods_type;
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
      this.insert();
      //回显图片
      this.fileList.push({ name: "xxx.jpg", url: row.meetingImage });
      let a = row.meetingTable.split(",");
      let b = row.meetingType.split(",");
      let c = row.meetingGoods.split(",");
      this.form = {
        id: row.id,
        orderNum: row.orderNum,
        meetingName: row.meetingName,
        bookingStartTime: row.bookingStartTime,
        booingEndTime: row.booingEndTime,
        meetingAddress: row.meetingAddress,
        meetingDateil: row.meetingDateil,
        meetingCapacity: row.meetingCapacity,
        meetingRemark: row.meetingRemark,
        meetingImage: row.meetingImage,
        meetingTable: a,
        meetingType: b,
        meetingGoods: c,
        isStatus: row.isStatus + "",
      };
    },
    operationUpload() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("id", this.form.id);
      formData.append("orderNum", this.form.orderNum);
      formData.append(
        "bookingStartTime",
        this.form.bookingStartTime == null ? "" : this.form.bookingStartTime
      );
      formData.append(
        "booingEndTime",
        this.form.booingEndTime == null ? "" : this.form.booingEndTime
      );
      formData.append("meetingName", this.form.meetingName);
      formData.append("meetingAddress", this.form.meetingAddress);
      formData.append("meetingDateil", this.form.meetingDateil);
      formData.append("meetingRemark", this.form.meetingRemark);
      formData.append("meetingCapacity", this.form.meetingCapacity);
      formData.append("meetingTable", this.form.meetingTable);
      formData.append("meetingType", this.form.meetingType);
      formData.append("meetingGoods", this.form.meetingGoods);
      formData.append("isStatus", this.form.isStatus);
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.$axios
        .post(`/meetingArea/insert`, formData, requestConfig)
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
    },
    onSubmit() {},
  },
};
</script>

<style lang="less" scoped>

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
