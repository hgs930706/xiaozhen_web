<!--
 * @Author: ShenYuQiang
 * @Date: 2020-11-21 22:06:26
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-21 22:07:22
 * @FilePath: \yishangxiaozhen\src\views\login\index.vue
-->
<template>
  <div class="login">
    <div class="login-info">
      <div class="logo"></div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              style="width: 50%"
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>

            <span class="demonstration"
              ><el-image src="http://localhost:8081/user/verifyCode"></el-image
            ></span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$axios
        .post(`/login`, {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
        })
        .then((response) => {
          let authorization = response.headers["authorization"];
          console.log(response);
          if (authorization && authorization !== 'fail') {
            //获取并存储服务器返回的AuthorizationToken信息
            localStorage.setItem("authorization", authorization);
            //登录成功跳转页面
            this.$router.push("/home/page");
          }else if(authorization === 'fail'){
              alert("密码错误");
          }else{
              alert("系统异常");
          }
        })
        .catch((error) => {
          console.log("前端系统异常：" + error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
// .el-form-item__label {
//   font-size: 24px;
// }
// .el-input__inner {
//   height: 60px;
// }
.el-button--primary {
  width: 400px;
}
.el-button {
  font-size: 24px;
}

.logo {
  // width: 200px;
  height: 200px;
  // border: 1px solid #ccc;
  background: url("../../assets/logo.png") no-repeat center center;
  margin-bottom: 30px;
}

.login-info {
  // background-color: aqua;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 500px;
}
.login {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url(../../assets/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
</style>
