<template>
  <div>
    <el-dialog
      :title="dialogInfo.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="dialogInfo.isShow"
      :before-close="cancel"
      @opened="opened"
    >
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="100px"
        class="demo-goodsForm"
      >
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select
            v-model="goodsForm.first_cateid"
            placeholder="请选择"
            @change="firstChange(false)"
          >
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in getCateList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="(item, index) in secondList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="goodsForm.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="goodsForm.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="imgList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品规格" prop="specsid">
          <el-select
            v-model="goodsForm.specsid"
            placeholder="请选择"
            @change="specsChange(false)"
          >
            <el-option
              :label="item.specsname"
              :value="item.id"
              v-for="(item, index) in getSpecsList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" prop="specsattr">
          <el-select
            v-model="goodsForm.specsattr"
            placeholder="请选择"
            multiple
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in attrList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" prop="isnew">
          <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" prop="ishot">
          <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
          <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="goodsForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <template>
            <div id="wangeditor"></div>
          </template>
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
import { mapGetters, mapActions } from "vuex";
import { goodsAdd, goodsInfo, goodsEdit } from "../../utils/axios";
import E from "wangeditor";

export default {
  data() {
    return {
      editor: "", //富文本编辑器变量
      imgList: [], // 图片列表
      imgInfo: "", // 图片属性
      secondList: [], // 二级菜单数组
      attrList: [], // 规格属性数组
      dialogVisible: false,
      dialogImageUrl: "",
      goodsForm: {
        first_cateid: "", // 一级分类编号
        second_cateid: "", // 二级分类编号
        goodsname: "", // 商品名
        price: "", // 价格
        market_price: "", // 市场价格
        img: "", // 图片
        description: "", // 描述
        specsid: "", // 商品规格
        specsattr: "", // 规格属性
        isnew: 1, // 是否新品
        ishot: 1, // 是否热卖
        status: 1, // 状态
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.updateCateList(); // 更新商品列表
    this.updateSpecsList(); // 更新商品规格列表
  },
  computed: {
    ...mapGetters({
      getCateList: "cate/getCateList",
      getSpecsList: "specs/getSpecsList",
    }),
  },
  methods: {
    ...mapActions({
      updateCateList: "cate/updateCateList",
      updateSpecsList: "specs/updateSpecsList",
      updateGoodsList: "goods/updateGoodsList",
      updateCount: "goods/updateCount",
    }),
    // 弹框动画结束时的钩子
    opened() {
      this.editor = new E("#wangeditor");
      this.editor.create();
      // 回显富文本编辑器
      this.editor.txt.html(this.goodsForm.description);
    },
    // 图片上传状态变化时的钩子
    onChange(file) {
      this.imgInfo = file.raw;
    },
    // 添加
    add() {
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          this.goodsForm.description = this.editor.txt.html();
          this.goodsForm.img = this.imgInfo;
          // 将信息转换为formData格式
          let file = new FormData();
          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          goodsAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭窗口
              this.updateGoodsList(); // 更新商品列表
              this.updateCount(); // 更新总数
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
      this.goodsForm.description = row.description;
      goodsInfo(row.id).then((res) => {
        if (res.data.code == 200) {
          this.goodsForm = res.data.list;
          this.firstChange(true);
          this.specsChange(true);
          // 将下拉框中的多选数据改成数组用于回显
          this.goodsForm.specsattr = this.goodsForm.specsattr.split(",");

          // 回显图片
          this.imgList = this.goodsForm.img
            ? [{ url: this.$imgUrl + this.goodsForm.img }]
            : [];

            this.goodsForm.id = row.id
        }
      });
    },
    // 编辑
    edit() {
      this.goodsForm.price = this.goodsForm.price.toString();
      this.goodsForm.market_price = this.goodsForm.market_price.toString();
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          this.goodsForm.description = this.editor.txt.html();
          this.goodsForm.img = this.imgInfo;
          // 将信息转换为formData格式
          let file = new FormData();
          for (let i in this.goodsForm) {
            file.append(i, this.goodsForm[i]);
          }
          goodsEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel(); // 关闭窗口
              this.updateGoodsList(); // 更新商品列表
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
    // 取消
    cancel() {
      this.dialogInfo.isShow = false;
      this.reset();
    },
    // 商品规格选值切换时触发
    specsChange(n) {
      if (!n) {
        // 切换值时清空属性菜单
        this.goodsForm.specsattr = "";
      }
      // 查找对应规格id下的属性赋值给attrList
      let i = this.getSpecsList.findIndex(
        (item) => item.id == this.goodsForm.specsid
      );
      this.attrList = this.getSpecsList[i].attrs;
    },
    // 一级菜单选值发生变化时触发
    firstChange(n) {
      if (!n) {
        // 切换选项时，重置二级选项菜单
        this.goodsForm.second_cateid = "";
      }
      // 查找与当前一级分类编号对应的数据，赋值给secondList
      let i = this.getCateList.findIndex(
        (item) => item.id == this.goodsForm.first_cateid
      );
      this.secondList = this.getCateList[i].children;
    },
    // 图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片删除
    onRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 重置
    reset() {
      this.goodsForm = {
        first_cateid: "", // 一级分类编号
        second_cateid: "", // 二级分类编号
        goodsname: "", // 商品名
        price: "", // 价格
        market_price: "", // 市场价格
        img: "", // 图片
        description: "", // 描述
        specsid: "", // 商品规格
        specsattr: "", // 规格属性
        isnew: 1, // 是否新品
        ishot: 1, // 是否热卖
        status: 1, // 状态
      };
      this.$refs.goodsForm.resetFields(); // 重置验证信息
      this.imgList = []; // 重置图片显示数组
      this.editor.destroy(); // 销毁当前富文本编辑器，防止重复创建
    },
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>