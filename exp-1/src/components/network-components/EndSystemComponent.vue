<template>
  <div :class="Class" :id="Id" class="rootElementEndSystem" :style="{top: top, left: left}">
    <div id="endSystemVector">
      <slot></slot>
    </div>
    <!--set package ID here so it can be used later -->
    <div v-if="isPackageSet && displayPackage" style="position: absolute; right: -88px; " :style="animationDuration" :id="packageId">
      <PackageComponent :data="data"></PackageComponent>
    </div>
  </div>
</template>

<script>

import PackageComponent from "@/components/network-components/PackageComponent";

export default {
  name: "EndSystemComponent",
  components: {PackageComponent},
  data() {
    return {
      animationSeconds: 1
    }
  },
  props: {
    Class: {
      type: String,
    },
    Id: {
      type: String,
    },
    packageId: {
      type: String,
    },
    top: {
      type: String,
    },
    left: {
      type: String,
    },
    data: {
      type: Array
    },
    displayPackage: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    disableAnimation() {
      this.animationSeconds = 0;
    },
    enableAnimation() {
      this.animationSeconds = 1;
    }
  },
  computed: {
    packagePosition() {
      return "-50px"
    },
    isPackageSet() {
      return this.packageId !== undefined;
    },
    animationDuration() {
      return {
        transition: "ease-in-out " + this.animationSeconds + "s"
      }
    }
  },
}
</script>

<style scoped>
.rootElementEndSystem {
  position: absolute;
}
</style>