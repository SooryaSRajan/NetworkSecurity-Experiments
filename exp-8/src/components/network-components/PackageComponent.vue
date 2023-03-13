<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <div>
    <!--This is the actual package, accepts a list which is rendered in it, package content can be added to it -->
    <!--Note:
            1. The package is a div with a fixed width but variable height, the content is rendered inside it
            2. Each EndSystemComponent has one package component, the package component is rendered as part of the EndSystemComponent
            3. Due to this limitation, there can only be n packages in the network, where n is the number of EndSystemComponents
            4. Wrapper functions in the NetworkInteractionComponent are used to modify the package content
            5. Packets cannot be directly interacted with, they can only be changed through NetworkInteractionComponent
        -->
    <div id="packageBox" :style="{backgroundColor: backgroundColor}" @click="isViewing = !isViewing">
      <div v-for="(item, index) in data" :key="index">
        <div class="packageText">{{ item }}</div>
        <div v-if="addDash(index)" class="dash"></div>
      </div>
    </div>
    <div v-if="dataOnClick && isViewing" class="packageTextHidden" @click="isViewing = !isViewing">
      <div class="card">
        <h3>
          Package Content:
        </h3>
        <h5 @click="copyToClipboard(data[0])">
          IP Address: {{ data[0] }}
        </h5>
        <span>
          Click to copy IP Address
        </span>
        <div v-for="(item, index) in dataOnClick" :key="index">
          <div class="packageText">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackageComponent",
  methods: {
    addDash(index) {
      return this.data.length !== index + 1;
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
    },
  },
  props: {
    data: {
      type: Array,
    },
    dataOnClick: {
      type: Array,
    },
    backgroundColor: {
      type: String,
      default: "#ABFF8E"
    }
  },
  data() {
    return {
      isViewing: false
    };
  },
}
</script>

<style scoped>
#packageBox {
  width: 80px;
  height: 60px;
  padding: 5px;
  overflow-y: hidden;
  border: 1px solid black;
  display: flex;
  font-size: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#packageBox:hover{
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.packageTextHidden{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

*{
  box-sizing: border-box;
}

.card{
  max-width: 50%;
  background-color: white;
  padding: 10px;
  overflow-y: scroll;
  border-radius: 5px;
}

.packageText {
  padding: 2px;
}
h5{
  margin-bottom: 0;
}
span{
  font-size: 10px;
  color: grey;
  margin-bottom: 10px;
}

/*style for dash*/
.dash {
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 2px 0;
}


</style>