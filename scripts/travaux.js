async function loadTravaux() {
    const response = await fetch('data/travaux.json');
    const data = await response.json();
    const container = document.getElementById('travaux_carousel');

    data.forEach(travail => {
        const card = document.createElement('a');
        card.href = travail.url;
        card.className = 'travail-card';
        card.target = '_blank';

        const imagePath = travail.image || 'assets/not_found.png';

        card.innerHTML = `
        <img src="${imagePath}" alt="${travail.title}" onerror="this.onerror=null; this.src='assets/not_found.png';" />
        <div class="travail-info">
            <h3>${travail.title}</h3>
            <p>${travail.description}</p>
        </div>
    `;

        container.appendChild(card);
    });


    // DUPLIQUE les cartes pour permettre une transition "infinie"
    data.forEach(travail => {
        const clone = document.createElement('a');
        clone.href = travail.url;
        clone.className = 'travail-card';
        clone.target = '_blank';
        clone.innerHTML = `
            <img src="${travail.image}" alt="${travail.title}" />
            <div class="travail-info">
                <h3>${travail.title}</h3>
                <p>${travail.description}</p>
            </div>
        `;
        container.appendChild(clone);
    });
}


function autoScrollCarousel(containerId, speed = 1) {
    const container = document.getElementById(containerId);

    let scrollAmount = 0;
    setInterval(() => {
        container.scrollLeft += speed;
        scrollAmount += speed;
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
            scrollAmount = 0;
        }
    }, 22);
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadTravaux();
    autoScrollCarousel('travaux_carousel', 1);
});
