<template>
  <!--
      Note:
      :deep(.box:nth-child(6))
      Use deep in parent CSS to restrict the scope of the CSS selector to the child component.

      Methods packaged with the module:
      animatePackage(target element, package id of the package to animate, source element id, callback for when the animation ends) -> animates a package with <packageID>, as assigned the end system component, from the source element to the target element
      arrangePackages(target element id) -> Arranges all packages close to the target element upon each other so all packages are visible
      drawLine(source element id, target element id) -> Draws a line from the source element to the target element

      Use refs to access the methods of the NetworkInteractionComponent from the parent component
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
  //get a function with parameter string as a prop
  props: {
    onPackageAnimationEnd: {
      type: Function,
    },
    onPackageReachDestination: {
      type: Function,
    },
  },
  mounted() {
    let marginContainer = document.getElementById("margin-container").getBoundingClientRect();

    //accounted for margin
    let width = (marginContainer.width - 50) + "px";
    let height = (marginContainer.height - 50) + "px";

    //sets the container dimensions to static values, so it does not resize when the window is resized
    document.getElementById("root").style.width = width
    document.getElementById("root").style.height = height
    document.getElementById("lineCanvas").style.width = width
    document.getElementById("lineCanvas").style.height = height
    document.getElementById("overlay").style.width = width
    document.getElementById("overlay").style.height = height
  },
  methods: {
    drawSVGLine(x1, y1, x2, y2, color, text) {
      let svg = document.getElementById('lineCanvas');
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      //set line color
      if (color) {
        line.setAttribute("style", "stroke:" + color + ";stroke-width:1");
      } else {
        line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1");
      }
      //add text above the of line and same angle of line
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      svg.appendChild(line);
      if (text) {
        let textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textNode.setAttribute("x", (x1 + x2) / 2);
        textNode.setAttribute("y", (y1 + y2) / 2 - 6);
        textNode.setAttribute("text-anchor", "middle");
        textNode.setAttribute("alignment-baseline", "middle");
        textNode.setAttribute("font-size", "12px");
        textNode.setAttribute("font-weight", "500");
        textNode.setAttribute("fill", "black");
        textNode.setAttribute("transform", "rotate(" + Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI + " " + (x1 + x2) / 2 + " " + (y1 + y2) / 2 + ")");
        textNode.innerHTML = text;
        svg.appendChild(textNode);
      }
    },
    animatePackage(target, packageID, currentElementID, currentAnimationCallback) {
      //animates package with <packageID> from the current element to the target element
      let packageDOM = document.getElementById(packageID); //The package to animate
      let element = document.getElementById(target); //The target element
      let currentElement = document.getElementById(currentElementID); //the current element
      let overlay = document.getElementById('overlay'); //overlay, to remount the package to the overlay

      if (!packageDOM || !element || !currentElement || !overlay) {
        return
      }

      let packageWidth = 40
      let packageHeight = packageDOM.offsetHeight / 2

      //detaching from current element and moving to overlay
      let xT = currentElement.offsetLeft + (currentElement.offsetWidth);
      let yT = currentElement.offsetTop + (currentElement.offsetHeight);
      packageDOM.remove()
      overlay.appendChild(packageDOM);

      packageDOM.style.left = xT + 'px';
      packageDOM.style.top = yT + 'px';

      //setting element to center of current element
      let x1T = currentElement.offsetLeft + (currentElement.offsetWidth / 2) - packageWidth
      let y1T = currentElement.offsetTop + (currentElement.offsetHeight / 2) - packageHeight

      packageDOM.style.left = x1T + 'px';
      packageDOM.style.top = y1T + 'px';

      //first async wait for the animation to reach the center of the target element
      let centerAnimationEnd = async () => {
        //round off x1T and y1T to avoid floating point errors
        x1T = Math.round(x1T)
        y1T = Math.round(y1T)

        //check if the package is at the target element
        if (packageDOM.offsetLeft === x1T && packageDOM.offsetTop === y1T) {
          //setting element to center of target element
          let x1E = element.offsetLeft + (element.offsetWidth / 2) - packageWidth;
          let y1E = element.offsetTop + (element.offsetHeight / 2) - packageHeight;

          packageDOM.style.left = x1E + 'px';
          packageDOM.style.top = y1E + 'px';

          //second async wait for the animation to reach the target element
          let packageMovementAnimationEnd = async () => {

            //check if the package is at the target element
            //round off x1E and y1E to avoid floating point errors
            x1E = Math.round(x1E)
            y1E = Math.round(y1E)
            if (packageDOM.offsetLeft === x1E && packageDOM.offsetTop === y1E) {

              let x1E = element.offsetLeft + (element.offsetWidth);
              let y1E = element.offsetTop + (element.offsetHeight);

              //setting element to center of target element
              packageDOM.style.left = x1E + 'px';
              packageDOM.style.top = y1E + 'px';

              //check if the package is at the target element
              let onTargetReach = () => {
                if (packageDOM.offsetLeft === x1E && packageDOM.offsetTop === y1E) {
                  if (this.onPackageAnimationEnd)
                    this.onPackageAnimationEnd(packageID)
                  if (currentAnimationCallback) {
                    currentAnimationCallback()
                  }
                } else {
                  setTimeout(() => {
                    //calling the second async wait to start the animation to the target element
                    onTargetReach();
                  }, 100);
                }
              }
              onTargetReach()

            } else {
              setTimeout(() => {
                packageMovementAnimationEnd();
              }, 100);
            }
          }
          //calling the second async wait to start the animation to the target element
          packageMovementAnimationEnd().then(() => {
            if (this.onPackageReachDestination)
              this.onPackageReachDestination(packageID)
          })

        } else {
          setTimeout(() => {
            centerAnimationEnd();
          }, 500);
        }
      }
      //calling the first async wait to start the animation to the center of the target element
      centerAnimationEnd()

    },
    arrangePackages(boxId, packageID) {

      if (!boxId) {
        return
      }
      //arranges the packages in the target box upon each other to make every package visible
      let element = document.getElementById(boxId)
      let overlay = document.getElementById('overlay'); //overlay, to remount the package to the overlay

      let positionX = element.offsetLeft + (element.offsetWidth)
      let positionY = element.offsetTop + (element.offsetHeight)


      //arrange the packages in the target box
      //reset the packages to their original position and then add + 50 * index to the top and left

      console.log(packageID)
      for (let i = 0; i < packageID.length; i++) {
        console.log(packageID[i], "error")
        let packageDOM = document.getElementById(packageID[i])
        overlay.appendChild(packageDOM);

        packageDOM.style.left = positionX + 'px';
        packageDOM.style.top = positionY + 'px';

        let x1E = positionX + (15 * i);
        let y1E = positionY + (15 * i);

        packageDOM.style.left = x1E + 'px';
        packageDOM.style.top = y1E + 'px';
      }

    },
    drawLine(id1, id2, lineColor, text) {
      //wrapper method for drawSVG line, calculates the center of the elements and passes it to the drawSVGLine method
      let elementA = document.getElementById(id1);
      let elementB = document.getElementById(id2);

      if (!elementA || !elementB) {
        return
      }

      let x1 = elementA.offsetLeft + (elementA.offsetWidth / 2);
      let y1 = elementA.offsetTop + (elementA.offsetHeight / 2);
      let x2 = elementB.offsetLeft + (elementB.offsetWidth / 2);
      let y2 = elementB.offsetTop + (elementB.offsetHeight / 2);

      if (!lineColor) {
        lineColor = 'black'
      }

      if (text) {
        this.drawSVGLine(x1, y1, x2, y2, lineColor, text)
      } else {
        this.drawSVGLine(x1, y1, x2, y2, lineColor)
      }
    },
    drawLineOffset(id1, id2, space, isXTransformation, lineColor, text, isNegativeOffset){
      let elementA = document.getElementById(id1);
      let elementB = document.getElementById(id2);

      if (!elementA || !elementB) {
        return
      }

      let x1 = elementA.offsetLeft + (elementA.offsetWidth / 2);
      let y1 = elementA.offsetTop + (elementA.offsetHeight / 2);
      let x2 = elementB.offsetLeft + (elementB.offsetWidth / 2);
      let y2 = elementB.offsetTop + (elementB.offsetHeight / 2);

      if (isXTransformation) {

        if(isNegativeOffset){
          let x1T = x1 - space / 2;
          let x2T = x2 - space / 2;
          this.drawSVGLine(x1T, y1, x2T, y2, lineColor, text);
        }
        else{
          let x1T = x1 + space / 2;
          let x2T = x2 + space / 2;
          this.drawSVGLine(x1T, y1, x2T, y2, lineColor, text);
        }

      } else {
        if (isNegativeOffset) {
          let y1T = y1 - space / 2;
          let y2T = y2 - space / 2;
          this.drawSVGLine(x1, y1T, x2, y2T, lineColor, text);
        } else {
          let y1T = y1 + space / 2;
          let y2T = y2 + space / 2;
          this.drawSVGLine(x1, y1T, x2, y2T, lineColor, text);
        }
      }
    },
    clearLines() {
      let svg = document.getElementById('lineCanvas');
      svg.parentNode.replaceChild(svg.cloneNode(false), svg);
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