import "./style.css";
import Typewriter from "./typewriter";

const typewriter = new Typewriter(
  document.body, // the element where we want to render the typeWriter element
  { loop: true }
)

typewriter
  .typeString("Where do I start")
  .pauseFor(0)
  .typeString("\n\nfunction")
  .deleteChars(7)
  .typeString("const temp")
  .pauseFor(150)
  .deleteAll(10)
  .typeString("\n\nWhy is this so hard?")
  .start();
  