async function loadTimeline() {
    const response = await fetch('data/parcours.json');
    const data = await response.json();
    const container = document.getElementById('timeline');

    data.forEach(event => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');

        item.innerHTML = `
      <div class="timeline-date">${event.date}</div>
      <div class="timeline-content">
        <h3>${event.title}</h3>
        ${event.description ? `<p>${event.description}</p>` : ''}
      </div>
    `;

        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadTimeline);