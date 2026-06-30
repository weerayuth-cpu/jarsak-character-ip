const promptText = document.querySelector("#promptText");
const copyPrompt = document.querySelector("#copyPrompt");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");

copyPrompt.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(promptText.textContent.trim());
    copyPrompt.textContent = "Copied";
    setTimeout(() => {
      copyPrompt.textContent = "Copy Prompt";
    }, 1200);
  } catch {
    copyPrompt.textContent = "Copy manually";
    setTimeout(() => {
      copyPrompt.textContent = "Copy Prompt";
    }, 1600);
  }
});

function openLightbox(image) {
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "Image preview";
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
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
