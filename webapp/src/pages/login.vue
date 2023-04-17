<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
    >
      <h1 class="title">管理员登录</h1>
      <el-form-item label="管理员账号" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from "../utils/axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入管理员账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {
              this.updateUserInfo(res.data.list);
              this.$message.success(res.data.msg);
              this.$router.push("/index");
              // sessionStorage.setItem("userInfo", JSON.stringify(res.data.list)); // 将用户信息存储到sessionStorage中
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          //   console.log("error submit!!");
          if (this.loginForm.username == "" || this.loginForm.password == "") {
            this.$message.error("账号密码均不能为空");
            return;
          }
          this.$message.error("账号密码格式不正确");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  beforeRouteLeave(to,from,next){
    // 回退强制刷新
    if(sessionStorage.getItem("userInfo") == null){
      location.reload()
      next("/login")
    }else{
      next()
    }
  }
};
</script>

<style lang='stylus' scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  position: relative;

  .el-form {
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -310px;
    margin-top: -220px;
  }

  .el-form .title {
    text-align: center;
    margin: 20px;
    color: #708090;
  }
}
</style>