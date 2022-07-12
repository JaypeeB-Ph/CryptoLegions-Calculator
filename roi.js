let capital, ap, warriors, beasts, hTax, legionDMG, sTax;

let initialProfit,grossProfit,netProfit,revenue;
let totalHunts, supplyCost, huntCost, creationCost, totalCost;

const monsters = [2000,5000,8000,10000,13000,17000,20000,22000,25000,28000,31000,34000,
37000,40000,42000,47000,50000,53000,56000,60000,150000,250000,300000,500000];

const reward = [6.5,16,26,32.5,44,60.5,74,85,101,121,141,162,
190,215,245,295,325,380,430,490,1285,2300,3300,15000];

document.querySelector(".cal-btn").addEventListener("click", function (){
  resetAllValues();


  alert("The result you will see is only an estimation based on static values provided, therefore the accuracy of the result will depend to Nadodo.");

  capital = Number(document.querySelector("#capitalInput").value);
  ap = Number(document.querySelector("#apInput").value);
  warriors = Number(document.querySelector("#warriors").value);
  beasts = Number(document.querySelector("#beasts").value);
  hTax = Number(document.querySelector("#hunt-tax").value);
  legionDMG = Number(document.querySelector("#legion-damage").value);
  sTax = Number(document.querySelector("#sell-tax").value);

  initialProfit = hunt(ap, legionDMG);
  supplyCost = supplies(totalHunts, warriors);
  huntCost = initialProfit * (hTax / 100);
  creationCost = (warriors + beasts) * 0.5;
  totalCost = (creationCost + huntCost) + supplyCost;

  grossProfit = initialProfit - totalCost;
  netProfit = Math.round(grossProfit - (grossProfit * (sTax / 100)));
  revenue = (netProfit - capital);
  if(revenue <= 0){
    revenue = 0;
  }

  // net profit text
  document.querySelector(".net-profit-text").style.visibility = "visible";

  if(netProfit >= capital){
    document.querySelector(".net-profit").innerText = "$" + netProfit  + " (✅ " + Math.round((((capital - netProfit) / capital) * 100) * -1) + "%)";
    document.querySelector(".net-profit").style.color = "green";
  }else if(netProfit < capital){
    document.querySelector(".net-profit").innerText = "$" + netProfit  + " (🔻 " + Math.round((((capital - netProfit) / capital) * 100) * -1) + "%)";
    document.querySelector(".net-profit").style.color = "red";
  }

  document.querySelector(".net-profit-p").innerText = "Assuming you won all hunts from strongest monster you can hunt to the weakest, gas fees not included.";
  document.querySelector(".see-more").innerText = "See more information";
  document.querySelector(".see-more").addEventListener("click", function (){
    alert("Legion Total Hunts: " + totalHunts +"\nGross Profit: $" + initialProfit +
  "\nTotal Supply Cost: $" + supplyCost + "\nTotal Hunt Tax: $" + huntCost + "\nLegion Creation Cost: $" + creationCost +
  "\nOverall Fees: $" + totalCost + "\nSell tax: $" + (grossProfit * (sTax / 100))  + "\nNet Profit: $" + netProfit +
  "\nRevenue: $" + revenue);
  });



});


function hunt(ap, legionDMG){
  var baseAP = ap;
  var dmg = legionDMG / 100;
  var profit = 0;

  for(var i = monsters.length; i >= 0; i--){

    while(baseAP >= monsters[i]){
      profit += reward[i];
      baseAP -= (baseAP * dmg);
      totalHunts ++;
    }
  }

  return profit;
}

function supplies(hunts, qWarriors){
  var cost = hunts * qWarriors;
  return cost;
}

function resetAllValues(){

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

  totalHunts = 0;
  supplyCost = 0
  huntCost = 0;
  creationCost = 0;
  totalCost = 0;
}
