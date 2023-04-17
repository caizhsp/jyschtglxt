<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" plain @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-dialog :dialogInfo="dialogInfo" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import vList from "./list.vue";
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
    // 编辑事件
    edit(row){
        this.dialogInfo.isShow = true
        this.dialogInfo.isAdd = false
        this.$refs.dialog.echo(row)
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