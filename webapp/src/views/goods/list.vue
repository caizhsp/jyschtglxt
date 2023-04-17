<template>
  <div>
    <el-table :data="getGoodsList" stripe style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="120">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="120">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="120">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgUrl + scope.row.img" alt="" class="imgpreview" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="100">
        <template slot-scope="scope">
          <el-button type="primary" plain v-if="scope.row.isnew == 1"
            >是</el-button
          >
          <el-button type="danger" plain v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-button type="primary" plain v-if="scope.row.ishot == 1"
            >是</el-button
          >
          <el-button type="danger" plain v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="primary" plain v-if="scope.row.status == 1"
            >是</el-button
          >
          <el-button type="danger" plain v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="getCount"
      :page-size="getSize"
      @current-change="pageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { goodsDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },
  mounted() {
    this.updateGoodsList(); // 更新商品列表
    this.updateCount(); // 更新总数
  },
  computed: {
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
      getCount: "goods/getCount",
      getSize: "goods/getSize",
    }),
  },
  methods: {
    // 编辑事件
    edit(row) {
      this.$emit("edit", row);
    },
    // 删除事件
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsDelete(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateGoodsList(); // 更新商品列表
              this.updateCount(); // 更新总数
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
    // 点击页码时触发的钩子函数
    pageChange(page) {
      this.updatePage(page);
    },
    ...mapActions({
      updateGoodsList: "goods/updateGoodsList",
      updateCount: "goods/updateCount",
      updatePage: "goods/updatePage",
    }),
  },
};
</script>

<style lang='' scoped>
.imgpreview {
  width: 120px;
}
</style>