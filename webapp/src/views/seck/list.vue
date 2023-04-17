<template>
  <div>
    <el-table :data="getSeckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="280">
        <template slot-scope="scope">
          <el-button type="success" plain v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="warning" plain v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // 辅助性函数
import { seckDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },
  mounted() {
    this.updateSeckList();
  },
  computed: {
    ...mapGetters({
      getSeckList: "seck/getSeckList",
    }),
  },
  methods: {
    ...mapActions({
      updateSeckList: "seck/updateSeckList",
    }),
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          seckDelete(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateSeckList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      updateSeckList: "seck/updateSeckList",
    }),
  },
};
</script>

<style lang='' scoped>
</style>