// 数据模拟
import Mock from 'mockjs'
import home from './mockData/home'
import user from './mockData/user'

// 拦截请求
Mock.mock('/home/getData',home.getHomeData)
Mock.mock('/home/getCountData',home.getCountData)

Mock.mock('/api/home/getData', home.getStatisticalData)

// 本地获取user的数据

Mock.mock(/user\/getUser/,'get',user.getUserList)
