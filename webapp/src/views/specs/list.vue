<template>
  <div>
    <el-table :data="getSpecsList" stripe style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="scope">
          <el-tag
            v-for="(item,index) in scope.row.attrs"
            :key="index"
            :disable-transitions="true"
            >{{ item }}</el-tag
          >
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="getCount"
      :page-size="getSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { specsDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
      getCount: "specs/getCount",
      getSize: "specs/getSize",
      getPage: "specs/getPage",
    }),
  },
  mounted() {
    this.updateSpecsList(); // 更新商品列表
    this.updateCount(); //更新商品总数
  },
  methods: {
    // 编辑事件
    edit(row){
        this.$emit("edit",row)
    },
    // 删除事件
    del(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          specsDelete(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateSpecsList(); // 删除完之后更新商品规格列表
              this.updateCount() // 更新总数
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
    // 页码改变时的钩子
    changePage(page) {
      this.updatePage(page);
    },
    ...mapActions({
      updateSpecsList: "specs/updateSpecsList",
      updateCount: "specs/updateCount",
      updatePage: "specs/updatePage",
    }),
  },
};
</script>

<style lang='' scoped>
.el-pagination {
  margin: 10px 0px;
}
</style>