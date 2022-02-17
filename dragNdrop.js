import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    // Hide the selected item, from the original position
    selectedItem.classList.add("hide")

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
        selectedItem.classList.remove("hide") // add the task once the mouse is up
        console.log("Mouse up")
      },
      { once: true } // Runs the event listener once and then removes it.
    )
  })
}

// Added the move and up event listners inside the mousedown, since we only want to track move and up,
// after a draggable is click (mouse down)
