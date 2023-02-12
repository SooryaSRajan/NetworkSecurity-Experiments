<template>
  <!--This element has a slot in which the vector or any child element of choice can be inserted, allows for customisability while designing experiments-->
  <div :class="Class" :id="Id" class="rootElementEndSystem" :style="{top: top, left: left}">
    <div id="endSystemVector">
      <slot></slot>
    </div>
    <div v-for="(packageData, index) in packageInfo" :key="index">
      <div v-if="packageData.packageId" style="position: absolute; right: -88px;"
           :style="{transition: 'ease-in-out ' + (packageData.animationSeconds ?? 1) + 's', visibility: packageData.displayPackage ? 'visible' : 'hidden'}"
           :id="packageData.packageId" class="package">
        <PackageComponent :data="packageData.data"
                          :background-color="packageData.packageBackgroundColor"></PackageComponent>
      </div>
    </div>
  </div>
</template>

<script>

import PackageComponent from "@/components/network-components/PackageComponent";

export default {
  name: "EndSystemComponent",
  components: {PackageComponent},
  props: {
    Class: {
      type: String,
    },
    Id: {
      type: String,
    },
    top: {
      type: String,
    },
    left: {
      type: String,
    },
    packageInfo: {
      type: [Object],
    },
  },
  computed: {
    packagePosition() {
      return "-50px"
    },
  },
}
</script>

<style scoped>
.rootElementEndSystem {
  position: absolute;
}

.package:hover {
  z-index: 1;
}
</style>