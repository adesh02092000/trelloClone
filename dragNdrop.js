import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    console.log("Mouse Down")

    const mouseMoveFunc = () => {
      console.log("Mouse move")
    }
    // Need to add the move and up event listeners on the document since we can move the task anywhere,
    document.addEventListener("mousemove", mouseMoveFunc)

    // remove the move event listener, once the mouse is up
    // Also run the up listener once
    document.addEventListener(
      "mouseup",
      e => {
        document.removeEventListener("mousemove", mouseMoveFunc)
        console.log("Mouse up")
      },
      { once: true } // Runs the event listener once and then removes it.
    )
  })
}

// Added the move and up event listners inside the mousedown, since we only want to track move and up,
// after a draggable is click (mouse down)
