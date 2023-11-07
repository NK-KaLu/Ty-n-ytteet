var ShoppingCart = (function($) {
  "use strict";

var uid = 0;
const fetchedItems = [];
var total = 0
function check(){
  if(sessionStorage.getItem('myItem') != null){
    uid = sessionStorage.getItem('myItem');
    console.log(uid)
  }
  fetchItems();
}


const fetchItems = async () => {
  const response = await fetch(
    `/*FIREBASE OSOITE*//${uid}.json`
  );
  const data = await response.json();
console.log(data)
  console.log(uid)
 

  for (const key in data) {
    for(let i = 0; i <fetchedItems.length; i++)
      {if(data[key][0] == fetchedItems[i].id)
        {fetchedItems[i].amount = fetchedItems[i].amount + 1} 
        console.log(data[key][0], "Item ID: " , fetchedItems[i].id)
      }
      fetchedItems.push({
        key: key,
        amount: 1,
        id: data[key][0],
        name: data[key][1],
        price: data[key][2],
      });
      console.log(fetchedItems)
      
      
  }  

  fetchedItems.forEach((item)=>{total += item.price})


 
  const RemoveDuplicates = fetchedItems.reduce((accumulator, current) => {
    let exists = accumulator.find(item => {
      return item.id === current.id;
    });
    if(!exists) { 
      accumulator = accumulator.concat(current);
    }
    return accumulator;
  }, []);

  let list = document.getElementById("ostokset");

  let i = 0;
  
  RemoveDuplicates.forEach((item)=>{
    let li = document.createElement("li");
    var x = document.createElement("BUTTON");
    
    //yksittäisen tuotteen poistaminen ostoskorista
    x.onclick = function()
    {
      item.amount -= 1;
      total -=  item.price;
      console.log(item.amount);
      if(item.amount > 0){
      li.innerText = "[" +item.amount + "*] \u00a0 \u00a0" +item.name + " " +item.price + "€ \u00a0\u00a0\u00a0" ;
      li.append(x)
      list.insertBefore(li, li);
      p.innerText = "YHT: " + total.toFixed(2) + "€"
      div.appendChild(p)
      }
      else
      {
        list.removeChild(li);
        p.innerText = "YHT: " + total.toFixed(2) + "€";
        div.appendChild(p);
      }
      
    }

    x.innerText = "X";
    li.innerText = "[" +item.amount + "*] \u00a0 \u00a0" +item.name + " " +item.price + "€ \u00a0\u00a0\u00a0" ;
    li.append(x)
    list.append(li);
    i++;

  })
  let div = document.getElementById("hinta")
  let p = document.createElement("p");
  total.toFixed(2);
  p.innerText = "YHT: " + total + "€"
  div.appendChild(p);

  

  let tunnistus = document.getElementById("tunnistus");

  tunnistus.addEventListener("submit", (e) => {
    const filtered = RemoveDuplicates.filter((obj) => obj.amount !== 0)
    e.preventDefault();
    vahvistaTilaus(document.getElementById("nimi").value, document.getElementById("puhnro").value, total, filtered);
  });

  //kun tilaus on saatettu loppuun poistetaan ostoskori
  const poistaOstoskori = async (url) =>{  
    // Awaiting fetch which contains 
    // method, headers and content-type
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });  
    // Awaiting for the resource to be deleted
    const resData = 'resource deleted...';
    // Return response data 
    window.location.reload()
    return resData;
  }

  //Postataan tilaus firebaseen
  const vahvistaTilaus = async (nimi, pho, total, RD) => {
    console.log(nimi, pho);
    const response = await fetch(
      `/*FIREBASE OSOITE*//vahvistettutilaus.json`,
      {
        method: "POST",
        body: JSON.stringify([nimi, pho , total, RD]),
        headers: {
          "Content-Type": "application/json",
        },
      }
      
    );
    poistaOstoskori(`/*FIREBASE OSOITE*//${uid}.json`);
    const data = await response.json();
    console.log(data);
  };

}
 // This functon starts the whole application
 var init = function() {
  check();
  
 
}

// Exposes just init function to public, everything else is private
return {
  init: init
};

})(jQuery);
  
ShoppingCart.init();