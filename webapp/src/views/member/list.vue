<template>
  <div>
    <el-table :data="getMemberList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // 辅助性函数

export default {
  data() {
    return {};
  },
  mounted() {
    this.updateMemberList();
  },
  computed: {
    ...mapGetters({
      getMemberList: "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      updateMemberList: "member/updateMemberList",
    }),
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    ...mapActions({
      updateMemberList: "member/updateMemberList",
    }),
  },
};
</script>

<style lang='' scoped>
</style>