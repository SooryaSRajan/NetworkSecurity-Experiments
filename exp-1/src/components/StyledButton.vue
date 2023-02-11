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
  font-size: 25px;
  cursor: pointer;
  transition: ease-in-out 0.3s;
}

button:hover{
  transform: scale(1.1, 1.1);
  cursor: pointer;
}

</style>