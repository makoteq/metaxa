export default function projector(text, delay) {
  let tape = text
    .split(";")
    .join("")
    .split(",")
    .join("")
    .split(".")
    .join("")
    .split(/\r\n/g)
    .join(" ")
    .split(" ");
  tape.unshift("3...", "2...", "1...", "GO!");

  tape.forEach((item, i) => {
    setTimeout(function () {
      console.clear();
      console.log(item);
    }, i * delay);
  });
}
