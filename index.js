import ALOT from "./ALOT_transparent.png";

window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const ALOT_img = new Image();
  const background_img = new Image();

  function refreshCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      background_img,
      document.querySelector("#xpos").value,
      document.querySelector("#ypos").value,
      background_img.width * document.querySelector("#scale").value,
      background_img.height * document.querySelector("#scale").value
    );
    ctx.drawImage(ALOT_img, 0, 0);

    ctx.fillStyle = "black";
    ctx.textAlign = "end";
    ctx.font = "48px serif";

    ctx.fillText(document.querySelector("#text").value, 750, 65);

    document.querySelector("#download").href = canvas.toDataURL("image/png");
  }

  function setImage(img, src) {
    return new Promise(res => {
      img.onload = res;
      img.src = src;
    });
  }

  function loadImage(target) {
    let file = target.files[0];
    if (!file) return; // no file to read
    let reader = new FileReader();

    new Promise(res => (reader.onloadend = res))
      .then(() => setImage(background_img, reader.result))
      .then(refreshCanvas);

    reader.readAsDataURL(file);
  }

  setImage(ALOT_img, ALOT).then(refreshCanvas);

  document
    .querySelector("input#background")
    .addEventListener("change", event => loadImage(event.target));

  loadImage(document.querySelector("input#background"));

  document
    .querySelector("form#controls")
    .addEventListener("change", refreshCanvas);

  canvas.addEventListener("mousedown", () => {
    function move(event) {
      document.querySelector("#xpos").value =
        Number(document.querySelector("#xpos").value) + event.movementX;
      document.querySelector("#ypos").value =
        Number(document.querySelector("#ypos").value) + event.movementY;
      refreshCanvas();
    }

    canvas.addEventListener("mousemove", move);

    canvas.addEventListener("mouseup", () =>
      canvas.removeEventListener("mousemove", move)
    );
  });
});
