 <template>
  <div class="townMain">
    <div class="lines" style="margin-bottom: 20px">
      <div class="lines1 first">
        <div >
          <span class="first_1"></span>
        </div>
        <div class="content" style="margin-top: 45px">
          <span class="bigS">10250</span><br />
          <span class="totalN">用户总数</span>
        </div>
        <div class="icon1">
          <img
            src="../../assets/person.png"
            style="margin-top: 45px; margin-right: 15px"
            alt=""
          />
        </div>
      </div>
      <div class="lines1 first">
        <div class="">
          <span
            class="ehzs ehblue"
          ></span>
        </div>
        <div class="content" style="margin-top: 45px">
          <span class="bigS">225</span><br />
          <span class="totalN">今日新增用户</span
          >
        </div>
        <div class="icon1">
          <img
            src="../../assets/add.png"
            style="margin-top: 45px; margin-right: 15px"
            alt=""
          />
        </div>
      </div>
      <div class="lines1 first">
        <div class="">
          <span
            class="ehzs yeblue"
          ></span>
        </div>
        <div class="content" style="margin-top: 45px">
          <span class="bigS">460</span><br />
          <span class="totalN">本周接待人数</span
          >
        </div>
        <div class="icon1">
          <img
            src="../../assets/contact.png"
            style="margin-top: 45px; margin-right: 15px"
            alt=""
          />
        </div>
      </div>
    </div>
    <div
      class="jiedai"
    >
      <div
        class="jiedai_left"
      >
        <h4>今日待接待</h4>
        <div style="margin-left: 80px">
          <div
            class="left_title"
          >
            <div style="margin-right: 50px">
              <span class="bigS">220</span
              >人<br />
              <span style="font-size: 16px; font-weight: 500">待接待预约</span>
            </div>
            <div>
              <span style="font-size: 16px; color: #2566d2">查看详情</span>
            </div>
          </div>
          <div
          class="left_content"
          >
            <div style="margin-right: 50px">
              <span class="bigS">100</span
              >人<br />
              <span style="font-size: 16px; font-weight: 500">待接待活动</span>
            </div>
            <div>
              <span style="font-size: 16px; color: #2566d2">查看详情</span>
            </div>
          </div>
          <div
          class="acceptMetting">
            <div style="margin-right: 50px">
              <span class="bigS">15</span>场<br />
              <span style="font-size: 16px; font-weight: 500">待接待会议</span>
            </div>
            <div>
              <span style="font-size: 16px; color: #2566d2">查看详情</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="jiedai_center">
        <h4>待处理</h4>
        <div>
          <div style="height: 70px; padding: 10px; margin-bottom: 30px">
            <div style="margin-bottom: 15px">
              <span style="font-weight: 500; font-size: 16px">接待预约</span>
            </div>
            <div style="display: flex">
              <div style="width: 85%">
                <el-progress :percentage="50"></el-progress>
              </div>
              <div style="font-size: 16px; color: #2566d2; line-height: 15px">
                详情
              </div>
            </div>
          </div>
          <div style="height: 70px; margin-bottom: 30px; padding: 10px">
            <div style="margin-bottom: 15px">
              <span style="font-weight: 500; font-size: 16px">活动报名</span>
            </div>
            <div style="display: flex">
              <div style="width: 85%">
                <el-progress :percentage="50"></el-progress>
              </div>
              <div style="font-size: 16px; color: #2566d2; line-height: 15px">
                详情
              </div>
            </div>
          </div>
          <div style="height: 70px; padding: 10px">
            <div style="margin-bottom: 15px">
              <span style="font-weight: 500; font-size: 16px"
                >会议场地预约</span
              >
            </div>
            <div style="display: flex">
              <div style="width: 85%">
                <el-progress :percentage="50"></el-progress>
              </div>
              <div style="font-size: 16px; color: #2566d2; line-height: 15px">
                详情
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="jiedai_right"
        style="
          width: 48%;
          height: 400px;
          border: 1px solid red;
          padding-left: 10px;
        "
      >
        <div>
          <h4 style="display: inline-block">活动报名统计</h4>
          <div
            style="
              float: right;
              margin-top: 20px;
              font-size: 16px;
              color: #2566d2;
              line-height: 15px;
              display: inline-block;
              margin-right:15px
            "
          >
            查看详情
          </div>
        </div>
        <div>
          <div
            class="chart"
            id="myChart"
            :style="{ width: '100%', height: '320px', display: 'inline-block' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="tongji" style="width:100%;height:400px;display:flex;justify-content: space-between;">
      <div class="tongji_1" style="border:1px solid blue;width:49%">
        <div>
          <h4 style="display: inline-block">活动报名统计</h4>
          <div
            style="
              float: right;
              margin-top: 20px;
              font-size: 16px;
              color: #2566d2;
              line-height: 15px;
              display: inline-block;
              margin-right:15px
            "
          >
            查看详情
          </div>
        </div>
        <div>
          <div
            class="chart"
            id="myChart2"
            :style="{ width: '100%', height: '320px', display: 'inline-block' }"
          ></div>
        </div>
      </div>
      <div class="tongji_2" style="border:1px solid blue;width:49%">
        <div>
          <h4 style="display: inline-block">活动报名统计</h4>
          <div
            style="
              float: right;
              margin-top: 20px;
              font-size: 16px;
              color: #2566d2;
              line-height: 15px;
              display: inline-block;
              margin-right:15px
            "
          >
            查看详情
          </div>
        </div>
        <div>
          <div
            class="chart"
            id="myChart3"
            :style="{ width: '100%', height: '320px', display: 'inline-block' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- <el-row :gutter="10">
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
    </el-row> -->
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      percentage: "40%",
    };
  },
  mounted() {
    this.getCharts1();
    this.getCharts2();
    this.getCharts3();
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    getCharts1(){
      let myChart = echarts.init(document.getElementById("myChart"));
    myChart.setOption({
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
    },
    getCharts2(){
      let myChart = echarts.init(document.getElementById("myChart2"));
    myChart.setOption({
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
    },
    getCharts3(){
      let myChart = echarts.init(document.getElementById("myChart3"));
    myChart.setOption({
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
    }
  },
};
</script>

<style lang="less" scoped>
.townMain {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  background: #fff;
  .lines {
    display: flex;
    justify-content: space-between;
    .lines1 {
      width: 32%;
      height: 170px;
      border: 1px solid blue;
    }
    // .first div{
    //   display: inline-block;
    // }
    .first {
      display: flex;
      justify-content: space-between;
      .first_1{
        margin-top: 65px;
              display: inline-block;
              width: 5px;
              height: 40px;
              border: 1px solid #66a0ff;
              background: #66a0ff;
      }
    }
  }
  .jiedai {
    display: flex;
    justify-content: space-between;
    height: 400px;
    margin-bottom:20px;
    .jiedai_left{
      width: 22%;
          height: 400px;
          border: 1px solid red;
          padding-left: 10px;
          .left_title{
            width: 75%;
              height: 70px;
              padding: 10px;
              border-bottom: 1px solid #e3e7f6;
              margin-bottom: 30px;
              display: flex;
              align-items: center;
          }
          .left_content{
            width: 75%;
              height: 70px;
              border-bottom: 1px solid #e3e7f6;
              margin-bottom: 30px;
              display: flex;
              align-items: center;
              padding: 10px;
          }
    }
    .jiedai_center{
      width: 23%;
          height: 400px;
          border: 1px solid red;
          padding-left: 10px;
    }
  }
}
.totalN{
  color: #6e7580;
  font-size: 16px;
  margin-left: 5px
}

.bigS{
  font-weight: bold; 
  font-size: 40px
}
.ehzs{
  margin-top: 65px;
              display: inline-block;
              width: 5px;
              height: 40px;
}
.ehblue{
  border: 1px solid #66a0ff;
  background: #66a0ff;
}
.yeblue{
  border: 1px solid #eec91c;
              background: #eec91c;
}
.acceptMetting{
  width: 75%;
              height: 70px;
              display: flex;
              align-items: center;
              padding: 10px;
}
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
 
 