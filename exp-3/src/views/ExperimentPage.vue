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
      <div id="snackbar">Some text some message..</div>
      <div class="rem-space">
        <div class="col-1">
          <div class="row-1">
            <NetworkInteractionComponent ref="childComponentRef">
              <EndSystemComponent top="10%" left="5%" class="box" id="box1" :package-info="serverZeroPackages">
                <ServerComponent :ip-address="ipAddress[0]" :port1="ports[0]" :port2="ports[1]" :port3="ports[2]"
                                 :port4="ports[3]"
                                 :port-labels="computerAPortLabels"/>
              </EndSystemComponent>
              <EndSystemComponent top="55%" left="72%" class="box" id="box2">
                <ServerComponent :ip-address="ipAddress[1]" :port1="ports[0]" :port2="ports[1]" :port3="ports[2]"
                                 :port4="ports[3]"
                                 :port-labels="computerBPortLabels"/>
              </EndSystemComponent>
            </NetworkInteractionComponent>
          </div>
          <div class="row-2">
            <DropDownCard title="INSTRUCTIONS">
              <p>
                In this experiment, you will learn how to eavesdrop on a network. You will be able to see the data being
                sent between a server and a client.
              </p>
              <br>
              <p>
                To start, click on the "Start" button. This will result in the server sending a message to the client, visible in the terminal.
                Continue to click on the "Next" button to see the next message, until you have the encrypted username and password.
              </p>
              <br>
              <p> 
                Use the "Verification Methods" tab to decrypt the username and password, and type them in the relevant textboxes in the bottom left.
              </p>
              <br>
              <p>
                To verify your answer, click on the "Verify" button. This will show you the correct answer.
              </p>
              <br>
            </DropDownCard>
            <DropDownCard title="ENCRYPTION METHODS">
              <select v-model="encryptionAlgorithm">
                
                <option value="AES">AES</option>
                <option value="BLOWFISH">BLOWFISH</option>
                <option value="DES">DES</option>
                <option value="IDEA">IDEA</option>
                
                
              </select>
              <input v-model="inputForDecryption" style="margin-top: 20px" placeholder="username / password">
              <input v-model="inputForDecryptionKey" placeholder="decryption key">
              <span style="margin-top: 20px">
                <StyledButton :click-function="decrypt" text="Decrypt"></StyledButton>
              </span>
              <br>
              <p v-if="userDecryptedUserName !== ''">Decrypted username: {{ userDecryptedUserName }}</p>
              <p v-if="userDecryptedPassword !== ''">Decrypted password: {{ userDecryptedPassword }}</p>
            </DropDownCard>
          </div>
        </div>
        <div class="col-2">
          <div class="row-3">
            <div class="row-3-content-space">
              <input v-model="userName" placeholder="Username">
              <input v-model="password" placeholder="Password">
            </div>
            <div class="button-row">
              <StyledButton text="Next" :invisible="step !== 5"
                            :click-function="nextPage"></StyledButton>
              <StyledButton :text="step === 1 ? 'Start' : 'Next'" :invisible="step === 4" :click-function="buttonClick"
                            :disable="disableButton && step !== 4"></StyledButton>
              <StyledButton text="Verify" :click-function="validate" :disable="disableButton"></StyledButton>
              <StyledButton text="Reset" :click-function="reset" :disable="disableButton"></StyledButton>
            </div>
          </div>
          <div class="row-4">
            <div class="terminal" v-if="channelIndex === 0">
              <span v-for="(data, index) in unencryptedChannelData" :key="index">{{ data }}</span>
            </div>
            <div class="terminal" v-if="channelIndex === 1 && channelOneData.length !== 0">
              <span v-for="(data, index) in channelOneData" :key="index">{{ data }}</span>
            </div>
            <div class="terminal" v-else-if="channelIndex === 2 && channelTwoData.length !== 0">
              <span v-for="(data, index) in channelTwoData" :key="index">{{ data }}</span>
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
  </main>
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
    let randomUserData = this.userNameObjectCollection[randomIndex]

    this.userNameEncrypted = randomUserData.encryptedUserName
    this.userNameDecrypted = randomUserData.userName
    this.keyPayloadOne = randomUserData.decryptionKey
    this.encryptionAlgorithmOne = randomUserData.algorithm

    randomIndex = Math.floor(Math.random() * this.passwordObjectCollection.length);
    let randomPasswordData = this.passwordObjectCollection[randomIndex]

    this.passwordEncrypted = randomPasswordData.encryptedPassword
    this.passwordDecrypted = randomPasswordData.password
    this.keyPayloadTwo = randomPasswordData.decryptionKey
    this.encryptionAlgorithmTwo = randomPasswordData.algorithm

    for (let i = 0; i < 4; i++) {
      let randomPortNumber = Math.floor(Math.random() * 10000) + 1000;
      this.computerAPortLabels.push(randomPortNumber);
      randomPortNumber = Math.floor(Math.random() * 10000) + 1000;
      this.computerBPortLabels.push(randomPortNumber);
    }

  },
  data() {
    return {
      step: 1,
      disableButton: false,
      encryptionAlgorithm: "IDEA",
      inputForDecryption: "",
      inputForDecryptionKey: "",
      computerAPortLabels: [],
      computerBPortLabels: [],
      userNameObjectCollection: [
        {
          userName: "soorya_venkataraman@qrscomma",
          encryptedUserName: "n9p4M3tOLGPgY8/t4KdmEVVWQNTpAfxSci1qajbZ9Dc=",
          decryptionKey: "6yjQlrlYZfV1hjGF",
          algorithm: "AES"
        },
        {
          userName: "soorya_venkataraman@qrscomma",
          encryptedUserName: "wAsO69gA6k93qhEv8aP9MBixf/G5yZ75dgnZ/pRD4Hs=",
          decryptionKey: "4XPPa5EFnW8CWBsmg6axWz1bEWY7HtvLyB6Eui4eDldXDmlyUKvoRWwWGlsEblfxP8E9cExDL0DvQUPd4PEDk0Lhy5vCkR1luDzxwILUoS8slHmOIrcyYQGwyzHByLe7",
          algorithm: "DES"
        },
        {
          userName: "soorya_venkataraman@qrscomma",
          encryptedUserName: "+ng3IRtHppDtm2Bft9wVg7nJTKWDlI3AO0zFgrvb9Go=",
          decryptionKey: "IeY5XlC5CsC2fI9rEss5ZOgCoDH23xUC",
          algorithm: "IDEA"
        },
        {
          userName: "soorya_venkataraman@qrscomma",
          encryptedUserName: "eXSgB54D3la1LKceL6DuzG0GAwe2YIsYueLsDKtblGA=",
          decryptionKey: "SQboRKNFGxeKCleZyyr3RfljurIZP0OL",
          algorithm: "Blowfish"
        },
        {
          userName: "aniket_ramamurthy@bfgperiod",
          encryptedUserName: "L3bXfVhbUiejErJSDT9Yh62U7j63NEadTcs+ovSbaac=",
          decryptionKey: "p2Yvtdh5N1H4yxfK",
          algorithm: "AES"
        },
        {
          userName: "aniket_ramamurthy@bfgperiod",
          encryptedUserName: "jkyNKqaEYcuOdAwUmCgghe+VAx+15NBdgdXJsJaYAOg=",
          decryptionKey: "XLGisVKFCp9DWmG9kLR5T1X6vIrZAItEnq9quFs9eyd17YyK0ElmpG1j24XqfWAyrf1DxAZ9rdLoNXjzQxaRAjoZXAziYJ2cdiL9LYP51Nl0GYK0KRjHF1AWU8jmbyWW",
          algorithm: "DES"
        },
        {
          userName: "aniket_ramamurthy@bfgperiod",
          encryptedUserName: "GQ1Pbum46oGhJYv+8WAsiYz855iSmeZ1sbpkdeTo9mg=",
          decryptionKey: "bYiAXThE5Yv3PLWYUx0Y4c8x1oq7WFCE",
          algorithm: "IDEA"
        },
        {
          userName: "aniket_ramamurthy@bfgperiod",
          encryptedUserName: "UozK/5i7fVjmz/gUoFBnoWjSH3oS+MBSZkKFjI7sBHQ=",
          decryptionKey: "qXIofvgiBMsz6PshySyMei9qtKthjPYo",
          algorithm: "Blowfish"
        },
        {
          userName: "ranjeet_radhakrishnan@mnosemicolon",
          encryptedUserName: "aHTjLUbTN+UPpoc1OaC41qwFumvH4PQAxX0nYPG49ib36nywmzoaBKgk56Fkevds",
          decryptionKey: "2BkOUigXhPL3w0pi",
          algorithm: "AES"
        },
        {
          userName: "ranjeet_radhakrishnan@mnosemicolon",
          encryptedUserName: "Y+oaYMWfwzkKv+kv/Hf3DwZ0sSgL+ZnLJYWPTuW7cfH7BO8ZpRapHw==",
          decryptionKey: "r6yMmNDhN7mjo7yqBQuTKriCO0aRWJgrIbJlFjGOlyf0cMM7rPLDdheEK00Lr5PB57QsN5gyvQhkaud8AUgzcrMY1LlDu3b4ziH4Up0lIlXmQ079DuATT7GaKjiHQYy0",
          algorithm: "DES"
        },
        {
          userName: "ranjeet_radhakrishnan@mnosemicolon",
          encryptedUserName: "Sw/gSNneImP4fDljFv9mIYsc8WFKVKZpX9zlLqu1mh4=",
          decryptionKey: "5zlmDJH1vZzVras3NLhgw96xj3gEGjbP",
          algorithm: "IDEA"
        },
        {
          userName: "ranjeet_radhakrishnan@mnosemicolon",
          encryptedUserName: "HY4xyn5SCTHZK25giKLn+CGbQVYADFCrDsloAZYooLArzisPRmdSWA==",
          decryptionKey: "X1mKdRcy8fFintb7qEkj5wiDFBEiM8vK",
          algorithm: "Blowfish"
        },
        {
          userName: "manoj_prakash@wxycolon",
          encryptedUserName: "yLfR+OGGuW9M72b1VDjGG1igzOHDylqtJTg6TdNJ3M4=",
          decryptionKey: "7YjPQuhi9ztsQcZi",
          algorithm: "AES"
        },
        {
          userName: "manoj_prakash@wxycolon",
          encryptedUserName: "OJb1W4+mU1tAUBlFpVIcojPrgbnrw5lY",
          decryptionKey: "zcKiHG4UZSezNZL93aihMKFQ3TJCzJkJYZw9PQ3R3LJLV3pq9nT1VivziINddPzWS71jgSj4AUkReLMvEPgTJkwlR1DmEcH3RjUJuefIbjAmio2rtIiofHxRQjEeyKZD",
          algorithm: "DES"
        },
        {
          userName: "manoj_prakash@wxycolon",
          encryptedUserName: "NA3cO1teOrto0QN6SlEuynaX9iM4o+aD",
          decryptionKey: "l9I9ZQVeoVPnOK3XUdoSw3tkUmE8sYnU",
          algorithm: "IDEA"
        }, {
          userName: "manoj_prakash@wxycolon",
          encryptedUserName: "0zCNE0CUP9MLNVvKppAMDr+ckomB76lv",
          decryptionKey: "YesLgKfRedihNvIFzYKLpI8Lh6Sad490",
          algorithm: "Blowfish"
        },
      ],
      passwordObjectCollection: [
        {
          password: "2/tfdLh}.G#^3bH.",
          encryptedPassword: "opUtI1IO83ukUKNQ79qlUAOQgyciq5A1",
          decryptionKey: "r6yMmNDhN7mjo7yqBQuTKriCO0aRWJgrIbJlFjGOlyf0cMM7rPLDdheEK00Lr5PB57QsN5gyvQhkaud8AUgzcrMY1LlDu3b4ziH4Up0lIlXmQ079DuATT7GaKjiHQYy0",
          algorithm: "DES"
        },
        {
          password: "2/tfdLh}.G#^3bH.",
          encryptedPassword: "6ua6wPnnsR/YG0LRYQfjr+ffacE6nIdc7m8c4xOjO5M=",
          decryptionKey: "2BkOUigXhPL3w0pi",
          algorithm: "AES"
        },
        {
          password: "2/tfdLh}.G#^3bH.",
          encryptedPassword: "S29vD8GECNt8l4C2SWKgO63M6m4J4C0A",
          decryptionKey: "5zlmDJH1vZzVras3NLhgw96xj3gEGjbP",
          algorithm: "IDEA"
        }, {
          password: "2/tfdLh}.G#^3bH.",
          encryptedPassword: "OasLpp8sIOQ4n66wZJCoqNrZQsbip3ec",
          decryptionKey: "X1mKdRcy8fFintb7qEkj5wiDFBEiM8vK",
          algorithm: "Blowfish"
        },
        {
          password: "X479*\"Gf4hTt\"@/K",
          encryptedPassword: "Ijf+b9W4zRV74TDT2Ik0mRMpjNlaUQf72onFt8xpeCI=",
          decryptionKey: "p2Yvtdh5N1H4yxfK",
          algorithm: "AES"
        },
        {
          password: "X479*\"Gf4hTt\"@/K",
          encryptedPassword: "VTQyYw8Gb+cOXpMrp34s1fS4YJlMIsM9",
          decryptionKey: "XLGisVKFCp9DWmG9kLR5T1X6vIrZAItEnq9quFs9eyd17YyK0ElmpG1j24XqfWAyrf1DxAZ9rdLoNXjzQxaRAjoZXAziYJ2cdiL9LYP51Nl0GYK0KRjHF1AWU8jmbyWW",
          algorithm: "DES"
        },
        {
          password: "X479*\"Gf4hTt\"@/K",
          encryptedPassword: "n1FAaYn5vkIf14cAHIsNeeY07QvZxiJ6",
          decryptionKey: "bYiAXThE5Yv3PLWYUx0Y4c8x1oq7WFCE",
          algorithm: "IDEA"
        },
        {
          password: "X479*\"Gf4hTt\"@/K",
          encryptedPassword: "Twa8lIIcg4kCIo8QdkyXK/27Dgwxrjkj",
          decryptionKey: "qXIofvgiBMsz6PshySyMei9qtKthjPYo",
          algorithm: "Blowfish"
        },
        {
          password: ";K]d4U-)Kq/LS#u&",
          encryptedPassword: "MzJkBX7AU+jA74RwF7sc/q9/ojrqgDKg",
          decryptionKey: "4XPPa5EFnW8CWBsmg6axWz1bEWY7HtvLyB6Eui4eDldXDmlyUKvoRWwWGlsEblfxP8E9cExDL0DvQUPd4PEDk0Lhy5vCkR1luDzxwILUoS8slHmOIrcyYQGwyzHByLe7",
          algorithm: "DES"
        },
        {
          password: ";K]d4U-)Kq/LS#u&",
          encryptedPassword: "e+iwNJ/X2KAaYfgPXtJm74cnsA1fBzf1Lgo3ZPcLgAk=",
          decryptionKey: "6yjQlrlYZfV1hjGF",
          algorithm: "AES"
        },
        {
          password: ";K]d4U-)Kq/LS#u&",
          encryptedPassword: "FL+E+4L8fN2QARFNG/zhcqI0EHI/9UHO",
          decryptionKey: "IeY5XlC5CsC2fI9rEss5ZOgCoDH23xUC",
          algorithm: "IDEA"
        },
        {
          password: ";K]d4U-)Kq/LS#u&",
          encryptedPassword: "ZaP0nQpbjp20xN9t3xF083hAfn/P9LJd",
          decryptionKey: "SQboRKNFGxeKCleZyyr3RfljurIZP0OL",
          algorithm: "Blowfish"
        },
        {
          password: "v'db&)_\\F2L~VjbM",
          encryptedPassword: "8bnDaaoUdiGi/t7kB31dZ/TvHRqquVx58HUGLTAlk+k=",
          decryptionKey: "7YjPQuhi9ztsQcZi",
          algorithm: "AES"
        },
        {
          password: "v'db&)_\\F2L~VjbM",
          encryptedPassword: "GcOIrL6AR79w4nD9FaPe1vErN6SLwmn1",
          decryptionKey: "zcKiHG4UZSezNZL93aihMKFQ3TJCzJkJYZw9PQ3R3LJLV3pq9nT1VivziINddPzWS71jgSj4AUkReLMvEPgTJkwlR1DmEcH3RjUJuefIbjAmio2rtIiofHxRQjEeyKZD",
          algorithm: "DES"
        },
        {
          password: "v'db&)_\\F2L~VjbM",
          encryptedPassword: "0t1DP9RQNkWRoQmHGa/pYo8IoDCzZNko",
          decryptionKey: "l9I9ZQVeoVPnOK3XUdoSw3tkUmE8sYnU",
          algorithm: "IDEA"
        },
        {
          password: "v'db&)_\\F2L~VjbM",
          encryptedPassword: "51KwwZ7y1bDGy1B4gnojj9VZgqY6trzx",
          decryptionKey: "YesLgKfRedihNvIFzYKLpI8Lh6Sad490",
          algorithm: "Blowfish"
        },
      ],
      ports: [1, 0, 0, 0],
      userNameEncrypted: "",
      passwordEncrypted: "",
      userNameDecrypted: "",
      passwordDecrypted: "",
      userDecryptedUserName: "",
      userDecryptedPassword: "",
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
    }
  },
  methods: {

    decrypt() {
      let userNameObject = this.userNameObjectCollection.filter((item) => {
        console.log(item)
        return item.algorithm.toLowerCase() === this.encryptionAlgorithm.toLowerCase() && item.encryptedUserName === this.inputForDecryption && item.decryptionKey === this.inputForDecryptionKey
      })

      let passwordObject = this.passwordObjectCollection.filter((item) => {
        console.log(item)
        return item.algorithm.toLowerCase() === this.encryptionAlgorithm.toLowerCase() && item.encryptedPassword === this.inputForDecryption && item.decryptionKey === this.inputForDecryptionKey
      })

      if (userNameObject.length > 0) {
        this.userDecryptedUserName = userNameObject[0].userName
        this.correct1("Username decryption successful")
      } else if (passwordObject.length > 0) {
        this.userDecryptedPassword = passwordObject[0].password
        this.correct1("Password decryption successful")
      } else {
        this.incorrect("Decryption failed")
      }

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
      }, 3000)
    },
    nextPage(){
      this.$router.push({ name: 'simulation-view' });
    },
    validate() {
      //check if decrypted username and password and username and password match
      if (this.userNameDecrypted === this.userName && this.passwordDecrypted === this.password) {
        this.step = 5;
        this.correct1("Experiment complete!")
      }
    },
    reset() {
      this.disableButton = false;
      this.unencryptedChannelData = ["hacker@unencryptedChannel > Logging data from unencrypted channel"]
      this.channelOneData = [];
      this.channelTwoData = [];
      this.userName = "";
      this.password = "";
      this.channelIndex = 0;
      this.step = 1;
      this.serverZeroPackages[0].displayPackage = false;
      this.serverZeroPackages[0].data = [];
      this.ports = [1, 0, 0, 0];
      this.$refs.childComponentRef.clearLines()
      this.$refs.childComponentRef.drawLine("box1", "box2", null, "Unencrypted channel");
    },
    buttonClick() {
      if (this.step === 1) {
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["KEY REQUEST"]
        this.unencryptedChannelData.push("hacker@unencryptedChannel > Sending key request to server 0, connection: keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: " + this.ipAddress[0])
        this.disableButton = true;

        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1", () => {
          this.serverZeroPackages[0].data = ["KEY RESPONSE"]
          this.$refs.childComponentRef.animatePackage("box1", "package01", "box2", () => {
            this.unencryptedChannelData.push("hacker@unencryptedChannel > Received key response from server 0, connection: keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: " + this.ipAddress[0])
            this.unencryptedChannelData.push(`hacker@unencryptedChannel > Payload: [{Key: ${this.keyPayloadOne}, Channel: CHANNEL 1, ENC: ${this.encryptionAlgorithmOne}}, {Key: ${this.keyPayloadTwo}, Channel: CHANNEL 2, ENC: ${this.encryptionAlgorithmTwo}}]`)
            this.$refs.childComponentRef.drawLineOffset("box1", "box2", 55, false, "red", "channel 1", false);
            this.step = 2
            this.disableButton = false;
          });
        });
      } else if (this.step === 2) {
        this.ports[1] = 1;
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["PAYLOAD", "CHANNEL 1"]
        this.channelIndex = 1
        this.channelOneData.push("hacker@channel1 > Logging data from channel 1")
        this.channelOneData.push("hacker@channel1 > Sending encrypted username to server 0, channel: 1, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: " + this.ipAddress[0])
        this.channelOneData.push(`hacker@channel1 > Payload: {userName: ${this.userNameEncrypted}}`)
        this.disableButton = true;

        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1", () => {
          this.serverZeroPackages[0].data = ["RESPONSE", "CHANNEL 1"]
          this.$refs.childComponentRef.animatePackage("box1", "package01", "box2", () => {
            this.channelOneData.push("hacker@channel1 > Received encrypted response from server 0, keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: " + this.ipAddress[0])
            this.step = 3
            this.disableButton = false;
            this.$refs.childComponentRef.drawLineOffset("box1", "box2", 55, false, "blue", "channel 2", true);
          });
        });
      } else if (this.step === 3) {
        this.step = 4

        this.ports[2] = 1;
        this.serverZeroPackages[0].displayPackage = true;
        this.serverZeroPackages[0].data = ["PAYLOAD", "CHANNEL 2"]
        this.channelIndex = 2
        this.channelOneData.push("hacker@channel2 > Logging data from channel 2")
        this.channelTwoData.push("hacker@channel1 > Sending encrypted password to server 0, channel: 2,  accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: " + this.ipAddress[0])
        this.channelTwoData.push(`hacker@channel1 > Payload: {password: ${this.passwordEncrypted}}`)
        this.disableButton = true;

        this.$refs.childComponentRef.animatePackage("box2", "package01", "box1", () => {
          this.serverZeroPackages[0].data = ["RESPONSE", "CHANNEL 2"]
          this.$refs.childComponentRef.animatePackage("box1", "package01", "box2", () => {
            this.disableButton = false;
            this.channelTwoData.push("hacker@channel1 > Received encrypted response from server 0, keep-alive, accept-language: en-US,en;q=0.9, host: " + this.ipAddress[1] + ", origin: " + this.ipAddress[0])
            let randomKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            this.channelTwoData.push("hacker@channel1 > Decrypted response: {success: true, message: 'Login successful', bearerToken: '" + randomKey + "'}")
          });
        });
      }
    }
  },
  components: {
    DropDownCard, ServerComponent, EndSystemComponent, StyledButton, NetworkInteractionComponent, TopBar
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}

main {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
}

main::-webkit-scrollbar {
  display: none;
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
  display: flex;
  flex-direction: row;
}

.col-2 {
  height: 30%;
  display: flex;
  flex-direction: row;
}

.row-1 {
  width: 70%;
  height: 100%;
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
  padding-right: 15px;
  width: 30%;
  display: flex;
  padding-left: 25px;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
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

.row-3-content-space {
  margin-bottom: 10px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.row-4 {
  width: 70%;
  display: flex;
  flex-direction: row;
  text-overflow: fade;
}

.terminal {
  width: 85%;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: monospace;
  padding: 10px 15px;
  background-color: #0b0e14;
  color: #95e6cb;
  overflow-y: scroll;
}

.terminal-choices {
  border-left: 1px solid #666c7c;
  width: 15%;
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

select {
  background-color: transparent;
  border: none;
  padding: 15px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
}

.terminal-button:hover {
  background-color: #343333;
  cursor: pointer;
}

.active-button {
  font-family: monospace;
  font-weight: normal;
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
  