const products = [
    { name: "BIS Milk", bisCertified: true, img: "milk.png" },
    { name: "BIS gold", bisCertified: false, img: "BIS.png" },
    { name: "BIS Helmet", bisCertified: true, img: "helmet.png" },
    { name: "Food", bisCertified: false, img: "food.png" }
];

let score = 0;
let bisCount = 0;

function loadProducts() {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";
    
    products.forEach((p, index) => {
        let div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<img src="${p.img}" alt="${p.name}"><p>${p.name}</p>`;
        
        div.onclick = function() {
            if (p.bisCertified) {
                bisCount++;
                score += 10;
                div.classList.add("selected");
                setTimeout(() => div.remove(), 500); // Remove after animation
            } else {
                div.classList.add("wrong");
                setTimeout(() => div.classList.remove("wrong"), 400);
            }
            document.getElementById("score").innerText = `Score: ${score}`;
        };
        
        productList.appendChild(div);
    });
}

function endGame() {
    localStorage.setItem("highScore", bisCount);
    alert(`Game Over! You collected ${bisCount} BIS products.`);
    window.location.href = "leaderboard.html";
}

window.onload = loadProducts;
// Load sound effects
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

function loadProducts() {
    let productList = document.getElementById("product-list");
    let cartItems = document.getElementById("cart-items");
    productList.innerHTML = "";
    
    products.forEach((p, index) => {
        let div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<img src="${p.img}" alt="${p.name}"><p>${p.name}</p>`;
        
        div.onclick = function() {
            if (p.bisCertified) {
                bisCount++;
                score += 10;
                correctSound.play();
                
                // Clone the selected product and move it to the cart
                let cartItem = div.cloneNode(true);
                cartItem.classList.remove("product");
                cartItem.classList.add("cart-item");
                cartItems.appendChild(cartItem);

                // Add animation and then remove from product list
                div.classList.add("selected");
                setTimeout(() => div.style.display = "none", 500);
            } else {
                wrongSound.play();
                div.classList.add("wrong");
                setTimeout(() => div.classList.remove("wrong"), 400);
            }
            document.getElementById("score").innerText = `Score: ${score}`;
        };
        
        productList.appendChild(div);
    });
}
