<template>
  <div class="flex-box">
    <TopBar title="Passive attacks - Eavesdropping"></TopBar>
    <div class="rem-space">
      <div class="col-1">
        <div class="row-1">
          <NetworkInteractionComponent ref="childComponentRef">
            <EndSystemComponent top="10%" left="5%" class="box" id="box1" :package-info="serverZeroPackages">
              <ServerComponent :ip-address="ipAddress[0]" :port1="ports[0]" :port2="ports[1]" :port3="ports[2]"
                               :port4="ports[3]"/>
            </EndSystemComponent>

            <EndSystemComponent top="-1%" left="82%" class="box" id="middle-man">
              <img src="./assets/incognito.png" width="200" height="200" alt="middle-man">
            </EndSystemComponent>

            <EndSystemComponent top="55%" left="72%" class="box" id="box2" :package-info="serverOnePackages">
              <ServerComponent :ip-address="ipAddress[1]" :port1="ports[0]" :port2="ports[1]" :port3="ports[2]"
                               :port4="ports[3]"/>
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
            <StyledButton :text="step === 1 ? 'Start' : step !== 5? 'Next' : 'Done'" :click-function="buttonClick"
                          :disable="disableButton"></StyledButton>
            <StyledButton text="Verify" :click-function="validate" :disable="disableButton"></StyledButton>
            <StyledButton text="Reset" :disable="disableButton"></StyledButton>
          </div>
        </div>
        <div class="row-4">
          <div class="terminal" v-if="channelIndex === 0">
            <p v-for="(data, index) in unencryptedChannelData" :key="index">{{ data }}</p>
          </div>
          <div class="terminal" v-if="channelIndex === 1 && channelOneData.length !== 0">
            <p v-for="(data, index) in channelOneData" :key="index">{{ data }}</p>
          </div>
          <div class="terminal" v-else-if="channelIndex === 2 && channelTwoData.length !== 0">
            <p v-for="(data, index) in channelTwoData" :key="index">{{ data }}</p>
          </div>
          <div class="terminal-choices">
            <button class="terminal-button" :class="{'active-button' : channelIndex === 0}" @click="channelIndex = 0">
              Unencrypted Channel
            </button>
            <button class="terminal-button" :class="{'active-button' : channelIndex === 1}" @click="channelIndex = 1"
                    v-if="channelOneData.length !== 0">
              Channel 1
            </button>
            <button class="terminal-button" :class="{'active-button' : channelIndex === 2}" @click="channelIndex = 2"
                    v-if="channelTwoData.length !== 0">
              Channel 2
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

    this.$refs.childComponentRef.drawLine("box1", "box2", null, "Unencrypted channel");

    let randomIndex = Math.floor(Math.random() * this.userNameObjectCollection.length);

    randomIndex = Math.floor(Math.random() * this.passwordObjectCollection.length);
    //TODO: Random username and password objects

    console.log(randomIndex)

  },
  data() {
    return {
      step: 1,
      disableButton: false,
      userNameObjectCollection: [{}],
      passwordObjectCollection: [{}],
      firstStepComplete: false,
      secondStepComplete: false,
      thirdStepComplete: false,
      fourthStepComplete: false,
      ports: [1, 0, 0, 0],
      userNameEncrypted: "",
      passwordEncrypted: "",
      userNameDecrypted: "",
      passwordDecrypted: "",
      keyPayloadOne: "",
      keyPayloadTwo: "",
      encryptionAlgorithmOne: "",
      encryptionAlgorithmTwo: "",
      unencryptedChannelData: ["hacker@unencryptedChannel > Logging data from unencrypted channel"],
      channelOneData: [],
      channelTwoData: [],
      userName: "",
      password: "",
      channelIndex: 0,
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
    validate() {
      //check if decrypted username and password and username and password match
      if (this.userNameDecrypted === this.userName && this.passwordDecrypted === this.password) {
        alert("Experiment complete!")
      }
    },
    buttonClick() {
      if (this.step === 1) {
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["KEY REQUEST"]
        this.unencryptedChannelData.push("hacker@unencryptedChannel > Sending key request to server 0, connection: keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: null")
        this.disableButton = true;
        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1", () => {
          this.step = 2
          this.disableButton = false;
        });
      } else if (this.step === 2) {
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["KEY RESPONSE"]
        setTimeout(() => {
          this.unencryptedChannelData.push("hacker@unencryptedChannel > Received key response from server 0, connection: keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: null")
          this.unencryptedChannelData.push(`hacker@unencryptedChannel > Payload: [{Key: ${this.keyPayloadOne}, Channel: CHANNEL 1, ENC: ${this.encryptionAlgorithmOne}}, {Key: ${this.keyPayloadTwo}, Channel: CHANNEL 2, ENC: ${this.encryptionAlgorithmTwo}}]`)
          this.$refs.childComponentRef.drawLineOffset("box1", "box2", 55, false, "red", "channel 1", false);
        }, 1000);
        this.disableButton = true;
        this.$refs.childComponentRef.animatePackage("box1", "package01", "box2", () => {
          this.step = 3
          this.disableButton = false;
        });
      } else if (this.step === 3) {
        this.ports[1] = 1;
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["PAYLOAD", "CHANNEL 1"]
        this.channelIndex = 1
        this.channelOneData.push("hacker@channel1 > Sending encrypted username to server 0, channel: 1, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: null")
        this.channelOneData.push(`hacker@channel1 > Payload: {userName: ${this.userNameEncrypted}}`)

        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1", () => {
          this.serverZeroPackages[0].data = ["RESPONSE", "CHANNEL 1"]
          this.disableButton = true;
          this.$refs.childComponentRef.animatePackage("box1", "package01", "box2", () => {
            this.channelOneData.push("hacker@channel1 > Received encrypted response from server 0, keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: null")
            this.step = 4
            this.disableButton = false;
            this.$refs.childComponentRef.drawLineOffset("box1", "box2", 55, false, "blue", "channel 2", true);
          });
        });
      } else if (this.step === 4) {
        this.ports[2] = 1;
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["PAYLOAD", "CHANNEL 2"]
        this.channelIndex = 2
        this.channelTwoData.push("hacker@channel1 > Sending encrypted password to server 0, channel: 2,  accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: null")
        this.channelTwoData.push(`hacker@channel1 > Payload: {password: ${this.passwordEncrypted}}`)
        this.disableButton = true;
        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1", () => {
          this.serverZeroPackages[0].data = ["RESPONSE", "CHANNEL 2"]
          this.$refs.childComponentRef.animatePackage("box1", "package01", "box2", () => {
            this.disableButton = false;
            this.channelTwoData.push("hacker@channel1 > Received encrypted response from server 0, keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: null")
            let randomKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            this.channelTwoData.push("hacker@channel1 > Decrypted response: {success: true, message: 'Login successful', bearerToken: '" + randomKey + "'}")
            this.step = 5
          });
        });
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

/*media screen*/
@media screen and (max-width: 950px) {


}

</style>
