<template>
  <div class="flex-box">
    <TopBar title="Passive attacks - Eavesdropping"></TopBar>
    <div class="rem-space">
      <div class="col-1">
          <div class="row-1">
            <NetworkInteractionComponent ref="childComponentRef">
              <EndSystemComponent top="10%" left="5%" class="box" id="box1" :package-info="serverZeroPackages">
                <ServerComponent :ip-address="ipAddress[0]"/>
              </EndSystemComponent>

              <EndSystemComponent top="55%" left="72%" class="box" id="box2" :package-info="serverOnePackages">
                <ServerComponent :ip-address="ipAddress[1]"/>
              </EndSystemComponent>
            </NetworkInteractionComponent>
          </div>
        <div class="row-2">
            ENCRYPTION METHODS HERE
        </div>
      </div>
      <div class="col-2">
          <div class="row-3">
            <div class="row-3-content-space">

            </div>
            <StyledButton text="Verify"></StyledButton>
          </div>
          <div class="row-4">
            terminal
          </div>
      </div>

    </div>
  </div>
</template>

<script>

import TopBar from "@/components/TopBar";
import NetworkInteractionComponent from "@/components/network-components/NetworkInteractionComponent";
import StyledButton from "@/components/StyledButton";
import EndSystemComponent from "@/components/network-components/EndSystemComponent";
import ServerComponent from "@/components/ServerComponent";
// import EndSystemComponent from "@/components/network-components/EndSystemComponent";
// import StyledButton from "@/components/StyledButton";

export default {
  name: 'App',
  mounted() {
    let ip1 = Math.floor(Math.random() * 20) + 10;
    let ip2 = Math.floor(Math.random() * 255) + 1;
    this.ipAddress.push("12.14." + ip1 + "." + ip2);

    ip1 = Math.floor(Math.random() * 20) + 10;
    ip2 = Math.floor(Math.random() * 255) + 1;
    this.ipAddress.push("10.16." + ip1 + "." + ip2);

    this.$refs.childComponentRef.drawTwoLines("box1", "box2", 40, false, "red", "blue", "channel 1", "channel 2");

    //animate
    //TODO: use this later
    // this.$refs.childComponentRef.animatePackage("box1", "package11", "box2");
    // this.$refs.childComponentRef.animatePackage("box2", "package01", "box1");


  },
  data() {
    return {
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
      serverOnePackages: [
        {
          packageId: 'package11',
          data: [],
          displayPackage: false,
          packageBackgroundColor: '#85fdef',
          animationSeconds: 1
        },
      ],
    }
  },
  components: {ServerComponent, EndSystemComponent, StyledButton, NetworkInteractionComponent, TopBar},
}
</script>

<style>
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

.rem-space {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.col-1{
  flex: 2;
  display: flex;
  flex-direction: row;
}

.col-2{
  flex: 1;
  display: flex;
  flex-direction: row;
}

.row-1{
  flex: 3;
  display: flex;
}

.row-2{
  flex: 1;
  background-color: #FBFBFB;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
}

.row-3{
  flex: 1;
  display: flex;
  padding-left: 15px;
  padding-bottom: 15px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.row-3-content-space{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.row-4{
  margin-left: 15px;
  flex: 2;
  background-color: black;
  color: #33FF00;
  padding: 10px 15px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.input-field {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

input {
  margin-top: 10px;
  font-size: 20px;
  padding: 15px;
}

.step-title {
  padding-bottom: 25px;
  font-weight: 500;
  font-size: 25px;
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
  text-align: justify;
}

.bold {
  font-weight: 600;
}

/*media screen*/
@media screen and (max-width: 950px) {


}

</style>
