/* ==========================================================
   KepTopUp - form.js
   ========================================================== */

(() => {
    "use strict";

    /* =========================
       CONFIG
    ========================= */

    const STORAGE_KEY = "keptopup_selected_game";
    const WHATSAPP_NUMBER = "6281315441046";

    const ProductData = {
        "bloodstrike": {
            name: "Blood Strike",
            image: "bs.jpeg",
            currency: "Gold",
            items: [
            { amount: 100+5, price: 14000 },
            { amount: 300+20, price: 42000 },
            { amount: 500+40, price: 70000, bestSeller: true },
            { amount: 1000+100, price: 148000 }
            ]
        },

        "magic-chess": {
            name: "Magic Chess",
            image: "mcgg.webp",
            currency: "pass",
            items: [
            { amount: 5, price: 1500 },
            { amount: 12, price: 1500 },
            { amount: 19, price: 5500 },
            { amount: 44, price: 12000 },
            { amount: 85, price: 24000 },
            { amount: 170, price: 48000, bestSeller: true },
            { amount: 240, price: 68000 },
            { amount: 408, price: 115000 }
            ]
        },

        "mobile-legends": {
            name: "Mobile Legends",
            image: "ml.png.jpg",
            currency: "Diamond",
            items: [
            { amount: 5, price: 1500 },
            { amount: 12, price: 3400 },
            { amount: 19, price: 5200 },
            { amount: 44, price: 11000 },
            { amount: 86, price: 21000 },
            { amount: 170, price: 43000, bestSeller: true },
            { amount: 240, price: 61000 },
            { amount: 296, price: 75000 },
            { amount: 408, price: 130000 }
            ]
        },

        "free-fire": {
            name: "Free Fire",
            image: "ff.jpeg",
            currency: "Diamond",
            items: [
            { amount: 5, price: 1000 },
            { amount: 12, price: 2000 },
            { amount: 50, price: 8000 },
            { amount: 70, price: 10000 },
            { amount: 140, price: 19500 },
            { amount: 355, price: 49500, bestSeller: true },
            { amount: 720, price: 99500 },
            { amount: 1450, price: 199000 }
            ]
        },

        "pubg-mobile": {
            name: "PUBG Mobile",
            image: "pubg.jpeg",
            currency: "UC",
            items: [
            { amount: 300, price: 80000 },
            { amount: 600, price: 162000, bestSeller: true },
            { amount: 1500, price: 450000 }
            ]
        },

        "fc-mobile": {
            name: "FC Mobile",
            image: "fcmobile.png",
            currency: "Fc points",
            items: [
            { amount: 40, price: 7000 },
            { amount: 100, price: 16500 },
            { amount: 520, price: 88000, bestSeller: true },
            { amount: 1070, price: 177000 }
            ]
        },

        "pes": {
            name: "PES",
            image: "assets/pes.jpeg",
            currency: "eFootball coins",
            items: [
            { amount: 130, price: 19400 },
            { amount: 300, price: 43300 },
            { amount: 550, price: 80900, bestSeller: true },
            { amount: 1040, price: 153200 },
            { amount: 2130, price: 308200 }
            ]
        },

        "hok": {
            name: "Honor of Kings",
            image: "assets/hok.jpeg",
            currency: "Tokens",
            items: [
            { amount: 8, price: 1800 },
            { amount: 16, price: 3600 },
            { amount: 23, price: 4800 },
            { amount: 80, price: 15500 },            
            { amount: 240, price: 47000, bestSeller: true },
            { amount: 400, price: 78500 }
            ]
        }
    };

    /* =========================
       ELEMENTS
    ========================= */

    const form = document.getElementById("topup-form");
    const userIdInput = document.getElementById("user-id");

    const gameTitle = document.getElementById("game-title");
    const gameBannerImage = document.getElementById("game-banner-image");

    const nominalGrid = document.querySelector(".nominal-grid");
    const paymentInputs = document.querySelectorAll('input[name="payment"]');

    const summaryGame = document.getElementById("summary-game");
    const summaryUserId = document.getElementById("summary-user-id");
    const summaryNominal = document.getElementById("summary-nominal");
    const summaryPayment = document.getElementById("summary-payment");
    const summaryTotal = document.getElementById("summary-total");

    const toastContainer = document.getElementById("toast-container");

    /* =========================
       STATE
    ========================= */

    const selectedGameKey = localStorage.getItem(STORAGE_KEY);

    let selectedNominal = null;
    let selectedPayment = "";

    /* =========================
       UTILITIES
    ========================= */

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(value);
    };

    const showToast = (message) => {
        const toast = document.createElement("div");

        toast.className = "toast";
        toast.textContent = message;

        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = "1";
            toast.style.transform = "translateY(0)";
        });

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(12px)";

            setTimeout(() => toast.remove(), 300);
        }, 2500);
    };

    /* =========================
       VALIDATE GAME
    ========================= */

    if (!selectedGameKey || !ProductData[selectedGameKey]) {
        window.location.href = "index.html";
    }

    const currentGame = ProductData[selectedGameKey];

    /* =========================
       RENDER BANNER
    ========================= */

    const renderBanner = () => {
        gameTitle.textContent = currentGame.name;
        summaryGame.textContent = currentGame.name;

        gameBannerImage.src = currentGame.image;
        gameBannerImage.alt = currentGame.name;

        gameBannerImage.onerror = () => {
            gameBannerImage.src = "assets/default-game.jpeg";
        };
    };

    /* =========================
       RENDER NOMINALS
    ========================= */

    const renderNominals = () => {
        nominalGrid.innerHTML = "";

        currentGame.items.forEach((item) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            const amount = document.createElement("span");
            const price = document.createElement("span");

            label.className = "nominal-card";

            if (item.bestSeller) {
                label.classList.add("nominal-card--best");
            }

            input.type = "radio";
            input.name = "nominal";
            input.value = item.price;

            amount.className = "nominal-card__amount";
            amount.textContent = `${item.amount} ${currentGame.currency}`;

            price.className = "nominal-card__price";
            price.textContent = formatRupiah(item.price);

            input.addEventListener("change", () => {
                selectedNominal = item;
                updateSummary();
            });

            label.appendChild(input);
            label.appendChild(amount);
            label.appendChild(price);

            nominalGrid.appendChild(label);
        });
    };

    /* =========================
       PAYMENT EVENTS
    ========================= */

    const initializePayments = () => {
        paymentInputs.forEach((input) => {
            input.addEventListener("change", () => {
                selectedPayment = input.value;
                updateSummary();
            });
        });
    };

    /* =========================
       SUMMARY
    ========================= */

    const updateSummary = () => {
        summaryUserId.textContent =
            userIdInput.value.trim() || "-";

        summaryNominal.textContent = selectedNominal
            ? `${selectedNominal.amount} ${currentGame.currency}`
            : "-";

        summaryPayment.textContent = selectedPayment
            ? selectedPayment.toUpperCase()
            : "-";

        summaryTotal.textContent = selectedNominal
            ? formatRupiah(selectedNominal.price)
            : "Rp0";
    };

    /* =========================
       VALIDATION
    ========================= */

    const validateForm = () => {
        if (!userIdInput.value.trim()) {
            showToast("Masukkan User ID terlebih dahulu.");
            return false;
        }

        if (!selectedNominal) {
            showToast("Pilih nominal topup.");
            return false;
        }

        if (!selectedPayment) {
            showToast("Pilih metode pembayaran.");
            return false;
        }

        return true;
    };

    /* =========================
       WHATSAPP
    ========================= */

    const createMessage = () => {
        return [
            "Halo KepTopUp, saya ingin melakukan topup.",
            "",
            "📌 Detail Pesanan",
            `🎮 Game: ${currentGame.name}`,
            `🆔 User ID: ${userIdInput.value.trim()}`,
            `💎 Nominal: ${selectedNominal.amount} ${currentGame.currency}`,
            `💳 Pembayaran: ${selectedPayment.toUpperCase()}`,
            `💰 Total: ${formatRupiah(selectedNominal.price)}`,
            "",
            "Mohon diproses. Terima kasih."
        ].join("\n");
    };

    const redirectWhatsApp = () => {
        const message = encodeURIComponent(createMessage());

        window.location.href =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    };

    /* =========================
       EVENTS
    ========================= */

    userIdInput.addEventListener("input", updateSummary);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        redirectWhatsApp();
    });

    /* =========================
       INIT
    ========================= */

    renderBanner();
    renderNominals();
    initializePayments();
    updateSummary();

})();