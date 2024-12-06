# Projet jeu

# But du jeu :
Le but du jeu est d’éliminer les ennemis qui tombent du haut de l’écran en tirant avec une balle (bullet). Chaque ennemi touché rapporte un point, et le jeu se termine si un ennemi atteint le bas de l’écran.
- Le joueur doit donc à la fois :
        --> Viser précisément pour tirer sur les ennemis.
        --> Bouger rapidement pour éviter de se faire submerger.

#  acteurs du jeu :
- Le joueur (tireur) :
Représenté par un personnage positionné en bas de l’écran.
Peut se déplacer horizontalement de gauche à droite.
Dispose d'une arme qui tire des balles en ligne droite vers le haut.

- Les ennemis :
Descendent depuis le haut de l’écran.
Représentent une menace pour le joueur. S'ils atteignent le bas, la partie est terminée.
Leur vitesse peut augmenter au fur et à mesure pour rendre le jeu plus difficile.

- Les balles (bullets) :
Projetiles tirés par le joueur.
Montent verticalement pour atteindre les ennemis.
Disparaissent lorsqu'elles touchent un ennemi ou sortent de l'écran.

# Fonctionnement du jeu :
Le jeu commence avec le tireur positionné en bas de l’écran.
Les ennemis apparaissent progressivement en haut de l’écran et descendent.
Le joueur contrôle son personnage grâce aux touches :
- Flèche gauche pour se déplacer vers la gauche.
- Flèche droite pour se déplacer vers la droite.
- Espace pour tirer des balles.
À chaque tir, une balle monte en ligne droite et, si elle entre en contact avec un ennemi, cet ennemi disparaît et le score augmente de 1.

La partie se termine lorsque :
- Un ennemi atteint le bas de l’écran.
- Le joueur peut alors recommencer pour tenter d’obtenir un meilleur score.