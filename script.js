const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");

settingsBtn.addEventListener("click", () => {
    settingsModal.classList.remove("hidden");
});

closeSettings.addEventListener("click", () => {
    settingsModal.classList.add("hidden");
});

console.log("Settings merge!");
