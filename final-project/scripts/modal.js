var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modalImage");

function openModal(imageSrc) {
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  modal.style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};
