var ap, baseAP, hunt = 0;
let emotesSad = ["🤭","🤨","😴","🤮","🥺","💀","🤡","💩","💔","🤬"];
let emotesLit = ["😍","🤫","🥵","🥳","👀","👏","💅","💗","😘","😎"];

var monsters = [2000,5000,8000,10000,13000,17000,20000,22000,25000,28000,31000,34000,
37000,40000,42000,47000,50000,53000,56000,60000,150000,250000,300000,500000];

var chance = [0.85,0.82,0.78,0.75,0.72,0.68,0.65,0.62,0.59,0.55,0.52,0.49,0.45,
0.42,0.41,0.41,0.41,0.39,0.39,0.39,0.37,0.35,0.30,0.15];

document.querySelector("button.cal-btn").addEventListener("click", function (){
  var r = Math.floor(Math.random() * 10);
  hunt = 0;
  ap = document.querySelector("input").value;

  while(ap >= 2000){
    ap -= (ap * 0.02);
    hunt++;
  }

  if(hunt <= 10){
    document.querySelector(".hunts").textContent = hunt + "x" + emotesSad[r];
  }else{
    document.querySelector(".hunts").textContent = hunt + "x" + emotesLit[r];
  }
});

// Test hunt
var limit;
var mons;

document.querySelector("button.th-btn").addEventListener("click", function (){

  baseAP = document.querySelector("input").value;

  limit = checkLimit(baseAP);

  if(limit === 1){
    alert("Your legion's AP is " + baseAP + " you can only attack monster " + limit + ".");
    mons = 1;
  }else if(limit > 1){
    alert("Your legion's AP is " + baseAP + " you can only attack monster " + limit + " below.");
    mons = prompt("Choose a monster e.g 1, your limit is (1 up to " + limit +"): ");
  }else{
    alert("Your legion's AP is " + baseAP + " not enough to hunt try upgrading.");
  }



  if(limit >= 1){
    if(mons >= 1 && mons <= limit){
      var base = chance[mons - 1] * 100;
      var roll = Math.floor((Math.random() * 100)) + 1;

      if(roll <= base){
        alert("You won! \nYour roll is: " + roll + "\nTo win you need to roll equal or less than: " + base);
      }else{
        alert("You lose! \nYour roll is: " + roll + "\nTo win you need to roll equal or less than: " + base);
      }
    }else{
      alert("Invalid range try again.");
    }
  }
  

});


function checkLimit(ap){
  var x = 0;

  for(var i = 0; i < monsters.length; i++){
    if(ap >= monsters[i]){
      x++;
    }
  }
  return x * 1;
}
