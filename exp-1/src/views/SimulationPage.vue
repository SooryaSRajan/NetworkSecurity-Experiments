<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<script>
//write a function to go to the simulation page 
//and then call the function in the button click event
export default {
  name: 'SimulationPage',
}
</script>

<template>
  <iframe src="/exp-tcp-au/simulation/graph.html"
          id="frame"
          ref="myiframe">
</iframe>
</template>


<style scoped>

#frame {
  height: 90vh;
  width: 100vw;
  border: none;
}

template{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

button {
            width: 30ch;
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
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
