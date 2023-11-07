var ShoppingCart = (function($) {
    "use strict";
    
    // Cahce necesarry DOM Elements
    var productsEl = document.querySelector(".products")
      
      

    // Fake JSON data array here should be API call
    var products = [
      {
        id: 6,
        name: "Hammasharja",
        description: "Ultra soft hammasharja",
        imageUrl: "../img/hammasharja.png",
        price: 1.25
      },
      {
        id: 7,
        name: "Hammastahna",
        description: "Extra fresh menthol -hammastahna",
        imageUrl: "../img/hammastahna.png",
        price: 2.5,
      },
      {
        id: 8,
        name: "Saippua",
        description: "Purkantuoksuinen saippua",
        imageUrl: "../img/saippua.png",
        price: 2.8
      },
      {
        id: 9,
        name: "Shampoo ja hoitoaine",
        description: "Kostetuttava shampoo ja hoitoaine 250 ml",
        imageUrl: "../img/shampoo.png",
        price: 11.5
      },
      {
        id: 10,
        name: "Partahöylä",
        description: "Miesten partahöylä",
        imageUrl: "../img/partahöylä.png",
        price: 4
      },
      {
        id: 11,
        name: "Sheiveri",
        description: "Naisten sheiveri",
        imageUrl: "../img/sheiveri.png",
        price: 4.5
      },
      {
        id: 12,
        name: "Laastari",
        description: "Laastaripaketti 8kpl",
        imageUrl: "../img/laastari.webp",
        price: 3.5
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
                                 <a href="#0" class="button add-to-cart" data-id=${item.id-6}>Lisää ostoskoriin</a>
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
    
    // Adds new items or updates existing one in productsInCart array
    
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