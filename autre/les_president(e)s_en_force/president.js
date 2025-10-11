<script>
  const select = document.getElementById("chapitre-select");
  select.addEventListener("change", function () {
    const url = this.value;
    if (url) {
      window.location.href = url;
    }
  });
</script>
