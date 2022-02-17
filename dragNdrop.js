// There are three steps to drag n drop
// 1. Click the task (Mouse down)
// 2. Move the task (Mouse move)
// 3. Leave the task (Mouse up)
// All luckily Js has all these Event handlers
import addGlobalEventListener from "./utils/addGlobalEventListener"

export default function setup() {
  addGlobalEventListener("mousedown", "[data-draggable]", e => {
    console.log("Mouse Down")
  })
}
