<template>
  <div class="flex-box">
    <TopBar title="Understanding Kerberos"></TopBar>
    <div class="rem-space">
      <div class="col-1">
        <div class="row-3">
          <div class="row-3-content-space">
            <div class="content">
              <h3>Steps: </h3>
              <p>
                To begin the authentication process, the client asks for a Ticket
                Granting Ticket from the Authentication Server housed inside the
                Key Distribution Center.
              </p>
              <br>
            </div>
            <div class="content">
              <h3>Draw Line</h3>
              <p>
                After choosing the source and target computers, choose the label of the line and click on Create Line to
                draw the line. Also, choose the options and computers in the right order to complete the experiment.
              </p>
              <!--              select -->
              <select v-model="selectedOption">
                <option value="Line 1">Line 1</option>
                <option value="Line 2">Line 2</option>
                <option value="Line 3">Line 3</option>
              </select>
              <button @click="generateLine">Create Line</button>
              <br>
            </div>
          </div>
          <div class="button-row">
            <StyledButton text="Verify" :click-function="validate" :disable="disableButton"></StyledButton>
            <StyledButton text="Reset" :click-function="reset" :disable="disableButton"></StyledButton>
          </div>
        </div>
        <div class="network-row">
          <NetworkInteractionComponent ref="childComponentRef">
            <EndSystemComponent class="box" id="client" top="65%" left="10%" ref="computer1">
              <div class="computer-wrapper" @click="handleElementClick('client')"
                   style="border-radius: 5px"
                   :style="{border: source === 'client' ? '3px solid red' : destination === 'client' ? '3px solid blue' : 'none'}">
                <img src="./../assets/workstation.svg" width="150" height="150" alt="computer">
              </div>
            </EndSystemComponent>

            <EndSystemComponent class="box" id="server1" top="5%" left="10%">
              <div class="computer-wrapper" @click="handleElementClick('server1')"
                   style="border-radius: 5px"
                   :style="{border: source === 'server1' ? '3px solid red' : destination === 'server1' ? '3px solid blue' : 'none'}">
                <span>Server 1</span>
                <img src="./../assets/server.svg" width="180" alt="computer">
              </div>
            </EndSystemComponent>

            <EndSystemComponent class="box" id="server2" top="5%" left="40%">
              <div class="computer-wrapper" @click="handleElementClick('server2')"
                   style="border-radius: 5px"
                   :style="{border: source === 'server2' ? '3px solid red' : destination === 'server2' ? '3px solid blue' : 'none'}">
                <span>Server 1</span>
                <img src="./../assets/server.svg" width="180" alt="computer">
              </div>
            </EndSystemComponent>

            <EndSystemComponent class="box" id="server3" top="5%" left="70%">
              <div class="computer-wrapper" @click="handleElementClick('server3')"
                   style="border-radius: 5px"
                   :style="{border: source === 'server3' ? '3px solid red' : destination === 'server3' ? '3px solid blue' : 'none'}">
                <span>Server 1</span>
                <img src="./../assets/server.svg" width="180" alt="computer">
              </div>
            </EndSystemComponent>
          </NetworkInteractionComponent>
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
      source: "",
      selectedOption: "Line 1",
      destination: "",
      clickCount: 0,
      lines: {},
      currentLineSize: 1,
    }
  },
  methods: {
    handleElementClick(elementId) {

      if (this.source === elementId || this.destination === elementId) {
        this.source = ""
        this.destination = ""
        this.clickCount = 0
        return
      }

      if (this.clickCount === 0) {
        console.log(elementId, 'source')
        this.source = elementId;
        this.clickCount++;
      } else if (this.clickCount === 1) {
        console.log(elementId, 'destination')
        this.destination = elementId;
        this.clickCount++;
      }
    },
    reset() {
      this.$refs.childComponentRef.clearLines()
      this.source = ""
      this.destination = ""
      this.clickCount = 0
      this.currentLineSize = 1
    },
    flattenLinesObject() {
      let lines = []
      for (let key in this.lines) {
        lines = lines.concat(this.lines[key])
      }
      console.log(lines, "lines")
      return lines
    },
    generateLine() {
      if (this.source && this.destination && this.selectedOption) {

        this.$refs.childComponentRef.clearLines()

        let key = ''
        if (this.lines[this.source + "-" + this.destination]) {
          key = this.source + "-" + this.destination
        } else if (this.lines[this.destination + "-" + this.source]) {
          key = this.destination + "-" + this.source
        } else {
          key = this.source + "-" + this.destination
        }

        console.log(this.currentLineSize, "currentLineSize")

        if (this.lines[key]) {
          //check size of array and if is less than 3
          if (this.lines[key].length < 3) {
            this.lines[key].push({
              color: "black",
              text: this.currentLineSize + " ." + this.selectedOption,
              option: this.selectedOption,
              source: this.source,
              destination: this.destination,
              towards: this.destination,
              index: this.currentLineSize
            })
          }
          else{
            alert("You can't add more than 3 lines between 2 nodes")
          }
        } else {
          this.lines[key] = [{
            color: "black",
            text: this.currentLineSize + " ." + this.selectedOption,
            option: this.selectedOption,
            source: this.source,
            destination: this.destination,
            towards: this.destination,
            index: this.currentLineSize
          }]
        }

        for (let key in this.lines) {
          console.log(key)
          this.$refs.childComponentRef.drawMultipleLinesOffset(this.lines[key][0].source, this.lines[key][0].destination, this.lines[key], 30)
        }

        console.log(this.flattenLinesObject())
        console.log(this.lines, "lines")


        this.source = "";
        this.destination = "";
        this.clickCount = 0;
        this.currentLineSize++;
      }
    }
  },
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
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
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
  justify-content: space-around;
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

div {
  box-sizing: border-box;
}

select {
  margin-top: 15px;
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

button {
  border: none;
  background-color: white;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 20px;
  padding: 15px;
  box-sizing: border-box;
  width: 99%;
  transition: 0.2s;
}

button:hover {
  cursor: pointer;
  background-color: #D7DFFF;
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

.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.computer-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  transition: ease-in-out 0.2s;
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
  