<!--
 * @Author: ShenYuQiang
 * @Date: 2020-11-22 01:49:25
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-22 01:50:15
 * @FilePath: \yishangxiaozhen\src\views\bookingManagement\index.vue
-->
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="接待预约" name="first">        
        <receive-tab></receive-tab>
      </el-tab-pane>
      <el-tab-pane label="活动报名" name="second">
        <activicty-tab></activicty-tab> 
      </el-tab-pane>
      <el-tab-pane label="会议场地预约" name="third">
        <meeting-tab></meeting-tab> 
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import receiveTab from "../../components/receiveTab.vue";
import activictyTab from "../../components/activictyTab.vue";
import meetingTab from "../../components/meetingTab.vue";
export default {
  data() {
    return {     
      activeName: "first",      
    };
  },
  components: {
    //自定义组件
    receiveTab,
    activictyTab,
    meetingTab
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      }
  },
};
</script>

<style lang="less" scoped>
</style>
