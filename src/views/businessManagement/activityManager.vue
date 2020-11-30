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
        <el-form-item label="活动名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
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
        <el-table-column prop="activityName" label="活动名称">
        </el-table-column>
        <el-table-column prop="startTime" label="活动时间"> </el-table-column>
        <el-table-column prop="activityDetail" label="活动详情">
        </el-table-column>
        <el-table-column prop="activityAddress" label="活动地址">
        </el-table-column>
        <el-table-column prop="activityAddress" label="活动场数">
        </el-table-column>
        <el-table-column prop="activityRemark" label="活动备注">
        </el-table-column>

        <el-table-column prop="activityImage" label="图片">
          <template slot-scope="scope">
            <div class="moreImg">
              <el-image :src="scope.row.activityImage"></el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="isStatus" label="状态"> </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="handleClickTable(scope.row)"
              type="text"
              size="small"
              >详情</el-button
            >
            <el-button
              @click="handleClickCount(scope.row)"
              type="text"
              size="small"
              >添加场次</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
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
          <el-form-item label="序号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动场次：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动时间：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动地址：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动内容：">
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
          <el-form-item label="活动备注：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="form.resource">
              <el-radio label="正常"></el-radio>
              <el-radio label="停用"></el-radio>
            </el-radio-group>
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
      <el-dialog title="活动详情" :visible.sync="dialogFormVisibleDetail">
        <el-form :model="form2" label-width="120px">
          <el-form-item label="序号：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
          <el-form-item label="会议室名称：">
            <labe>{{ form2.name }}</labe>
          </el-form-item>
        </el-form>
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="date" label="活动场次" width="150">
          </el-table-column>
          <el-table-column prop="province" label="活动时间"> </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                @click="handleClickTable(scope.row)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <div class="detail-form">
      <el-dialog title="活动-添加场次" :visible.sync="dialogFormVisibleCount">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="活动场次：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动时间：">
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
       page: 1,
      size: 10,
      total: 0,  
      currentPage3: 5,
      dialogFormVisibleCount: false,
      dialogFormVisibleDetail: false,
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
      form2: {
        name: "123",
      },
      tableData: [],
      tableData2: [],
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
      .get(`/activity/list?page=1&size=10`)
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
        .get(`/activityBooking/list?page=${this.page}&size=${this.size}`)
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
    handleClickCount() {
      this.dialogFormVisibleCount = true;
    },
    handleClickTable(row) {
      this.dialogFormVisibleDetail = true;
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
