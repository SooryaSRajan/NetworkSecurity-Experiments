<template>
  <main>
    <div class="flex-box">
      <TopBar title="Firewalls"></TopBar>
      <div id="snackbar"></div>
      <div class="rem-space">
        <div class="row-1">
          <h4>Understanding Firewalls</h4>
          <p>
            Firewalls are a type of network security system that monitors and controls incoming and outgoing network
            traffic based on predetermined security rules. A firewall typically establishes a barrier between a trusted
            internal network and untrusted external network, such as the Internet. Firewalls are often categorized as
            either network firewalls or host-based firewalls.
          </p>
          <p>
            In this experiment, you will learn how to configure a firewall to block traffic from specific ports from a
            server to a client.
          </p>
          <br>
          <div v-if="step === 1" class="content">
            <h4>Step 1: Entering configuration mode</h4>
            <p>
              Enter the configuration mode of the firewall by typing the following command:
            </p>
            <br>
            <div class="code">
              <code @click="copyToClipboard('configure terminal')">configure terminal
              </code>
            </div>
          </div>
          <div v-if="step === 2" class="content">
            <h4>Step 2: Viewing server network information</h4>
            <p>
              Get the interface information of the server which is in interface <span @click="copyToClipboard('GigabitEthernet0/0')" id="gigabit">"GigabitEthernet0/0"</span>. Try to find the IP
              address of the server using the following command:
            </p>
            <br>
            <div class="code">
              <code @click="copyToClipboard('show interface INTERFACE_NAME')">show interface INTERFACE_NAME
              </code>
            </div>
          </div>
          <div v-if="step === 3" class="content">
            <h4>Step 3: View Access List</h4>
            <p>
              Access lists are a set of rules that are used to filter traffic. They are used to control the traffic that
              is allowed to pass through a router or a firewall. Access lists are used to filter traffic based on the
              source and destination IP addresses, source and destination ports, and protocol type. In this experiment,
              you will be using access lists to block traffic from specific ports from a server to a client.
            </p>
            <br>
            <p>
              Get the access list information of the firewall using the following command:
            </p>
            <div class="code">
              <code @click="copyToClipboard('show access-lists')">show access-lists
              </code>
            </div>
          </div>
          <div v-if="step === 4" class="content">
            <h4>Step 4: Modifying the Access List</h4>
            <p>
              Access lists are a set of rules that are used to filter traffic. Modify the access list to block and allow
              traffic from specific ports from a server to a client. Towards the right side of this experiment you will
              see a list of packets labelled in Red and Green. The Red packets are the packets that are blocked by the
              firewall and the Green packets are the packets that are allowed by the firewall. Use the ports mentioned
              in packet list to modify the access list accordingly.
            </p>
            <br>
            <p>
              Use the following command to block traffic of tcp packets from a specific port to the server:
            </p>
            <div class="code">
              <code
                  @click="copyToClipboard('access-list block-packet deny tcp any host SERVER_IP_ADDRESS eq PORT_NUMBER')">access-list
                block-packet deny tcp any host SERVER_IP_ADDRESS eq PORT_NUMBER
              </code>
            </div>
            <br>
            <p>
              Use the following command to allow traffic of tcp packets from a specific port to the server:
            </p>
            <div class="code">
              <code
                  @click="copyToClipboard('access-list allow-packet allow tcp any host SERVER_IP_ADDRESS eq PORT_NUMBER')">access-list
                allow-packet allow tcp any host SERVER_IP_ADDRESS eq PORT_NUMBER
              </code>
            </div>
            <p>
              Note that we are only dealing with tcp packets in this experiment. Hence, tcp is always used in the above
              commands. In the commands, allow-packet and block-packet are the names of the access lists that you want
              to modify, these
              are existing access lists, creation of new access-list is restricted for this experiment. The
              SERVER_IP_ADDRESS is the IP address of the server and the PORT_NUMBER is
              the port number from which you want to block traffic, refer to the packet list to find the port numbers
              and the output of the second step to find the IP address of the server.
            </p>
            <StyledButton text="Verify Rules" :disable="disableButton" @click="verify"></StyledButton>
          </div>
        </div>
        <div class="row-2">
          <div class="col-1">
            <div class="network-row">
              <NetworkInteractionComponent ref="childComponentRef">
                <EndSystemComponent top="10%" left="5%" class="box" id="server">
                  <ServerComponent ip-address="Server"
                                   :port1="2"
                                   :port2="2"
                                   :port3="2"
                                   :port4="2"/>
                </EndSystemComponent>
                <EndSystemComponent top="40%" left="45%" class="box" id="firewall">
                  <img src="../assets/firewall.jpg" alt="firewall" style="width:150px;height:auto;">
                </EndSystemComponent>
                <EndSystemComponent top="60%" left="5%" class="box" id="client" :package-info="packetAnimationList">
                  <img src="../assets/desktop.png" alt="desktop" style="width:150px;height:auto;">
                </EndSystemComponent>
                <EndSystemComponent top="39%" left="80%" class="box" id="trash">
                  <img src="../assets/trash.png" alt="trash" style="width:100px;height:auto;">
                </EndSystemComponent>
              </NetworkInteractionComponent>
            </div>
            <div class="packet-row">
              <h2>
                Packets
              </h2>
              <div class="packet-wrapper" v-for="(data, index) in packets" :key="index"
                   :style="{backgroundColor: getPacketWrapperColor(data.packetStatus), boxShadow: currentPacketIndex === index ? `0px 4px 20px #0077ff` : '', border: currentPacketIndex === index ? `4px solid #0077ff` : ''}">
                <span class="packet-index"
                      :style="{backgroundColor: data.packetStatus === 'COMPLETE' ? '#b0b0b0' : data.packetStatus === 'DISCARD' ? '#ff8484' : '#5bb644'}">{{
                    index
                  }}</span>
                <PackageComponent :data="[data.data, 'Port: ' + data.port]"
                                  :background-color="data.packetStatus === 'COMPLETE' ? '#d7d7d7' : data.backgroundColor"></PackageComponent>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="terminal" @click="terminalFocus">
              <span class="terminal-op" v-for="(data, index) in terminal" :key="index">{{ data }}</span>
              <div class="terminal-input">
                  <span>
                    {{ terminalStarterText }}
                  </span>
                <textarea class="terminal-input-field" id="terminal-ip" v-model="terminalInput"
                          v-on:keydown="onKeyDownTerminal"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>
<script>
import TopBar from "@/components/TopBar";
import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";
import EndSystemComponent from "@/components/network-components/EndSystemComponent";
import PackageComponent from "@/components/network-components/PackageComponent";
import ServerComponent from "@/components/ServerComponent";
import StyledButton from "@/components/StyledButton";

export default {
  components: {
    StyledButton,
    ServerComponent,
    PackageComponent,
    EndSystemComponent,
    NetworkInteractionComponent,
    TopBar
  },
  mounted() {

    this.serverIpAddress = Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);

    let textAreas = document.getElementsByTagName('textarea');
    textAreas[0].addEventListener('input', autoResize, false);

    function autoResize() {
      textAreas[0].style.height = 'auto';
      textAreas[0].style.height = this.scrollHeight + 'px';
    }

    this.$refs.childComponentRef.drawLine("firewall", "server", "", "allowed packet");
    this.$refs.childComponentRef.drawLine("trash", "firewall", "", "discarded packet");
    this.$refs.childComponentRef.drawLine("client", "firewall", "", "incoming packet");
    this.packets.forEach((packet) => {
      if (Math.random() > 0.5) {
        packet.packetStatus = "DISCARD";
      }
    });
    //create a copy of the packets array to packetsCopy
    this.packetsCopy = JSON.parse(JSON.stringify(this.packets));
  },
  data() {
    return {
      step: 1,
      disableButton: false,
      serverIpAddress: '',
      packetConfig: {
        80: {packet: "HTTP", accessGroup: "allow-packet"},
        443: {packet: "HTTPS ", accessGroup: "allow-packet"},
        21: {packet: "FTP (control) ", accessGroup: "allow-packet"},
        20: {packet: "FTP (data) ", accessGroup: "allow-packet"},
        22: {packet: "SSH ", accessGroup: "allow-packet"},
        23: {packet: "Telnet ", accessGroup: "allow-packet"},
        25: {packet: "SMTP ", accessGroup: "allow-packet"},
        53: {packet: "DNS ", accessGroup: "allow-packet"},
      },
      terminalStarterText: "ciscoasa> ",
      terminal: [],
      currentPacketIndex: -1,
      terminalInput: '',
      packets: [
        {
          packetStatus: "ALLOW",
          data: "HTTP",
          port: 80,
          backgroundColor: "#ABFF8E"
        },
        {
          packetStatus: "ALLOW",
          data: "HTTPS",
          port: 443,
          backgroundColor: "#8EF3FF"
        },
        {
          packetStatus: "ALLOW",
          data: "FTP (control)",
          port: 21,
          backgroundColor: "#ff8e8e"
        },
        {
          packetStatus: "ALLOW",
          data: "FTP (data)",
          port: 20,
          backgroundColor: "#8eeaff"
        },
        {
          packetStatus: "ALLOW",
          data: "SSH",
          port: 22,
          backgroundColor: "#FFE68E"
        },
        {
          packetStatus: "ALLOW",
          data: "Telnet",
          port: 23,
          backgroundColor: "#ff8ef6"
        },
        {
          packetStatus: "ALLOW",
          data: "SMTP",
          port: 25,
          backgroundColor: "#FFAB8E"
        },
        {
          packetStatus: "ALLOW",
          data: "DNS",
          port: 53,
          backgroundColor: "#FFAB8E"
        },
      ],
      packetsCopy: [],
      packetAnimationList: [{
        packageId: 'package01',
        data: [],
        displayPackage: false,
        packageBackgroundColor: '#9efd85',
        animationSeconds: 1
      }]
    }
  },
  methods: {
    verify() {
      this.verifyRecursive(0);
    },
    resetPacketIndex() {
      this.packets = JSON.parse(JSON.stringify(this.packetsCopy));
    },
    verifyRecursive(i) {
      this.currentPacketIndex = i;
      this.packetAnimationList[0].displayPackage = true

      let packetVerified = this.packets[i]
      let packetConfig = this.packetConfig[packetVerified.port]

      this.packetAnimationList[0].data = [packetVerified.data, packetVerified.port]
      this.packetAnimationList[0].packageBackgroundColor = packetVerified.backgroundColor

      if (i > 0) {
        this.packets[i - 1].packetStatus = "COMPLETE";
      }
      this.disableButton = true
      this.$refs.childComponentRef.animatePackage("firewall", "package01", "client", () => {
        if (packetConfig.accessGroup !== "allow-packet") {
          this.$refs.childComponentRef.animatePackage("trash", "package01", "firewall", () => {
            this.disableButton = false
            this.packetAnimationList[0].displayPackage = false
            if (packetVerified.packetStatus === "DISCARD") {
              if (i < this.packets.length - 1) {
                this.verifyRecursive(i + 1);
              }
              if (i === this.packets.length - 1) {
                this.packets[i].packetStatus = "COMPLETE";
                if (this.packets.every(packet => packet.packetStatus === "COMPLETE")) {
                  this.correct1("All packets have been verified")
                }
              }
            } else {
              this.incorrect("Incorrect packet configuration, please try again")
              this.resetPacketIndex()
            }
          });
        } else {
          this.$refs.childComponentRef.animatePackage("server", "package01", "firewall", () => {
            this.disableButton = false
            this.packetAnimationList[0].displayPackage = false
            if (packetVerified.packetStatus === "ALLOW") {
              if (i < this.packets.length - 1) {
                this.verifyRecursive(i + 1);
              }
              if (i === this.packets.length - 1) {
                this.packets[i].packetStatus = "COMPLETE";
                if (this.packets.every(packet => packet.packetStatus === "COMPLETE")) {
                  this.correct1("All packets have been verified")
                }
              }
            } else {
              this.incorrect("Incorrect packet configuration, please try again")
              this.resetPacketIndex()
            }
          });
        }
      });

    },
    correct1(message) {
      const x = document.getElementById("snackbar");
      x.innerHTML = message;
      x.style.backgroundColor = "green";
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000)
    },
    incorrect(msg) {
      const x = document.getElementById("snackbar");
      x.innerHTML = msg;
      x.style.backgroundColor = "red";
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
      }, 3000)
    },
    terminalFocus() {
      let textArea = document.getElementById('terminal-ip');
      textArea.scrollTop = textArea.scrollHeight;
      textArea.focus(); //set the focus - cursor at end
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
      this.correct1("Copied code to clipboard");
    },
    onKeyDownTerminal(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const text = this.terminalInput;
        this.terminalInput = '';
        let textArea = document.getElementById('terminal-ip');
        textArea.style.height = 'auto';
        textArea.style.height = this.scrollHeight + 'px';
        this.terminal.push(this.terminalStarterText + text);

        if (text === "configure terminal" && this.terminalStarterText === "ciscoasa> ") {
          this.terminalStarterText = "ciscoasa(config)# ";
          if (this.step === 1) {
            this.step = 2;
          }
        } else if (text === "configure terminal" && this.terminalStarterText !== "ciscoasa> ") {
          this.terminal.push(this.terminalStarterText + "Invalid input detected.");
        } else if (text === "exit" && this.terminalStarterText === "ciscoasa(config)# ") {
          this.terminalStarterText = "ciscoasa> ";
          this.terminal.push(this.terminalStarterText);
        } else if (this.terminalStarterText === "ciscoasa(config)# ") {

          let matchForCommand = text.match(/access-list (\w+-?\w*) (allow|deny) (tcp|udp) (any|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) host (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) eq (\d+)/)

          if (text.match(/show interface\s.+/g)) {
            const interfaceName = text.split(" ")[2];
            if (interfaceName === "GigabitEthernet0/0") {
              this.terminal.push("GigabitEthernet0/0 is up, line protocol is up (connected)");
              this.terminal.push("  Hardware is Gigabit Ethernet, address is 001c.73a5.6c00 (bia 001c.73a5.6c00)");
              this.terminal.push("  Internet address is " + this.serverIpAddress + "/24");
              this.terminal.push("  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 100 usec,");
              this.terminal.push("     reliability 255/255, txload 1/255, rxload 1/255");
              this.terminal.push("  Encapsulation ARPA, loopback not set");
              this.terminal.push("  Keepalive set (10 sec)");
              this.terminal.push("  Full Duplex, 1000Mb/s, media type is RJ45");
              this.terminal.push("  output flow-control is unsupported, input flow-control is unsupported");
              this.terminal.push("  ARP type: ARPA, ARP Timeout 04:00:00");
              this.terminal.push("  Last input 00:00:00, output 00:00:00, output hang never");
              this.terminal.push("  Last clearing of \"show interface\" counters never");
              this.terminal.push("  Input queue: 0/75/0/0 (size/max/drops/flushes); Total output drops: 0");
              this.terminal.push("  Queueing strategy: fifo");
              this.terminal.push("  Output queue: 0/40 (size/max)");
              this.terminal.push("  5 minute input rate 0 bits/sec, 0 packets/sec");
              this.terminal.push(" 5 minute output rate 0 bits/sec, 0 packets/sec");

              if (this.step === 2) {
                this.step = 3;
              }

            } else {
              this.terminal.push(interfaceName + " is down, line protocol is down (notconnect)");
            }
          } else if (text === "show access-lists") {
            Object.entries(this.packetConfig).forEach(([key, value]) => {
              if (value.accessGroup === 'allow-packet') {
                this.terminal.push(`Standard IP access list allow-${value.packet}`)
                this.terminal.push("10 permit allow-packet any host " + this.serverIpAddress + " eq " + key);
              } else if (value.accessGroup === 'block-packet') {
                this.terminal.push(`Standard IP access list block-${value.packet}`)
                this.terminal.push("10 deny block-packet any host " + this.serverIpAddress + " eq " + key);
              }
            })

            if (this.step === 3) {
              this.step = 4;
            }
          } else if (matchForCommand) {
            const [regex, accessListName, type, protocol, source, destination, port] = matchForCommand
            console.log(regex)
            console.log('Access List Name:', accessListName);
            console.log('Type:', type);
            console.log('Protocol:', protocol);
            console.log('Source:', source);
            console.log('Destination:', destination);
            console.log('Port:', port);
            console.log('Packet Config:', this.packetConfig);

            if (this.serverIpAddress !== destination) {
              this.terminal.push("Destination IP address not found.");
              return;
            }
            if (source !== 'any') {
              this.terminal.push("Please allow allow incoming traffic for all IP addresses.");
              return;
            }
            if (protocol !== 'tcp') {
              this.terminal.push("Only TCP protocol is allowed.");
              return;
            }

            if (this.packetConfig[port]) {
              if (accessListName === 'allow-packet' && type === 'allow') {
                this.packetConfig[port].accessGroup = 'allow-packet';
              } else if (accessListName === 'block-packet' && type === 'deny') {
                this.packetConfig[port].accessGroup = 'block-packet';
              } else {
                this.terminal.push("Access group " + accessListName + " not found for " + type + " does not exist.");
              }
            }
          } else {
            this.terminal.push(this.terminalStarterText + "Invalid input detected.");
          }
        }
        else{
          this.terminal.push(this.terminalStarterText + "Invalid input detected.");
        }
      }
    },
    getPacketWrapperColor(packetStatus) {
      switch (packetStatus) {
        case "ALLOW":
          return "#11ff00";
        case "DISCARD":
          return "#ff0027";
        case "COMPLETE":
          return "#eaeaea";
        default:
          return "none";
      }
    },
  }
}

</script>

<style>
.flex-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

p {
  text-align: justify;
}

main {
  height: 100vh;
  width: 100vw;
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
  flex-direction: row;
  justify-content: space-evenly;
  overflow: clip;
}

div {
  box-sizing: border-box;
}

#gigabit{
  padding: 0;
  margin: 0;
  display: inline-block;
}
#gigabit:hover {
  cursor: copy;
}

.row-1 {
  background-color: orange;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 20px;
  overflow: scroll;
}

.row-2 {
  width: 75%;
  display: flex;
  flex-direction: column;
}

.col-1 {
  height: 70%;
  display: flex;
  flex-direction: row;
}

.col-2 {
  width: 100%;
  height: 30%;
  background-color: #252526;
  overflow-y: auto;
}

.network-row {
  width: 100%;
  height: 100%;
}

.packet-row {
  width: 20%;
  height: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-y: scroll;
}

.terminal {
  width: 80%;
  min-height: 100%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: Hack monospace;
  padding: 10px 15px;
  background-color: #252526;
  color: #33FF00;
  overflow-y: scroll;
}

.packet-wrapper {
  background-color: #252526;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  border-radius: 7px;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.packet-index {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}

.terminal-input-field {
  background-color: #252526;
  color: #33FF00;
  border: none;
  outline: none;
  font-family: Hack monospace;
  font-size: 16px;
  flex: 1;
  padding: 0 0 0 10px;
  resize: none;
}

.terminal-op {
  padding-bottom: 3px;
  max-width: inherit;
}

.terminal-input {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.code {
  text-align: center;
  margin-top: 20px;
  height: fit-content;
  width: 100%;
  padding: 25px;
  border-radius: 5px;
  background-color: #202020;
  color: white;
  font-size: large;
  font-family: Hack monospace;
  font-weight: bold;
}

code:hover {
  cursor: copy;
}

span {
  display: block;
  padding: 0;
  margin: 0;
  text-align: start;
  overflow-wrap: break-word;
}

</style>