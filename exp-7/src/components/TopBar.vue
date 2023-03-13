<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <div id="top-bar">
    <div class="side-space"></div>
    <div class="title">{{ title }}</div>
    <div class="side-space">
      <button class="submit-report">Report a Bug</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "TopBar",
  props: {
    title: {
      type: String,
      default: "Packet Simulator"
    }
  }
}
</script>

<style scoped>
#top-bar {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  font-weight: 400;
  color: #288EC8;
  border-bottom: 7px #FF6600 solid;
}

.side-space {
  width: 230px;
}

.submit-report {
  width: 100%;
  border-radius: 20px;
  background-color: #288EC8;
  border: none;
  padding: 20px;
  color: white;
  font-size: 20px;

}

</style>