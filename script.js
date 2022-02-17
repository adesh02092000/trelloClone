import setup from "./dragNdrop"

setup(onDragComplete)

function onDragComplete(dataObj) {
  console.log(dataObj)
}
