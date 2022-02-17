import setup from "./dragNdrop"

setup(onDragComplete)

function onDragComplete(dataObj) {
  console.log(dataObj)
}

// At this point we don't need to worry about how the drag and drop functionality works
// all we care about is that the onDragComplete function is called when ever there is a
// successful item dragged.
