<template>
  <main>
    <div class="flex-box">
      <TopBar title="Firewalls"></TopBar>
      <div id="snackbar"></div>
      <div class="rem-space">
        <div class="row-1">
          hey
          <!--Instructions-->
        </div>
        <div class="row-2">
          <div class="col-1">
            <div class="network-row">
              <NetworkInteractionComponent ref="childComponentRef">
                <!--TODO: Add firewall, server, trashbin client-->
                <EndSystemComponent top="10%" left="50%" class="box" id="firewall">
                  firewall
                </EndSystemComponent>
                <EndSystemComponent top="10%" left="5%" class="box" id="server">
                  Server
                </EndSystemComponent>
                <EndSystemComponent top="85%" left="50%" class="box" id="client">
                  client
                </EndSystemComponent>
                <EndSystemComponent top="10%" left="85%" class="box" id="trash">
                  trashbin
                </EndSystemComponent>
              </NetworkInteractionComponent>
            </div>
            <div class="packet-row">
              <h2>
                Packets
              </h2>
              <!--//wrapper -> grey, green or red. Index -> orange or dark grey if disabled, scale 1.1 and poppy border color of current packet -->
              <div class="packet-wrapper" v-for="(data, index) in packets" :key="index"
                   :style="{backgroundColor: getPacketWrapperColor(data.packetStatus), boxShadow: currentPacketIndex === index ? `0px 4px 20px #0077ff` : '', border: currentPacketIndex === index ? `4px solid #0077ff` : ''}">
                <span class="packet-index"
                      :style="{backgroundColor: data.packetStatus === 'COMPLETE' ? '#b0b0b0' : data.packetStatus === 'DISCARD' ? '#ff8484' : '#5bb644'}">{{
                    index
                  }}</span>
                <PackageComponent :data="[data.data]"
                                  :background-color="data.packetStatus === 'COMPLETE' ? '#d7d7d7' : data.backgroundColor"></PackageComponent>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="terminal">
              <span class="terminal-op" v-for="(data, index) in terminal" :key="index">{{ data }}</span>
              <div class="terminal-input">
                  <span>
                    firewall@server:~$
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

export default {
  components: {PackageComponent, EndSystemComponent, NetworkInteractionComponent, TopBar},
  mounted() {

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
    for (let i = 0; i < this.packets.length; i++) {
      setTimeout(() => {
        this.currentPacketIndex = i;
        this.terminal.push("firewall@server:~$ " + this.packets[i].data + " packet " + i + " " + this.packets[i].packetStatus);
        if (i > 0) {
          this.packets[i - 1].packetStatus = "COMPLETE";
        }
        if (i === this.packets.length - 1) {
          this.packets[i].packetStatus = "COMPLETE";
        }
        //TODO: Scroll to the current packet
      }, 1000 * i);
    }
  },
  data() {
    return {
      terminal: ["firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$", "firewall@server:~$"],
      currentPacketIndex: -1,
      terminalInput: "",
      packets: [
        {
          packetStatus: "ALLOW",
          data: "TCP",
          backgroundColor: "#ABFF8E"
        },
        {
          packetStatus: "ALLOW",
          data: "UDP",
          backgroundColor: "#8effb2"
        },
        {
          packetStatus: "ALLOW",
          data: "ICMP",
          backgroundColor: "#8effdd"
        },
        {
          packetStatus: "ALLOW",
          data: "HTTP",
          backgroundColor: "#8eddff"
        },
        {
          packetStatus: "ALLOW",
          data: "HTTPS",
          backgroundColor: "#8ee1ff"
        },
        {
          packetStatus: "ALLOW",
          data: "FTP",
          backgroundColor: "#8ed7ff"
        },
        {
          packetStatus: "ALLOW",
          data: "SSH",
          backgroundColor: "#8ed7ff"
        },
        {
          packetStatus: "ALLOW",
          data: "DNS",
          backgroundColor: "#8ee1ff"
        },
        {
          packetStatus: "ALLOW",
          data: "SMTP",
          backgroundColor: "#8effff"
        },
        {
          packetStatus: "ALLOW",
          data: "POP3",
          backgroundColor: "#c58eff"
        },
        {
          packetStatus: "ALLOW",
          data: "IMAP",
          backgroundColor: "#ccff8e"
        },
        {
          packetStatus: "ALLOW",
          data: "Telnet",
          backgroundColor: "#8effb2"
        },
        {
          packetStatus: "ALLOW",
          data: "DHCP",
          backgroundColor: "#8effb2"
        },
        {
          packetStatus: "ALLOW",
          data: "SNMP",
          backgroundColor: "#d35c6e"
        },
        {
          packetStatus: "ALLOW",
          data: "NTP",
          backgroundColor: "#8f7c3d"
        },
        {
          packetStatus: "ALLOW",
          data: "RDP",
          backgroundColor: "#60a649"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB",
          backgroundColor: "#8efbff"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB2",
          backgroundColor: "#ffbd8e"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB3",
          backgroundColor: "#ff8e8e"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB4",
          backgroundColor: "#ff8e8e"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB5",
          backgroundColor: "#ff8ebd"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB6",
          backgroundColor: "#e38eff"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB7",
          backgroundColor: "#968eff"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB8",
          backgroundColor: "#ccff8e"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB9",
          backgroundColor: "#f4ff8e"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB10",
          backgroundColor: "#8eddff"
        },
        {
          packetStatus: "ALLOW",
          data: "SMB11",
          backgroundColor: "#8effff"
        }
      ]
    }
  },
  methods: {
    onKeyDownTerminal(event) {
      if (event.key === "Enter") {
        const text = this.terminalInput;
        this.terminalInput = '';
        let textArea = document.getElementById('terminal-ip');
        textArea.style.height = 'auto';
        textArea.style.height = this.scrollHeight + 'px';
        this.terminal.push("firewall@server:~$ " + text);
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

.row-1 {
  background-color: #FF6600;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 20px;
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
</style>