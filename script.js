const masterPrompt = [
  "Original fictional Thai male English confidence coach named JARSAK v2, age 35-38, realistic human, warm sincere eyes,",
  "thin rectangular stainless-steel eyeglasses with clear lenses, short neat black hair, black knit shirt, simple watch,",
  "documentary editorial photography, real camera feel, natural skin texture, no AI gloss."
].join(" ");

const negativePrompt = [
  "Negative prompt: celebrity likeness, AI gloss, plastic skin, perfect model face, thick black frames, sunglasses,",
  "suit, tie, dark moody studio, heavy gold glow, text, logo, watermark, distorted hands."
].join(" ");

const useCase = document.querySelector("#useCase");
const locationSelect = document.querySelector("#location");
const expression = document.querySelector("#expression");
const output = document.querySelector("#promptOutput");
const copyButton = document.querySelector("#copyPrompt");

function buildPrompt() {
  return [
    masterPrompt,
    `Use case: ${useCase.value}.`,
    `Location: ${locationSelect.value}.`,
    `Expression: ${expression.value}.`,
    "Brand phrase: แค่กล้าพูด ก็พูดได้.",
    negativePrompt
  ].join("\n\n");
}

function refreshPrompt() {
  output.textContent = buildPrompt();
}

[useCase, locationSelect, expression].forEach((control) => {
  control.addEventListener("change", refreshPrompt);
});

copyButton.addEventListener("click", async () => {
  const prompt = buildPrompt();
  try {
    await navigator.clipboard.writeText(prompt);
    copyButton.textContent = "Copied";
    setTimeout(() => {
      copyButton.textContent = "Copy Prompt";
    }, 1200);
  } catch {
    output.textContent = `${prompt}\n\nCopy manually from this box.`;
  }
});

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
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

refreshPrompt();
