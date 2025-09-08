document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("main a");

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      alert("Bonne lecture ! 📖");
    });
  });
});

// Charge le fichier Markdown et le convertit en HTML
fetch('fanfics/histoire1.md')
  .then(response => response.text())
  .then(markdown => {
    const html = marked.parse(markdown);
    document.getElementById('content').innerHTML = html;
  })
  .catch(error => {
    document.getElementById('content').innerHTML = "<p>Erreur de chargement de l'histoire.</p>";
    console.error(error);
  });
