/* =========================================
   ARTGRID CLOUD
   Seven Wonders Interactive Animation
========================================= */

const wonders = document.querySelectorAll(".wonder");

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;


/* =========================================
   DESKTOP MOUSE PARALLAX
========================================= */

document.addEventListener("mousemove", (event) => {

  targetX =
    (event.clientX / window.innerWidth - 0.5);

  targetY =
    (event.clientY / window.innerHeight - 0.5);

});


/* =========================================
   SMOOTH MOVEMENT
========================================= */

function animateParallax() {

  mouseX +=
    (targetX - mouseX) * 0.04;

  mouseY +=
    (targetY - mouseY) * 0.04;


  wonders.forEach((wonder) => {

    const depth =
      Number(wonder.dataset.depth) || 0.5;


    const moveX =
      mouseX * 35 * depth;

    const moveY =
      mouseY * 25 * depth;


    wonder.style.marginLeft =
      moveX + "px";

    wonder.style.marginTop =
      moveY + "px";

  });


  requestAnimationFrame(
    animateParallax
  );

}


animateParallax();


/* =========================================
   RESET WHEN MOUSE LEAVES
========================================= */

document.addEventListener(
  "mouseleave",
  () => {

    targetX = 0;
    targetY = 0;

  }
);


/* =========================================
   PHONE / TABLET TILT
========================================= */

function activateDeviceTilt() {

  window.addEventListener(
    "deviceorientation",
    (event) => {

      if (
        event.gamma === null ||
        event.beta === null
      ) {
        return;
      }


      /*
        gamma = left/right tilt
        beta  = front/back tilt
      */

      const gamma =
        Math.max(
          -30,
          Math.min(
            30,
            event.gamma
          )
        );


      const beta =
        Math.max(
          -30,
          Math.min(
            30,
            event.beta - 45
          )
        );


      targetX =
        gamma / 60;

      targetY =
        beta / 60;

    }
  );

}


/* =========================================
   iPHONE / iPAD MOTION PERMISSION
========================================= */

function requestMotionPermission() {

  if (
    typeof DeviceOrientationEvent !==
      "undefined" &&

    typeof DeviceOrientationEvent
      .requestPermission ===
      "function"
  ) {

    DeviceOrientationEvent
      .requestPermission()

      .then((permissionState) => {

        if (
          permissionState ===
          "granted"
        ) {

          activateDeviceTilt();

        }

      })

      .catch(() => {

        /* Site still works without tilt */

      });

  }

  else {

    activateDeviceTilt();

  }

}


/* =========================================
   FIRST USER TOUCH

   iOS requires user interaction before
   motion access can be requested.
========================================= */

document.addEventListener(
  "touchstart",
  requestMotionPermission,
  {
    once: true
  }
);


/* =========================================
   SUBTLE RANDOM DRIFT

   Gives the buildings a slightly less
   mechanical floating feeling.
========================================= */

function addNaturalDrift() {

  wonders.forEach((wonder) => {

    const randomX =
      (Math.random() - 0.5) * 5;

    const randomY =
      (Math.random() - 0.5) * 4;


    wonder.style.marginLeft =
      (
        parseFloat(
          wonder.style.marginLeft
        ) || 0
      )
      + randomX
      + "px";


    wonder.style.marginTop =
      (
        parseFloat(
          wonder.style.marginTop
        ) || 0
      )
      + randomY
      + "px";

  });

}


/* Small variation every few seconds */

setInterval(
  addNaturalDrift,
  5000
);