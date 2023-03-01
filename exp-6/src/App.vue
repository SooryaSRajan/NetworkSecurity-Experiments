<template>
  <main>
    <div class="flex-box">
      <TopBar title="SSL Something"></TopBar>
      <div id="snackbar"/>
      <div class="rem-space">

        <div class="row-1">
          1
        </div>
        <div class="row-2">
          <div class="terminal-col">
            <div class="terminal-wrapper" :style="{display: terminalIndex === 1 ? 'none' : 'block' }">
              <div class="terminal"
                   @click="terminalFocus(0)">
                <span class="terminal-op" v-for="(data, index) in terminalOne" :key="index">{{ data }}</span>
                <div class="terminal-input">
                <span>
                  user@terminal:~$
                </span>
                  <textarea class="terminal-input-field" id="terminal-ip-1" v-model="terminalInputOne"
                            v-on:keydown="onKeyDownTextArea"></textarea>
                </div>
              </div>
            </div>
            <div class="terminal-wrapper" :style="{display: terminalIndex === 0 ? 'none' : 'block' }">
              <div class="terminal"
                   @click="terminalFocus(1)">
                <span class="terminal-op" v-for="(data, index) in terminalTwo" :key="index">{{ data }}</span>
                <div class="terminal-input">
                <span>
                  server@terminal:~$
                </span>
                  <textarea class="terminal-input-field" id="terminal-ip-2" v-model="terminalInputTwo"
                            v-on:keydown="onKeyDownTextArea"></textarea>
                </div>
              </div>
            </div>
            <div class="terminal-choices">
              <button class="terminal-button" :class="{'active-button' : terminalIndex === 0}"
                      @click="terminalIndex = 0">
                Terminal 1
              </button>
              <button class="terminal-button" :class="{'active-button' : terminalIndex === 1}"
                      @click="terminalIndex = 1">
                Terminal 2
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

export default {
  name: 'App',
  mounted() {
    let textAreas = document.getElementsByTagName('textarea');
    console.log(textAreas.length)
    textAreas[0].addEventListener('input', autoResizeOne, false);

    function autoResizeOne() {
      textAreas[0].style.height = 'auto';
      textAreas[0].style.height = this.scrollHeight + 'px';
    }

    textAreas[1].addEventListener('input', autoResizeTwo, false);

    function autoResizeTwo() {
      textAreas[1].style.height = 'auto';
      textAreas[1].style.height = this.scrollHeight + 'px';
    }
  },
  data() {
    return {
      terminalIndex: 0,
      terminalInputOne: '',
      terminalInputTwo: '',
      terminalOne: [],
      terminalTwo: []
    }
  },
  methods: {
    onKeyDownTextArea(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this.terminalIndex === 0) {
          const text = this.terminalInputOne;
          this.terminalInputOne = '';
          let textArea = document.getElementById('terminal-ip-1');
          textArea.style.height = 'auto';
          textArea.style.height = this.scrollHeight + 'px';
          this.terminalOne.push("user@terminal:~$ " + text);
        } else {
          const text = this.terminalInputTwo;
          this.terminalInputTwo = '';
          let textArea = document.getElementById('terminal-ip-2');
          textArea.style.height = 'auto';
          textArea.style.height = this.scrollHeight + 'px';
          this.terminalTwo.push("server@terminal:~$ " + text);
        }
      }
    },
    terminalFocus(index) {
      if (index === 0) {
        document.getElementById('terminal-ip-1').focus();
      } else {
        document.getElementById('terminal-ip-2').focus();
      }
    }
  },
  components: {TopBar},
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
  flex-direction: row;
  justify-content: space-evenly;
  overflow: hidden;
}

.row-1 {
  width: 25%;
  background-color: orange;
}

.row-2 {
  width: 75%;
  display: flex;
  flex-direction: column;
}


* {
  box-sizing: border-box;
}

main {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

main::-webkit-scrollbar {
  display: none;
}


.terminal {
  width: 100%;
  min-height: 100%;
  height: fit-content;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: monospace;
  padding: 10px 15px;
  color: #33FF00;
}

div{
  overflow-y: auto;
}

.terminal-choices {
  width: 10%;
  min-width: 100px;
  background-color: #3c3f41;
}

.terminal-col {
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-direction: row;
  text-overflow: fade;
  background-color: #252526;
  flex: 1;
}

.terminal-wrapper {
  flex: 1;
  max-width: 100%;
  height: 100%;
  text-overflow: fade;
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

.terminal-input {
  display: flex;
  flex-direction: row;
  width: 100%;
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
