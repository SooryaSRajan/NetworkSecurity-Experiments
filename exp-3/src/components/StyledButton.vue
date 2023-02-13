<template>
  <button :style="buttonStyle" @click="clickFunction" :disabled="disable" class="styled-button">
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
    },
    disable: {
      type: Boolean,
      default: false
    },
    invisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonStyle() {
      return {
        backgroundColor: this.backgroundColor,
        color: this.textColor,
        visibility: this.invisible ? "hidden" : "visible"
      }
    }
  }
}
</script>

<style scoped>
button{
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
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

button:disabled{
  background-color: #BDBDBD;
  color: #424242;
  cursor: not-allowed;
  transform: scale(1, 1);
}

</style>