<!--
 * @Author: ShenYuQiang
 * @Date: 2020-11-21 22:05:39
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-12-03 22:59:34
 * @FilePath: \后端\src\views\home\menu.vue
-->

<template>
  <div id="home">
    <div class="home-left">
      <div class="logo"></div>
      <div class="nav">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :router="true"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
        >
          <el-menu-item index="/home/page">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/home/booking">
            <i class="el-icon-time"></i>
            <span slot="title">预约报名管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="/home/business">
            <i class="el-icon-tickets"></i>
            <span slot="title">业务管理</span>
          </el-menu-item> -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">业务管理</span>
            </template>
            <el-menu-item index="/home/business/meeting">场地管理</el-menu-item>
            <el-menu-item index="/home/business/activity"
              >活动管理</el-menu-item
            >
          </el-submenu>

          <!-- <el-menu-item index="/home/message">
            <i class="el-icon-chat-line-square"></i>
            <span slot="title">消息管理</span>
          </el-menu-item> -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">消息管理</span>
            </template>
            <el-menu-item index="/home/message/action">消息日志</el-menu-item>
            <el-menu-item index="/home/message/temp">消息模板</el-menu-item>
            <el-menu-item index="/home/message/feedback">意见反馈</el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/qiye">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业管理</span>
          </el-menu-item>
          <el-menu-item index="/home/map">
            <i class="el-icon-map-location"></i>
            <span slot="title">地图管理</span>
          </el-menu-item>
          <el-menu-item index="/home/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="home-right">
      <div class="mian-header">
        <!-- el-icon-s-fold -->
        <div class="btnStyle" @click="switchNav">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>

        <div class="info">
          <el-avatar :src="loginImg"></el-avatar>
          <el-dropdown trigger="click" :placement="bottom">
            <span class="el-dropdown-link">
              {{ realName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><a @click="modifypass">密码修改</a></el-dropdown-item
              >
              <el-dropdown-item
                ><a @click="loginout">退出登录</a></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="main-content">
        <router-view />
      </div>
    </div>

    <div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form" label-width="80px">
          <el-form-item>
            <el-row>
              <el-col :offset="5" :span="3"> 旧密码： </el-col>
              <el-col :span="8">
                <el-input type="password" v-model="form.oldPassword"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="5" :span="3"> 新密码： </el-col>
              <el-col :span="8">
                <el-input type="password" v-model="form.newPassword"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="5" :span="3"> 确认密码： </el-col>
              <el-col :span="8">
                <el-input
                  type="password"
                  v-model="form.confirmPassword"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSumbit">保存</el-button>
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
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      realName: "未知用户",
      loginImg:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      bottom: "bottom",
      isCollapse: false,
    };
  },
  created() {
    this.$axios
      .get(`/adminUser/info`)
      .then(({ data }) => {
        if (data.code == 0) {
          this.loginImg = data.data.userImage;
          this.realName = data.data.realName;
        } else {
          this.$message.error(data.message);
        }
      })
      .catch((error) => {
        console.log("前端系统异常：" + error);
      });
  },
  methods: {
    modifypass() {
      this.dialogFormVisible = true;
    },
    onSumbit() {
      this.$axios
        .post(`/adminUser/reset`, {
          oldPassword: this.form.oldPassword,
          newPassword: this.form.newPassword,
          confirmPassword: this.form.confirmPassword
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: data.message,
              type: "success",
            });
            // this.loginout();
            this.dialogFormVisible = false;
          } else {
            this.$message.error(data.message);
          }
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
    },
    loginout() {
      //清理缓存
      localStorage.clear();
      this.$router.push("/login");
      // alert("退出登录");
    },
    switchNav() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
.dialog-footer {
  text-align: center;
}
#home {
  width: 100%;
  height: 100%;
  display: flex;
  .home-left {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    .logo {
      width: auto;
      height: 50px;
      background: url("../../assets/logo2.png") no-repeat;
      background-size: 100% 100%;
    }
    .nav {
      flex: 1;
      width: auto;
      /deep/ .el-menu-vertical-demo {
        height: 100%;
        background-color: rgb(51, 55, 72);
        span {
          color: rgb(183, 185, 191);
        }
      }
      /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
      }
    }
  }
  .home-right {
    flex: 1;
    height: 100%;
    background-color: #ccc;
    display: flex;
    flex-direction: column;
    .mian-header {
      width: 100%;
      height: 50px;
      background-color: #ccc;
      display: flex;
      justify-content: space-between;
      .btnStyle {
        margin-left: 10px;
        width: 50px;
        height: 100%;
        line-height: 50px;
        /deep/ i {
          font-size: 24px;
        }
      }
      .info {
        height: 100%;
        margin-right: 64px;
        /deep/ .el-avatar {
          margin: 5px 10px 0 0;
        }
        /deep/ .el-dropdown {
          top: -12px;
        }
      }
    }
    .main-content {
      box-sizing: border-box;
      padding: 15px 10px 10px 15px;
      flex: 1;
      width: 100%;
      overflow: auto;
      background-color: #fff;
    }
  }
}
</style>
