<template>
  <div class="flex-box">
    <TopBar title="Passive attacks - Eavesdropping"></TopBar>
    <div class="rem-space">
      <div class="col-1">
        <div class="row-1">
          <NetworkInteractionComponent ref="childComponentRef">
            <EndSystemComponent top="10%" left="5%" class="box" id="box1" :package-info="serverZeroPackages">
              <ServerComponent :ip-address="ipAddress[0]"/>
            </EndSystemComponent>

            <EndSystemComponent top="-1%" left="82%" class="box" id="middle-man">
              <img src="./assets/incognito.png" width="200" height="200" alt="middle-man">
            </EndSystemComponent>

            <EndSystemComponent top="55%" left="72%" class="box" id="box2" :package-info="serverOnePackages">
              <ServerComponent :ip-address="ipAddress[1]"/>
            </EndSystemComponent>
          </NetworkInteractionComponent>
        </div>
        <div class="row-2">
          <DropDownCard title="INSTRUCTIONS">
            <p>
              In this experiment, you will learn how to eavesdrop on a network. You will be able to see the data being
              sent between two servers.
            </p>
            <br>
            <p>
              To start, click on the "Start" button. This will start the network. You will see the data being sent
              between the two servers.
            </p>
            <br>
            <p>
              To stop the network, click on the "Reset" button. This will stop the network and clear the screen.
            </p>
            <br>
            <p>
              To verify your answer, click on the "Verify" button. This will show you the correct answer.
            </p>
            <br>
          </DropDownCard>
          <DropDownCard title="ENCRYPTION METHODS">
            <!--TODO: Add content-->
          </DropDownCard>
        </div>
      </div>
      <div class="col-2">
        <div class="row-3">
          <div class="row-3-content-space">
            <input v-model="userName" placeholder="username">
            <input v-model="password" placeholder="password">
          </div>
          <div class="button-row">
            <StyledButton :text="step === 1 ? 'Start' : 'Next'" :click-function="buttonClick"></StyledButton>
            <StyledButton text="Verify"></StyledButton>
            <StyledButton text="Reset"></StyledButton>
          </div>
        </div>
        <div class="row-4">
          <div class="terminal" v-if="packetOneOpen">
            hacker@packetOne %
              hacker@packetOne % ---------------------------------------
              | |
              ---------------------------------------
              hacker@packetOne %
          </div>
          <div class="terminal" v-else>
            hacker@packetTwo %
            hacker@packetOne % ---------------------------------------
            | |
            ---------------------------------------
            hacker@packetOne %

          </div>
          <div class="terminal-choices">
            <button class="terminal-button" :class="{'active-button' : packetOneOpen}" @click="changeTerminal(0)">Packet
              1
            </button>
            <button class="terminal-button" :class="{'active-button' : !packetOneOpen}" @click="changeTerminal(1)">
              Packet 2
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import TopBar from "@/components/TopBar";
import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";
import StyledButton from "@/components/StyledButton";
import EndSystemComponent from "@/components/network-components/EndSystemComponent";
import ServerComponent from "@/components/ServerComponent";
import DropDownCard from "@/components/DropDownCard";

export default {
  name: 'App',
  mounted() {
    let ip1 = Math.floor(Math.random() * 20) + 10;
    let ip2 = Math.floor(Math.random() * 255) + 1;
    this.ipAddress.push("12.14." + ip1 + "." + ip2);

    ip1 = Math.floor(Math.random() * 20) + 10;
    ip2 = Math.floor(Math.random() * 255) + 1;
    this.ipAddress.push("10.16." + ip1 + "." + ip2);

    this.$refs.childComponentRef.drawTwoLines("box1", "box2", 40, false, "red", "blue", "channel 1", "channel 2");

  },
  data() {
    return {
      step: 1,
      userName: "",
      password: "",
      packetOneOpen: true,
      ipAddress: [],
      serverZeroPackages: [
        {
          packageId: 'package01',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#9efd85',
          animationSeconds: 1
        },
      ],
      serverOnePackages: [
        {
          packageId: 'package11',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#85fdef',
          animationSeconds: 1
        },
      ],
    }
  },
  methods: {
    changeTerminal(index) {
      if (index === 0) {
        this.packetOneOpen = true;
      } else {
        this.packetOneOpen = false;
      }
    },
    buttonClick() {
      if (this.step === 1) {
        this.serverZeroPackages[0].displayPackage = true;
        //TODO: Replace name with randomm name from map
        this.serverZeroPackages[0].data = ["SOME USERNAME"]
        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1");
        this.step = 2
      } else if (this.step === 2) {
        this.serverOnePackages[0].displayPackage = true;
      }

    }
  },
  components: {DropDownCard, ServerComponent, EndSystemComponent, StyledButton, NetworkInteractionComponent, TopBar},
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

input {
  width: 100%;
  margin-top: 10px;
  font-size: 20px;
  padding: 15px;
}

.col-1 {
  height: 70%;
  max-height: 70%;
  display: flex;
  flex-direction: row;
}

.col-2 {
  height: 30%;
  display: flex;
  flex-direction: row;
}

.row-1 {
  flex: 3;
  display: flex;
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
}

.row-3 {
  flex: 1;
  display: flex;
  padding-left: 25px;
  padding-bottom: 15px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

* {
  box-sizing: border-box;
}

.row-3-content-space {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.row-4 {
  margin-left: 15px;
  flex: 2;
  display: flex;
  flex-direction: row;
}

.terminal {
  flex: 8;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: monospace;
  padding: 10px 15px;
  background-color: #252526;
  color: #33FF00;
}

.terminal-choices {
  flex: 1;
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
}

.active-button {
  border-left: 1px solid #33FF00;
}

.input-field {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input {
  border: none;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 20px;
  padding: 15px;
}

.step-title {
  padding-bottom: 25px;
  font-weight: 500;
  font-size: 25px;
}

.instructions {
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

.bold {
  font-weight: 600;
}

/*media screen*/
@media screen and (max-width: 950px) {


}

</style>
