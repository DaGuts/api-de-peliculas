const container = document.getElementById('peliculas-container');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalLink = document.getElementById('modal-link');


fetch('http://localhost:3000/peliculas')  // 👈 Tu API en Node con MySQL
  .then(res => res.json())
  .then(peliculas => {
    peliculas.forEach(peli => {
      const card = document.createElement('div');
      card.className = 'pelicula-card';
      
      const imgHTML = peli.imagen ? 
        `<img src="${peli.imagen}" alt="${peli.titulo}">` : 
        `<div class="img-placeholder" style="background-color:${getRandomColor()}"></div>`;
      
      card.innerHTML = `${imgHTML}<h3>${peli.titulo}</h3>`;
      
      card.onclick = () => {
        modalTitle.textContent = peli.titulo;
        modalBody.innerHTML = '';

        if(peli.imagen){
          const img = document.createElement('img');
          img.src = peli.imagen;
          modalBody.appendChild(img);
        }

        const desc = document.createElement('p');
        desc.textContent = peli.descripcion;
        modalBody.appendChild(desc);

        modalLink.href = peli.enlace || "#";
        modal.style.display = 'block';
      };
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error cargando películas:", err));



function getRandomColor(){
  const letters = '0123456789ABCDEF';
  let color = '#';
  for(let i=0;i<6;i++){
      color += letters[Math.floor(Math.random()*16)];
  }
  return color;
}

app.get('/peliculas', (req, res) => {
  db.query('SELECT * FROM peliculas', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(results);
  });
});

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if(e.target == modal) modal.style.display='none'; };
