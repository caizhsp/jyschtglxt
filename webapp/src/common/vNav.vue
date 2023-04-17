<template>
  <div>
    <el-col :span="12">
      <el-menu
        :default-active="$route.path"
        background-color="#8B475D"
        text-color="#E8E8E8"
        active-text-color="#FFFF00"
        unique-opened
        router
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu
          :index="item.title"
          v-for="item in getUserInfo.menus"
          :key="item.icon"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            :index="item_c.url"
            v-for="item_c in item.children"
            :key="item_c.url"
            >{{ item_c.title }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      navList: "",
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions(["updatetUserInfo"]),
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
};
</script>

<style lang='' scoped>
.el-col {
  background-color: #8b6969 !important;
}

.el-col .el-menu {
  width: 269px !important;
  height: 89vh;
}
</style>