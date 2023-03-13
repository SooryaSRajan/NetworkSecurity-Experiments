<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <button :style="buttonStyle" @click="clickFunction">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "StyledButton",
  props: {
    backgroundColor: {
      type: String,
      default: "#288EC8"
    },
    textColor: {
      type: String,
      default: "white"
    },
    text: {
      type: String,
      default: "Button"
    },
    clickFunction: {
      type: Function,
      default: () => {
      }
    }
  },
  computed: {
    buttonStyle() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.textColor
      }
    }
  }
}
</script>

<style scoped>
button{
  border: none;
  border-radius: 5px;
  padding: 15px;
  font-size: 20px;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}

button:hover{
  transform: scale(1.1, 1.1);
  cursor: pointer;
}

</style>