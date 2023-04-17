<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
    >
      <el-form
        :model="bannerForm"
        :rules="rules"
        ref="bannerForm"
        label-width="100px"
        class="demo-bannerForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="bannerForm.title"></el-input>
        </el-form-item>
        <!-- 照片墙 -->
        <el-form-item label="图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="onPreview"
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
            v-model="bannerForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
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
import { bannerAdd, bannerEdit } from "../../utils/axios";

export default {
  data() {
    return {
      imgList: [], // 图片回显列表
      imgInfo: "", // 图片信息
      dialogVisible: false, // 图片预览窗口的显示与隐藏
      dialogImageUrl: "", // 图片预览中图片的路径
      formLabelWidth: "120px",
      bannerForm: {
        title: "",
        img: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请填写标题", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getBannerList: "banner/getBannerList",
    }),
  },
  methods: {
    ...mapActions({
      updateBannerList: "banner/updateBannerList",
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
    // 添加事件
    add() {
      this.$refs.bannerForm.validate((valid) => {
        if (valid) {
          this.bannerForm.img = this.imgInfo;

          // 将信息转换为formData (multipart/form-data)格式
          let file = new FormData();
          for (let i in this.bannerForm) {
            file.append(i, this.bannerForm[i]);
          }

          bannerAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 添加完成后关闭当前窗口
              this.updateBannerList(); // 添加完成之后重新刷新轮播图列表
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
      this.bannerForm = rowInfo; // 由于图片的特殊性，需要对图片进行特殊回显处理
      // 图片回显处理
      this.imgList = this.bannerForm.img
        ? [{ url: this.$imgUrl + this.bannerForm.img }]
        : [];
    },
    // 编辑事件
    edit() {
      console.log(this.bannerForm);
      this.$refs.bannerForm.validate((valid) => {
        if (valid) {
          // 检查图片是否做了变动
          this.bannerForm.img = this.imgInfo
            ? this.imgInfo
            : this.bannerForm.img;

          // 将信息转换为formData (multipart/form-data)格式
          let file = new FormData();
          for (let i in this.bannerForm) {
            file.append(i, this.bannerForm[i]);
          }

          bannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 添加完成后关闭当前窗口
              this.updateBannerList(); // 添加完成之后重新刷新轮播图列表
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
      this.bannerForm = {
        title: "",
        img: "",
        status: 1,
      };
      // 重置验证信息
      this.$refs.bannerForm.resetFields();
      // 清空图片列表
      this.imgList = [];
    },
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>