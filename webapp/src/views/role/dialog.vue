<template>
  <div>
    <el-dialog
      :title="dialogInfo.isShow ? '添加角色' : '编辑角色'"
      :visible.sync="dialogInfo.isShow"
      :beforeClose="cancel"
    >
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="roleForm.rolename"></el-input>
        </el-form-item>

        <!-- 树型控件 -->
        <el-form-item label="角色权限">
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            ref="tree"
            :default-checked-keys="roleForm.menus"
          >
          </el-tree>
        </el-form-item>

        <!-- 开关 -->
        <el-form-item label="状态">
          <el-switch
            v-model="roleForm.status"
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
import { roleAdd, roleInfo, roleEdit } from "../../utils/axios"; // 引入接口

export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "title",
      },
      dialogFormVisible: true,
      formLabelWidth: "120px",
      roleForm: {
        rolename: "",
        menus: [],
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 回显
    echo(id) {
      roleInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.roleForm = {
            rolename: res.data.list.rolename,
            menus: res.data.list.menus.split(","),
            status: res.data.list.status,
          };
          this.roleForm.id = id;
        }
      });
    },
    // 添加事件
    add() {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          // 存放菜单编号的数组
          let arr = this.$refs.tree.getCheckedNodes().map((item) => {
            return item.id;
          });

          // 由于数据影响视图的原因，将数组赋值给一组新的数数组并传入后端接口
          let newForm = {
            rolename: this.roleForm.rolename,
            menus: arr.join(","),
            status: this.roleForm.status,
          };
          roleAdd(newForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.success(res.data.msg);
            }
          });
          this.cancel(); // 关闭窗口
          this.updateRoleList(); // 更新roleList
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑事件
    edit() {
      // 存放菜单编号的数组
      let arr = this.$refs.tree.getCheckedNodes().map((item) => {
        return item.id;
      });

      // 由于数据影响视图，从而在修改menus时影响到视图，所以将数据重新赋值给一个新数组
      let newForm = {
        id: this.roleForm.id,
        rolename: this.roleForm.rolename,
        menus: arr.join(","),
        status: this.roleForm.status,
      };

      roleEdit(newForm).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.cancel();
    },
    // 取消事件
    cancel() {
      this.dialogInfo.isShow = false;
      this.reset();
    },
    // 重置事件
    reset() {
      this.roleForm = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$refs.roleForm.resetFields(); // 清空验证信息
      this.$refs.tree.setCheckedKeys([]); // 清空树形控件数据
    },
    ...mapActions({
      updateMenulist: "menu/updateMenulist",
      updateRoleList: "role/updateRoleList",
    }),
  },
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    // 如果菜单列表有值，说明其他路由调用过此接口，state中已经有值，为了防止重复调用增加服务器的压力，进行判断
    // 有值的话则不再次调用
    if (this.getMenuList == "") {
      this.updateMenulist();
    }
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>