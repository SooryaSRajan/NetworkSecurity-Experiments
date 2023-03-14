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
      <div id="snackbar"/>
      <div class="rem-space">
        <div class="row-1">
          <div class="content">
            <h4>Understanding SSL</h4>
            <p>
              SSL, or Secure Sockets Layer, is an encryption-based Internet
              security protocol. It was first developed by Netscape in 1995
              for the purpose of ensuring privacy, authentication, and data
              integrity in Internet communications. SSL is the predecessor
              to the modern TLS encryption used today.
            </p>
            <br>
            <p>
              A website that implements SSL/TLS has "HTTPS" in its URL
              instead of "HTTP."
            </p>

            <br>
            <h4>IP Address: <span class="server-config" @click="copyToClipBoardIP">{{ serverIdAddress }}</span></h4>
            <h4>Port: <span class="server-config" @click="copyToClipBoardPort">{{ serverIdPort }}</span></h4>

          </div>
          <div v-if="step === 1" class="content">
            <h4>Step 1: Starting a session</h4>
            <p>
              Begin a session by typing the following command on
              terminal 1 with the server's IP address and port.
            </p>
            <br>
            <div class="code">
              <code @click="copyToClipboard('openssl s_client -connect host:port')">openssl s_client -connect
                host:port</code>
            </div>
          </div>

          <div v-if="step === 2" class="content">
            <h4>Step 2: Key transfer</h4>
            <p>
              On a successful connection, the server will send
              a copy of its assymmetric public key to the client.
              Try catting the file to see what it looks like.
            </p>
            <br>
            <div class="code">
              <code @click="copyToClipboard('cat server_pubkey.pem')">cat server_pubkey.pem</code>
            </div>
          </div>

          <div v-if="step === 3" class="content">
            <h4>Step 3: Key generation</h4>
            <p>
              The client then creates a static session
              key by executing the following command.
            </p>

            <div class="code">
              <code @click="copyToClipboard('openssl rand -hex 16 > sessionkey.txt')">openssl rand -hex 16 >
                sessionkey.txt</code>
            </div>
            <br>
          </div>

          <div v-if="step === 4" class="content">
            <h4>Step 4: Key encryption</h4>
            <p>
              The client then encrypts the session key using the
              server's public key.
            </p>

            <div class="code">
              <code
                  @click="copyToClipboard('openssl rsautl -encrypt -in sessionkey.txt -out sessionkey.enc -pubin -inkey server_pubkey.pem')">openssl
                rsautl -encrypt -in sessionkey.txt -out sessionkey.enc -pubin -inkey
                server_pubkey.pem</code>
            </div>
            <br>
          </div>

          <div v-if="step === 5" class="content">
            <h4>Step 5: Key transfer</h4>
            <p>
              The client then sends the encrypted session key to the server.
            </p>

            <div class="code">
              <code @click="copyToClipboard('cat sessionkey.enc | nc host port')">cat sessionkey.enc | nc host
                port</code>
            </div>
            <br>
          </div>

          <div v-if="step === 6" class="content">
            <h4>Step 6: Key decryption</h4>
            <p>
              The server then decrypts the session key using its private key.
            </p>

            <div class="code">
              <code
                  @click="copyToClipboard('openssl rsautl -decrypt -in sessionkey.enc -out sessionkey.txt -inkey server_privkey.pem')">openssl
                rsautl -decrypt -in sessionkey.enc -out sessionkey.txt -inkey server_privkey.pem</code>
            </div>
            <br>
          </div>

          <div v-if="step === 7" class="content">
            <h4>Step 7: Verify Key decryption</h4>
            <p>
              The server has decrypted the session key using its private key. Try catting the file to see what it looks
              like, it should be the same as the session key generated in step 3.
            </p>

            <div class="code">
              <code
                  @click="copyToClipboard('cat sessionkey.txt')">cat sessionkey.txt</code>
            </div>
            <br>
          </div>

          <div v-if="step === 8" class="content">
            <h4>Step 8: Identify the host IP</h4>
            <p>
              To identify the host IP, the client will send a
              ping request to the server by executing the
              following command:
            </p>

            <div class="code">
              <code @click="copyToClipboard('ping -c 3 IP_ADDRESS')">ping -c 3 IP_ADDRESS</code>
            </div>
            <br>
          </div>

          <div v-if="step === 9" class="content">
            <h4>Step 9: Display certificate information</h4>
            <p>
              To display the certificate info of the server,
              the client will execute the following command:
            </p>

            <div class="code">
              <code @click="copyToClipboard('openssl x509 -in server.crt -text -noout')">openssl x509 -in server.crt
                -text -noout</code>
            </div>
            <br>
          </div>

          //command to quit the session
          <div v-if="step === 10" class="content">
            <h4>Step 10: Quit the session</h4>
            <p>
              To quit the session, the client will execute the following command:
            </p>

            <div class="code">
              <code @click="copyToClipboard('quit')">quit</code>
            </div>
            <br>
          </div>


        </div>
        <div class="row-2">
          <div class="terminal-col">
            <div class="terminal-wrapper" :style="{display: terminalIndex === 1 ? 'none' : 'block' }">
              <div class="terminal"
                   @click="terminalFocus(0)">
                <span class="terminal-op" v-for="(data, index) in terminalOne" :key="index">{{ data }}</span>
                <div class="terminal-input" v-if="!quitTerminal">
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
                <div class="terminal-input" v-if="!quitTerminal">
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
                Client Terminal
              </button>
              <button class="terminal-button" :class="{'active-button' : terminalIndex === 1}"
                      @click="terminalIndex = 1">
                Server Terminal
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

    let ip = Math.floor(Math.random() * 255) + 1;
    let ip2 = Math.floor(Math.random() * 255) + 1;
    let ip3 = Math.floor(Math.random() * 255) + 1;
    let ip4 = Math.floor(Math.random() * 255) + 1;

    this.serverIdAddress = ip + "." + ip2 + "." + ip3 + "." + ip4;

    this.serverIdPort = Math.floor(Math.random() * 65535) + 1;

  },
  data() {
    return {
      quitTerminal: false,
      terminalIndex: 0,
      terminalInputOne: '',
      terminalInputTwo: '',
      terminalOne: [],
      terminalTwo: [],
      decryptedText: '',
      clientCertificate: '',
      decryptedServerFileName: '',
      validCommands: [
        "ls",
        "openssl",
        "openssl s_client",
        "openssl rsautl",
        "openssl genrsa",
        "openssl req",
        "ping",
        "openssl x509",
        "cat",
        "quit",
        "exit",
        "cd",
        "mkdir",
        "pwd",
        "touch",
        "rm",
        "rmdir",
      ],
      availableClientFiles: {
        "file1.txt": "This is file 1",
        "file2.txt": "This is file 2",
      },
      availableServerFiles: {},
      serverIdAddress: '',
      serverIdPort: '',
      step: 1
    }
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
      this.correct1("Copied code to clipboard");
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
    generateCertificateRandom() {
      let cert = "-----BEGIN CERTIFICATE-----";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+=-";
      cert += "\n";

      for (let x = 0; x < 12; x++) {
        cert += "\n";
        for (let i = 0; i < 64; i++) {
          cert += possible.charAt(Math.floor(Math.random() * possible.length));
        }

      }
      cert += "\n";
      cert += "\n-----END CERTIFICATE-----";
      return cert;
    },
    generateRSARandom(isPrivate) {
      let cert = isPrivate ? "-----BEGIN RSA PRIVATE KEY-----" : "-----BEGIN RSA PUBLIC KEY-----";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+=-";
      cert += "\n";

      for (let x = 0; x < 12; x++) {
        cert += "\n";
        for (let i = 0; i < 64; i++) {
          cert += possible.charAt(Math.floor(Math.random() * possible.length));
        }

      }
      cert += "\n";
      cert += "\n-----END CERTIFICATE-----";
      return cert;
    },
    generatePingOutput(terminal, host, count) {
      terminal.push("PING " + host + " ( " + host + " ) 56(84) bytes of data.");
      for (let i = 0; i < count; i++) {
        let time = Math.floor(Math.random() * 1000) + 1;
        terminal.push("64 bytes from " + host + ": icmp_seq=" + i + " ttl=64 time=" + time + " ms");
      }
    },
    handleCommands(text, terminal, files) {
      if (this.validCommands.some(v => text.indexOf(v) === 0)) {
        if (text === "ls" || text === "ls -l") {
          for (let key in files) {
            terminal.push(key);
          }
        } else if (text.match(/ping\s.+/)) {
          //get host from text
          if (!text.includes("-")) {
            let host = text.split(" ")[1];
            if (host === this.serverIdAddress || host === "localhost" || host === "1.1.1.1" || host === "8.8.8.8") {
              this.generatePingOutput(terminal, host, 10);
            }
          } else {
            return "handle-command";
          }
        } else if (text === "exit" || text === "quit") {
          let output = "Saving session...\n" +
              "...copying shared history...\n" +
              "...saving history...truncating history files...\n" +
              "...completed.\n" +
              "Deleting expired sessions...       2 completed.\n" +
              "\n" +
              "[Process completed]\n";
          this.terminalOne.push(output);
          this.terminalTwo.push(output);
          this.quitTerminal = true;

          if (this.step === 10) {
            this.correct1("Congratulations! You have completed the challenge!");
          } else {
            this.incorrect("You have not completed the challenge yet. Please reload page.");
          }

        } else if (text.includes("|")) {
          return "handle-command";
        } else if (text.match(/cd\s.+/)) {
          terminal.push("Error: Directory not found");
        } else if (text.match(/mkdir\s.+/)) {
          terminal.push("Error: You do not have permission to create a directory");
        } else if (text === "pwd") {
          terminal.push("/home/user");
        } else if (text.match(/touch\s.+/)) {
          terminal.push("Error: You do not have permission to create a file");
        } else if (text.match(/rm\s.+/)) {
          terminal.push("Error: You do not have permission to remove a file");
        } else if (text.match(/rmdir\s.+/)) {
          terminal.push("Error: You do not have permission to remove a directory");
        } else if (text.match(/cat\s.+/)) {
          let fileName = text.split(" ")[1];
          if (fileName in files) {
            terminal.push(files[fileName]);
          } else {
            terminal.push("Error: File not found");
          }
        } else {
          return "handle-command";
        }
        return "pre-handle-command";
      } else {
        terminal.push("Error: Invalid Command");
        return "invalid-handle-command";
      }
    },
    copyToClipBoardIP() {
      navigator.clipboard.writeText(this.serverIdAddress);
      this.correct1("IP Address Copied to Clipboard");
    },
    copyToClipBoardPort() {
      navigator.clipboard.writeText(this.serverIdPort);
      this.correct1("Port Copied to Clipboard");
    },
    generateSessionKey() {
      let sessionKey = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+=-";
      for (let i = 0; i < 256; i++) {
        sessionKey += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return sessionKey;
    },
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

          let commandType = this.handleCommands(text, this.terminalOne, this.availableClientFiles)
          if (commandType === "handle-command") {
            if (text === "openssl s_client -connect " + this.serverIdAddress + ":" + this.serverIdPort) {
              if (this.step === 1) {
                this.terminalOne.push("CONNECTED(00000003)");
                this.terminalOne.push("depth=0 C = US, ST = CA, L = San Francisco, O = User, OU = User, CN = User");
                this.terminalOne.push("Asymmetric public key written to server_pubkey.pem");
                this.availableClientFiles["server_pubkey.pem"] = this.generateRSARandom(false);
                this.availableServerFiles["server_privkey.pem"] = this.generateRSARandom(true);
                this.availableClientFiles["server.crt"] = this.generateSessionKey()
                    + "\n" + this.generateSessionKey()
                    + "\n" + this.generateSessionKey()
                    + "\n" + this.generateSessionKey();
                this.clientCertificate = this.generateCertificateRandom()
                this.step = 2
              } else {
                this.terminalOne.push("CONNECTION ALREADY ESTABLISHED TO HOST WITH IP: " + this.serverIdAddress + ", PORT: " + this.serverIdPort);
              }
            } else if (text.includes("openssl s_client -connect")) {
              this.terminalOne.push("Error: Invalid command, please check options, host and port number");
            } else if (text === "openssl rand -hex 16") {
              this.terminalOne.push(this.generateSessionKey());
            } else if (text.match(/openssl rand -hex 16 > .+/)) {
              let fileName = text.split(">")[1].trim();
              if (this.availableClientFiles[fileName]) {
                this.terminalOne.push("Error: " + fileName + " already exists");
              } else {
                this.terminalOne.push("Session key saved to " + fileName);
                this.availableClientFiles[fileName] = "--------SESSION KEY--------\n" + this.generateSessionKey();
              }
              if (this.step === 3) {
                this.step = 4
              }
            } else if (text.match(/openssl rsautl -encrypt -in .+ -out .+\.enc -pubin -inkey .+\.pem/)) {
              let inputFileName = text.split("-in")[1].trim();
              inputFileName = inputFileName.split("-out")[0].trim();
              let outputFileName = text.split("-out")[1].trim();
              outputFileName = outputFileName.split("-pubin")[0].trim();
              let serverPubKey = text.split("-inkey")[1].trim();
              if (!this.availableClientFiles[inputFileName]) {
                this.terminalOne.push("Error: " + inputFileName + " does not exist");
              } else if (this.availableClientFiles[outputFileName]) {
                this.terminalOne.push("Error: " + outputFileName + " already exists");
              } else if (!this.availableClientFiles[serverPubKey]) {
                this.terminalOne.push("Error: " + serverPubKey + " does not exist");
              } else {
                this.terminalOne.push("Encrypted session key saved to " + outputFileName);
                this.decryptedText = this.availableClientFiles[inputFileName];
                this.availableClientFiles[outputFileName] = this.generateSessionKey()
                    + "\n" + this.generateSessionKey()
                    + "\n" + this.generateSessionKey()
                    + "\n" + this.generateSessionKey();
                if (this.step === 4) {
                  this.step = 5
                }
              }
            } else if (text.match(/cat .+\.enc \| nc .+/)) {
              let nameOfFile = text.split("cat")[1].trim();
              nameOfFile = nameOfFile.split("|")[0].trim();
              console.log(nameOfFile)
              let hostPort = text.split("nc")[2].trim().split(" ")
              let host = hostPort[0].trim();
              let port = hostPort[1].trim();
              console.log("hostPort", hostPort, host, port, host !== this.serverIdAddress, port !== this.serverIdPort)
              if (!this.availableClientFiles[nameOfFile]) {
                this.terminalOne.push("Error: " + nameOfFile + " does not exist");
              } else if (host !== this.serverIdAddress) {
                this.terminalOne.push("Error: Invalid host");
              } else if (port !== this.serverIdPort.toString()) {
                this.terminalOne.push("Error: Invalid port");
              } else {
                this.terminalOne.push("File sent to server");
                this.availableServerFiles[nameOfFile] = this.availableClientFiles[nameOfFile];
                if (this.step === 5) {
                  this.step = 6
                  this.terminalIndex = 1;
                }
              }
            } else if (text.match(/openssl rsautl -decrypt -in .+\.enc -out .+ -inkey .+\.pem/)) {
              let inputFileName = text.split("-in")[1].trim();
              inputFileName = inputFileName.split("-out")[0].trim();
              let outputFileName = text.split("-out")[1].trim();
              outputFileName = outputFileName.split("-inkey")[0].trim();
              let serverPrivKey = text.split("-inkey")[1].trim();
              if (!this.availableClientFiles[inputFileName]) {
                this.terminalOne.push("Error: " + inputFileName + " does not exist");
              } else if (this.availableClientFiles[outputFileName]) {
                this.terminalOne.push("Error: " + outputFileName + " already exists");
              } else if (!this.availableClientFiles[serverPrivKey]) {
                this.terminalOne.push("Error: " + serverPrivKey + " does not exist");
              } else if (!serverPrivKey === "server_pubkey.pem") {
                this.terminalOne.push("Error: " + serverPrivKey + " is not a valid private key");
              } else {
                this.terminalOne.push("Error: Cannot decrypt file");
              }
            } else if (text.match(/ping -c 3 .+/)) {
              let host = text.split("ping -c 3")[1].trim();

              if (host === this.serverIdAddress || host === "localhost" || host === "1.1.1.1" || host === "8.8.8.8") {
                this.generatePingOutput(this.terminalOne, host, 3, true);

                let randomNumOne = Math.floor(Math.random() * 100)
                let randomNumTwo = Math.floor(Math.random() * 100)
                let randomNumThree = Math.floor(Math.random() * 100)
                let randomNumFour = Math.floor(Math.random() * 100)

                this.terminalOne.push("--- " + host + " ping statistics ---");
                this.terminalOne.push("3 packets transmitted, 3 packets received, 0.0% packet loss");
                this.terminalOne.push("round-trip min/avg/max/stddev = " + randomNumOne + "." + randomNumTwo + "/" + randomNumThree + "." + randomNumFour + "/" + randomNumOne + "." + randomNumTwo + "/" + randomNumThree + "." + randomNumFour + " ms");

                if (host === this.serverIdAddress && this.step === 8) {
                  this.step = 9
                }

              } else {
                this.terminalOne.push("ping: " + host + ": Name or service not known");
              }

            } else if (text.includes("openssl x509 -in") && text.includes("-text")) {
              //get name
              let fileName = text.split("-in")[1].trim();
              fileName = fileName.split("-text")[0].trim();

              if (this.availableClientFiles[fileName] && fileName === "server.crt") {
                let certificate = this.clientCertificate
                if (text.includes("-noout")) {
                  this.terminalOne.push(certificate)
                  if (this.step === 9) {
                    this.step = 10
                  }
                } else {
                  let outputFileName = "server.txt"
                  this.availableClientFiles[outputFileName] = certificate
                  this.terminalOne.push("Certificate saved to " + outputFileName);
                }
              } else if (this.availableClientFiles[fileName]) {
                this.terminalOne.push("Error: invalid certificate file");
              } else {
                this.terminalOne.push("Error: " + fileName + " does not exist");
              }
            } else {
              this.terminalOne.push("Error: Invalid command, please check options");
            }

          } else if (commandType === "pre-handle-command") {
            if (text === "cat server_pubkey.pem") {
              if (this.step === 2) {
                this.step = 3
              }
            }
          }
        } else {
          const text = this.terminalInputTwo;
          this.terminalInputTwo = '';
          let textArea = document.getElementById('terminal-ip-2');
          textArea.style.height = 'auto';
          textArea.style.height = this.scrollHeight + 'px';
          this.terminalTwo.push("server@terminal:~$ " + text);

          let commandType = this.handleCommands(text, this.terminalTwo, this.availableServerFiles)
          if (commandType === "handle-command") {
            if (text.includes("openssl s_client -connect")) {
              this.terminalTwo.push("Error: Invalid command, please check options, host and port number");
            } else if (text === "openssl rand -hex 16") {
              this.terminalTwo.push(this.generateSessionKey());
            } else if (text.match(/openssl rand -hex 16 > .+/)) {
              let fileName = text.split(">")[1].trim();
              if (this.availableServerFiles[fileName]) {
                this.terminalTwo.push("Error: " + fileName + " already exists");
              } else {
                this.terminalTwo.push("Session key saved to " + fileName);
                this.availableServerFiles[fileName] = this.generateSessionKey();
              }
            } else if (text.match(/openssl rsautl -encrypt -in .+ -out .+\.enc -pubin -inkey .+\.pem/)) {
              let inputFileName = text.split("-in")[1].trim();
              inputFileName = inputFileName.split("-out")[0].trim();
              let outputFileName = text.split("-out")[1].trim();
              outputFileName = outputFileName.split("-pubin")[0].trim();
              let serverPubKey = text.split("-inkey")[1].trim();
              if (!this.availableServerFiles[inputFileName]) {
                this.terminalTwo.push("Error: " + inputFileName + " does not exist");
              } else if (this.availableServerFiles[outputFileName]) {
                this.terminalTwo.push("Error: " + outputFileName + " already exists");
              } else if (!this.availableServerFiles[serverPubKey]) {
                this.terminalTwo.push("Error: " + serverPubKey + " does not exist");
              } else if (!serverPubKey === "server_pubkey.pem") {
                this.terminalOne.push("Error: " + serverPubKey + " is not a valid public key");
              } else {
                this.terminalTwo.push("ERROR: Cannot encrypt file");
              }
            } else if (text.match(/openssl rsautl -decrypt -in .+\.enc -out .+ -inkey .+\.pem/)) {
              let inputFileName = text.split("-in")[1].trim();
              inputFileName = inputFileName.split("-out")[0].trim();
              let outputFileName = text.split("-out")[1].trim();
              outputFileName = outputFileName.split("-inkey")[0].trim();
              let serverPrivKey = text.split("-inkey")[1].trim();
              if (!this.availableServerFiles[inputFileName]) {
                this.terminalTwo.push("Error: " + inputFileName + " does not exist");
              } else if (this.availableServerFiles[outputFileName]) {
                this.terminalTwo.push("Error: " + outputFileName + " already exists");
              } else if (!this.availableServerFiles[serverPrivKey]) {
                this.terminalTwo.push("Error: " + serverPrivKey + " does not exist");
              } else {
                this.terminalTwo.push("Decrypted session key saved to " + outputFileName);
                this.availableServerFiles[outputFileName] = this.decryptedText
                this.decryptedServerFileName = outputFileName;
                if (this.step === 6) {
                  this.step = 7
                }
              }
            } else if (text.match(/ping -c 3 .+/)) {
              let host = text.split("ping -c 3")[1].trim();

              if (host === "localhost" || host === "1.1.1.1" || host === "8.8.8.8") {
                this.generatePingOutput(this.terminalTwo, host, 3, true);

                let randomNumOne = Math.floor(Math.random() * 100)
                let randomNumTwo = Math.floor(Math.random() * 100)
                let randomNumThree = Math.floor(Math.random() * 100)
                let randomNumFour = Math.floor(Math.random() * 100)

                this.terminalTwo.push("--- " + host + " ping statistics ---");
                this.terminalTwo.push("3 packets transmitted, 3 packets received, 0.0% packet loss");
                this.terminalTwo.push("round-trip min/avg/max/stddev = " + randomNumOne + "." + randomNumTwo + "/" + randomNumThree + "." + randomNumFour + "/" + randomNumOne + "." + randomNumTwo + "/" + randomNumThree + "." + randomNumFour + " ms");

              } else if (text.includes("openssl x509 -in") && text.includes("-text")) {
                this.terminalTwo.push("Error: certificate does not exist or is not a valid certificate");
              } else {
                this.terminalTwo.push("ping: " + host + ": Name or service not known");
              }

            } else {
              this.terminalTwo.push("Error: Invalid command, please check options");
            }
          } else if (commandType === "pre-handle-command") {
            if (text.match(/cat .+/)) {
              let fileName = text.split("cat")[1].trim();
              if (fileName === this.decryptedServerFileName && this.step === 7) {
                this.step = 8;
              }
            }
          }
        }
      }
    }
    ,
    terminalFocus(index) {
      if (index === 0) {
        document.getElementById('terminal-ip-1').focus();
      } else {
        document.getElementById('terminal-ip-2').focus();
      }
    }
  }
  ,
  components: {
    TopBar
  }
  ,
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

.code {
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

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  line-height: 110%;
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

.server-config {
  display: inline-block;
  font-weight: normal;
  transition: ease-in-out 0.2s;
}

.server-config:hover {
  cursor: copy;
  color: #4f3434;
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
  background-color: white;
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

code:hover {
  cursor: copy;
}


div {
  overflow-y: auto;
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
  font-family: Hack monospace;
  padding: 10px 15px;
  color: #33FF00;
}


.terminal-choices {
  width: 10%;
  min-width: 100px;
  background-color: #0f131b;
}

.terminal-col {
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-direction: row;
  text-overflow: fade;
  background-color: #0b0e14;
  flex: 1;
}

.terminal-wrapper {
  flex: 1;
  max-width: 100%;
  height: 100%;
  text-overflow: fade;
}

.terminal-input-field {
  background-color: #0b0e14;
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

.terminal-button {
  width: 100%;
  background-color: #161b24;
  border: none;
  padding: 10px;
  font-family: monospace;
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

.terminal-input {
  display: flex;
  flex-direction: row;
  width: 100%;
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
