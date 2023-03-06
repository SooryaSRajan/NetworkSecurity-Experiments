<template>
  <div class="flex-box">
    <TopBar title="Understanding Kerberos"></TopBar>
    <div class="rem-space">
      <div class="col-1">
        <div class="row-3">
          <button class="btn" @click="step=1">Step 1</button>
          <button class="btn" @click="step=2">Step 2</button>
          <button class="btn" @click="step=3">Step 3</button>
          <button class="btn" @click="step=4">Step 4</button>
          <button class="btn" @click="step=5">Step 5</button>
          <div class="row-3-content-space">
            <div class="content" v-if="step===1">
              <h3>Step 1</h3>
              <p>
                To begin the authentication process, the client asks for a Ticket
                Granting Ticket from the Authentication Server housed inside the
                Key Distribution Center.
              </p>
              <br>

              <p>
                Choose a Client ID and click on 'Start' to begin the process.
              </p>
              <br>

              <input v-model="clientID" placeholder="Client ID">

            </div>
            <div class="content" v-if="step===2">
              <h3>Step 2</h3>
              <p>
                The Key Distribution Center (KDC) receives the request and verifies the client's credentials by cross
                referencing the client data with the database. It then checks for the availability of the Ticket
                Granting Service (TGS).

              </p>
              <br>
              <p>
                If the Authentication Server finds that the client is valid and that the TGS is available, it generates
                a client/user secret key, which is a hash of the user's password.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===3">
              <h3>Step 3</h3>
              <p>
                The Authentication Server then computes the TGS secret key and creates a Session Key (SK1) encrypted by
                the client secret key.
              </p>
              <br>
              <p>
                The Authentication Server then generates a Ticket Granting Ticket (TGT) containing the client ID, client
                network address, timestamp,
                lifetime and the generated SK1.
              </p>
              <br>
              <p>
                The TGT is then encrypted by the TGS secret key and sent to the client.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===4">
              <h3>Step 4</h3>
              <p>
                The client decrypts the message using the client secret key and extacts SK1 and the TGT.
                This TGT will be used in communication to tell other servers that the client is authenticated.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===5">
              <h3>Step 5</h3>
              <p>
                The client requests a ticket from the server offering the service by sending the extracted TGT and the
                created authenticator to the TGS.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===6">
              <h3>Step 6</h3>
              <p>
                The KDC creates a ticket for the file server. The TGS then uses the TGS secret key to decrypt the TGT
                received from the client and extracts SK1.
              </p>
              <br>
              <p>
                The TGS decrypts the authenticator and checks to see if the clientID and lcient network address match
                the TGT.
              </p>
              <br>
              <p>
                The TGS also uses the extracted timestamp and lifetime to check if the authenticator is still valid.
              </p>
              <br>
              <p>
                On success, the TGS creates a session key (SK2) and encrypts it using SK1. This will be shared with the
                client.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===7">
              <h3>Step 7</h3>
              <p>
                The KDC creates a service ticket with the client ID, client network address, time stamp and SK2, which
                is then encrypted with the server's secret key.
              </p>
              <br>
              <p>
                To continue, enter a secret key for the server and click on 'Next'.
              </p>
              <br>
              <input v-model="serverSecretKey" placeholder="Server Secret Key">
            </div>
            <div class="content" v-if="step===8">
              <h3>Step 7 (Cont)</h3>
              <p>
                A message containing teh service ticket and SK2, encrypted with SK1, is sent to the client.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===9">
              <h3>Step 8</h3>
              <p>
                The client decrypts the message using SK1 and extracts SK2.
              </p>
              <br>
              <p>
                This process generates a new authenticator containing the client network address, client ID and
                timestamp, encrypted with SK2.
              </p>
              <br>
              <p>
                This authenticator is then sent to the server along with the service ticket.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===10">
              <h3>Step 9</h3>
              <p>
                The server receives the communication from the server and uses the server's secret key to decrypt the
                service ticket and extract SK2.
              </p>
              <br>
              <p>
                The server then uses SK2 to decrypt the authenticator, checking that the clientID and client network
                address from the authenticator and service ticket match.
              </p>
              <br>
              <p>
                The server checks the timestamp and lifetime of the authenticator to see if it is still valid.
              </p>
              <br>
            </div>
            <div class="content" v-if="step===11">
              <h3>Step 10</h3>
              <p>
                Once the checks are met, the server sends the client a message verifying the authentication.
              </p>
              <br>
              <p>
                The user can now engage in a secure session.
              </p>
              <br>
            </div>
          </div>
          <div class="button-row">
            <StyledButton :text="step === 1 ? 'Start' : 'Next'" :invisible="step === 4" :click-function="buttonClick"
                          :disable="disableButton && step !== 4"></StyledButton>
            <StyledButton text="Verify" :click-function="validate" :disable="disableButton"></StyledButton>
            <StyledButton text="Reset" :click-function="reset" :disable="disableButton"></StyledButton>
          </div>
        </div>
        <div class="network-row">
          <NetworkInteractionComponent ref="childComponentRef">
            <div>
              <EndSystemComponent class="box" id="computer1" package-id="package1" top="65%" left="10%" ref="computer1">
                <img src="./../assets/workstation.svg" width="150" height="150" alt="computer">
              </EndSystemComponent>
            </div>

            <div>
              <EndSystemComponent class="box" id="computer2" top="5%" left="10%">
                <img src="./../assets/server.svg" width="180" height="180" alt="computer">
              </EndSystemComponent>
            </div>

            <div>
              <EndSystemComponent class="box" id="computer2" top="5%" left="40%">
                <img src="./../assets/server.svg" width="180" height="180" alt="computer">
              </EndSystemComponent>
            </div>

            <div>
              <EndSystemComponent class="box" id="computer2" top="5%" left="70%">
                <img src="./../assets/server.svg" width="180" height="180" alt="computer">
              </EndSystemComponent>
            </div>
          </NetworkInteractionComponent>
        </div>
      </div>
      <div class="col-2">

        <div class="row-4">
          <div class="terminal" v-if="channelIndex === 0">
            <span v-for="(data, index) in channelOneData" :key="index">{{ data }}</span>
          </div>
          <div class="terminal-choices">
            <button class="terminal-button" :class="{'active-button' : channelIndex === 0}" @click="channelIndex = 0">
              Channel 1
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
import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";
import EndSystemComponent from "@/components/network-components/EndSystemComponent";

export default {
  name: 'App',
  mounted() {

  },
  data() {
    return {
      step: 1,
      disableButton: false,
      clientID: "",
      serverSecretKey: "",
      channelIndex: 0,
      channelOneData: ['this is some test data'],
      channelTwoData: [],
      channelThreeData: [],
      channelHackerData: [],

    }
  },
  methods: {},
  components: {EndSystemComponent, NetworkInteractionComponent, TopBar, StyledButton},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.click-wrapper {

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

.network-row {
  height: 100%;
  width: 75%;
  display: flex;
  flex-direction: row;
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
  