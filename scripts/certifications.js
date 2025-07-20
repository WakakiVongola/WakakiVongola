async function loadCertifications() {
    const response = await fetch('data/certificats.json');
    const data = await response.json();
    const container = document.getElementById('certifications_list');

    data.forEach(certif => {
        const card = document.createElement('div');
        card.className = 'certif-card';

        const imagePath = certif.image ?? 'assets/not_found.png';

        card.innerHTML = `
            <img src="${imagePath}" alt="${certif.title}" onerror="this.onerror=null; this.src='assets/not_found.png';" />
            <div class="certif-info">
                <span class="certif-date">${certif.date}</span>
                <h3>${certif.title}</h3>
            </div>
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadCertifications);
