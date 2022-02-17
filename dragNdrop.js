import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)

    const offset = setupDragItems(selectedItem, itemClone, e)
    setupDragEvents(selectedItem, itemClone, offset)
  })
}

function setupDragItems(selectedItem, itemClone, e) {
  const originalRect = selectedItem.getBoundingClientRect()
  const offset = {
    x: e.clientX - originalRect.left,
    y: e.clientY - originalRect.top,
  }
  selectedItem.classList.add("hide")

  itemClone.style.width = `${originalRect.width}px`
  itemClone.classList.add("dragging")
  positionClone(itemClone, e, offset)
  document.body.append(itemClone)

  return offset
}

function setupDragEvents(selectedItem, itemClone, offset) {
  const mouseMoveFunc = e => {
    positionClone(itemClone, e, offset)
  }
  document.addEventListener("mousemove", mouseMoveFunc)

  document.addEventListener(
    "mouseup",
    e => {
      document.removeEventListener("mousemove", mouseMoveFunc)
      selectedItem.classList.remove("hide")
      itemClone.remove()
      console.log("Mouse up")
    },
    { once: true }
  )
}

function positionClone(itemClone, e, offset) {
  itemClone.style.top = `${e.clientY - offset.y}px`
  itemClone.style.left = `${e.clientX - offset.x}px`
}
