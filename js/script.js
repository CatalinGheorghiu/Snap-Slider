const slide = document.querySelectorAll(".slide");
const slideContainer = document.querySelector(".slides-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const navigationDots = document.querySelector(".navigation-dots");

let numberOfSlides = slide.length;
let slideWidth = slide[0].clientWidth;
let currentSlide = 0;


function init() {
	// Set the left position
	slide.forEach((item, index) => {
		item.style.left = `${index * 100}%`;
	});
	
	//Add active class to first slide when page loads
	slide[0].classList.add("active");
	
	createNavigationDots();
}


// Create Nav dots
function createNavigationDots() {
	for (let i = 0; i < numberOfSlides; i++) {
		const dot = document.createElement("div");
		dot.classList.add("single-dot");
		navigationDots.appendChild(dot);
		
		// Go to clicked slide
		dot.addEventListener("click", () => {
			goToSlide(i);
		});
		
	}
	// Set the default active dot
	navigationDots.children[0].classList.add("active");
}

//Next button
nextBtn.addEventListener("click", () => {
	//If current slide is the last slide
	if (currentSlide >= numberOfSlides - 1) {
		//Go to the first slide
		goToSlide(0);
		return;
	}
	currentSlide++;
	goToSlide(currentSlide);
});

//Previous button
prevBtn.addEventListener("click", () => {
	// If current slide is the first slide
	if (currentSlide <= 0) {
		// Go to the last slide
		goToSlide(numberOfSlides - 1);
		return;
	}
	currentSlide--;
	goToSlide(currentSlide);
});

// Slide Container Scroll
slideContainer.addEventListener("scroll", () => {
	// Check the number of pixels scrolled from the left side and divide by the slide width to get the current slide
	currentSlide = Math.round(slideContainer.scrollLeft / slideWidth);
	setActiveClass();
});


function goToSlide(slideNumber) {
	// Set the current slide on the screen
	slideContainer.scrollTo({
		left: slideWidth * slideNumber,
		behavior: "smooth"
	});
	
	currentSlide = slideNumber;
	
	setActiveClass();
}

function setActiveClass() {
	// Set active class for the slide
	let currentActive = document.querySelector(".slide.active");
	currentActive.classList.remove("active");
	slide[currentSlide].classList.add("active");
	
	// Set active class for the dots
	let currentDot = document.querySelector(".single-dot.active");
	currentDot.classList.remove("active");
	navigationDots.children[currentSlide].classList.add("active");
}


init();
