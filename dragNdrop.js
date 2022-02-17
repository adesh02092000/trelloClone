import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    itemClone.classList.add("dragging")
    positionClone(itemClone, e)
    document.body.append(itemClone)
    selectedItem.classList.add("hide")

    const mouseMoveFunc = () => {
      console.log("Mouse move")
    }
    document.addEventListener("mousemove", mouseMoveFunc)

    document.addEventListener(
      "mouseup",
      e => {
        document.removeEventListener("mousemove", mouseMoveFunc)
        selectedItem.classList.remove("hide")
        itemClone.remove() // remove the clone one the mouse is up, so that they don't stay in the air(dragged position)
        console.log("Mouse up")
      },
      { once: true }
    )
  })
}

function positionClone(itemClone, e) {
  itemClone.style.top = `${e.clientY}px`
  itemClone.style.left = `${e.clientX}px`
}
