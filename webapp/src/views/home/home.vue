<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts"; // 引入echars

export default {
  mounted() {
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option = {
      title: {
        text: "网站各季度访问量展示",
        left: "35%",
      },
      xAxis: {
        type: "category",
        data: ["第一季度", "第二季度", "第三季度", "第四季度"]
      },
      yAxis: {
        type: "value",
        name:"单位(w)"
      },
      series: [
        {
          data: [120, 260, 140, 218],
          type: "line",
        },
      ],
    };
    option && myChart.setOption(option);
  },
};
</script>

<style lang='' scoped>
#main {
  width: 1000px;
  height: 600px;
}
</style>