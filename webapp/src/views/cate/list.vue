<template>
  <div>
    <!-- 表格 -->
    <el-table
      :data="getCateList"
      border
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.img" alt="" class="imgpre" />
        </template>
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
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { cateDelete } from "../../utils/axios";

export default {
  mounted() {
    this.updateCateList(); // 先调取商品分类列表行动
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
    }),
  },
  methods: {
    // 编辑事件
    edit(row) {
      this.$emit("edit", row); // 将对应的一条完整信息传递给主组件
    },
    // 删除事件
    del(id) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cateDelete(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateCateList(); // 删除完成之后更新商品列表
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
    ...mapActions({
      updateCateList: "cate/updateCateList",
    }),
  },
};
</script>

<style lang='' scoped>
.imgpre {
  width: 120px;
}
</style>