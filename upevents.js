function showImage(src) {
  $("#modalImage").attr("src", src);
  $("#imageModal").modal("show");
}

var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
};
