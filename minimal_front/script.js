const TILE_WIDTH = 30; // Largeur des cases
const GRID_ROWS = 20; // Nombre de lignes
const GRID_COLS = 16; // Nombre de colonnes
const NIGHT_BLUE = "#6e1562"; // Couleur de fond
const player = document.getElementById('player'); // Récupération du personnage
let position = 99; // Position initiale du personnage


function addTiles(grid) {
    // Définir la disposition des colonnes et des lignes
    grid.style.gridTemplateColumns = `repeat(${GRID_COLS}, ${TILE_WIDTH}px)`;
    grid.style.gridTemplateRows = `repeat(${GRID_ROWS}, ${TILE_WIDTH}px)`;

    // Ajouter les tiles à la grille
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            let div = document.createElement('div');
            div.className = 'tile';
            div.style.width = `${TILE_WIDTH}px`;
            div.style.height = `${TILE_WIDTH}px`;
            div.style.backgroundColor = NIGHT_BLUE;

            // Attribuer des propriétés pour identification
            div.row = row;
            div.col = col;

            // Ajout des divs à la grille
            grid.appendChild(div);
        }
    }
}

// Initialiser la grille
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("my_grid");
    addTiles(grid);
});



 // Fonction pour déplacer le personnage
 function movePlayer(event) {
    const step = 10; // Distance à parcourir à chaque mouvement

    // Flèche gauche
    if (event.key === 'ArrowLeft' || event.key === 'Left') {
        playerPosition = Math.max(0, playerPosition - step); //vérifie que si il est au bord on s'arrête au 0
    }

    // Flèche droite
    if (event.key === 'ArrowRight' || event.key === 'Right') {
        playerPosition = Math.min(containerWidth - playerWidth, playerPosition + step);
    }//Cela empêche le personnage de sortir du conteneur par la droite. La limite est calculée en soustrayant la largeur du personnage de la largeur du conteneur.

    // Mise à jour de la position du personnage
    player.style.left = playerPosition + 'px';

    // Si la touche Espace est pressée, on déclenche un tir
    if (event.key === ' ' || event.key === 'Spacebar') {
        shoot();
    }
}
function shoot() {
    const bullet = document.createElement('balle'); // Créer une balle
    bullet.className = 'bullet'; // configuré dans le css

    // Positionner la balle devant le joueur
    bullet.style.left = (position + 20) + 'px'; // Centrer la balle
    //On positionne la balle horizontalement juste devant le joueur en utilisant la variable position, qui contient la position actuelle du joueur. position + 20 est utilisé pour ajuster la position de la balle afin qu'elle ne commence pas exactement sur le joueur, mais légèrement devant lui . On ajoute 'px' pour que la valeu soit comprise comme une mesure en pixels.
    bullet.style.bottom = '50px'; // Juste au-dessus du joueur. Cela positionne la balle juste au-dessus du joueur, en plaçant la balle à une distance de 50px.

    row_container.appendChild(bullet);

    // Faire monter la balle 
    const moveUp = setInterval(() => {
        const bottom = parseInt(bullet.style.bottom);
        bullet.style.bottom = (bottom + 5) + 'px';

        if (bottom > 600) { // Si la balle dépasse l'écran
            bullet.remove(); // Supprime la balle
            clearInterval(moveUp); // Arrête l'animation
        }
    }, 50); // Chaque 50 ms, la balle monte
}


    




