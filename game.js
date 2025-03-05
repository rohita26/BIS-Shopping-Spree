const products = [
    { name: "BIS Milk", bisCertified: true, img: "milk.png" },
    { name: "BIS Helmet", bisCertified: true, img: "helmet.png" },
    { name: "BIS Gold", bisCertified: true, img: "gold.png" },
    { name: "Food", bisCertified: false, img: "food.png" }
];

let score = 0;
let timeLeft = 30;
let player, cart;

window.onload = function () {
    player = document.getElementById("player");
    cart = document.getElementById("cart-items");

    startTimer();
    setInterval(spawnProduct, 1500);
};

// Move player left & right
document.addEventListener("keydown", (e) => {
    let left = player.offsetLeft;
    if (e.key === "ArrowLeft" && left > 10) {
        player.style.left = left - 30 + "px"; 
    } else if (e.key === "ArrowRight" && left < window.innerWidth - 70) {
        player.style.left = left + 30 + "px";
    }
});

// Spawn falling products with images
function spawnProduct() {
    let index = Math.floor(Math.random() * products.length);
    let product = products[index];

    let item = document.createElement("img");
    item.src = product.img;
    item.classList.add("product");
    item.style.position = "absolute";
    item.style.width = "50px"; // Adjust size
    item.style.left = Math.random() * (window.innerWidth - 60) + "px";
    item.style.top = "0px"; // Start from the top
    document.getElementById("products").appendChild(item);

    let fallInterval = setInterval(() => {
        item.style.top = (parseInt(item.style.top || 0) + 5) + "px"; 
        
        if (checkCollision(player, item)) {
            clearInterval(fallInterval);
            
            if (product.bisCertified) {
                score += 10;

                // Add BIS product to cart
                let cartItem = document.createElement("img");
                cartItem.src = product.img;
                cartItem.classList.add("cart-item");
                cartItem.style.width = "40px"; // Adjust size for cart
                cart.appendChild(cartItem);
            }

            // Remove product after checking
            item.remove();
            document.getElementById("score").innerText = `Score: ${score}`;
        }
        
        if (parseInt(item.style.top) > window.innerHeight - 50) {
            item.remove();
            clearInterval(fallInterval);
        }
    }, 50);
}

// Collision Detection
function checkCollision(player, item) {
    let playerRect = player.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();

    return (
        itemRect.bottom >= playerRect.top &&
        itemRect.top <= playerRect.bottom &&
        itemRect.right >= playerRect.left &&
        itemRect.left <= playerRect.right
    );
}

// Timer countdown
function startTimer() {
    let timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End Game & Save Score
function endGame() {
    let playerName = prompt("Enter your name for the leaderboard:");
    if (!playerName) playerName = "Anonymous"; 

    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ name: playerName, score: score });

    localStorage.setItem("scores", JSON.stringify(scores));

    alert(`Game Over! ${playerName}, your final score: ${score}`);

    window.location.href = "leaderboard.html";
}

