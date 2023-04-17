<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" plain @click="add">添加</el-button>
    <v-list @edit="edit" :menuList="getMenuList"></v-list>
    <v-dialog :dialogInfo="dialogInfo" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vList from "./list.vue"; // 引入表格信息组件
import vDialog from "./dialog.vue"; // 引入弹框组件
import { mapGetters, mapActions } from "vuex"; // 引入辅助性函数
import { menuInfo } from "../../utils/axios"; // 引入菜单操作接口

export default {
  data() {
    return {
      dialogInfo: {
        isShow: false,
        isAdd: false,
      },
    };
  },
  components: {
    vList,
    vDialog,
  },
  methods: {
    ...mapActions({
      updateMenulist: "menu/updateMenulist",
    }),
    // 添加事件
    add() {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = true;
    },
    // list子组件传来的edit事件
    edit(val) {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = false;
      menuInfo(val)
        .then((res) => {
          if (res.status == 200) {
            this.$refs.dialog.echo(res.data.list, val);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    this.updateMenulist();
  },
};
</script>

<style lang='' scoped>
.el-button {
  margin: 10px 0px;
}
</style>