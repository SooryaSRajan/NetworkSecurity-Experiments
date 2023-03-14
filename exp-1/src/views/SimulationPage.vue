<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<script>
export default {
  name: 'SimulationPage',
  methods: {
    goToSimulationPage() {
      this.$router.push({ name: 'experiment-view' });
      console.log("Go to Experiment Page")
    }
  }
}
</script>

<template>
  <div id="root-box">
    <iframe src="/exp-tcp-au/simulation/file/graph.html"
            id="frame"
            ref="myiframe">
    </iframe>
    <button @click="goToSimulationPage">Go to Experiment Page</button>
  </div>
</template>


<style scoped>

#root-box{
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: start;
}

#frame {
  height: 90vh;
  width: 100vw;
  border: none;
}

template {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

button {
  justify-self: end;
  align-self: end;
  margin: 10px;
  width: 30ch;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #BDBDBD;
  color: #424242;
  cursor: not-allowed;
  transform: scale(1, 1);
}


</style>  
