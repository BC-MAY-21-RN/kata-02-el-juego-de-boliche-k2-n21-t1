//Generamos nuestras 10 rondas
var Tiros = new Array(10);

for(var i = 0; i < Tiros.length; i++){
    if(i!=9){
        Tiros[i] = new Array(3);
    }
    else{
        Tiros[i] = new Array(4);
        Tiros[i][3] = null;
    }
}

//Lanza la bola, lo puede hacer dos vecves o hasta tres si es la ultima ronda
function Shoot(round){
    
    round[1]= Math.floor(Math.random()*11);
    var score = round[1];
    if(10 - round[1] != 0){
        round[2] = Math.floor(Math.random()* (11 - round[1])) ;
        score = score+round[2];
        if(round[3] !== undefined && 10 - (round[1]+round[2]) == 0){
            round[3] = Math.floor(Math.random()*11) ;
            score = score + round[3];
        }
    }
    else{
        if(round[3] !== undefined){
            round[2] = Math.floor(Math.random() * 11);
            score = score+round[2];
            if(10 - round[2] == 0){
                round[3] = Math.floor(Math.random() * 11);
                score = score + round[3];
            }
            else{
                round[3] = Math.floor(Math.random() * 11 - round[2]);
                score = score + round[3];
            }
        }
        else{
            round[2] = 0;
        }
    }
    round[0] = score;
    return round;
}

//Saca resultados a consola
function Render(strike,spare,Tiro){
    let string = "";

    if(strike){
        string = "█ | ";
    }
    else if(spare){
        string = Tiro[1] + " | ◢"
    }
    else{
        string = Tiro[1] + " | " + Tiro[2];
    }

    if(Tiro[3] !== undefined){
        if(Tiro[3] == 10){
            string = string + " | █";
        }
        else if(strike && Tiro[2] == 10){
            if (Tiro[3] == 10){
                string = string + " █ | █";
            }
            else{
               string = string + " █ | " + Tiro[3]; 
            } 
        }
        else if (strike && Tiro[2] + Tiro[3] == 10){
            string = string + Tiro[2] + " | ◢";
        }
        else{
            string = string + " | " + Tiro[3];
        }
    }

    console.warn(string);
    console.warn("Score: " + Tiro[0]);
    
}

//La funcion principal, mantiene el juego vivo
function Game(){
    let StrikeBonus = false;
    let SpareBonus = false;
    for(var i = 0; i<Tiros.length; i++){
        Tiros[i] = Shoot(Tiros[i]);
        if (StrikeBonus){
            Tiros[i-1][0] = Tiros[i-1][0]+Tiros[i][0];
            
        }
        if(SpareBonus){
            Tiros[i-1][0] = Tiros[i-1][0]+Tiros[i][1];
            
        }
        if(Tiros[i-1] !== undefined){
            Tiros[i][0] = Tiros[i][0] + Tiros[i-1][0];
            Render(StrikeBonus,SpareBonus,Tiros[i-1]);
        }
        
        SpareBonus = false;
        StrikeBonus = false;
        if(Tiros[i][1] == 10){
            StrikeBonus = true;
        }
        else if(Tiros[i][1] + Tiros[i][2] == 10){
            SpareBonus = true;
        }

        
    }
    Render(StrikeBonus,SpareBonus,Tiros[9]);
    //console.warn(Tiros[9][3]);
}