 <template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-row>
            <el-col :span="12">
              <el-row><el-col :span="24"> 10000 </el-col></el-row>
              <el-row><el-col :span="24"> 用户总数</el-col></el-row>
            </el-col>
            <el-col :span="12"> 图标 </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple">11</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">111</div></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"><div class="grid-content bg-purple">22</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">22</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">22</div></el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12"> <div class="grid-content bg-purple">33</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">33</div></el-col>
    </el-row>
  </div>
</template>


<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 200px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
 
 