<template>
  <div>
    <el-table :data="getRoleList" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
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
import { roleDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },
  mounted() {
    this.updateRoleList();
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
  methods: {
    ...mapActions({
      updateRoleList: "role/updateRoleList",
    }),
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleDelete(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateRoleList();
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
      updateRoleList: "role/updateRoleList",
    }),
  },
};
</script>

<style lang='' scoped>
</style>