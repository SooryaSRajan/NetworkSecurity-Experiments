<template>
    <main>
    <div class="flex-box">
      <TopBar title="Combining active and passive attacks"></TopBar>
      <div id="snackbar">Some text some message..</div>
      <div class="rem-space">
        <div class="col-1">
          <div class="row-3">
            <div class="row-3-content-space">
              <div class="step-1" v-if="step===1">
                <p>In this experiment, we will be combining active and passive attacks to retrieve the username and
                  password of a
                  user. You are the machine titled 'Hacker' in the network. Begin by intercepting a packet from a channel
                  of your choice.</p>
                <br>
                <select v-model="chosenChannel">
                  <option value="1">Channel 1</option>
                  <option value="2">Channel 2</option>
                  <option value="3">Channel 3</option>
                </select>
              </div>
              <div class="step-2" v-if="step===2">
                <h4>Start packet transmission</h4>
                <p>Now that you have established a man in the middle attack, you can use this to communicate with the
                  server on behalf of the user and the server. Click on next to send a packet to the server on behalf of
                  the user.</p>
              </div>
              <div class="step-2" v-if="step===3">
                <h4>Packet intercepted successfully</h4>
                <p>Now that you have intercepted a packet, you can use this to communicate with the server on behalf of
                  the user. The packet you intercepted is shown in the terminal.</p>
                <br>
                <p>To send the packet to the server on behalf of the user, click on 'Next'</p>
                <br>
                <p>The packet has to be sent in the next {{ countDown }} seconds or the experiment will fail as the server
                  will close the connection after timing out waiting for a response. To send the packet, click on the corresponding Port no. under the 'Respond' section on your computer.</p>
              </div>
              <div v-if="step===4">
                <h4>Send response back</h4>
                <p>Now that you have sent a packet to the server on behalf of the user, you can send a response back to
                  the user. Click on 'Next' to send a response back to the user. Note that this packet will not actually
                  reach the user, it will be intercepted by you.</p>
              </div>
              <div class="step-3" v-if="step===5">
                <h4>Received reply from server</h4>
                <p>Intercepted packet was sent successfully to the server and the reply has been retrieved. Analyze the
                  packet to identify username and password, and input them in the respective text fields here, to
                  verify.</p>
                <br>
                <p>Make sure you respond back to the user with the same packet you received from the server.</p>
                <br>
                <input v-model="userName" placeholder="username">
                <input v-model="password" placeholder="password">
              </div>
            </div>
            <div class="button-row">
              <StyledButton :text="step === 1 ? 'Start' : 'Next'" :invisible="step === 3 || step === 5"
                            :click-function="buttonClick"
                            :disable="disableButton && step !== 3 && step !== 5"></StyledButton>
              <StyledButton text="Verify" :click-function="verifyCredentials" :invisible="step !== 5"
                            :disable="disableButton"></StyledButton>
              <StyledButton text="Reset" :click-function="reset" :disable="disableButton"></StyledButton>
            </div>
          </div>
          <div class="row-network">
            <NetworkInteractionComponent ref="childComponentRef">
              <EndSystemComponent top="10%" left="5%" class="box" id="box1">
                <ServerComponent :ip-address="ipAddress[0]" :port1="portsClientA[0]" :port2="portsClientA[1]"
                                 :port3="portsClientA[2]"
                                 :port4="portsClientA[3]"
                                  :port-labels="[8080, 8081, 8082, 8083]"/>
              </EndSystemComponent>
  
              <EndSystemComponent top="40%" left="5%" class="box" id="box2">
                <ServerComponent :ip-address="ipAddress[1]" :port1="portsClientB[0]" :port2="portsClientB[1]"
                                 :port3="portsClientB[2]"
                                 :port4="portsClientB[3]"/>
              </EndSystemComponent>
  
              <EndSystemComponent top="70%" left="5%" class="box" id="box3">
                <ServerComponent :ip-address="ipAddress[2]" :port1="portsClientC[0]" :port2="portsClientC[1]"
                                 :port3="portsClientC[2]"
                                 :port4="portsClientC[3]"/>
              </EndSystemComponent>
  
              <EndSystemComponent top="10%" left="75%" class="box" id="box4">
                <ServerComponent @respond="respond"
                                 :display-extra-options="true"
                                 :responseData="receivedPackages" :ip-address="ipAddress[3]" :port1="portsHacker[0]"
                                 :port2="portsHacker[1]"
                                 :port3="portsHacker[2]"
                                 :port4="portsHacker[3]"/>
              </EndSystemComponent>
  
              <EndSystemComponent top="70%" left="75%" class="box" id="box5" :package-info="serverPackages">
                <ServerComponent :ip-address="ipAddress[4]" :port1="portsServer[0]" :port2="portsServer[1]"
                                 :port3="portsServer[2]"
                                 :port4="portsServer[3]"/>
              </EndSystemComponent>
  
  
            </NetworkInteractionComponent>
  
  
          </div>
        </div>
        <div class="col-2">
  
          <div class="row-4">
            <div class="terminal">
              <span v-for="(data, index) in channelHackerData" :key="index">{{ data }}</span>
            </div>
            <div class="terminal-choices">
              <button class="terminal-button" :class="{'active-button' : true}">
                Hacker
              </button>
  
            </div>
          </div>
  
        </div>
  
      </div>
    </div>
  </main>
  </template>
  
  <script>
  
  import TopBar from "@/components/TopBar";
  
  import StyledButton from "@/components/StyledButton";
  import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";
  import EndSystemComponent from "@/components/network-components/EndSystemComponent";
  import ServerComponent from "@/components/ServerComponent";
  
  export default {
    name: 'App',
    mounted() {
  
      for (let i = 0; i < 5; i++) {
        let ip = "";
        if (i === 3) {
          this.ipAddress.push("Hacker - MITM")
          continue
        }
        for (let j = 0; j < 4; j++) {
          ip += Math.floor(Math.random() * 255) + 1;
          if (j !== 3) {
            ip += ".";
          }
        }
        this.ipAddress.push(ip);
      }
  
      this.$refs.childComponentRef.drawLine("box1", "box5", null, "Unencrypted Channel 1");
      this.$refs.childComponentRef.drawLine("box2", "box5", null, "Unencrypted Channel 2");
      this.$refs.childComponentRef.drawLine("box3", "box5", null, "Unencrypted Channel 3");
  
      this.generatedUserName = this.userNameList[Math.floor(Math.random() * 3)]
      //ignore first 2 characters
      this.generatedPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
    },
    data() {
      return {
        step: 1,
        chosenChannel: 1,
        userNameList: ["manoj_prakash@wxycolon", "ranjeet_radhakrishnan@mnosemicolon", "aniket_ramamurthy@bfgperiod", "soorya_venkataraman@qrscomma"],
        disableButton: false,
        userName: "",
        password: "",
        generatedUserName: "",
        generatedPassword: "",
        isPacketSentBack: false,
        ipAddress: [],
        portsClientA: [2, 1, 1, 1],
        portsClientB: [2, 1, 1, 1],
        portsClientC: [2, 1, 1, 1],
        portsHacker: [1, 1, 1, 1],
        portsServer: [2, 2, 2, 1],
        channelHackerData: ["hacker@unencryptedChannel > Logging data from unencrypted channel"],
        receivedPackages: [],
        countDown: 10,
        serverPackages: [
          {
            packageId: 'package01',
            data: [],
            displayPackage: false,
            packageBackgroundColor: '#9efd85',
            animationSeconds: 1
          },
        ],
      }
    },
    methods: {
      correct1(message) {
        var x = document.getElementById("snackbar");
        x.innerHTML = message;
        x.style.backgroundColor = "green";
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 3000)
      },
      incorrect(msg) {
        var x = document.getElementById("snackbar");
        x.innerHTML = msg;
        x.style.backgroundColor = "red";
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
        }, 3000)
      },
      respond(data) {
        if (data.step === 3) {
          this.step = 4;
          this.disableButton = true;
          this.channelHackerData.push("hacker@unencryptedChannel > Sending intercepted package to server");
          this.$refs.childComponentRef.animatePackage("box5", "package01", "box4", () => {
            this.receivedPackages = []
            this.disableButton = false;
            this.isPacketSentBack = true;
          });
        }
        if (data.step === 5) {
          this.channelHackerData.push("hacker@unencryptedChannel > Sending intercepted package back to client");
          this.$refs.childComponentRef.animatePackage("box" + this.chosenChannel, "package01", "box4", () => {
            this.receivedPackages = []
            this.disableButton = false;
          });
        }
      },
      buttonClick() {
        if (this.step === 1) {
          this.disableButton = true;
  
          //open two ports in hacker
          this.portsHacker[0] = 2;
          this.portsHacker[1] = 2;
  
          this.channelHackerData.push("hacker@unencryptedChannel > Opening ports 1 and 2 on hacker");
          this.channelHackerData.push("hacker@unencryptedChannel > Establishing connection to server with ip address " + this.ipAddress[4] + " and client ip address " + this.ipAddress[this.chosenChannel - 1]);
  
          this.$refs.childComponentRef.clearLines();
          this.$refs.childComponentRef.drawLine("box4", "box5", null, "Unencrypted Channel " + this.chosenChannel);
          for (let i = 1; i <= 3; i++) {
            if (this.chosenChannel != i) {
              this.$refs.childComponentRef.drawLine("box" + i, "box5", null, "Unencrypted Channel " + i);
            } else {
              this.$refs.childComponentRef.drawLine("box" + i, "box4", null, "Unencrypted Channel " + i);
            }
          }
          this.step = 2;
          this.disableButton = false;
        } else if (this.step === 2) {
          this.disableButton = true;
  
          this.serverPackages[0].data = ["Requesting access credentials"];
          this.serverPackages[0].displayPackage = true;
          this.$refs.childComponentRef.animatePackage("box4", "package01", "box" + this.chosenChannel, () => {
            this.channelHackerData.push("hacker@unencryptedChannel > Intercepted message from server to client on channel number: " + this.chosenChannel);
            //print package content and ip address
            this.channelHackerData.push("hacker@unencryptedChannel > Message content: " + this.serverPackages[0].data[0] + ", connection: keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[4] + ", user-agent: connection: keep-alive, client-ip: " + this.ipAddress[this.chosenChannel - 1]);
            this.receivedPackages.push({
              packageId: this.serverPackages[0].packageId,
              serverPort: 0,
              backgroundColour: this.serverPackages[0].packageBackgroundColor,
              step: 3
            })
            this.step = 3;
            this.disableButton = false;
            this.countDown = 10;
            let timeoutFunc = () => {
              this.countDown--
              if (this.step === 3 && this.countDown === 0) {
                this.incorrect("Experiment failed, please try again")
                this.reset()
              } else if (this.step === 3 && this.countDown > 0) {
                setTimeout(timeoutFunc, 1000)
              }
            }
            timeoutFunc()
          });
        } else if (this.step === 4) {
          this.disableButton = true;
          this.step = 5;
          this.serverPackages[0].data = ["Access credentials"];
          this.$refs.childComponentRef.animatePackage("box4", "package01", "box5", () => {
            this.receivedPackages = []
            this.channelHackerData.push("hacker@unencryptedChannel > Intercepted message from server to client on channel number: " + this.chosenChannel);
            this.channelHackerData.push("hacker@unencryptedChannel > Message content: " + this.serverPackages[0].data[0] + ", connection: keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[4] + ", user-agent: connection: keep-alive, client-ip: " + this.ipAddress[this.chosenChannel - 1]);
            this.channelHackerData.push("hacker@unencryptedChannel > Response: {success: true, message: 'Auth cred', data: {username: " + this.generatedUserName + ", password: " + this.generatedPassword + "}}");
  
            this.receivedPackages.push({
              packageId: this.serverPackages[0].packageId,
              serverPort: 1,
              backgroundColour: this.serverPackages[0].packageBackgroundColor,
              step: 5
            })
            this.disableButton = false;
          });
        }
      },
      verifyCredentials() {
        if (this.userName === this.generatedUserName && this.password === this.generatedPassword && this.isPacketSentBack) {
          this.correct1("Experiment successful!")
        } else {
          this.incorrect("Experiment failed, please try again.")
        }
      },
      reset() {
        this.step = 1;
        this.chosenChannel = 1;
        this.disableButton = false;
        this.isPacketSentBack = false;
        this.userName = "";
        this.password = "";
        this.channelHackerData = ["hacker@unencryptedChannel > Logging data from unencrypted channel"],
            this.receivedPackages = [];
        this.$refs.childComponentRef.clearLines();
        this.$refs.childComponentRef.drawLine("box1", "box5", null, "Unencrypted Channel 1");
        this.$refs.childComponentRef.drawLine("box2", "box5", null, "Unencrypted Channel 2");
        this.$refs.childComponentRef.drawLine("box3", "box5", null, "Unencrypted Channel 3");
        this.portsClientA = [2, 1, 1, 1]
        this.portsClientB = [2, 1, 1, 1]
        this.portsClientC = [2, 1, 1, 1]
        this.portsHacker = [1, 1, 1, 1]
        this.portsServer = [2, 2, 2, 1];
        this.serverPackages[0].data = [];
        this.serverPackages[0].displayPackage = false;
      }
    },
    components: {ServerComponent, EndSystemComponent, NetworkInteractionComponent, TopBar, StyledButton},
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
  
  #snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
  }
  
  #snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  
  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
  
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
  
  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
  
    to {
      bottom: 30px;
      opacity: 1;
    }
  }
  
  @-webkit-keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
  
    to {
      bottom: 0;
      opacity: 0;
    }
  }
  
  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
  
    to {
      bottom: 0;
      opacity: 0;
    }
  }
  
  
  .rem-space {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    overflow: clip;
  }
  
  .col-1 {
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  
  .col-2 {
    height: 20%;
    display: flex;
    flex-direction: row;
    background-color: bisque
  }
  
  .row-1 {
    flex: 3;
    display: flex;
    background-color: #33FF00;
  }
  
  .row-network {
    flex: 1;
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
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
  
  main{
    -ms-overflow-style: none; 
      scrollbar-width: none; 
      overflow-y: scroll; 
  }
  
  main::-webkit-scrollbar {
    display: none;
  }
  
  
  .terminal {
  width: 90%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: Hack, monospace;
  padding: 10px 15px;
  background-color: #0b0e14;
  color: #95e6cb;
  overflow-y: scroll;
}

.terminal-choices {
  width: 10%;
  flex: 1;
  min-width: 100px;
  background-color: #0b0e14;
  overflow: hidden;
}

.terminal-button {
  width: 100%;
  background-color: #161b24;
  border: none;
  padding: 10px;
  font-family: Hack monospace;
  font-size: 13px;
  color: #666c7c;
  font-weight: bolder;
  text-align: start;
  overflow: hidden;
}

.terminal-button:hover {
  background-color: #343333;
  cursor: pointer;
}

  .active-button {
    border-left: 2px solid #e5b350;
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
  