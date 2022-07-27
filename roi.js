let capital, ap, warriors, beasts, hTax, legionDMG, sTax;

let initialProfit,grossProfit,netProfit,revenue, maxRevenue;
let totalHunts, supplyCost, huntCost, creationCost, totalCost, finalSellTax;

const monsters = [2000,5000,8000,10000,13000,17000,20000,22000,25000,28000,31000,34000,
37000,40000,42000,47000,50000,53000,56000,60000,150000,250000,300000,500000];

var chance = [0.85,0.82,0.78,0.75,0.72,0.68,0.65,0.62,0.59,0.55,0.52,0.49,0.45,
0.42,0.41,0.41,0.41,0.39,0.39,0.39,0.37,0.35,0.30,0.15];

const reward = [10,18,26,32.5,44,60.5,74,85,101,121,141,162,
190,215,245,295,325,380,430,490,1285,2300,3300,15000];

let won;

document.querySelector("a.return-homepage").style.textDecoration = "none";

document.querySelector(".cal-btn").addEventListener("click", function (){
  resetAllValues();


  alert("The result you will see is only an estimation based on static values provided, therefore the accuracy of the result will depend on Nadodo.");

  capital = Number(document.querySelector("#capitalInput").value);
  ap = Number(document.querySelector("#apInput").value);
  warriors = Number(document.querySelector("#warriors").value);
  beasts = Number(document.querySelector("#beasts").value);
  hTax = Number(document.querySelector("#hunt-tax").value);
  legionDMG = Number(document.querySelector("#legion-damage").value);
  sTax = Number(document.querySelector("#sell-tax").value);

  initialProfit = Math.round(hunt(ap, legionDMG));
  supplyCost = Math.round(supplies(totalHunts, warriors));
  huntCost = Math.round(initialProfit * (hTax / 100));
  creationCost = (warriors + beasts) * 0.5;
  totalCost = Math.round((creationCost + huntCost) + supplyCost);

  grossProfit = Math.round(initialProfit - totalCost);
  finalSellTax = Math.round((grossProfit * (sTax / 100)));
  
  if (finalSellTax <= 0){
    finalSellTax = 0;
  }
  
  netProfit = Math.round(grossProfit - (grossProfit * (sTax / 100)));
  
   if(netProfit <= 0){
    netProfit = 0;
  }
  
  revenue = Math.round((netProfit - capital));
  
 
  
  if(revenue <= 0){
    revenue = 0;
  }
  
  if(revenue > 0){
     maxRevenue = revenue + finalSellTax;
  }else{
     maxRevenue = revenue;
  }
 
  
  

  // net profit
  document.querySelector(".net-profit-text").style.visibility = "visible";

  if(netProfit >= capital){
    document.querySelector(".net-profit").innerText = "$" + netProfit  + " (✅ " + Math.round((((capital - netProfit) / capital) * 100) * -1) + "%)";
    document.querySelector(".net-profit").style.color = "green";
  }else if(netProfit < capital){
    if(netProfit <= 0){
    document.querySelector(".net-profit").innerText = "$" + netProfit;
    document.querySelector(".net-profit").style.color = "red";      
    }else{
    document.querySelector(".net-profit").innerText = "$" + netProfit  + " (🔻 " + Math.round((((capital - netProfit) / capital) * 100) * -1) + "%)";
    document.querySelector(".net-profit").style.color = "red";
    }
  }
  if(totalCost > initialProfit){
    document.querySelector(".net-profit-p").innerText = "The total cost $" + totalCost + " is greater versus the legion's profitability.";
  }else{
    document.querySelector(".net-profit-p").innerText = "Assuming you won " + won +" out of " + totalHunts + " hunts from the strongest monster you can hunt to the weakest, gas fees not included.";
  }
 
  document.querySelector(".see-more").innerText = "See more information";
  document.querySelector(".hunt-data").innerText = "Hunt data";

});

document.querySelector(".see-more").addEventListener("click", function (){
  alert("Legion Total Hunts: " + totalHunts +"\nGross Profit: $" + initialProfit +
"\nTotal Supply Cost: $" + supplyCost + "\nTotal Hunt Tax: $" + huntCost + "\nLegion Creation Cost: $" + creationCost +
"\nOverall Fees: $" + totalCost + "\nSell tax: $" + finalSellTax  + "\nNet Profit: $" + netProfit +
"\nRevenue: $" + revenue + "\n\nTip: To maximize profits you can wait for token to pump 20% before selling. " +  "\nRevenue if you wait: $" + maxRevenue);
});

document.querySelector(".hunt-data").addEventListener("click", function (){
  alert("PC ONLY FEATURE \nTo access this press (Ctrl + Shift + i), and then go to console.");
});


function hunt(ap, legionDMG){
  var baseAP = ap;
  var dmg = legionDMG / 100;
  var profit = 0;
  var baseWR = 0, roll = 0, bonus = 0;
  for(var i = monsters.length; i >= 0; i--){

    while(baseAP >= monsters[i]){
      bonus = bonusPower(baseAP,i);
      baseWR = (chance[i] * 100) + bonus;
      
      if(baseWR > 89 || i >= 19){
        baseWR = 89;
      }
      
      roll = Math.floor(Math.random() * 100);
      
      if(roll <= baseWR){
        profit += reward[i];
        won ++;
        console.log("Legion's AP: " + Math.round(baseAP) + " -> WON ->" + " roll: " + Math.floor(roll) + ", base: " + Math.floor(baseWR) + ", bonus chance: " + bonus + "%" + " at mons: #" + (i + 1));
      }else{
        console.log("Legion's AP: " + Math.round(baseAP) + " -> LOST ->" + " roll: " + Math.floor(roll) + ", base: " + Math.floor(baseWR) + ", bonus chance: " + bonus + "%" + " at mons: #" + (i + 1));
      }
      baseAP -= (baseAP * dmg);
      totalHunts ++;
    }
  }
      console.log("Legion's remaining AP: " + Math.round(baseAP));

  return profit;
}

function supplies(hunts, qWarriors){
  var cost = hunts * qWarriors;
  return cost;
}

function resetAllValues(){
  console.clear();
  
  won = 0;

  capital = 0;
  ap = 0;
  warriors = 0;
  beasts = 0;
  hTax = 0;
  legionDMG = 0;
  sTax = 0;

  initialProfit = 0;
  grossProfit = 0;
  netProfit = 0;
  revenue = 0;
  maxRevenue = 0;

  totalHunts = 0;
  supplyCost = 0
  huntCost = 0;
  creationCost = 0;
  totalCost = 0;
}

function bonusPower(ap, mons){
  var bonusPow = 0;
  var baseAP = ap;
  var monsAP = monsters[mons];
  while((baseAP - 2000) >= monsAP ){
    baseAP = baseAP - 2000;
    bonusPow += 1;
  }

  return bonusPow;
}
