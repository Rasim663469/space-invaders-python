const TILE_WIDTH = 30; // Largeur des cases
const GRID_ROWS = 20; // Nombre de lignes
const GRID_COLS = 16; // Nombre de colonnes
const NIGHT_BLUE = "#6e1562"; // Couleur de fond
const player = document.getElementById('player'); // Récupération du personnage
let score=0;
function addTiles(grid) {
    // Définir la disposition des colonnes et des lignes
    grid.style.gridTemplateColumns = `repeat(${GRID_COLS}, ${TILE_WIDTH}px)`;
    grid.style.gridTemplateRows = `repeat(${GRID_ROWS}, ${TILE_WIDTH}px)`;

    // Ajouter les tiles à la grille
   
        for (let col = 0; col < GRID_COLS; col++) {
            for (let row = 0; row < GRID_ROWS; row++) {
            let div = document.createElement('div');
            div.className = 'tile';
            // div.style.width = `${TILE_WIDTH}px`;
            // div.style.height = `${TILE_WIDTH}px`;
            // div.style.backgroundColor = NIGHT_BLUE;

            // Attribuer des propriétés pour identification
            div.row = row;
            div.col = col;

            // Ajout des divs à la grille
            grid.appendChild(div);
        }
    }
}





//  // Fonction pour déplacer le personnage
//  function movePlayer(event) {
//     const step = 10; // Distance à parcourir à chaque mouvement

//     // Flèche gauche
//     if (event.key === 'ArrowLeft' || event.key === 'Left') {
//         playerPosition = Math.max(0, playerPosition - step); //vérifie que si il est au bord on s'arrête au 0
//     }

//     // Flèche droite
//     if (event.key === 'ArrowRight' || event.key === 'Right') {
//         playerPosition = Math.min(containerWidth - playerWidth, playerPosition + step);
//     }//Cela empêche le personnage de sortir du conteneur par la droite. La limite est calculée en soustrayant la largeur du personnage de la largeur du conteneur.

//     // Mise à jour de la position du personnage
//     player.style.left = playerPosition + 'px';

//     // Si la touche Espace est pressée, on déclenche un tir
//     if (event.key === ' ' || event.key === 'Spacebar') {
//         shoot();
//     }
// }

// function shoot() {
//     const bullet = document.createElement('balle'); // Créer une balle
//     bullet.className = 'bullet'; // configuré dans le css

//     // Positionner la balle devant le joueur
//     bullet.style.left = (position + 20) + 'px'; // Centrer la balle
//     //On positionne la balle horizontalement juste devant le joueur en utilisant la variable position, qui contient la position actuelle du joueur. position + 20 est utilisé pour ajuster la position de la balle afin qu'elle ne commence pas exactement sur le joueur, mais légèrement devant lui . On ajoute 'px' pour que la valeu soit comprise comme une mesure en pixels.
//     bullet.style.bottom = '50px'; // Juste au-dessus du joueur. Cela positionne la balle juste au-dessus du joueur, en plaçant la balle à une distance de 50px.

//     row_container.appendChild(bullet);

//     // Faire monter la balle 
//     const moveUp = setInterval(() => {
//         const bottom = parseInt(bullet.style.bottom);
//         bullet.style.bottom = (bottom + 5) + 'px';

//         if (bottom > 600) { // Si la balle dépasse l'écran
//             bullet.remove(); // Supprime la balle
//             clearInterval(moveUp); // Arrête l'animation
//         }
//     }, 50); // Chaque 50 ms, la balle monte
// }


const grid = document.getElementById("my_grid");
const bullet = document.getElementById('bullet'); 
addTiles(grid);

player.style.left = "240px"
pos_player_px = 240 + 50 / 2;
pos_player = 8;
console.log(Math.floor(pos_player))

function createBullet(player) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    bullet.style.left = (player.offsetLeft + player.offsetWidth / 2 - 5) + 'px'; // Position centrée sur le joueur
    bullet.style.bottom = (parseInt(window.getComputedStyle(player).bottom, 10) + 50) + 'px'; // Position initiale
    document.getElementById("my_grid").appendChild(bullet);
    deplacementBalle(bullet); // Déplace la balle vers le haut
}


function deplacementBalle(bullet) {
    const moveUp = setInterval(() => {
        const bottom = parseInt(window.getComputedStyle(bullet).bottom, 10);
        bullet.style.bottom = (bottom + 10) + 'px'; // Déplace la balle vers le haut

        // Vérifier les collisions avec tous les ennemis
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            if (checkCollision(bullet, enemy)) {
                bullet.remove(); // Supprime la balle
                enemy.remove(); // Supprime l'ennemi
                clearInterval(moveUp); // Arrête le déplacement de la balle
                score = (score + 1);
                document.getElementById("score").innerHTML=score;
            }
        });

        if (bottom > document.getElementById("my_grid").offsetHeight) {
            bullet.remove(); // Supprime la balle lorsqu'elle sort de l'écran
            clearInterval(moveUp); // Arrête le déplacement
        }
    }, 50);
}


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Empêche le comportement par défaut de la barre d'espace
        const player = document.getElementById('player');
        createBullet(player); // Crée une balle
    }
});

window.addEventListener("keydown", function (event) {

    if (event.defaultPrevented) {
      return;
    }
  
    switch (event.key) {
        
      case "ArrowLeft":
        const currentRight = parseInt(window.getComputedStyle(player).left, 10);
        if (currentRight>8){
            player.style.left = (currentRight - 10) + 'px';      
        }
        break;
      case "ArrowRight":
        const currentLeft = parseInt(window.getComputedStyle(player).left, 10);
        if (currentLeft<460){
            player.style.left = (currentLeft + 10) + 'px';
        }
        break;
  default:
      return;
    }
    event.preventDefault();
}, true);

function deplacementEnnemis(enemy) {
    const moveDown = setInterval(() => {
        const top = parseInt(getComputedStyle(enemy).top, 10);
        enemy.style.top = (top + 5) + 'px'; // Déplace l'ennemi vers le bas
        
        // Vérifie si l'ennemi dépasse l'écran
        if (top > 600) {
            enemy.remove(); // Supprime l'ennemi
            clearInterval(moveDown);
            endgame() // Arrête l'animation de cet ennemi
            return; // Sort de la fonction pour éviter une vérification inutile
        }

        // Vérifie la collision avec le joueur
        const player = document.getElementById('player'); // Assure que l'élément du joueur est correctement ciblé
        if (checkCollisionEnnemy(player, enemy)) {
            clearInterval(moveDown); // Arrête le déplacement de l'ennemi
            endgame(); // Déclare la fin du jeu
        }
    }, 60);

    // Stocke l'ID de l'intervalle dans l'attribut dataset pour un contrôle ultérieur
    enemy.dataset.interval = moveDown;
}




// Fonction pour créer un ennemi à une position aléatoire
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = Math.random() * (document.getElementById("my_grid").offsetWidth - 20) + 'px';
    enemy.style.top = '0px'; // Commence en haut
    document.getElementById("my_grid").appendChild(enemy);
    deplacementEnnemis(enemy); // Déplacement automatique de l'ennemi
}

createEnemy(enemy);

// Fonction pour répéter la création des ennemis
function startEnemyCreation() {
    setInterval(() => {
        createEnemy();
    }, 2000); // Crée un ennemi toutes les secondes
}

// Démarrage du jeu
function startGame() {
    startEnemyCreation(); // Lance la création répétée d'ennemis
}

function checkCollision(bullet, enemy) {
    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    return !(
        bulletRect.top > enemyRect.bottom ||
        bulletRect.bottom < enemyRect.top ||
        bulletRect.left > enemyRect.right ||
        bulletRect.right < enemyRect.left
    );


}
var partifinie = false;

function endgame() {
    if (partifinie) return; // Assure que l'alerte n'est affichée qu'une seule fois
    partifinie = true; // Déclare la partie comme terminée

    alert("Game Over!Votre score est de "+ score );
    
    // Arrêter toutes les animations et interactions
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach(enemy => {
        // Vérifie si un intervalle est associé à cet ennemi et le stoppe
        const intervalId = parseInt(enemy.dataset.interval, 10);
        if (intervalId) {
            clearInterval(intervalId);
        }
        enemy.remove(); // Supprime l'ennemi de la grille
    });
    partifinie=false;
    score =0;
    document.getElementById("score").innerHTML=score;
}


function checkCollisionEnnemy(player, enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Vérification de la collision
    return !(
        playerRect.top > enemyRect.bottom ||
        playerRect.bottom < enemyRect.top ||
        playerRect.left > enemyRect.right ||
        playerRect.right < enemyRect.left
    );
}
