<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <div class="flex-box">
    <div id="snackbar">Some text some message..</div>
    <div class="rem-space">
      <div class="row-1">
        <div class="step-title">
        </div>
        <div class="instructions">
          <p>
            A TCP SYN Flood attack involves flooding the network with connection requests, and making the servers wait
            for confirmation messages.
          </p>
          <br>
          <br>
          <p>
            To begin, choose a free port and send a SYN message. Do not accept the acknowledgement, which will close the
            connection.
          </p>
          <br>
          <p>
            To complete the experiment, overwhelm atleast one server by occupying all its available ports, hence making
            it unavailable for other users.
          </p>
          <br>
          <p>Hover over the port to be able to see the port number. To accept the acknowledgement, click on the appropriate color and port number from the 'Respond' section in the server.</p>
        </div>
        <div class="input-field">
          <h4 style="text-align: left;">
            Enter server hostname:
          </h4>
          <input v-model="inputIpAddress">
          <h4 style="text-align: left;">
            Choose Port:
          </h4>
          <input v-model="inputPort">
        </div>
        <div class="button-row">
          <StyledButton text="Send" :click-function="send" :disabled="disableAllButtons"/>
          <StyledButton text="Verify" :click-function="verify" :disabled="disableAllButtons"/>
          <StyledButton text="Restart" :click-function="restart" :disabled="disableAllButtons"/>
          <StyledButton text="Next" :invisible="!complete" :click-function="nextPage"></StyledButton>
        </div>
      </div>
      <div class="row-2">
        <NetworkInteractionComponent ref="childComponentRef">
          <EndSystemComponent class="box" id="box1" top="10%" left="10%" :package-info="serverZeroPackages">
            <ServerComponent :port1="serverOnePorts[0]"
                             :port2="serverOnePorts[1]"
                             :port3="serverOnePorts[2]"
                             :port4="serverOnePorts[3]"
                             :background-color="serverZeroPackages[0].packageBackgroundColor"
                             :ip-address="ipAddress[0]"
                             :port-labels="portMap[ipAddress[0]]"/>
          </EndSystemComponent>
          <EndSystemComponent class="box" id="box2" top="10%" left="31.5%" :package-info="serverOnePackages">
            <ServerComponent :port1="serverTwoPorts[0]"
                             :port2="serverTwoPorts[1]"
                             :port3="serverTwoPorts[2]"
                             :port4="serverTwoPorts[3]"
                             :background-color="serverOnePackages[0].packageBackgroundColor"
                             :ip-address="ipAddress[1]"
                             :port-labels="portMap[ipAddress[1]]"/>
          </EndSystemComponent>
          <EndSystemComponent class="box" id="box3" top="10%" left="53%" :package-info="serverTwoPackages">
            <ServerComponent :port1="serverThreePorts[0]"
                             :port2="serverThreePorts[1]"
                             :port3="serverThreePorts[2]"
                             :port4="serverThreePorts[3]"
                             :background-color="serverTwoPackages[0].packageBackgroundColor"
                             :ip-address="ipAddress[2]"
                             :port-labels="portMap[ipAddress[2]]"/>
          </EndSystemComponent>
          <EndSystemComponent class="box" id="box4" top="10%" left="75%" :package-info="serverThreePackages">
            <ServerComponent :port1="serverFourPorts[0]"
                             :port2="serverFourPorts[1]"
                             :port3="serverFourPorts[2]"
                             :port4="serverFourPorts[3]"
                             :background-color="serverThreePackages[0].packageBackgroundColor"
                             :ip-address="ipAddress[3]"
                             :port-labels="portMap[ipAddress[3]]"/>
          </EndSystemComponent>
          <EndSystemComponent class="box" id="clientBox" top="70%" left="42%">
            <ServerComponent :display-extra-options="true"
                             @respond="respond"
                             :responseData="receivedPackages"
                             :port1="clientPorts[0]"
                             :port2="clientPorts[1]"
                             :port3="clientPorts[2]"
                             :port4="clientPorts[3]"
                             :ip-address="clientIpAddress"
                             :port-labels="portMap[ipAddress[0]]"/>
          </EndSystemComponent>
        </NetworkInteractionComponent>
      </div>
    </div>
  </div>
</template>

<script>

import TopBar from "@/components/TopBar";
import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";

//TODO: Use EndSystemComponent in the right positions in the app
import EndSystemComponent from "@/components/network-components/EndSystemComponent";
import ServerComponent from "@/components/ServerComponent";
import StyledButton from "@/components/StyledButton";

export default {
  name: 'App',
  components: {ServerComponent, NetworkInteractionComponent, TopBar, EndSystemComponent, StyledButton},
  mounted() {

    //generating IP addresses
    let ip1 = Math.floor(Math.random() * 20) + 10;
    let ip2 = Math.floor(Math.random() * 255) + 1;

    for (let i = 0; i < 4; i++) {
      this.ipAddress.push("172.17." + ip1 + "." + ip2);
      ip2++;
    }

    //generating ports with random closed ports
    let noOfClosedPorts = Math.floor(Math.random() * 3);

    for (let i = 0; i < noOfClosedPorts; i++) {
      let randomPort = Math.floor(Math.random() * 4);
      this.serverOnePorts[randomPort] = 0;
    }

    noOfClosedPorts = Math.floor(Math.random() * 3);
    for (let i = 0; i < noOfClosedPorts; i++) {
      let randomPort = Math.floor(Math.random() * 4);
      this.serverTwoPorts[randomPort] = 0;
    }

    noOfClosedPorts = Math.floor(Math.random() * 3);
    for (let i = 0; i < noOfClosedPorts; i++) {
      let randomPort = Math.floor(Math.random() * 4);
      this.serverThreePorts[randomPort] = 0;
    }

    noOfClosedPorts = Math.floor(Math.random() * 3);
    for (let i = 0; i < noOfClosedPorts; i++) {
      let randomPort = Math.floor(Math.random() * 4);
      this.serverFourPorts[randomPort] = 0;
    }

    //generating client IP address

    ip1 = Math.floor(Math.random() * 20) + 10;
    ip2 = Math.floor(Math.random() * 255) + 1;

    this.clientIpAddress = "10.15." + ip1 + "." + ip2;

    this.$refs.childComponentRef.drawLine("box1", "clientBox")
    this.$refs.childComponentRef.drawLine("box2", "clientBox")
    this.$refs.childComponentRef.drawLine("box3", "clientBox")
    this.$refs.childComponentRef.drawLine("box4", "clientBox")


    for (let i = 0; i < this.ipAddress.length; i++) {
      let ipAddress = this.ipAddress[i];
      let portLabels = []
      for (let i = 0; i < 4; i++) {
        let randomPortNumber = Math.floor(Math.random() * 8000) + 1000;
        portLabels.push(randomPortNumber);
      }
      this.portMap[ipAddress] = portLabels;
    }

    let portLabels = []
    for (let i = 0; i < 4; i++) {
      let randomPortNumber = Math.floor(Math.random() * 8000) + 1000;
      portLabels.push(randomPortNumber);
    }

    this.portMap[this.clientIpAddress] = portLabels;

  },
  data() {
    return {
      complete : false,
      disableAllButtons: false,
      ipAddress: [],
      serverOnePorts: [1, 1, 1, 1],
      serverTwoPorts: [1, 1, 1, 1],
      serverThreePorts: [1, 1, 1, 1],
      serverFourPorts: [1, 1, 1, 1],
      clientPorts: [1, 1, 1, 1],
      portMap: {},
      clientIpAddress: "",
      inputIpAddress: "",
      inputPort: "",
      serverZeroPackages: [
        {
          packageId: 'package01',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#9efd85',
          animationSeconds: 1
        },
        {
          packageId: 'package02',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#9efd85',
          animationSeconds: 1
        },
        {
          packageId: 'package03',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#9efd85',
          animationSeconds: 1
        },
        {
          packageId: 'package04',
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
        {
          packageId: 'package12',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#85fdef',
          animationSeconds: 1
        },
        {
          packageId: 'package13',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#85fdef',
          animationSeconds: 1
        },
        {
          packageId: 'package14',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#85fdef',
          animationSeconds: 1
        },
      ],
      serverTwoPackages: [
        {
          packageId: 'package21',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#8985fd',
          animationSeconds: 1
        },
        {
          packageId: 'package22',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#8985fd',
          animationSeconds: 1
        },
        {
          packageId: 'package23',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#8985fd',
          animationSeconds: 1
        },
        {
          packageId: 'package24',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#8985fd',
          animationSeconds: 1
        },
      ],
      serverThreePackages: [
        {
          packageId: 'package31',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#fd85a5',
          animationSeconds: 1
        },
        {
          packageId: 'package32',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#fd85a5',
          animationSeconds: 1
        },
        {
          packageId: 'package33',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#fd85a5',
          animationSeconds: 1
        },
        {
          packageId: 'package34',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#fd85a5',
          animationSeconds: 1
        },
      ],
      receivedPackages: []
    }
  },
  computed: {},
  methods: {
    restart() {
      this.disableAllButtons = false;
      for (let i = 0; i < this.serverZeroPackages.length; i++) {
        this.serverZeroPackages[i].displayPackage = false;
        this.serverZeroPackages[i].data = [];
      }
      for (let i = 0; i < this.serverOnePackages.length; i++) {
        this.serverOnePackages[i].displayPackage = false;
        this.serverOnePackages[i].data = [];
      }
      for (let i = 0; i < this.serverTwoPackages.length; i++) {
        this.serverTwoPackages[i].displayPackage = false;
        this.serverTwoPackages[i].data = [];

      }
      for (let i = 0; i < this.serverThreePackages.length; i++) {
        this.serverThreePackages[i].displayPackage = false;
        this.serverThreePackages[i].data = [];
      }
      for (let i = 0; i < this.clientPorts.length; i++) {
        this.clientPorts[i] = 1;
      }
      for (let i = 0; i < this.serverOnePorts.length; i++) {
        if (this.serverOnePorts[i] === 2) {
          this.serverOnePorts[i] = 1;
        }
      }
      for (let i = 0; i < this.serverTwoPorts.length; i++) {
        if (this.serverTwoPorts[i] === 2) {
          this.serverTwoPorts[i] = 1;
        }
      }
      for (let i = 0; i < this.serverThreePorts.length; i++) {
        if (this.serverThreePorts[i] === 2) {
          this.serverThreePorts[i] = 1;
        }
      }
      for (let i = 0; i < this.serverFourPorts.length; i++) {
        if (this.serverFourPorts[i] === 2) {
          this.serverFourPorts[i] = 1;
        }
      }
      this.receivedPackages = [];
    },
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
      }, 7000)
    },
    nextPage(){
      this.$router.push({ name: 'simulation-view' });
    },
    send() {
      //inputIpAddress check if address is not null and exists
      let targetBox = "";
      let targetBoxIndex = -1;
      let ipAddress = this.inputIpAddress;
      let port = -1;
      let portLabel = this.inputPort;
      for (let i = 0; i < this.ipAddress.length; i++) {
        if (ipAddress === this.ipAddress[i]) {
          targetBox = "box" + (i + 1);
          targetBoxIndex = i;
          let ports = this.portMap[ipAddress];
          //find the index of port in inputPort and store it in port variable
          for (let j = 0; j < ports.length; j++) {
            if (portLabel == ports[j]) {
              port = j;
              console.log("port", port, "match")
              break;
            }
          }
          break;
        }
      }

      if (targetBoxIndex === -1) {
        this.incorrect("Invalid IP address");
      } else {

        if (port === -1) {
          console.log("port", port)
          this.incorrect("Invalid port");
          return;
        } else {
          //check if inputPort is occupied or not, if value if 1 then it is available, do this for the right server ip address
          if (targetBoxIndex === 0) {
            if (this.serverOnePorts[port] === 1) {
              this.serverOnePorts[port] = 2;
            } else {
              this.incorrect("Port is occupied");
              return;
            }
          } else if (targetBoxIndex === 1) {
            if (this.serverTwoPorts[port] === 1) {
              this.serverTwoPorts[port] = 2;
            } else {
              this.incorrect("Port is occupied");
              return;
            }
          } else if (targetBoxIndex === 2) {
            if (this.serverThreePorts[port] === 1) {
              this.serverThreePorts[port] = 2;
            } else {
              this.incorrect("Port is occupied");
              return;
            }
          } else if (targetBoxIndex === 3) {
            if (this.serverFourPorts[port] === 1) {
              this.serverFourPorts[port] = 2;
            } else {
              this.incorrect("Port is occupied");
              return;
            }
          }
        }

        let clientPortIndex = -1;
        for (let i = 0; i < this.clientPorts.length; i++) {
          if (this.clientPorts[i] === 1) {
            clientPortIndex = i;
            break;
          }
        }
        if (clientPortIndex === -1) {
          this.incorrect("No available ports on client. To continue, free up atleast a port on the client by responding to a server. Click on the corresponding button under the 'Respond to server' option.");
        } else {
          this.clientPorts[clientPortIndex] = 2;
          let packageId = ""
          let backgroundColor = "";
          if (targetBoxIndex === 0) {
            this.serverZeroPackages[port].displayPackage = true;
            backgroundColor = this.serverZeroPackages[port].packageBackgroundColor;
            this.serverZeroPackages[port].data = [];
            this.serverZeroPackages[port].data.push("Port: " + (parseInt(port) + 1));
            this.serverZeroPackages[port].data.push("SYN");
            packageId = this.serverZeroPackages[port].packageId;
          } else if (targetBoxIndex === 1) {
            this.serverOnePackages[port].displayPackage = true;
            backgroundColor = this.serverOnePackages[port].packageBackgroundColor;
            this.serverOnePackages[port].data = []
            this.serverOnePackages[port].data.push("Port: " + (parseInt(port) + 1));
            this.serverOnePackages[port].data.push("SYN");
            packageId = this.serverOnePackages[port].packageId;
          } else if (targetBoxIndex === 2) {
            this.serverTwoPackages[port].displayPackage = true;
            backgroundColor = this.serverTwoPackages[port].packageBackgroundColor;
            this.serverTwoPackages[port].data = []
            this.serverTwoPackages[port].data.push("Port: " + (parseInt(port) + 1));
            this.serverTwoPackages[port].data.push("SYN");
            packageId = this.serverTwoPackages[port].packageId;
          } else if (targetBoxIndex === 3) {
            this.serverThreePackages[port].displayPackage = true;
            backgroundColor = this.serverThreePackages[port].packageBackgroundColor;
            this.serverThreePackages[port].data = []
            this.serverThreePackages[port].data.push("Port: " + (parseInt(port) + 1));
            this.serverThreePackages[port].data.push("SYN");
            packageId = this.serverThreePackages[port].packageId;
          }
          console.log(packageId, targetBox)
          this.disableAllButtons = true
          this.$refs.childComponentRef.animatePackage(targetBox, packageId, "clientBox", () => {
            //replace SYN with ACK
            if (targetBoxIndex === 0) {
              this.serverZeroPackages[port].data[1] = "SYN/ACK";
            } else if (targetBoxIndex === 1) {
              this.serverOnePackages[port].data[1] = "SYN/ACK";
            } else if (targetBoxIndex === 2) {
              this.serverTwoPackages[port].data[1] = "SYN/ACK";
            } else if (targetBoxIndex === 3) {
              this.serverThreePackages[port].data[1] = "SYN/ACK";
            }
            this.$refs.childComponentRef.animatePackage("clientBox", packageId, targetBox, () => {
              this.disableAllButtons = false
              this.receivedPackages.push({
                packageId: packageId,
                serverPort: port,
                serverPortLabel: portLabel,
                serverIndex: targetBoxIndex,
                serverId: targetBox,
                backgroundColour: backgroundColor,
                clientPort: clientPortIndex
              })
              let allReceivedPackageID = this.receivedPackages.map((item) => {
                return item.packageId
              })
              this.$refs.childComponentRef.arrangePackages("clientBox", allReceivedPackageID)
            })
          })
        }
      }
    },
    respond(data) {

      //remove data from receivedPackages
      let index = this.receivedPackages.findIndex((item) => {
        return item.packageId === data.packageId
      })

      if (index !== -1) {
        this.receivedPackages.splice(index, 1)
      }

      //change the port status
      if (data.serverIndex === 0) {
        this.serverZeroPackages[data.serverPort].data[1] = "ACK";
      } else if (data.serverIndex === 1) {
        this.serverOnePackages[data.serverPort].data[1] = "ACK";
      } else if (data.serverIndex === 2) {
        this.serverTwoPackages[data.serverPort].data[1] = "ACK";
      } else if (data.serverIndex === 3) {
        this.serverThreePackages[data.serverPort].data[1] = "ACK";
      }

      this.$refs.childComponentRef.animatePackage(data.serverId, data.packageId, "clientBox", () => {
        this.clientPorts[data.clientPort] = 1;
        if (data.serverIndex === 0) {
          this.serverZeroPackages[data.serverPort].displayPackage = false;
          this.serverOnePorts[data.serverPort] = 1;
        } else if (data.serverIndex === 1) {
          this.serverOnePackages[data.serverPort].displayPackage = false;
          this.serverTwoPorts[data.serverPort] = 1;
        } else if (data.serverIndex === 2) {
          this.serverTwoPackages[data.serverPort].displayPackage = false;
          this.serverThreePorts[data.serverPort] = 1;
        } else if (data.serverIndex === 3) {
          this.serverThreePackages[data.serverPort].displayPackage = false;
          this.serverFourPorts[data.serverPort] = 1;
        }
        this.$refs.childComponentRef.arrangePackages("clientBox", this.receivedPackages.map((item) => {
          return item.packageId
        }))
      })

    },
    verify() {
      //check if there is atleast one server for which all ports are yellow or red
      let allPortsOccupied = true;

      for (let i = 0; i < this.serverOnePorts.length; i++) {
        if (this.serverOnePorts[i] === 1) {
          allPortsOccupied = false;
          break;
        }
      }

      if (!allPortsOccupied) {
        allPortsOccupied = true;
        for (let i = 0; i < this.serverTwoPorts.length; i++) {
          if (this.serverTwoPorts[i] === 1) {
            allPortsOccupied = false;
            break;
          }
        }

        if (!allPortsOccupied) {
          allPortsOccupied = true;
          for (let i = 0; i < this.serverThreePorts.length; i++) {
            if (this.serverThreePorts[i] === 1) {
              allPortsOccupied = false;
              break;
            }
          }

          if (!allPortsOccupied) {
            allPortsOccupied = true;
            for (let i = 0; i < this.serverFourPorts.length; i++) {
              if (this.serverFourPorts[i] === 1) {
                allPortsOccupied = false;
                break;
              }
            }
            if (!allPortsOccupied) {
              this.incorrect("Please establish connection in such a way that three-way handshake is incomplete for at least one server with all ports occupied")
            } else {
              this.experimentCompleted()
            }
          } else {
            this.experimentCompleted()
          }
        } else {
          this.experimentCompleted()
        }
      } else {
        this.experimentCompleted()
      }
    },
    experimentCompleted() {
      //TODO: show experiment completed message
      this.correct1("Experiment completed successfully")
      this.complete = true;
    },
  }
}
</script>

<style>
div::-webkit-scrollbar {
  display: none
}

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

p{
  text-align: left;
}

* {
  box-sizing: border-box;
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
  overflow-y: clip;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.row-1 {
  flex: 2;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  align-items: start;
  padding: 25px 10px 25px 25px;
  font-size: 20px;
}

.input-field {
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input, select {
  width: 100%;
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
  font-size: 20px;
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
  
}

h4 {
  padding: 0;
  margin: 20px 0 0;
  
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
  