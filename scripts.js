document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("main a");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      alert("Bonne lecture ! 📖");
    });
  });
});
