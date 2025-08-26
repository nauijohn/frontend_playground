import "./style.css";

let currentPage = 0;
const pages = document.querySelectorAll(".page");

function flipPage() {
  if (currentPage < pages.length) {
    pages[currentPage].classList.add("flipped");
    currentPage++;
  } else {
    // Reset book
    pages.forEach((p) => p.classList.remove("flipped"));
    currentPage = 0;
  }
}

// Make it accessible to HTML inline onclick
window.flipPage = flipPage;
