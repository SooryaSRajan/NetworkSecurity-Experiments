<template>
  <div class="flex-box">
    <TopBar title="Combining active and passive attacks"></TopBar>
    <div class="rem-space">
      <div class="col-1">
        <div class="row-3">
          <div class="row-3-content-space">
            <div class="step-1" v-if="step===3">
            <p>In this experiment, we will be combining active and passive attacks to retrieve the username and password of a
              user. You are the machine titled 'Hacker' in the network. Begin by intercepting a packet from a channel of your choice.</p>
            <select>
              <option value="1">Channel 1</option>
              <option value="2">Channel 2</option>
              <option value="3">Channel 3</option>
            </select>
          </div>
          <div class="step-2" v-if="step===2">
            <h4>Packet intercepted successfully</h4>
            <p>Now that you have intercepted a packet, you can use this to communicate with the server on behalf of the user. The packet you intercepted is shown below.</p>
            <p>Source: </p>
            <p>Channel: </p>
            <p>To send the packet to the server on behalf of the user, click on 'Next'</p>
        </div>
        <div class="step-3" v-if="step===1">
            <h4>Received reply from server</h4>
            <p>Intercepted packet was sent successfully to the server and the reply has been retrieved. Analyze the packet to identify username and password, and input them in the respective text fields here, to verify.</p>
            <input v-model="userName" placeholder="username">
            <input v-model="password" placeholder="password">
        </div>
        </div>
          <div class="button-row">
            <StyledButton :text="step === 1 ? 'Start' : 'Next'" :invisible="step === 4" :click-function="buttonClick"
                          :disable="disableButton && step !== 4"></StyledButton>
            <StyledButton text="Verify" :click-function="validate" :disable="disableButton"></StyledButton>
            <StyledButton text="Reset" :click-function="reset" :disable="disableButton"></StyledButton>
          </div>
        </div>
      </div>
      <div class="col-2">
        
        <div class="row-4">
          <div class="terminal" v-if="channelIndex === 0">
            <span v-for="(data, index) in channelOneData" :key="index">{{ data }}</span>
          </div>
          <div class="terminal" v-if="channelIndex === 1">
            <span v-for="(data, index) in channelTwoData" :key="index">{{ data }}</span>
          </div>
          <div class="terminal" v-if="channelIndex === 2">
            <span v-for="(data, index) in channelThreeData" :key="index">{{ data }}</span>
          </div>
          <div class="terminal" v-if="channelIndex === 3">
            <span v-for="(data, index) in channelHackerData" :key="index">{{ data }}</span>
          </div>
          <div class="terminal-choices">
            <button class="terminal-button" :class="{'active-button' : channelIndex === 0}" @click="channelIndex = 0">
              Channel 1
            </button>
            <button class="terminal-button" :class="{'active-button' : channelIndex === 1}" @click="channelIndex = 1">
                    <!-- v-if="channelOneData.length !== 0"> -->
              Channel 2
            </button>
            <button class="terminal-button" :class="{'active-button' : channelIndex === 2}" @click="channelIndex = 2">
                    <!-- v-if="channelTwoData.length !== 0"> -->
              Channel 3
            </button>
            <button class="terminal-button" :class="{'active-button' : channelIndex === 2}" @click="channelIndex = 2">
                    <!-- v-if="channelTwoData.length !== 0"> -->
              Hacker
            </button>

          </div>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>

import TopBar from "@/components/TopBar";

import StyledButton from "@/components/StyledButton";
export default {
  name: 'App',
  mounted() {
    
  },
  data() {
    return {
      step: 1,
      disableButton: false,
      userName: "",
      password: "",
      channelIndex: 0,
      channelOneData: ['this is some test data'],
      channelTwoData: [],
      channelThreeData: [],
      channelHackerData: [],

    }
  },
  methods: {
    
  },
  components: {TopBar, StyledButton},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

pre {
  margin: 0;
  padding: 0;
}

.flex-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.rem-space {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: clip;
}

.col-1 {
  height: 70%;
  max-height: 70%;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: aquamarine;
}

.col-2 {
  height: 30%;
  display: flex;
  flex-direction: row;
  background-color: bisque
}

.row-1 {
  flex: 3;
  display: flex;
  background-color: #33FF00;
}

.row-2 {
  flex: 1;
  border-radius: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-y: scroll;
  background-color: #4f4faf;
}

.row-3 {
  padding-right: 15px;
  width: 25%;
  height: 100%;
  display: flex;
  padding-left: 25px;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  background-color: coral;
}

* {
  box-sizing: border-box;
}

.row-3-content-space {
  margin-bottom: 10px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row-4 {
  width: 100%;
  display: flex;
  flex-direction: row;
  text-overflow: fade;
  background-color: crimson;
}

.terminal {
  width: 90%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: monospace;
  padding: 10px 15px;
  background-color: #252526;
  color: #33FF00;
  overflow-y: scroll;
}

.terminal-choices {
  width: 10%;
  flex: 1;
  min-width: 100px;
  background-color: #3c3f41;
}

.terminal-button {
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 10px;
  color: white;
  font-family: monospace;
  font-size: 13px;
  text-align: start;
}

.terminal-button:hover {
  background-color: #343333;
  cursor: pointer;
}

.active-button {
  border-left: 2px solid #33FF00;
}

input {
  border: none;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 20px;
  padding: 15px;
  box-sizing: border-box;
  width: 99%;
}

select {
  border: none;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 20px;
  padding: 15px;
  box-sizing: border-box;
  width: 99%;
}

.button-row {
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  height: 100vh;
  width: 100vw;
}

p {
  margin: 0;
  padding: 0;
  text-align: justify;
}

span {
  display: block;
  padding: 0;
  margin: 0;
  text-align: start;
  overflow-wrap: break-word;
}

/*media screen*/
@media screen and (max-width: 1000px) {

  .button-row {
    flex-direction: column;
    justify-self: start;
    flex: 2;
  }

  .col-1 {
    flex-direction: column;
  }

  .row-2 {
    padding: 2px;
    margin: 0 20px 5px;
    flex-direction: row;
  }


  .flex-box {
    height: 180vh;
  }

}

</style>
<style>
@media screen and (max-width: 1200px) {
  .styled-button {
    margin-top: 10px;
  }

  .content {
    font-size: 10px;
  }

  .card-box {
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>
