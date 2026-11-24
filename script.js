const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function showPhoto(file, slot) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = event => {
    const old = slot.querySelector("img");
    if (old) old.remove();
    const placeholder = slot.querySelector(".photo-placeholder");
    if (placeholder) placeholder.remove();
    const img = document.createElement("img");
    img.src = event.target.result;
    img.alt = "A memory added to the anniversary photo wall";
    slot.insertBefore(img, slot.querySelector(".caption"));
    showToast("A little memory added ♡");
  };
  reader.readAsDataURL(file);
}

document.querySelectorAll(".photo-input").forEach(input => {
  input.addEventListener("change", event => {
    const slot = event.target.closest(".photo-slot");
    showPhoto(event.target.files[0], slot);
  });
});

const morePhotos = document.getElementById("morePhotos");
morePhotos.addEventListener("change", event => {
  [...event.target.files].forEach(file => {
    const label = document.createElement("label");
    label.className = "polaroid photo-slot";
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = "photo-input";
    const placeholder = document.createElement("span");
    placeholder.className = "photo-placeholder";
    placeholder.innerHTML = "<b>＋</b><small>A new memory</small>";
    const caption = document.createElement("span");
    caption.className = "caption";
    caption.textContent = "another little moment ♡";
    label.append(input, placeholder, caption);
    document.getElementById("photoGrid").appendChild(label);
    showPhoto(file, label);
  });
  morePhotos.value = "";
});

document.getElementById("confettiButton").addEventListener("click", () => {
  const pieces = ["♡", "✿", "✦", "♥", "✧"];
  for (let i = 0; i < 34; i++) {
    const item = document.createElement("span");
    item.className = "confetti";
    item.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    item.style.left = Math.random() * 100 + "vw";
    item.style.animationDelay = Math.random() * 0.8 + "s";
    item.style.fontSize = (14 + Math.random() * 15) + "px";
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 3800);
  }
  showToast("Happy anniversary, Annu! Here's to chapter three ♡");
});
