<template>
  <div>
    <el-dialog
      :title="dialogInfo.isShow ? '添加秒杀' : '编辑秒杀'"
      :visible.sync="dialogInfo.isShow"
      :beforeClose="cancel"
    >
      <el-form
        :model="seckForm"
        :rules="rules"
        ref="seckForm"
        label-width="100px"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="seckForm.title"></el-input>
        </el-form-item>

        <!-- 日期选择器 -->
        <el-form-item label="活动期限">
          <el-date-picker
            v-model="timeVal"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 分类 -->
        <el-form-item label="一级分类">
          <el-select
            v-model="seckForm.first_cateid"
            placeholder="请选择"
            @change="firstChange(false)"
          >
            <el-option
              v-for="item in getCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="seckForm.second_cateid"
            placeholder="请选择"
            @change="secondChange(false)"
          >
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="seckForm.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 开关 -->
        <el-form-item label="状态">
          <el-switch
            v-model="seckForm.status"
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
import { seckAdd, seckInfo, seckEdit, goodsList } from "../../utils/axios"; // 引入接口

export default {
  data() {
    return {
      secondList: [], // 二级分类列表
      goodsArr: [], // 商品列表
      timeVal: "",
      formLabelWidth: "120px",
      seckForm: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 一级分类切换触发事件
    firstChange(n) {
      if (!n) {
        this.seckForm.second_cateid = "";
        this.goodsArr = [];
      }
      let i = this.getCateList.findIndex((item) => {
        return item.id == this.seckForm.first_cateid;
      });
      this.secondList = this.getCateList[i].children;
    },
    // 二级分类切换触发事件
    secondChange(n) {
      if (!n) {
        this.goodsArr = [];
      }
      // 通过定义一级二级菜单id查找对应的列表
      goodsList({
        fid: this.seckForm.first_cateid, // fid ：一级菜单id
        sid: this.seckForm.second_cateid, // sid：二级菜单id
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
        }
      });
    },
    // 回显
    echo(id) {
      seckInfo(id).then((res) => {
        if (res.data.code == 200) {
          this.seckForm = res.data.list;
          // 回显的时候，不清空二级菜单
          this.firstChange(true);
          this.secondChange(true);
          this.timeVal = [
            new Date(parseInt(this.seckForm.begintime)),
            new Date(parseInt(this.seckForm.endtime)),
          ];
          this.seckForm.id = id
        }
      });
    },
    // 添加事件
    add() {
      this.$refs.seckForm.validate((valid) => {
        if (valid) {
          // 将时间选择器内中的时间转换为时间戳
          this.seckForm.begintime = new Date(this.timeVal[0]).getTime();
          this.seckForm.endtime = new Date(this.timeVal[1]).getTime();

          seckAdd(this.seckForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateSeckList(); // 更新秒杀列表
              this.cancel(); // 关闭窗口
            } else {
              this.$message.success(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 编辑事件
    edit() {
     this.$refs.seckForm.validate((valid) => {
        if (valid) {
          // 将时间选择器内中的时间转换为时间戳
          this.seckForm.begintime = new Date(this.timeVal[0]).getTime();
          this.seckForm.endtime = new Date(this.timeVal[1]).getTime();

          seckEdit(this.seckForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.updateSeckList(); // 更新秒杀列表
              this.cancel(); // 关闭窗口
            } else {
              this.$message.success(res.data.msg);
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
      this.seckForm = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.$refs.seckForm.resetFields(); // 清空验证信息
      this.timeVal = ""; // 清空时间选择器
    },
    ...mapActions({
      updateSeckList: "seck/updateSeckList",
      updateCateList: "cate/updateCateList",
    }),
  },
  computed: {
    ...mapGetters({
      getSeckList: "seck/getSeckList",
      getCateList: "cate/getCateList",
    }),
  },
  mounted() {
    this.updateSeckList();
    this.updateCateList(); // 初始化菜单列表
  },
  props: ["dialogInfo"],
};
</script>

<style lang='' scoped>
</style>