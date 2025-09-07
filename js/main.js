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
// --- Filterfunktion ---
// Hilfsfunktion: Eingaben absichern 
function sanitizeInput(str) {
  if (!str) return "";
  return str
    .replace(/<\/?script[^>]*>/gi, "")   // <script>-Tags entfernen
    .replace(/[<>]/g, "")                // spitze Klammern entfernen
    .replace(/["'`]/g, "")               // Anführungszeichen raus
    .replace(/javascript:[^ ]*/gi, "")   // "javascript:"-URLs entfernen
    .replace(/\s+/g, " ")                // Leerzeichen normalisieren
    .trim()
    .slice(0, 120);                      // Länge begrenzen
}
//  Filterfunktion für Tabelle
document.getElementById("searchInput").addEventListener("keyup", function () {
  const raw = this.value;
  const filter = sanitizeInput(raw).toLowerCase();

  // Optional: Eingabe sofort bereinigen (sichtbar im Feld)
  if (raw !== filter) this.value = filter;

  const rows = document.querySelectorAll("#co2Table tbody tr");

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});

// --- Sortierfunktion ---
//  Sortierfunktion für Tabelle 
function sortTable(colIndex) {
  const table = document.getElementById("co2Table");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Prüfen, ob wir aktuell auf- oder absteigend sortieren
  const isAsc = table.getAttribute("data-sort-dir") !== "asc";
  table.setAttribute("data-sort-dir", isAsc ? "asc" : "desc");

  rows.sort((a, b) => {
    const cellA = a.cells[colIndex].textContent.trim();
    const cellB = b.cells[colIndex].textContent.trim();

    // Wenn es eine Zahl ist → numerisch sortieren
    const numA = parseFloat(cellA.replace(",", "."));
    const numB = parseFloat(cellB.replace(",", "."));

    if (!isNaN(numA) && !isNaN(numB)) {
      return isAsc ? numA - numB : numB - numA;
    }

    // Ansonsten alphabetisch
    return isAsc
      ? cellA.localeCompare(cellB, "de")
      : cellB.localeCompare(cellA, "de");
  });

  // Sortierte Zeilen zurück ins tbody einfügen
  rows.forEach(row => tbody.appendChild(row));
}
