/* =========================================
   SEVEN WONDERS
   SLOW FLOATING LEFT → RIGHT
========================================= */

const wonderSettings = {

  chichen: {
    duration: 52000,
    start: 0.05,
    bob: 15,
    phase: 0
  },

  colosseum: {
    duration: 46000,
    start: 0.28,
    bob: 22,
    phase: 1.2
  },

  petra: {
    duration: 58000,
    start: 0.70,
    bob: 18,
    phase: 2.4
  },

  taj: {
    duration: 50000,
    start: 0.52,
    bob: 20,
    phase: 3.1
  },

  christ: {
    duration: 62000,
    start: 0.12,
    bob: 15,
    phase: 4.2
  },

  machu: {
    duration: 56000,
    start: 0.45,
    bob: 21,
    phase: 5.2
  },

  greatwall: {
    duration: 65000,
    start: 0.76,
    bob: 24,
    phase: 6.1
  }

};


const wonders =
  document.querySelectorAll(".wonder");


/* Hide only images that genuinely fail */

document
  .querySelectorAll(".wonder img")
  .forEach((img) => {

    img.addEventListener(
      "error",
      function () {

        console.log(
          "Image failed:",
          img.src
        );

        img
          .closest(".wonder")
          .style.display = "none";

      }
    );

  });


const startingTime =
  performance.now();


function animate(now) {

  const elapsed =
    now - startingTime;


  wonders.forEach((wonder) => {

    if (
      wonder.style.display === "none"
    ) {
      return;
    }


    const settings =
      wonderSettings[wonder.id];


    if (!settings) {
      return;
    }


    const width =
      wonder.offsetWidth || 300;


    /*
      Travel begins just outside left edge
      and ends just outside right edge.
    */

    const startX =
      -width - 40;


    const endX =
      window.innerWidth + 40;


    const totalDistance =
      endX - startX;


    /*
      start determines where the wonder
      is when the page first loads.

      This means we do NOT wait 30 seconds
      before seeing the Colosseum.
    */

    const cycle =
      (
        elapsed /
        settings.duration +
        settings.start
      ) % 1;


    const x =
      startX +
      totalDistance *
      cycle;


    /*
      Gentle vertical floating
    */

    const y =
      Math.sin(
        elapsed * 0.001 +
        settings.phase
      ) *
      settings.bob;


    /*
      Tiny natural rotation
    */

    const rotation =
      Math.sin(
        elapsed * 0.00065 +
        settings.phase
      ) *
      0.8;


    /*
      Very subtle scale movement
    */

    const scale =
      1 +
      Math.sin(
        elapsed * 0.00045 +
        settings.phase
      ) *
      0.012;


    wonder.style.transform =
      `translate3d(
        ${x}px,
        ${y}px,
        0
      )
      rotate(${rotation}deg)
      scale(${scale})`;

  });


  requestAnimationFrame(animate);

}


requestAnimationFrame(animate);