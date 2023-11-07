var ShoppingCart = (function($) {
    "use strict";
    
    // Cahce necesarry DOM Elements
    var productsEl = document.querySelector(".products")
       
      
      

    // Fake JSON data array here should be API call
    var products = [
      {
        id: 13,
        name: "Ruuvimeisselisarja",
        description: "Sisältää 6 eripäistä ruuvimeisseliä",
        imageUrl: "../img/työkalusetti.png",
        price: 20.9
      },
      {
        id: 14,
        name: "Taskulamppu",
        description: "Pieni tehokas taskulamppu, mukana paristot (2xAA-paristot)",
        imageUrl: "../img/taskulamppu.png",
        price: 5.75,
      },
      {
        id: 15,
        name: "Lamppu",
        description: "13W led-lamppu",
        imageUrl: "../img/ledlamppu.png",
        price: 3.5
      },
      {
        id: 16,
        name: "Patteri",
        description: "Sisältää 6kpl AA-paristoja",
        imageUrl: "../img/battery.png",
        price: 6
      },
      {
        id: 17,
        name: "Harava",
        description: "Harava puuvarrella",
        imageUrl: "../img/harava.png",
        price: 9
      },
      {
        id: 18,
        name: "Köysi",
        description: "Juuttiköysi 2 m",
        imageUrl: "../img/köysi.webp",
        price: 8.5
      }
    ]
    

    var generateProductList = function() {
      products.forEach(function(item) {
        var productEl = document.createElement("div");
        productEl.className = "product";
        productEl.innerHTML = `<div class="product-image">
                                  <img src="${item.imageUrl}" alt="${item.name}">
                               </div>
                               <div class="product-name"><span>Tuote:</span> ${item.name}</div>
                               <div class="product-description"><span>Tuotekuvaus:</span> ${item.description}</div>
                               <div class="product-price"><span>Hinta:</span> ${item.price} €</div>
                               <div class="product-add-to-cart">
                                 <a href="#0" class="button add-to-cart" data-id=${item.id - 13}>Lisää ostoskoriin</a>
                               </div>
                            </div>
  `;
        

  productsEl.appendChild(productEl);
      });
    }
    
    function first() {
      sessionStorage.setItem('myItem', uid);
  }
  
  
  function check(){
    if(sessionStorage.getItem('myItem') != null){
      uid = sessionStorage.getItem('myItem');
      console.log(uid)
    }
  }
    
  var uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
  
   
    
    var setupListeners = function() {
      productsEl.addEventListener("click", function(event) {
        var el = event.target;
        if(el.classList.contains("add-to-cart")) {
         var elId = el.dataset.id;
         
         addToCart(elId);
        }
      });
      
    }
    

    
    const addToCart = async (id) => {
        check();
        var obj = products[id];
        console.log(obj);
        const response = await fetch(
          `/*FIREBASE OSOITE*//${uid}.json`,
          {
            method: "POST",
            body: JSON.stringify([obj.id, obj.name, obj.price]),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        first();
        const data = await response.json();
        console.log(data);
      };

    
    // This functon starts the whole application
    var init = function() {
      generateProductList();
      setupListeners();
    }
    
    // Exposes just init function to public, everything else is private
    return {
      init: init
    };
    

  })(jQuery);
  
  ShoppingCart.init();