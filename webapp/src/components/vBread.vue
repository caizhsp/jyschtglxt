<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a>{{ $route.name }}</a></el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style lang='' scoped>
.el-breadcrumb {
  margin: 10px 0px;
}
</style>