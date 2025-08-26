import "./style.css";

// IMAGE SLIDER //

const slideBtns = document.querySelectorAll("[data-slideBtn]");
const slideContainer = document.querySelector("[data-slideContainer]");
const slides = [...document.querySelectorAll("[data-slide]")];
let currentIndex = 0;
let isMoving = false;

// btn handle function
function handleSlideBtnClick(e) {
  // TODO: see if slider is already moving
  if (isMoving) return;
  isMoving = true;

  e.currentTarget.id === "prev" ? currentIndex-- : currentIndex++;
  slideContainer.dispatchEvent(new Event("sliderMove"));
}

// remove/add attribute function
const removeDisabledAttribute = (els) =>
  els.forEach((el) => el.removeAttribute("disabled"));
const addDisabledAttribute = (els) =>
  els.forEach((el) => el.setAttribute("disabled", true));

// event listeners
slideBtns.forEach((btn) => btn.addEventListener("click", handleSlideBtnClick));

slideContainer.addEventListener("sliderMove", () => {
  // 1. translate the container to the right/left
  slideContainer.style.transform = `translateX(-${
    currentIndex * slides[0].clientWidth
  }px)`;
  // 2. remove disabled attributes
  removeDisabledAttribute(slideBtns);

  // 3. reenable disabled attribute if needed
  currentIndex === 0 && addDisabledAttribute([slideBtns[0]]);
  // currentIndex === slides.length - 1 && addDisabledAttribute([slideBtns[1]]);
});

// transition end event
slideContainer.addEventListener("transitionend", () => (isMoving = false));

// disable image drag events
document
  .querySelectorAll("[data-slide] img")
  .forEach((img) => (img.ondragstart = () => false));

// intersection observer for slider
const slideObserver = new IntersectionObserver(
  (slide) => {
    if (slide[0].isIntersecting) {
      addDisabledAttribute([slideBtns[1]]);
    }
  },
  { threshold: 0.75 }
);

slideObserver.observe(slides[slides.length - 1]);

// FORM HANDLE

const contactForm = document.querySelector("#contact-form");
const contactBtn = document.querySelector("#contact-btn");
const contactInput = document.querySelector("#email");

// fake sending email to api endpoint
function postEmailToDatabase(email) {
  console.info(`Your email is ${email}`);
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

// options for submit button
const contactBtnOptions = {
  pending: `
		<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path></svg>
		<span class="uppercase tracking-wide animate-pulse">
		Sending...
		</span>
	`,
  success: `
		<span class="uppercase tracking-wide>
		Thank you!
		</span>
		<span class="uppercase tracking-wide>
		✌️
		</span>
	`,
};

async function handleFormSubmit(e) {
  e.preventDefault();
  addDisabledAttribute([contactForm, contactBtn]);
  contactBtn.innerHTML = contactBtnOptions.pending;
  const userEmail = contactInput.value;
  contactInput.style.display = "none";
  await postEmailToDatabase(userEmail);
  contactBtn.innerHTML = contactBtnOptions.success;
}

// event listener form submit

contactForm.addEventListener("submit", handleFormSubmit);
