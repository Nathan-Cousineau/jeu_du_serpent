
document.addEventListener("DOMContentLoaded", function(event) {

    //le Jeu

    class Jeu{
        constructor(_idSvg, _idPointage) {
            //console.log("a");

            this.s = Snap(_idSvg);
            this.sortiePointage = document.querySelector(_idPointage);

            this.grandeurCarre = 20; //grosseur du serpent
            this.grandeurGrille = 15;
        }

        nouvellePartie(){
            this.finPartie();

            this.affichagePointage(1);

            this.pomme = new Pomme(this);
            this.serpent = new Serpent(this);
        }

        finPartie(){

            if (this.pomme !==undefined){
                this.pomme.supprimePomme();
                this.pomme = undefined;
            }

        }

        affichagePointage(_lePointage){
            this.sortiePointage.innerHTML = _lePointage;
        }
    }

    //Le serpent

    class Serpent{
        constructor(_leJeu) {
            //console.log("d");

            this.leJeu = _leJeu;


            this.currentX = -1;
            this.currentY = 0;

            this.nextMoveX = 1;
            this.nextMoveY = 0;

            this.serpentLongueur = 1;
            this.tblCarreSerpent = [];
            this.speed = 250;

            this.timing = setInterval(this.controleSerpent.bind(this), this.speed);

            document.addEventListener("keydown", this.touche.bind(this));
        }

        touche(_evt){
            var evt = _evt

            //console.log(evt.keyCode)

            this.mouvement(evt.keyCode);
        }

        mouvement(dirCode){

            switch (dirCode) {
                case 37:
                    this.nextMoveX = -1;
                    this.nextMoveY = 0;
                    break
                case 38:
                    this.nextMoveX = 0;
                    this.nextMoveY = -1;
                    break
                case 39:
                    this.nextMoveX = 1;
                    this.nextMoveY = 0;
                    break
                case 40:
                    this.nextMoveX = 0;
                    this.nextMoveY = 1;
                    break
            }

            //console.log(this.nextMoveX, this.nextMoveY)
        }

        controleSerpent(){
            var nextX = this.currentX + this.nextMoveX;
            var nextY = this.currentY + this.nextMoveY;

            this.dessineCarre(nextX, nextY);
            this.currentX = nextX;
            this.currentY = nextY;
        }

        dessineCarre(x, y){

            var unCarre = [this.leJeu.s.rect(x * this.leJeu.grandeurCarre, y * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre), x, y];

            this.tblCarreSerpent.push(unCarre);

            if(this.tblCarreSerpent.length > this.serpentLongueur){
                this.tblCarreSerpent[0][0].remove();
                this.tblCarreSerpent.shift();
            }
        }

        tuerSerpent(){

        }
    }




    //la pomme

    class Pomme{
        constructor(_leJeu) {
            //console.log("f");

            this.leJeu = _leJeu;
            this.pomme = [];
            this.ajoutePomme();
        }

        ajoutePomme(){
            var posX = Math.floor(Math.random() * this.leJeu.grandeurGrille);
            var posY = Math.floor(Math.random() * this.leJeu.grandeurGrille);

            this.pomme = [this.leJeu.s.rect(posX * this.leJeu.grandeurCarre, posY * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre).attr({fill:'red'}), posX, posY];
        }

        supprimePomme(){
            this.pomme[0].remove();
        }
    }




    var unePartie = new Jeu("#jeu", "#pointage");

    var btnJouer = document.querySelector("#btnJouer");
    btnJouer.addEventListener('click', nouvellePartie);

    function nouvellePartie(){
        unePartie.nouvellePartie();
    }

});