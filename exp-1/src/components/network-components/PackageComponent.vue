<template>
  <div :id="id">
    <div id="packageBox">
      <div v-for="(item, index) in data" :key="item.id">
        <div class="packageText">{{ item }}</div>
        <div v-if="addDash(index)" class="dash"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PackageComponent",
  methods: {
    addDash(index) {
      return this.data.length !== index + 1;
    },
  },
  props: {
    data: {
      type: Array
    },
    id: {
      type: String
    }
  },
}
</script>

<style scoped>
#packageBox {
  width: 80px;
  min-height: 60px;

  overflow-y: scroll;
  background-color: #ABFF8E;
  padding: 3px;
  border: 1px solid black;
  display: flex;
  font-size: 12px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.packageText {
  padding: 2px;
}

/*style for dash*/
.dash {
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 2px 0;
}


</style>