<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" plain @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-dialog :dialogInfo="dialogInfo" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vList from "./list.vue"; // 引入列表组件
import vDialog from "./dialog.vue"; // 引入对话框组件

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
    // 添加事件
    add() {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = true;
    },
    // 编辑事件
    edit(id) {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = false;
      this.$refs.dialog.echo(id); // 调用dialog子组件中的echo(回显)方法
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