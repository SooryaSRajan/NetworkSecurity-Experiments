<template>
  <div class="flex-box">
    <TopBar title="Simulation of the TCP Protocol"></TopBar>
    <div class="rem-space">
      <div class="row-1">
        <div class="step-title">
          Step {{ currentStep }}
        </div>
        <div class="instructions">
          <p v-if="executionStep === 1">
            The client initiates the connection with server by sending a TCP SYN packet.
            <br>
            <br>
            The first SYN message contains a random number (Initial Synchronise Number), unique to each new connection.
          </p>

          <p v-if="executionStep === 2 || executionStep === 3">
            The server responds with a SYN + ACK packet.
            <br>
            <br>
            SYN indicates the random sequence number that the server will be using.
            <br>
            <br>
            ACK is an acknowledgement to the client’s SYN and is calculated as <span class="bold">clientSYN + 1</span>.
            <br>
            <br>
          </p>
          <p v-if="executionStep === 3">
            Now, data packet transfer can begin. Try transferring a packet from the client to the server.
          </p>

        </div>
        <div class="input-field">
          <p v-if="executionStep === 1">
            To begin, enter a random four digit number here that will be used as the ISN to initiate communication.
          </p>
          <input v-if="executionStep === 1" v-model="ackNumber">

          <p v-if="executionStep === 2">
            Enter a random number that will be SYN for the server.
          </p>
          <input v-if="executionStep === 2" v-model="synNumber">

          <p v-if="executionStep === 3">
            Enter a random string to send to the server
          </p>
          <input v-if="executionStep === 3" v-model="clientData">

        </div>
        <div class="button-row">
          <div>
            <StyledButton v-if="!isExecuting && executionStep === 1" text="Begin" :click-function="stepOne"/>
            <StyledButton v-if="!isExecuting && executionStep === 2" text="Continue" :click-function="stepTwo"
                          background-color="#349C1A"/>
            <StyledButton v-if="!isExecuting && executionStep === 3" text="Continue" :click-function="stepThree"
                          background-color="#349C1A"/>
          </div>
          <div>
            <StyledButton v-if="!isExecuting && executionStep !== 1" text="Reset" :click-function="reset"/>

          </div>
        </div>
      </div>
      <div class="row-2">
        <NetworkInteractionComponent ref="childComponentRef">
          <EndSystemComponent class="box" id="computer1" package-id="package1" top="55%" left="10%" ref="computer1"
                              :data="packageDataProcessed" :display-package="displayPackage">
            <img src="./assets/desktop.png" width="150" height="150" alt="computer">
          </EndSystemComponent>
          <EndSystemComponent class="box" id="computer2" top="10%" left="70%">
            <img src="./assets/desktop.png" width="150" height="150" alt="computer">
          </EndSystemComponent>
        </NetworkInteractionComponent>
      </div>
    </div>
  </div>
</template>

<script>

import TopBar from "@/components/TopBar";
import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";
import EndSystemComponent from "@/components/network-components/EndSystemComponent";
import StyledButton from "@/components/StyledButton";

export default {
  name: 'App',
  components: {StyledButton, EndSystemComponent, NetworkInteractionComponent, TopBar},
  mounted() {
    this.$refs.childComponentRef.drawLine("computer1", "computer2")
  },
  data() {
    return {
      packageData: [],
      displayPackage: false,
      executionStep: 1,
      synNumber: 0,
      ackNumber: 0,
      clientData: "",
      currentStep: 1,
      isExecuting: false
    }
  },
  computed: {
    packageDataProcessed() {
      //add (syn), (ack) and (payload) to the respective array index of packageData
      if (this.packageData.length !== 2) return this.packageData
      return this.packageData.map((data, index) => {
        if (index === 0) {
          return data + " (ack)"
        } else if (index === 1) {
          return data + " (syn)"
        }
      })
    }
  },
  methods: {
    reset() {
      this.$refs.computer1.disableAnimation()
      this.$refs.childComponentRef.animatePackageNew("computer1", "package1", "computer2")
      this.$refs.computer1.enableAnimation()
      this.packageData = []
      this.displayPackage = false
      this.executionStep = 1
      this.currentStep = 1
      this.isExecuting = false
      this.synNumber = 0
      this.ackNumber = 0
      this.clientData = ""
    },
    stepOne() {
      this.beginStepOne(this.ackNumber)
    },
    stepTwo() {
      this.beginStepTwo(this.synNumber)
    },
    stepThree() {
      this.beginStepThree(this.clientData)
    },
    beginStepOne(number) {
      if (!isNaN(number) && parseInt(number).toString().length === 4) {
        this.packageData = []
        this.isExecuting = true
        this.packageData.push(parseInt(number))
        this.displayPackage = true
        setTimeout(() => {
          this.$refs.childComponentRef.animatePackageNew("computer2", "package1", "computer1")
          setTimeout(() => {
            this.isExecuting = false
            this.executionStep = 2
            this.currentStep = 2
          }, 7000)
        }, 1000)

      } else {
        this.isExecuting = false
        this.displayPackage = false
        //TODO: Display error
      }
    },
    beginStepTwo(number) {
      if (!isNaN(number) && parseInt(number).toString().length === 4) {
        this.packageData[this.packageData.length - 1] = this.packageData[this.packageData.length - 1] + 1
        this.isExecuting = true
        this.packageData.push(parseInt(number))
        this.displayPackage = true
        setTimeout(() => {
          this.$refs.childComponentRef.animatePackageNew("computer1", "package1", "computer2")
          setTimeout(() => {
            this.isExecuting = false
            this.executionStep = 3
            this.currentStep = 2
          }, 7000)
        }, 1000)

      } else {
        this.isExecuting = false
      }
    },
    beginStepThree(data) {
      this.isExecuting = true
      this.packageData = []
      this.packageData.push(data)
      this.displayPackage = true
      setTimeout(() => {
        this.$refs.childComponentRef.animatePackageNew("computer2", "package1", "computer1")
        setTimeout(() => {
          this.$refs.childComponentRef.animatePackageNew("computer1", "package1", "computer2")
          this.packageData = []
          this.packageData.push("(RESPONSE)")
          setTimeout(() => {
            this.isExecuting = false
          }, 7000)
        }, 7000)
      }, 1000)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  flex-direction: row;
  justify-content: space-evenly;
}

.row-1 {
  flex: 2;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  align-items: start;
  padding: 25px 10px 25px 25px;
  font-size: 20px;
}

.input-field {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input {
  margin-top: 10px;
  font-size: 20px;
  padding: 15px;
}

.row-2 {
  flex: 6;
  width: 100%;
  height: 100%;
}

.step-title {
  padding-bottom: 25px;
  font-weight: 500;
  font-size: 25px;
}

.instructions {
  flex: 1
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
  .flex-box {
    flex-direction: column;
    height: 200vh;
  }

  .rem-space {
    flex-direction: column;
  }

  .row-1 {
    align-items: center;
    padding: 10px;
  }

  .row-2 {
    padding: 10px;
  }

  .side-space:nth-child(1) {
    display: none;
  }

}

</style>
