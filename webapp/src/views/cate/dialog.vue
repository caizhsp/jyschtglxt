<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
    >
      <el-form
        :model="cateForm"
        :rules="rules"
        ref="cateForm"
        label-width="100px"
        class="demo-cateForm"
      >
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="cateForm.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in getCateList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="cateForm.catename"></el-input>
        </el-form-item>
        <!-- 照片墙 -->
        <el-form-item label="图片" v-if="cateForm.pid != 0">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-change="onChange"
            :file-list="imgList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="cateForm.status"
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
import { mapGetters, mapActions } from "vuex";
import { cateAdd, cateEdit } from "../../utils/axios";

export default {
  data() {
    return {
      imgList: [], // 图片回显列表
      imgInfo: "", // 图片信息
      dialogVisible: false, // 图片预览窗口的显示与隐藏
      dialogImageUrl: "", // 图片预览中图片的路径
      formLabelWidth: "120px",
      cateForm: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }],
        catename: [
          { required: true, message: "请填写分类名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
    }),
  },
  methods: {
    ...mapActions({
      updateCateList: "cate/updateCateList",
    }),
    // 图片状态改变时的钩子
    onChange(file) {
      this.imgInfo = file.raw; // 当文件状态改变时，将最新的文件信息赋值给imgInfo
    },
    // 图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片移除
    onRemove(file, fileList) {
      //   console.log(file, fileList);
    },
    // 添加事件
    add() {
      this.$refs.cateForm.validate((valid) => {
        if (valid) {
          this.cateForm.img = this.imgInfo;

          // 将信息转换为formData (multipart/form-data)格式
          let file = new FormData();
          for (let i in this.cateForm) {
            file.append(i, this.cateForm[i]);
          }

          cateAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 添加完成后关闭当前窗口
              this.updateCateList(); // 添加完成之后重新刷新商品分类列表
            } else {
              this.$message, error(res.data.error);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 回显
    echo(rowInfo) {
      console.log(rowInfo, "整条行信息");
      this.cateForm = rowInfo; // 由于图片的特殊性，需要对图片进行特殊回显处理
      // 图片回显处理
      this.imgList = this.cateForm.img
        ? [{ url: this.$imgUrl + this.cateForm.img }]
        : [];
    },
    // 编辑事件
    edit() {
      console.log(this.cateForm);
      this.$refs.cateForm.validate((valid) => {
        if (valid) {
          // 检查图片是否做了变动
          this.cateForm.img = this.imgInfo ? this.imgInfo : this.cateForm.img;

          // 将信息转换为formData (multipart/form-data)格式
          let file = new FormData();
          for (let i in this.cateForm) {
            file.append(i, this.cateForm[i]);
          }

          cateEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 添加完成后关闭当前窗口
              this.updateCateList(); // 添加完成之后重新刷新商品分类列表
            } else {
              this.$message, error(res.data.error);
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
      this.dialogInfo.isShow = false; // 隐藏dialog
      this.reset();
    },
    // 重置事件
    reset() {
      // 重置表单信息
      this.cateForm = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
      // 重置验证信息
      this.$refs.cateForm.resetFields();
      // 清空图片列表
      this.imgList = [];
    },
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>