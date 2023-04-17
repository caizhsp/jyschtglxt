<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
    >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
      >
        <el-form-item label="所属角色" prop="roleid">
          <el-select v-model="userForm.roleid" placeholder="请选择">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="dialogInfo.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // 引入辅助性函数
import { userAdd, userInfo, userEdit } from "../../utils/axios"; // 引入接口

export default {
  data() {
    return {
      userForm: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  mounted() {
    if (this.getRoleList == "") {
      this.updateRoleList();
    }
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
  methods: {
    // 回显
    echo(uid) {
      userInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.userForm = res.data.list;
        }
      });
    },
    // 取消事件
    cancel() {
      this.dialogInfo.isShow = false;
      this.reset();
    },
    // 添加事件
    add() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          userAdd(this.userForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateUserCount(); // 添加完成之后更新总数
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.cancel();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 修改事件
    edit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          userEdit(this.userForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateUserList(); // 重新调取列表
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    reset() {
      this.userForm = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
      this.$refs.userForm.resetFields(); // 重置表单验证信息
    },
    ...mapActions({
      updateRoleList: "role/updateRoleList",
      updateUserCount: "user/updateUserCount",
      updateUserList: "user/updateUserList",
    }),
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>