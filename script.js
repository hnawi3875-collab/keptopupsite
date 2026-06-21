/* ==========================================================
   KepTopUp - Main Script
   ========================================================== */

(() => {
    "use strict";

    const STORAGE_KEY = "keptopup_selected_game";
    const REDIRECT_URL = "form.html";

    const loadingScreen = document.getElementById("loading-screen");
    const toastContainer = document.getElementById("toast-container");
    const gameCards = document.querySelectorAll(".game-card");

    /**
     * Fade out loading screen
     */
    const hideLoadingScreen = () => {
        if (!loadingScreen) return;

        loadingScreen.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";
        loadingScreen.style.pointerEvents = "none";

        window.setTimeout(() => {
            loadingScreen.remove();
        }, 600);
    };

    /**
     * Create toast notification
     * @param {string} message
     */
    const showToast = (message) => {
        if (!toastContainer) return;

        const toast = document.createElement("div");

        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        toast.textContent = message;

        toast.style.opacity = "0";
        toast.style.transform = "translateY(16px)";
        toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";

        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        });

        window.setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(16px)";

            window.setTimeout(() => {
                toast.remove();
            }, 300);
        }, 1800);
    };

    /**
     * Save selected game
     * @param {string} gameName
     */
    const saveSelectedGame = (gameName) => {
        localStorage.setItem(STORAGE_KEY, gameName);
    };

    /**
     * Remove active state from all cards
     */
    const resetActiveCards = () => {
        gameCards.forEach((card) => {
            card.classList.remove("active");
        });
    };

    /**
     * Fade out page before redirect
     */
    const redirectWithAnimation = (url) => {
        document.body.style.transition = "opacity 0.35s ease";
        document.body.style.opacity = "0";

        window.setTimeout(() => {
            window.location.href = url;
        }, 350);
    };

    /**
     * Handle card click
     * @param {HTMLElement} card
     */
    const handleCardClick = (card) => {
        const gameName = card.dataset.game;

        if (!gameName) return;

        resetActiveCards();
        card.classList.add("active");

        saveSelectedGame(gameName);

        const formattedName = gameName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        showToast(`${formattedName} dipilih`);

        window.setTimeout(() => {
            redirectWithAnimation(REDIRECT_URL);
        }, 800);
    };

    /**
     * Initialize game cards
     */
    const initializeGameCards = () => {
        gameCards.forEach((card) => {
            card.addEventListener("click", (event) => {
                event.preventDefault();
                handleCardClick(card);
            });
        });
    };

    /**
     * Initial page animation
     */
    const initializePageTransition = () => {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.35s ease";

        requestAnimationFrame(() => {
            document.body.style.opacity = "1";
        });
    };

    /**
     * Initialize application
     */
    const initialize = () => {
        initializePageTransition();
        initializeGameCards();
    };

    window.addEventListener("load", () => {
        hideLoadingScreen();
        initialize();
    });

})();
function toggleMenu() {
document
.getElementById("dropdownMenu")
.classList.toggle("show");
}
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}
function hubungiAdmin(){

let masalah =
document.getElementById("masalah").value;

if(masalah===""){
alert("Pilih masalah terlebih dahulu");
return;
}

let nomorAdmin =
"6285285497083"; // ganti nomor admin

let pesan =
"Halo Admin KepTopUp, saya mengalami masalah: "
+ masalah;

window.open(
"https://wa.me/" +
nomorAdmin +
"?text=" +
encodeURIComponent(pesan)
);

}