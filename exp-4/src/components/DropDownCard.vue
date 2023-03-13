<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <div class="card-box">
    <div class="content" @click="toggle">
      {{ "- " + title }}
    </div>
    <div class="text-content" :style="contentHeight">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownCard",
  props: {
    title: String,
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  },
  computed: {
    contentHeight() {
      if (this.open) {
        return {
          padding: "15px",
          height: "max-content",
          maxHeight: "max-content"
        }
      } else {
        return  {
          padding: "0",
          height: "0"
        }
      }
    }
  }
}
</script>

<style scoped>

*{
  box-sizing: border-box;
}

.card-box {
  margin-top: 15px;
  width: 100%;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
  transition: all 0.3s ease-in-out;
}

.content {
  border-radius: 10px;
  width: 100%;
  background-color: #F9FAFE;
  padding: 15px;
  font-size: 18px;
  font-weight: 500;
  text-align: start;
  transition: all 0.3s ease-in-out;
}

.content:hover {
  background-color: #ebebee;
  cursor: pointer;
}

.text-content {
  width: 100%;
  padding: 0;
  font-size: 15px;
  font-weight: 400;
  text-align: start;
  height: 0;
  overflow-y: scroll;
}

</style>