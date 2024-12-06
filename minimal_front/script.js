const TILE_WIDTH = 30; // Largeur des cases
const GRID_ROWS = 20; // Nombre de lignes
const GRID_COLS = 16; // Nombre de colonnes
const NIGHT_BLUE = "#6e1562"; // Couleur de fond
const player = document.getElementById('player'); // Récupération du personnage
let score=0;

// creation de la grille du jeu, de taille 20 lignes et 16 colonnes
function addTiles(grid) {
    // Définir la disposition des colonnes et des lignes
    grid.style.gridTemplateColumns = `repeat(${GRID_COLS}, ${TILE_WIDTH}px)`;
    grid.style.gridTemplateRows = `repeat(${GRID_ROWS}, ${TILE_WIDTH}px)`;
   
        for (let col = 0; col < GRID_COLS; col++) {
            for (let row = 0; row < GRID_ROWS; row++) {
            let div = document.createElement('div');
            div.className = 'tile';
            div.row = row;
            div.col = col;
            grid.appendChild(div);// on ajoute le div créer dansla grille grid

        }
    }
}



const grid = document.getElementById("my_grid");//récupération de la grille

const bullet = document.getElementById('bullet'); 
addTiles(grid);

player.style.left = "240px" //création du joueur
pos_player_px = 240 + 50 / 2; //position du joueur
pos_player = 8;
console.log(Math.floor(pos_player))



//Création de la balle et déplacement 
function createBullet(player) {
    const bullet = document.createElement('div');
    bullet.className = 'bullet';
    // calcule de la position de la balle pour quelle soit centré sur le joueur
    //player.offsetLeft + player.offsetWidth --> donne la largeur du joueur
    //largeurJoueur/ 2 - 5, avec 5 = tailleBalle/2 ici la largeur de la balle est de 10 px
    bullet.style.left = (player.offsetLeft + player.offsetWidth / 2 - 5) + 'px'; // Position centrée sur le joueur
    //positionne la balle au dessus du joueur, 50px en dessus
    bullet.style.bottom = (parseInt(window.getComputedStyle(player).bottom, 10) + 50) + 'px'; // Position initiale
    document.getElementById("my_grid").appendChild(bullet);
    deplacementBalle(bullet);// appelle de la fonction deplacementBalle

}

// Fonction déplacementBalle, permet de deplacer la fonction vers le haut toute les 50 millisecondes
function deplacementBalle(bullet) {
    const moveUp = setInterval(() => {
        const bottom = parseInt(window.getComputedStyle(bullet).bottom, 10);
        bullet.style.bottom = (bottom + 10) + 'px';  // Déplace la balle vers le haut

        // Vérifier les collisions avec tous les ennemis
        const enemies = document.querySelectorAll('.enemy');
//verifie si elle rentre en collision avec un obstacle avec la fonction checkCollision()

        enemies.forEach(enemy => {
    //supprime l'ennemie et la balle lors de la collision et augmentation du score d'un point
            if (checkCollision(bullet, enemy)) {
                bullet.remove(); // Supprime la balle
                enemy.remove(); // Supprime l'ennemi
                clearInterval(moveUp); 
                score = (score + 1);
                document.getElementById("score").innerHTML=score;
            }
        });
// Supprime la balle lorsqu'elle sort de l'écran
        if (bottom > document.getElementById("my_grid").offsetHeight) {
            bullet.remove(); // Supprime la balle lorsqu'elle sort de l'écran
            clearInterval(moveUp); // Arrête le déplacement
        }
    }, 50);
}

// utilisation de la touche espace pour tirer les balles
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Empêche le comportement par défaut de la barre d'espace
        const player = document.getElementById('player');
        createBullet(player); // Crée une balle
    }
});

// Permet de gérer le deplacement du joueur avec les touches flechées
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
//fonction qui décrit le déplacement de l'ennemi chaque 60 millisecondes, il se deplace de haut en bas 
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
  // Vérifie la collision avec le joueur et si il y une collision le jeu s'arrête
        const player = document.getElementById('player'); 
        if (checkCollisionEnnemy(player, enemy)) {
            clearInterval(moveDown); 
            endgame(); 
        }
    }, 60);

    enemy.dataset.interval = moveDown;
}



// Fonction pour créer un ennemi à une position aléatoire
function createEnemy() {
    const enemy = document.createElement('div'); //Crée un nouvel élément HTML de type <div>. Ce div représentera l’ennemi dans le jeu.const enemy :La variable enemy stocke cet élément nouvellement créé
    enemy.className = 'enemy';//Attribue à l’élément ennemi la classe CSS enemy. Ca permettra de styliser l’ennemi avec des règles CSS définies dans le fichier de style
    enemy.style.left = Math.random() * (document.getElementById("my_grid").offsetWidth - 20) + 'px'; //Définit la position horizontale initiale de l’ennemi. La position est convertie en pixels grâce à l’ajout de 'px' à la fin.
    enemy.style.top = '0px'; // Commence en haut.Définit la position verticale de l'ennemi à 0px, c'est-à-dire tout en haut de la grille.
    document.getElementById("my_grid").appendChild(enemy); //Sélectionne l’élément HTML avec l’identifiant my_grid. Cet élément représente la grille de jeu où apparaissent les ennemis et ajoute l'élément enemy en tant qu’enfant de la grille.
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
//fonction checkCollision qui permet de vérifier si la balle (bullet) est entré en collision avec l'ennemie en prenant en compte deux paramètres, balle (bullet) et l'ennemie (enemy)

function checkCollision(bullet, enemy) {
    const bulletRect = bullet.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
// Vérification de la collision. Si toute les conditions sont vérifié alors il y a collision (grâce au !)
    return !(
        bulletRect.top > enemyRect.bottom ||
        bulletRect.bottom < enemyRect.top ||
        bulletRect.left > enemyRect.right ||
        bulletRect.right < enemyRect.left
    );


}
var partifinie = false;
//partifinie va permettre de vérifier si la partie est finie ou non
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

//fonction checkCollision qui permet de vérifier si le joueur est entré en collision avec l'ennemie en prenant en compte deux paramètres, le joueur (player) et l'ennemie (enemy)

function checkCollisionEnnemy(player, enemy) {
    const playerRect = player.getBoundingClientRect(); //getBoundingClientRect retourne un objet contenant des informations précises sur la position et les dimensions de cet élément dans la page
    const enemyRect = enemy.getBoundingClientRect();

    // Vérification de la collision. Si toute les conditions sont vérifié alors il y a collision (grâce au !)
    return !(
        playerRect.top > enemyRect.bottom || //le haut du joueur est en dessous du bas de l'ennemi
        playerRect.bottom < enemyRect.top || //le bas du joueur est au-dessus du haut de l'ennemi
        playerRect.left > enemyRect.right || //le côté gauche du joueur est à droite du côté droit de l'ennemi
        playerRect.right < enemyRect.left //le côté droit du joueur est à gauche du côté gauche de l'ennemi
    );
}


    





