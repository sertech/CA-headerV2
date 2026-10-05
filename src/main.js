import gsap from "gsap";

const agroWindow = document.querySelector(".agro-window");

const rotateXTo = gsap.quickTo(agroWindow, "rotationX", {
    duration: 0.6,
    ease: "power3.out"
})

const rotateYTo = gsap.quickTo(agroWindow, "rotationY", {
    duration: 0.6,
    ease: "power3.out"
})

agroWindow.addEventListener("mousemove", (event) => {
    // windows tilt movement
    const rect = agroWindow.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    //  normalizing means converting the mouse's pixel coordinates into a relative coordinate system that goes from -0.5 to 0.5, centered perfectly in the middle of the element (rect)

    const normalizedX = mouseX / rect.width - 0.5;
    const normalizedY = mouseY / rect.height - 0.5;

    const maxRotation = 4;

    const rotateY = normalizedX * maxRotation * 2;
    const rotateX = normalizedY * -maxRotation * 2;

    rotateXTo(rotateX);
    rotateYTo(rotateY);

    // parallax effect
    const maxParallax = 18;
    const videoX = normalizedX * -maxParallax * 4;
    const videoY = normalizedY * -maxParallax * 4;

    videoXTo(videoX);
    videoYTo(videoY);
})

agroWindow.addEventListener("mouseleave", () => {
    rotateXTo(0);
    rotateYTo(0);

    videoXTo(0);
    videoYTo(0);
})

const agroVideo = agroWindow.querySelector(".agro-window__video");

const videoXTo = gsap.quickTo(agroVideo, "x", {
    duration: 0.7,
    ease: "power3.out"
})

const videoYTo = gsap.quickTo(agroVideo, "y", {
    duration: 0.7,
    ease: "power3.out"
})

// next and previous buttons
const cursor = document.querySelector(".agro-window__cursor");
const leftZone = document.querySelector(".agro-window__nav--left");
const rightZone = document.querySelector(".agro-window__nav--right");

if (cursor && leftZone && rightZone) {
    const cursorX = gsap.quickTo(cursor, "left", {
        duration: 0.18,
        ease: "power3.out",
    });

    const cursorY = gsap.quickTo(cursor, "top", {
        duration: 0.18,
        ease: "power3.out",
    });

    const showCursor = (symbol) => {
        cursor.textContent = symbol;

        gsap.to(cursor, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const hideCursor = () => {
        gsap.to(cursor, {
            opacity: 0,
            scale: 0.85,
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const moveCursor = (event) => {
        cursorX(event.clientX);
        cursorY(event.clientY);
    };

    leftZone.addEventListener("mouseenter", () => {
        showCursor("<");
    });

    rightZone.addEventListener("mouseenter", () => {
        showCursor(">");
    });

    leftZone.addEventListener("mousemove", moveCursor);
    rightZone.addEventListener("mousemove", moveCursor);

    leftZone.addEventListener("mouseleave", hideCursor);
    rightZone.addEventListener("mouseleave", hideCursor);
}

const slides = [
    {
        category: "Territorio",
        title: "Conoce el campo desde otra perspectiva",
        heroSubtitle: "Conocemos cómo se produce hoy para entender el agro del mañana",
        background:
            "https://censoagropecuario.ine.gob.bo/wp-content/uploads/2026/09/C1v2.png",

        poster:
            "https://censoagropecuario.ine.gob.bo/wp-content/uploads/2026/09/C1v2.png",

        webm: "",
        mp4: "",
    },

    {
        category: "Producción",
        title: "Descubre lo que produce nuestro territorio",
        heroSubtitle: "Conocemos cómo se produce hoy para entender el agro del mañana",
        background:
            "https://censoagropecuario.ine.gob.bo/wp-content/uploads/2026/09/soyaField.png",

        poster:
            "https://censoagropecuario.ine.gob.bo/wp-content/uploads/2026/04/soya-zoom.jpg",

        webm: "",
        mp4: "",
    },

    {
        category: "Personas",
        title: "Las personas detrás del campo boliviano",
        background: "",
        poster: "",
        webm: "",
        mp4: "",
    },

    {
        category: "Datos",
        title: "Información que ayuda a comprender el presente",
        background: "",
        poster: "",
        webm: "",
        mp4: "",
    },

    {
        category: "Futuro",
        title: "Datos para construir el agro del mañana",
        background: "",
        poster: "",
        webm: "",
        mp4: "",
    },
];

function preloadSlides() {
    slides.forEach((slide) => {
        if (slide.background) {
            const backgroundImage = new Image();
            backgroundImage.src = slide.background;
        }

        if (slide.poster) {
            const posterImage = new Image();
            posterImage.src = slide.poster;
        }
    });
}

preloadSlides();

let currentSlide = 0;

const windowVideo = document.querySelector(".agro-window__video video");
const windowCategory = document.querySelector(".agro-window__caption span");
const windowTitle = document.querySelector(".agro-window__caption strong");
const heroBackground = document.querySelector(".agro-hero__background:not(.agro-hero__background--next)");
const heroBackgroundNext = document.querySelector(".agro-hero__background--next");
const counterCurrent = document.querySelector(".agro-window__counter-current");
const counterTotal = document.querySelector(".agro-window__counter-total");
const topicItems = document.querySelectorAll(".agro-hero__topics span");
const heroSubtitle = document.querySelector(".agro-hero__subtitle");


if (heroBackground && slides[currentSlide].background) {
    heroBackground.style.backgroundImage =
        `url("${slides[currentSlide].background}")`;
}

function updateActiveTopic(index) {
    topicItems.forEach((item, itemIndex) => {
        item.classList.toggle("is-active", itemIndex === index)
    })
}

function renderSlide(index) {
    const slide = slides[index];
    updateActiveTopic(index);

    if (!slide || !windowVideo || !windowCategory || !windowTitle) {
        return;
    }

    if (counterCurrent) {
        counterCurrent.textContent = String(index + 1).padStart(2, "0")
    }

    if (heroSubtitle && slide.heroSubtitle) {
        heroSubtitle.textContent = slide.heroSubtitle;
    }

    windowCategory.textContent = slide.category;
    windowTitle.textContent = slide.title;

    windowVideo.poster = slide.poster || "";

    const sources = windowVideo.querySelectorAll("source");

    if (sources[0]) {
        sources[0].src = slide.webm || "";
    }

    if (sources[1]) {
        sources[1].src = slide.mp4 || "";
    }

    windowVideo.load();
}

renderSlide(currentSlide);

// button functionality 
const prevButton = document.querySelector(".agro-window__control--prev")
const nextButton = document.querySelector(".agro-window__control--next")

if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
        animateControl(prevButton, -1)
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        changeSlide(newIndex, -1);
    })

    nextButton.addEventListener("click", () => {
        animateControl(nextButton, 1)
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        changeSlide(newIndex, 1)
    })
}

// change slide with simple animation
let isAnimating = false;

function changeSlide(newIndex, direction = 1) {
    if (isAnimating) return;
    isAnimating = true;

    const distance = 40 * direction;

    changeBackground(slides[newIndex].background);

    gsap.to(counterCurrent, {
        opacity: 0,
        y: -6,
        duration: 0.18,
        ease: "power2.in"
    })

    gsap.to(".agro-window__video, .agro-window__caption", {
        opacity: 0,
        x: -distance,
        scale: 0.97,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            gsap.set(counterCurrent, {
                y: 6
            })

            gsap.to(counterCurrent, {
                opacity: 1,
                y: 0,
                duration: 0.28,
                ease: "power2.out"
            })

            currentSlide = newIndex;
            renderSlide(currentSlide);

            gsap.set(".agro-window__video, .agro-window__caption", {
                x: distance,
                scale: 1.03
            })

            gsap.to(".agro-window__video, .agro-window__caption", {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.45,
                ease: "power3.out",
                onComplete: () => { isAnimating = false }
            })
        }
    })
}

function changeBackground(imgUrl) {
    if (!imgUrl || !heroBackground || !heroBackgroundNext) {
        return
    }

    heroBackgroundNext.style.backgroundImage = `url("${imgUrl}")`;

    gsap.set(heroBackgroundNext, {
        opacity: 0,
        scale: 1.06,
    })

    gsap.to(heroBackgroundNext, {
        opacity: 1,
        scale: 1.03,
        duration: 1.1,
        ease: "power2.out",
        onComplete: () => {
            heroBackground.style.backgroundImage = `url("${imgUrl}")`;
            gsap.set(heroBackgroundNext, {
                opacity: 0,
                scale: 1.03,
            })
        }
    })
}

function animateControl(button, direction = 1) {
    gsap.fromTo(
        button,
        {
            scale: 1,
            x: 0,
        },
        {
            scale: 0.92,
            x: 6 * direction,
            duration: 0.12,
            ease: "power2.in",
            yoyo: true,
            repeat: 1,
        }
    );
}

// slides counter
if (counterTotal) {
    counterTotal.textContent = String(slides.length).padStart(2, "0")
}

// intro animation
function introAnimation() {
    const timeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    })

    timeline
        .from(".agro-hero__topics", {
            opacity: 0,
            y: -10,
            duration: 0.5
        }).
        from(".agro-hero__title-line--main", {
            opacity: 0,
            y: 25,
            duration: 0.6
        }, "-=0.25")
        .from(".agro-hero__title-line--secondary", {
            opacity: 0,
            y: 12,
            duration: 0.5,
        }, "-=0.3")
        .from(".agro-window-shell", {
            opacity: 0,
            y: 35,
            scale: 0.97,
            duration: 0.9
        }, "-=0.35")
}

introAnimation()