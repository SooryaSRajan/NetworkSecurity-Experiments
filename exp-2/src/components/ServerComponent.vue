<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <div class="root-col">
    <div class="root" :style="{backgroundColor: backgroundColor ?? '#AA9A8B',  border: !displayExtraOptions ? '1px solid black' : 'none'}">
      <div class="col">
        <span class="id-address">{{ ipAddress }}</span>
      </div>
      <div class="col">
        <div class="circle-div" :style="{backgroundColor: port0Color}"><span class="circle-div-text">{{portLabel(0)}}</span></div>
        <div class="circle-div" :style="{backgroundColor: port1Color}"><span class="circle-div-text">{{portLabel(1)}}</span></div>
        <div class="circle-div" :style="{backgroundColor: port2Color}"><span class="circle-div-text">{{portLabel(2)}}</span></div>
        <div class="circle-div" :style="{backgroundColor: port3Color}"><span class="circle-div-text">{{portLabel(3)}}</span></div>
      </div>
    </div>
    <div class="extra-options" v-if="displayExtraOptions"
         :style="{visibility: responseData.length !== 0 ? 'visible' : 'hidden'}">
      <div class="title">
        Respond
      </div>
      <div class="respond-buttons">
        <button v-for="(data, index) in responseData" :key="index" :style="{backgroundColor: data.backgroundColour}" @click="this.$emit('respond', data)">
          Port: {{ data.serverPortLabel }}
        </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ServerComponent",
  props: {
    port1: Number,
    port2: Number,
    port3: Number,
    port4: Number,
    portLabels: [],
    ipAddress: String,
    displayExtraOptions: Boolean,
    responseData: [],
    backgroundColor: String,
  },
  computed: {
    port0Color() {
      if (this.port1 === 0) {
        return "#FF0000";
      } else if (this.port1 === 1) {
        return "#33FF00";
      } else if (this.port1 === 2) {
        return "#FFD600";
      } else {
        return "#FF0000";
      }
    },
    port1Color() {
      if (this.port2 === 0) {
        return "#FF0000";
      } else if (this.port2 === 1) {
        return "#33FF00";
      } else if (this.port2 === 2) {
        return "#FFD600";
      } else {
        return "#FF0000";
      }
    },
    port2Color() {
      if (this.port3 === 0) {
        return "#FF0000";
      } else if (this.port3 === 1) {
        return "#33FF00";
      } else if (this.port3 === 2) {
        return "#FFD600";
      } else {
        return "#FF0000";
      }
    },
    port3Color() {
      if (this.port4 === 0) {
        return "#FF0000";
      } else if (this.port4 === 1) {
        return "#33FF00";
      } else if (this.port4 === 2) {
        return "#FFD600";
      } else {
        return "#FF0000";
      }
    },
  },
  methods: {
    portLabel(index){
      if(this.portLabels){
        if(this.portLabels.length > index){
          return this.portLabels[index]
        }
      }
      return index + 1
    },
  }
}
</script>

<style scoped>
.root-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.root {
  width: 160px;
  height: 100px;
  padding: 2px;
  display: flex;
  flex-direction: column;
}

.respond-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.extra-options {
  width: 160px;
  height: 60px;
  background-color: #AA9A8B;
  padding: 5px;
  box-sizing: border-box;
  overflow-y: scroll;
}

.title {
  font-size: 10px;
  font-weight: 500;
  color: #000000;
  text-align: center;
}

button {
  border: none;
  width: 100%;
  height: 30px;
  color: #000000;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  margin: 5px;
}

button:hover {
  opacity: 0.8;
}


.col:nth-child(1) {
  flex: 2;
  background-color: #000000;
  border-radius: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.id-address {
  color: #33FF00;
  font-size: 18px;
  font-weight: 500;
}

.col:nth-child(2) {
  flex: 1;
  background-color: #E6E6E6;
  border-radius: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px;
  transition: ease-in-out 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-div:hover {
  transform: scale(2);
  box-shadow: 2px 3px 10px 2px #a1a1a1;
  padding: 10px;
  cursor: pointer;
}

.circle-div:hover .circle-div-text {
  display: block;
}

.circle-div-text {
  color: #000000;
  font-size: 7px;
  font-weight: 500;
  text-align: center;
  display: none;
}

</style>