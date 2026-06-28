const masterPrompt = [
  "Thai male English confidence coach named Jarsak, age 35, warm trustworthy face, approachable smile, short natural black hair with light texture, clean modern casual black knit shirt, minimal watch,",
  "sitting or standing in a cozy modern learning studio with books, notebook, laptop, warm cinematic black and gold OpenDurian visual tone, natural realistic photography, confident but kind, helping learners speak English with courage,",
  "premium education brand, soft warm key light, shallow depth of field."
].join(" ");

const negativePrompt = [
  "Negative prompt: celebrity likeness, influencer look, cartoon mascot, luxury fashion model, aggressive teacher, overly formal corporate trainer, fantasy character, child, elderly man, messy classroom, neon cyberpunk,",
  "exaggerated muscles, heavy beard, glasses as default, suit and tie as default, random logos, unreadable text."
].join(" ");

const pose = document.querySelector("#pose");
const expression = document.querySelector("#expression");
const useCase = document.querySelector("#useCase");
const output = document.querySelector("#promptOutput");
const copyButton = document.querySelector("#copyPrompt");

function buildPrompt() {
  return [
    `${masterPrompt}`,
    `Pose: ${pose.value}.`,
    `Expression: ${expression.value}.`,
    `Use case: ${useCase.value}.`,
    "Use jarsak-face-lock.png and jarsak-master-portrait.png as high-strength image references.",
    negativePrompt
  ].join("\n\n");
}

function refreshPrompt() {
  output.value = buildPrompt();
  output.textContent = buildPrompt();
}

[pose, expression, useCase].forEach((control) => {
  control.addEventListener("change", refreshPrompt);
});

copyButton.addEventListener("click", async () => {
  const prompt = buildPrompt();
  try {
    await navigator.clipboard.writeText(prompt);
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy Prompt";
    }, 1400);
  } catch {
    output.focus();
  }
});

refreshPrompt();

const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector(".lightbox-close");

function openLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Full image preview";
  lightboxCaption.textContent = image.alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".zoomable").forEach((image) => {
  image.addEventListener("click", () => openLightbox(image));
  image.setAttribute("tabindex", "0");
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
