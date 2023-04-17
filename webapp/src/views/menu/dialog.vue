<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="dialogForm">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              :label="item.title"
              :value="item.id"
              v-for="item in getMenuList"
              :key="item.title"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单地址"
          :label-width="formLabelWidth"
          v-if="form.type == 2"
        >
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              :label="item.name"
              :value="item.path"
              v-for="item in rouList"
              :key="item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option
              :label="item"
              :value="item"
              v-for="item in iconList"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
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
        <el-button type="primary" @click="confirm" v-else>确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; // 引入辅助性函数
import { menuEdit, menuAdd } from "../../utils/axios"; // 引入接口
import { routeList } from "../../router";

export default {
  data() {
    return {
      iconList: ["el-icon-user", "el-icon-user-solid", "el-icon-star-off"],
      rouList: routeList,
      dialogFormVisible: false,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 2,
        url: "",
        status: 1,
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择活动区域", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  props: ["dialogInfo"],
  methods: {
    ...mapActions({
      updateMenulist: "menu/updateMenulist",
    }),
    // 回显事件
    echo(data, id) {
      this.form = data;
      this.form.id = id;
    },
    // 取消事件
    cancel() {
      this.dialogInfo.isShow = false;
      this.reset();
    },
    // 添加事件
    add() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          menuAdd(this.form).then((res) => {
            if (res.status == 200) {
              this.$message.success("添加成功");
              this.cancel();
              this.updateMenulist(); // 添加完成之后调用vux中的辅助函数更新一下仓库中的列表值
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 确认事件
    confirm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          menuEdit(this.form).then((res) => {
            this.$message.success("修改成功");
            this.cancel();
            this.updateMenulist(); // 添加完成之后调用vux中的辅助函数更新一下仓库中的列表值
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单时间
    reset() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 2,
        url: "",
        status: 1,
      };
      this.$refs.dialogForm.resetFields(); // 清空输入框提示信息
    },
  },
};
</script>

<style lang='' scoped>
</style>