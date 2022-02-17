import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    const selectedItem = e.target
    const itemClone = selectedItem.cloneNode(true)
    const ghost = selectedItem.cloneNode() // deep copy is not needed

    const offset = setupDragItems(selectedItem, itemClone, ghost, e)
    setupDragEvents(selectedItem, itemClone, ghost, offset)
  })
}

function setupDragItems(selectedItem, itemClone, ghost, e) {
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

  ghost.style.height = `${originalRect.height}px`
  ghost.classList.add("ghost")
  ghost.innerHTML = ""
  selectedItem.parentElement.insertBefore(ghost, selectedItem)

  return offset
}

function setupDragEvents(selectedItem, itemClone, ghost, offset) {
  const mouseMoveFunc = e => {
    const dropZone = getDropZone(e.target) // e.target is the element where the cursor ends up (can be task, tasks or document)
    positionClone(itemClone, e, offset)
    if (dropZone == null) return // item is placed outside of the drag zone
    dropZone.append(ghost)
  }
  document.addEventListener("mousemove", mouseMoveFunc)

  document.addEventListener(
    "mouseup",
    e => {
      document.removeEventListener("mousemove", mouseMoveFunc)
      stopDrag(selectedItem, itemClone, ghost)
    },
    { once: true }
  )
}

function positionClone(itemClone, e, offset) {
  itemClone.style.top = `${e.clientY - offset.y}px`
  itemClone.style.left = `${e.clientX - offset.x}px`
}

function stopDrag(selectedItem, itemClone, ghost) {
  selectedItem.classList.remove("hide")
  itemClone.remove()
  ghost.remove()
}

function getDropZone(element) {
  if (element.matches("[data-drop-zone]")) return element
  else return element.closest("[data-drop-zone]")
}
