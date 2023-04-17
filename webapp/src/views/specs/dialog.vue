<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="specsForm" :rules="rules" ref="specsForm">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="specsForm.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 动态输入框 -->
        <el-form-item
          v-for="(item, index) in attrList"
          label="规格属性"
          :key="index"
          label-width="120px"
        >
          <el-input v-model="item.value" class="attrInput"></el-input>
          <el-button type="primary" v-if="index == 0" @click="addAttr"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(item)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="specsForm.status"
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
          >添加</el-button
        >
        <el-button type="primary" @click="edit" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { specsAdd,specsEdit } from "../../utils/axios";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      attrList: [
        {
          value: "",
        },
      ],
      formLabelWidth: "120px",
      specsForm: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
    }),
  },
  methods: {
    // 删除属性
    delAttr(item) {
      var index = this.attrList.indexOf(item);
      if (index !== -1) {
        this.attrList.splice(index, 1);
      }
    },
    // 添加属性
    addAttr() {
      this.attrList.push({
        value: "",
      });
    },
    // 添加事件
    add() {
      this.$refs.specsForm.validate((valid) => {
        if (valid) {
          // 将动态输入框中的内容转换为字符串赋值给attrs
          this.specsForm.attrs = this.attrList
            .map((item) => item.value)
            .join(",");
          console.log(this.specsForm, "this.specsForm");
          specsAdd(this.specsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.updateSpecsList(); // 添加成功后更新商品规格列表
              this.updateCount(); // 更新数据总数
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
    // 回显
    echo(row) {
      this.specsForm = row;
      this.attrList = this.specsForm.attrs.map((item) => {
        return {
          value: item,
        };
      });
    },
    // 编辑事件
    edit() {
      this.$refs.specsForm.validate((valid) => {
        if (valid) {
          // 将动态输入框中的内容转换为字符串赋值给attrs
          this.specsForm.attrs = this.attrList
            .map((item) => item.value)
            .join(",");
          
          specsEdit(this.specsForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.updateSpecsList(); // 添加成功后更新商品规格列表
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
      this.specsForm = {
        specsname: "",
        attrs: "",
        status: 1,
      };

      // 重置动态输入框
      this.attrList = [
        {
          value: "",
        },
      ];
      // 重置提示信息
      this.$refs.specsForm.resetFields();
    },
    ...mapActions({
      updateSpecsList: "specs/updateSpecsList",
      updateCount: "specs/updateCount",
    }),
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
.attrInput {
  width: 300px;
}
</style>