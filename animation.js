/* =========================================
   SEVEN WONDERS — FLOAT ACROSS THE SKY
========================================= */

const wonders = document.querySelectorAll(".wonder");


/* =========================================
   SETTINGS
========================================= */

const wonderSettings = {
  chichen: {
    speed: 0.018,
    delay: 0,
    amplitude: 18,
    phase: 0
  },

  colosseum: {
    speed: 0.022,
    delay: 1800,
    amplitude: 24,
    phase: 1.1
  },

  petra: {
    speed: 0.017,
    delay: 3600,
    amplitude: 20,
    phase: 2.3
  },

  taj: {
    speed: 0.020,
    delay: 5400,
    amplitude: 22,
    phase: 3.2
  },

  christ: {
    speed: 0.016,
    delay: 7200,
    amplitude: 16,
    phase: 4.4
  },

  machu: {
    speed: 0.019,
    delay: 9000,
    amplitude: 21,
    phase: 5.1
  },

  greatwall: {
    speed: 0.015,
    delay: 10800,
    amplitude: 25,
    phase: 6.2
  }
};


/* =========================================
   STATE
========================================= */

const startTime = performance.now();


wonders.forEach((wonder) => {

  const id = wonder.id;

  const settings =
    wonderSettings[id] || {
      speed: 0.018,
      delay: 0,
      amplitude: 20,
      phase: 0
    };


  wonder.dataset.speed = settings.speed;
  wonder.dataset.delay = settings.delay;
  wonder.dataset.amplitude = settings.amplitude;
  wonder.dataset.phase = settings.phase;

});


/* =========================================
   ANIMATE
========================================= */

function animate(timestamp) {

  const elapsed =
    timestamp - startTime;


  const screenWidth =
    window.innerWidth;


  wonders.forEach((wonder) => {

    if (
      wonder.style.display === "none"
    ) {
      return;
    }


    const delay =
      Number(wonder.dataset.delay);


    const speed =
      Number(wonder.dataset.speed);


    const amplitude =
      Number(wonder.dataset.amplitude);


    const phase =
      Number(wonder.dataset.phase);


    const width =
      wonder.offsetWidth || 250;


    /*
      Travel distance includes space
      beyond both sides of the screen.
    */

    const travelDistance =
      screenWidth + width * 2;


    /*
      Keep each wonder offscreen
      until its starting delay.
    */

    if (elapsed < delay) {

      wonder.style.transform =
        `translate3d(${-width * 1.3}px, 0px, 0)`;

      return;

    }


    const localTime =
      elapsed - delay;


    /*
      Horizontal progress.
      When it reaches the far right,
      it loops back to the left.
    */

    const progress =
      (
        localTime *
        speed
      ) %
      travelDistance;


    const x =
      -width * 1.3 +
      progress;


    /*
      Gentle vertical floating.
    */

    const y =
      Math.sin(
        localTime * 0.0012 +
        phase
      ) *
      amplitude;


    /*
      Tiny rotation makes the
      islands feel less mechanical.
    */

    const rotation =
      Math.sin(
        localTime * 0.0007 +
        phase
      ) *
      1.1;


    /*
      Very subtle scale pulse.
    */

    const scale =
      1 +
      Math.sin(
        localTime * 0.0005 +
        phase
      ) *
      0.015;


    wonder.style.transform =
      `
      translate3d(
        ${x}px,
        ${y}px,
        0
      )
      rotate(${rotation}deg)
      scale(${scale})
      `;

  });


  requestAnimationFrame(animate);

}


requestAnimationFrame(animate);


/* =========================================
   HIDE MISSING IMAGES
========================================= */

document
  .querySelectorAll(".wonder img")
  .forEach((image) => {

    image.addEventListener(
      "error",
      function() {

        const parent =
          image.closest(".wonder");


        if (parent) {
          parent.style.display =
            "none";
        }

      }
    );

  });


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
  "resize",
  () => {

    /*
      requestAnimationFrame automatically
      uses the new screen width on the
      next frame.
    */

  }
);