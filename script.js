"use strict";
const comparisons = [...document.querySelectorAll("video[data-method]")];
const playButton = document.querySelector(".play-comparison");
const statusMessage = document.querySelector(".status-message");
let statusTimer;
let playbackEpoch = 0;
const automaticVideos = [...document.querySelectorAll("video[data-auto-loop]")];
const automaticState = new WeakMap();
automaticVideos.forEach(video => {
  video.muted = true;
  video.loop = true;
  automaticState.set(video, { visible: false, userPaused: false, internalPause: false });
});
function pauseAutomaticVideo(video) {
  if (!video.paused) {
    automaticState.get(video).internalPause = true;
    video.pause();
  }
}
function updateAutomaticVideo(video) {
  const state = automaticState.get(video);
  if (!state.visible || document.hidden) {
    pauseAutomaticVideo(video);
  } else if (!state.userPaused && video.paused) {
    video.play().catch(() => {});
  }
}
function notify(message) {
  clearTimeout(statusTimer);
  statusMessage.textContent = message;
  statusMessage.classList.add("visible");
  statusTimer = setTimeout(() => statusMessage.classList.remove("visible"), 5000);
}
function setVideo(video, name, dimensions) {
  const automatic = automaticState.get(video);
  if (automatic) pauseAutomaticVideo(video);
  else video.pause();
  video.setAttribute("width", dimensions[0]);
  video.setAttribute("height", dimensions[1]);
  video.querySelector("source").src = `${name}.mp4`;
  video.poster = `${name}.jpg`;
  const printPoster = video.parentElement.querySelector(".print-poster");
  if (printPoster) {
    printPoster.src = video.poster;
    printPoster.width = dimensions[0];
    printPoster.height = dimensions[1];
  }
  video.load();
  if (automatic) {
    automatic.userPaused = false;
    updateAutomaticVideo(video);
  }
}
function updatePlayButton() {
  playButton.textContent = comparisons.some(v => !v.paused && !v.ended) ? "Pause all" : "Play all";
}
const comparisonDimensions = { multiview: [1440,800], first_person: [720,640], third_person: [720,640], topdown_occupancy: [1020,886] };
document.querySelector("#comparison-view").addEventListener("change", e => {
  playbackEpoch++;
  const view = e.target.value;
  document.querySelector(".comparison-grid").dataset.view = view;
  comparisons.forEach(v => setVideo(v, `${v.dataset.method}-${view}`, comparisonDimensions[view]));
  updatePlayButton();
});
playButton.addEventListener("click", async () => {
  if (comparisons.some(v => !v.paused && !v.ended)) {
    playbackEpoch++;
    comparisons.forEach(v => v.pause());
  } else {
    const epoch = ++playbackEpoch;
    comparisons.forEach(v => { if (v.ended) v.currentTime = 0; });
    const results = await Promise.allSettled(comparisons.map(v => v.play()));
    if (epoch !== playbackEpoch) return;
    if (results.some(r => r.status === "rejected")) notify("Please use the individual video controls if your browser limits simultaneous playback.");
  }
  updatePlayButton();
});
comparisons.forEach(v => ["play","pause","ended"].forEach(event => v.addEventListener(event, updatePlayButton)));
const longDimensions = { "long-horizon": [1440,800], "long-horizon-first": [900,800], "long-horizon-third": [540,320], "long-horizon-map": [540,480] };
document.querySelector("#long-view").addEventListener("change", e => {
  const video = document.querySelector("#long-video");
  const dimensions = longDimensions[e.target.value];
  video.parentElement.classList.toggle("portrait", dimensions[0] / dimensions[1] < 1.3);
  setVideo(video, e.target.value, dimensions);
});
document.querySelectorAll("video").forEach(video => {
  video.addEventListener("error", () => notify("The video could not load. Please check your connection and try again."));
});
automaticVideos.forEach(video => {
  const state = automaticState.get(video);
  video.addEventListener("play", () => {
    state.internalPause = false;
    state.userPaused = false;
  });
  video.addEventListener("pause", () => {
    if (state.internalPause) {
      state.internalPause = false;
    } else if (video.paused && state.visible && !document.hidden) {
      state.userPaused = true;
    }
  });
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      automaticState.get(video).visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      updateAutomaticVideo(video);
    });
  }, { threshold: [0, 0.1] });
  automaticVideos.forEach(video => observer.observe(video));
} else {
  automaticVideos.forEach(video => {
    automaticState.get(video).visible = true;
    updateAutomaticVideo(video);
  });
}
document.addEventListener("visibilitychange", () => automaticVideos.forEach(updateAutomaticVideo));
