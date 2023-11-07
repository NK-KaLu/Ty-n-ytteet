var ShoppingCart = (function($) {
    "use strict";
    
    // Cahce necesarry DOM Elements
    var productsEl = document.querySelector(".products")
        
      
    var products = [
      {
        id: 0,
        name: "Maito",
        description: "Kevytmaito 1l",
        imageUrl: "../img/maito.png",
        price: 1.5
      },
      {
        id: 1,
        name: "Jogurtti",
        description: "Marjajogurtti 1l",
        imageUrl: "../img/jogurtti.png",
        price: 2.5,
      },
      {
        id: 2,
        name: "Voi",
        description: "Voipaketti 500g",
        imageUrl: "../img/voi.png",
        price: 4.5
      },
      {
        id: 3,
        name: "Juusto",
        description: "Paikallinen juusto 500g",
        imageUrl: "../img/juusto.png",
        price: 8
      },
      {
        id: 4,
        name: "Kananmunat",
        description: "Paikallisen tilan kananmunat 6kpl",
        imageUrl: "../img/kananmunat.png",
        price: 4
      },
      {
        id: 5,
        name: "Tikkari",
        description: "Mansikanmakuinen tikkari",
        imageUrl: "../img/tikkari.png",
        price: 1.5
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
                                 <a href="#0" class="button add-to-cart" data-id=${item.id}>Lisää ostoskoriin</a>
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
      
    // Setting up listeners for click event on all products and Empty Cart button as well
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