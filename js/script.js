const slide = document.querySelectorAll(".slide");
const slideContainer = document.querySelector(".slides-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navigationDots = document.querySelector(".navigation-dots");

let numberOfSlides = slide.length;
let slideWidth = slide[0].clientWidth;
let currentSlide = 0;

function init() {
	slide.forEach((item, index) => {
		item.style.left = `${index * 100}%`;
	});
	
	slide[0].classList.add("active");
	
	createNavigationDots();
}

init();

// Create Nav dots
function createNavigationDots() {
	for (let i = 0; i < numberOfSlides; i++) {
		const dot = document.createElement("div");
		dot.classList.add("single-dot");
		navigationDots.appendChild(dot);
		
		dot.addEventListener("click", () => {
			goToSlide(i);
		});
	}
	
	navigationDots.children[0].classList.add("active");
}

//Next button
nextBtn.addEventListener("click", () => {
	if (currentSlide >= numberOfSlides - 1) {
		goToSlide(0);
		return;
	}
	currentSlide++;
	goToSlide(currentSlide);
});

//Previous button
prevBtn.addEventListener("click", () => {
	if (currentSlide <= 0) {
		goToSlide(numberOfSlides - 1);
		return;
	}
	currentSlide--;
	goToSlide(currentSlide);
});

function goToSlide(slideNumber) {
	slideContainer.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
	currentSlide = slideNumber;
	setActiveClass();
}

function setActiveClass() {
	let currentActive = document.querySelector(".slide.active");
	currentActive.classList.remove("active");
	slide[currentSlide].classList.add("active");
	
	// set active class for the dots
	let currentDot = document.querySelector(".single-dot.active");
	currentDot.classList.remove("active");
	navigationDots.children[currentSlide].classList.add("active");
}
