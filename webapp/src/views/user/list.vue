<template>
  <div>
    <el-table :data="getUserList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" plain v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="primary" plain v-else>启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="getUserCount"
      :page-size="getSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // 引入辅助性函数
import { userDelete } from "../../utils/axios"; // 调用接口

export default {
  data() {
    return {};
  },
  mounted() {
    this.updateUserList(); // 获取管理员列表
    this.updateUserCount(); // 获取管理员总数
  },
  computed: {
    ...mapGetters({
      getUserList: "user/getUserList",
      getUserCount: "user/getUserCount",
      getSize: "user/getSize",
    }),
  },
  methods: {
    ...mapActions({
      updateUserList: "user/updateUserList",
      updateUserCount: "user/updateUserCount",
      updatePage: "user/updatePage",
    }),
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 删除
    del(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userDelete(uid).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateUserCount(); // 更新总数
              this.updateUserList(); // 删除完成之后重新调取列表
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
    // 点击页码触发事件
    changePage(p) {
      console.log("触发了页码事件", p);
      this.updatePage(p);
    },
  },
};
</script>

<style lang='' scoped>
.el-pagination {
  margin: 10px 0px;
}
</style>