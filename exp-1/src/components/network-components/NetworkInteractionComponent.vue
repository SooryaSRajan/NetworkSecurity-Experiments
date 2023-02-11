<template>
  <!--
      Note:
      :deep(.box:nth-child(6))
      Use deep in parent CSS to restrict the scope of the CSS selector to the child component.

      Methods packaged with the module:
      animatePackage(target element, package id of the package to animate, source element id)
      drawLine(source element id, target element id)
  -->
  <div id="margin-container">
    <div id="root">
      <svg id="lineCanvas">
        <!--This is where the lines for the packages go-->
      </svg>
      <div id="overlay">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NetworkInteractionComponent",
  mounted() {
    let marginContainer = document.getElementById("margin-container").getBoundingClientRect();

    let width = (marginContainer.width - 50) + "px";
    let height = (marginContainer.height - 50) + "px";

    document.getElementById("root").style.width = width
    document.getElementById("root").style.height = height
    document.getElementById("lineCanvas").style.width = width
    document.getElementById("lineCanvas").style.height = height
    document.getElementById("overlay").style.width = width
    document.getElementById("overlay").style.height = height
  },
  methods: {
    drawSVGLine(x1, y1, x2, y2) {
      let svg = document.getElementById('lineCanvas');
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1");
      svg.appendChild(line);
    },
    animatePackageNew(target, packageID, currentElementID) {
      let packageDOM = document.getElementById(packageID); //The package to animate
      let element = document.getElementById(target); //The target element
      let currentElement = document.getElementById(currentElementID); //the current element
      let overlay = document.getElementById('overlay'); //overlay, to remount the package to the overlay


      let packageWidth = 40
      let packageHeight = packageDOM.offsetHeight / 2

      //detaching from current element and moving to overlay
      let xT = currentElement.offsetLeft + (currentElement.offsetWidth);
      let yT = currentElement.offsetTop + (currentElement.offsetHeight);
      packageDOM.style.left = xT + 'px';
      packageDOM.style.top = yT + 'px';
      packageDOM.remove()
      overlay.appendChild(packageDOM);

      packageDOM.style.left = xT + 'px';
      packageDOM.style.top = yT + 'px';

      //setting element to center of current element
      let x1T = currentElement.offsetLeft + (currentElement.offsetWidth / 2) - packageWidth
      let y1T = currentElement.offsetTop + (currentElement.offsetHeight / 2) - packageHeight

      packageDOM.style.left = x1T + 'px';
      packageDOM.style.top = y1T + 'px';

      setTimeout(() => {
        //setting element to center of target element
        let x1E = element.offsetLeft + (element.offsetWidth / 2) - packageWidth;
        let y1E = element.offsetTop + (element.offsetHeight / 2) - packageHeight;

        packageDOM.style.left = x1E + 'px';
        packageDOM.style.top = y1E + 'px';

        setTimeout(() => {
          //setting element to center of target element
          let x1E = element.offsetLeft + (element.offsetWidth);
          let y1E = element.offsetTop + (element.offsetHeight);

          packageDOM.style.left = x1E + 'px';
          packageDOM.style.top = y1E + 'px';
        }, 2000);

      }, 2000);
    },
    drawLine(id1, id2) {
      let elementA = document.getElementById(id1);
      let elementB = document.getElementById(id2);

      let x1 = elementA.offsetLeft + (elementA.offsetWidth / 2);
      let y1 = elementA.offsetTop + (elementA.offsetHeight / 2);
      let x2 = elementB.offsetLeft + (elementB.offsetWidth / 2);
      let y2 = elementB.offsetTop + (elementB.offsetHeight / 2);

      this.drawSVGLine(x1, y1, x2, y2);
    },
  }
}
</script>

<style scoped>
#margin-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 25px;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
}

#root {
  border-radius: 10px;
  background-color: #F9FAFE;
  box-shadow: 2px 3px 10px 2px #D7DFFF;
  text-align: center;
  position: relative;
  overflow: scroll;
}

#lineCanvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

#overlay {
  position: relative;
}
</style>