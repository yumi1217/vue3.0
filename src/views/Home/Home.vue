<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card :shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="" />
          <div class="user-info">
            <p class="name color">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-08-02</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card :shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column v-for="(item, index) in tableLabel" :key="index" :prop="index" :label="item">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name">
          <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
          <div class="details">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height: 260px">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from "vue";
import axios from "axios";
import * as echarts from "echarts";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    let tableData = ref([]);
    let countData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    const getTableList = () => {
      axios.get("/home/getData").then((res) => {
        // console.log(res);
        tableData.value = res.data.data.tableData;
      });
    };
    // 获取首页count数据
    const getCountData = () => {
      axios.get("/home/getCountData").then((res) => {
        const result = res.data.data.countData;
        countData.value = result;
      });
    };
    // 获取图标数据的函数
    const getTuBiaoData = () => {
      axios.get("/api/home/getData").then(({ data }) => {
        const allData = data.data;
        // console.log(allData);
        // 折线图数据
        const order = allData.orderData;
        const xdata = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        const option = {
          xAxis: {
            data: xdata,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(proxy.$refs.echarts);
        E.setOption(option);

        // 用户数据柱状图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: allData.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: allData.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: allData.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const E1 = echarts.init(proxy.$refs.userEcharts);
        E1.setOption(userOption);

        // 饼图数据
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: allData.videoData,
              type: "pie",
            },
          ],
        };
        const E2 = echarts.init(proxy.$refs.videoEcharts);
        E2.setOption(videoOption);
      });
    };
    onMounted(() => {
      getTableList();
      getCountData();
      getTuBiaoData();
    });
    return {
      tableData,
      tableLabel,
      countData,
    };
  },
};
</script>

<style lang="less" scoped>
.user-info {
  p {
    line-height: 1.5;
    font-size: 18px;

    // color: #999;
    span {
      color: #666;
    }
  }
}

.color {
  color: red;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    height: 100px;

    .icons {
      width: 100px;
      font-size: 30px;
      text-align: center;
      line-height: 100px;
      color: #fff;
    }

    .details {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }

      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
}
</style>