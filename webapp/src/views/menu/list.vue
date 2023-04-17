<template>
  <div>
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="100">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="150">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="success" plain v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" plain v-else>禁用</el-button>
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
import { mapActions } from "vuex"; // 引入辅助性函数
import { menuDelete } from "../../utils/axios"; // 引入接口

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      updateMenulist: "menu/updateMenulist",
    }),
    // 编辑事件
    edit(id) {
      this.$emit("edit",id);
    },
    // 删除事件
    del(id) {
      // 删除确认提示
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调取删除接口事件
          menuDelete(id)
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.updateMenulist(); // 添加完成之后调用vux中的辅助函数更新一下仓库中的列表值
              }
            })
            .catch((err) => {
              console.log(err, "这是删除错误");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  props: ["menuList"],
};
</script>

<style lang='' scoped>
</style>