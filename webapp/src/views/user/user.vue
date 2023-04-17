<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" plain @click="add">添加</el-button>

    <!-- 列表 -->
    <v-list @edit="edit"></v-list>

    <!-- 对话框 -->
    <v-dialog :dialogInfo="dialogInfo" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vList from "./list.vue"; // 引入列表子组件
import vDialog from "./dialog.vue"; // 引入对话框子组件

export default {
  data() {
    return {
      dialogInfo: {
        isShow: false,
        isAdd: false,
      },
    };
  },
  methods: {
    // 编辑事件
    edit(uid) {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = false;
      this.$refs.dialog.echo(uid)
    },
    // 添加事件
    add() {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = true;
    },
  },
  components: {
    vList,
    vDialog,
  },
};
</script>

<style lang='' scoped>
.el-button {
  margin: 10px 0px;
}
</style>