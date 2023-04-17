<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" plain @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-dialog :dialogInfo="dialogInfo" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vList from "./list.vue"; // 引入子组件
import vDialog from "./dialog.vue";

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
    edit(rowInfo) {
      this.dialogInfo.isShow = true;
      this.dialogInfo.isAdd = false;
      this.$refs.dialog.echo(rowInfo);
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