window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const tables = document.querySelectorAll("table.tab");
  const noResults = document.getElementById("no-results");
  const clearBtn = document.getElementById("clearSearch");

  // Search functionality
  searchBar?.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase().trim();
    let anyMatch = false;

    tables.forEach(table => {
      const para = table.querySelector(".pokemon-list");
      if (!para) return;

      const text = para.textContent.toLowerCase();
      if (text.includes(query)) {
        table.style.display = "table";
        anyMatch = true;
      } else {
        table.style.display = "none";
      }
    });

    noResults && (noResults.style.display = (!anyMatch && query !== "") ? "block" : "none");
  });

  // Clear search
  clearBtn?.addEventListener("click", () => {
    searchBar.value = "";
    noResults && (noResults.style.display = "none");
    tables.forEach(table => (table.style.display = "table"));
  });

  // Clickable Pokémon names with sound
  const pokemonLists = document.querySelectorAll(".pokemon-list");

  pokemonLists.forEach(p => {
    const names = p.textContent.split(",").map(name => name.trim()).filter(n => n);
    p.innerHTML = "";

    names.forEach((name, index) => {
      const link = document.createElement("a");
      link.href = `https://www.google.com/search?q=${encodeURIComponent(name + " pokemon")}`;
      link.target = "_blank";
      link.textContent = name;
      link.style.textDecoration = "none";
      link.style.color = "#0077cc";
      link.style.marginRight = "4px";

      // When any Pokémon is clicked, play Pikachu's sound
      link.addEventListener("click", (e) => {
        const sound = new Audio("sounds/pikachu.mp3");
        sound.play().catch(() => console.warn("Pikachu sound failed to play"));
        // Open search in new tab
        window.open(link.href, "_blank");
        e.preventDefault();
      });

      p.appendChild(link);
      if (index !== names.length - 1) {
        p.appendChild(document.createTextNode(", "));
      }

    });

    });
});
