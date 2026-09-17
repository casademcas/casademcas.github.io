
onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

  let shown = false;

document.addEventListener("click", () => {
    if (!shown) {
        document.querySelector(".main-container").classList.add("show");
        shown = true;
    }
});