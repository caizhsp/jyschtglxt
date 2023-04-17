<template>
  <div>
    <el-container>
      <el-header>
        <h1>简易商城后台管理系统</h1>
        <h3 class="wel">欢迎你 {{ getUserInfo.username }}</h3>
        <el-button type="primary" class="out" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../common/vNav.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    logout() {
      this.updateUserInfo(false); // 清空登录值
      this.$router.push("/login")
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  components: {
    vNav,
  },
};
</script>

<style lang='stylus' scoped>
.el-header {
  background-color: #FF6A6A;
  color: #fff;
  height: 80px !important;
  line-height: 80px;
  text-align: center;
  position: relative;
}

.el-aside {
  background-color: #8B6969;
  width: 270px !important;
  height: 89vh;
}

.wel {
  position: absolute;
  right: 300px;
  top: 0px;
}

.out {
  position: absolute;
  right: 100px;
  top: 50%;
  margin-top: -20px;
}
</style>