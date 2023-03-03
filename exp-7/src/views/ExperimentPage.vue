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
              <!--Nework components-->
            </div>
            <div class="packet-row">
              <!--packet components-->
            </div>
          </div>
          <div class="col-2">
            <!--terminal-->
          </div>
        </div>
      </div>
    </div>

  </main>
</template>
<script>
import TopBar from "@/components/TopBar";

export default {
  components: {TopBar}
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
  background-color: #42b983;
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
  background-color: #288EC8;
}

.network-row{
  width: 75%;
  background-color: #4f4faf;
  height: 100%;
}

.packet-row{
  width: 25%;
  background-color: #e6ff00;
  height: 100%;
}

</style>