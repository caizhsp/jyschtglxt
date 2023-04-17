<template>
  <div>
    <el-dialog
      :title="dialogInfo.isShow ? '添加会员' : '编辑会员'"
      :visible.sync="dialogInfo.isShow"
      :beforeClose="cancel"
    >
      <el-form
        :model="memberForm"
        :rules="rules"
        ref="memberForm"
        label-width="100px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="memberForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="memberForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="memberForm.password"></el-input>
          <p>留空则不修改</p>
        </el-form-item>

        <!-- 开关 -->
        <el-form-item label="状态">
          <el-switch
            v-model="memberForm.status"
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
        <el-button type="primary" v-if="dialogInfo.isAdd" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // 引入辅助性函数
import { memberInfo, memberEdit } from "../../utils/axios"; // 引入接口

export default {
  data() {
    return {
      formLabelWidth: "120px",
      memberForm: {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      },
      rules: {
        phone: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为11个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入会员名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 回显
    echo(uid) {
      memberInfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.memberForm = {
            phone: res.data.list.phone,
            nickname: res.data.list.nickname,
            password: res.data.list.password,
            status: res.data.list.status,
          };
          this.memberForm.uid = uid;
        }
      });
    },
    // 编辑事件
    edit() {
      this.$refs.memberForm.validate((valid) => {
        if (valid) {
          // 由于数据影响视图，从而在修改menus时影响到视图，所以将数据重新赋值给一个新数组
          let newForm = {
            uid: this.memberForm.uid,
            phone: this.memberForm.phone,
            nickname: this.memberForm.nickname,
            password: this.memberForm.password,
            status: this.memberForm.status,
          };

          memberEdit(newForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.updateMemberList(); // 更新列表
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
    // 取消事件
    cancel() {
      this.dialogInfo.isShow = false;
      this.reset();
    },
    // 重置事件
    reset() {
      this.memberForm = {
        phone: "",
        nickname: "",
        password: "",
        status: 1,
      };
      this.$refs.memberForm.resetFields(); // 清空验证信息
    },
    ...mapActions({
      updateMemberList: "member/updateMemberList",
    }),
  },
  computed: {
    ...mapGetters({
      getMemberList: "member/getMemberList",
    }),
  },
  mounted() {
    this.updateMemberList();
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>