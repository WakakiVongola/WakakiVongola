const carousel = document.getElementById("stack_carousel");
const categoryItems = document.querySelectorAll(".stack-selector li");

async function renderCategory(category) {
    carousel.innerHTML = "";

    try {
        const response = await fetch(`data/${category}.json`);
        const techList = await response.json();
        if (techList !== undefined){
            techList.forEach(tech => {
                const card = document.createElement("div");
                card.className = "tech-card";
                card.innerHTML = `
        <img src="${tech.logo || 'assets/not_found.png'}" alt="${tech.name}" onerror="this.onerror=null;this.src='assets/not_found.png';">
        <p>${tech.name}</p>
      `;
                carousel.appendChild(card);
            });
        }

    } catch (err) {
        console.error(`Erreur lors du chargement de ${category}.json`, err);
        carousel.innerHTML = `<p style="color:red;">Impossible de charger la stack ${category}</p>`;
    }
}

// Initialisation (catégorie par défaut : web)
renderCategory("web");

// Gestion des clics
categoryItems.forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".stack-selector li.active")?.classList.remove("active");
        item.classList.add("active");

        const category = item.dataset.category;
        renderCategory(category);
    });
});
