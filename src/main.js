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