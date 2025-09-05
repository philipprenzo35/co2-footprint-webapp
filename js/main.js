// Navigation je nach Schriftkultur ausrichten
document.addEventListener("DOMContentLoaded", function () {
    const htmlDir = document.documentElement.getAttribute("dir");
    const nav = document.querySelector("nav ul");

    if (htmlDir === "rtl") {
        nav.style.justifyContent = "flex-end"; // rechts
    } else {
        nav.style.justifyContent = "flex-start"; // links
    }
});
