const productPreview =
    document.getElementById("productPreview");

const watch =
    document.querySelector(".watch");

const watchColor =
    document.getElementById("watchColor");

const engraving =
    document.getElementById("engraving");

const engravingPreview =
    document.getElementById("engravingPreview");

const characterCount =
    document.getElementById("characterCount");

const configForm =
    document.getElementById("configForm");

const previewMessage =
    document.getElementById("previewMessage");

const formMessage =
    document.getElementById("formMessage");

const cartDropArea =
    document.getElementById("cartDropArea");

const cartProducts =
    document.getElementById("cartProducts");

const cartCount =
    document.getElementById("cartCount");

const cartMessage =
    document.getElementById("cartMessage");

const cartEmptyMessage =
    document.getElementById("cartEmptyMessage");

const scrollMessage =
    document.getElementById("scrollMessage");

const productDescription =
    document.getElementById("productDescription");


// ================================
// Cart
// ================================

let cartItems = 0;


// ================================
// Change Color
// ================================

watchColor.addEventListener("change", function () {

    const color = watchColor.value;

    if (color === "black") {
        watch.style.background = "#111827";
    }

    else if (color === "silver") {
        watch.style.background = "#9ca3af";
    }

    else if (color === "blue") {
        watch.style.background = "#2563eb";
    }

    previewMessage.textContent =
        "Watch color changed to " + color + ".";

});


// ================================
// Live Engraving
// ================================

engraving.addEventListener("input", function () {

    const text = engraving.value;

    if (text === "") {
        engravingPreview.textContent = "Your Name";
    }

    else {
        engravingPreview.textContent = text;
    }

    characterCount.textContent =
        text.length + " / 20 characters";

});


// ================================
// Mouse Movement
// ================================

productPreview.addEventListener("mousemove", function (event) {

    const rectangle =
        productPreview.getBoundingClientRect();

    const mouseX =
        event.clientX - rectangle.left;

    const mouseY =
        event.clientY - rectangle.top;

    const centerX =
        rectangle.width / 2;

    const centerY =
        rectangle.height / 2;

    const rotateX =
        ((mouseY - centerY) / centerY) * -10;

    const rotateY =
        ((mouseX - centerX) / centerX) * 10;

    watch.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});


// ================================
// Mouse Enter
// ================================

productPreview.addEventListener("mouseenter", function () {

    productPreview.style.transform =
        "scale(1.02)";

    previewMessage.textContent =
        "You are viewing the product.";

});


// ================================
// Mouse Leave
// ================================

productPreview.addEventListener("mouseleave", function () {

    productPreview.style.transform =
        "scale(1)";

    watch.style.transform =
        "rotateX(0deg) rotateY(0deg)";

    previewMessage.textContent =
        "Move your mouse over the product.";

});


// ================================
// Focus
// ================================

engraving.addEventListener("focus", function () {

    previewMessage.textContent =
        "Enter your custom engraving.";

});


// ================================
// Blur
// ================================

engraving.addEventListener("blur", function () {

    previewMessage.textContent =
        "Engraving saved in the preview.";

});


// ================================
// Add Product To Cart
// ================================

function addProductToCart() {

    const color =
        watchColor.value;

    const text =
        engraving.value.trim();


    // Increase number of products
    cartItems++;

    cartCount.textContent =
        "Cart Items: " + cartItems;


    // Hide empty message
    cartEmptyMessage.style.display =
        "none";


    // Create product card
    const product =
        document.createElement("div");

    product.classList.add("cart-product");


    product.innerHTML = `
        <h3>Custom Smart Watch</h3>

        <p>Color: <strong>${color}</strong></p>

        <p>Engraving: <strong>${text}</strong></p>

        <p>Price: <strong>$149</strong></p>
    `;


    // Add card to cart
    cartProducts.appendChild(product);


    // Feedback
    cartMessage.textContent =
        "✓ Custom Smart Watch added to cart!";

    cartMessage.style.color =
        "green";

    cartDropArea.style.borderColor =
        "#16a34a";

    cartDropArea.style.background =
        "#dcfce7";
}


// ================================
// Drag Start
// ================================

productPreview.addEventListener("dragstart", function (event) {

    event.dataTransfer.setData(
        "text/plain",
        "smart-watch"
    );

    productPreview.style.opacity =
        "0.5";

    cartMessage.textContent =
        "Drag the product to the cart.";

});


// ================================
// Drag End
// ================================

productPreview.addEventListener("dragend", function () {

    productPreview.style.opacity =
        "1";

});


// ================================
// Drag Over
// ================================

cartDropArea.addEventListener("dragover", function (event) {

    event.preventDefault();

    cartDropArea.classList.add(
        "drag-over"
    );

    cartMessage.textContent =
        "Release to add the product.";

});


// ================================
// Drag Leave
// ================================

cartDropArea.addEventListener("dragleave", function () {

    cartDropArea.classList.remove(
        "drag-over"
    );

    cartMessage.textContent =
        "";

});


// ================================
// Drop
// ================================

cartDropArea.addEventListener("drop", function (event) {

    event.preventDefault();

    cartDropArea.classList.remove(
        "drag-over"
    );

    const product =
        event.dataTransfer.getData(
            "text/plain"
        );


    if (product === "smart-watch") {

        addProductToCart();
    }

});


// ================================
// Form Submit
// ================================

configForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const text =
        engraving.value.trim();


    // Validation
    if (text === "") {

        formMessage.textContent =
            "Please enter an engraving.";

        formMessage.style.color =
            "red";

        engraving.focus();

        return;
    }


    // Add new product
    addProductToCart();


    // Success message
    formMessage.textContent =
        "✓ Product configured and added to cart!";

    formMessage.style.color =
        "green";

});


// ================================
// Reset
// ================================

configForm.addEventListener("reset", function () {

    setTimeout(function () {

        // Reset cart
        cartItems = 0;

        cartCount.textContent =
            "Cart Items: 0";

        cartProducts.innerHTML =
            "";

        cartEmptyMessage.style.display =
            "block";


        // Reset watch
        watch.style.background =
            "#111827";

        watch.style.transform =
            "rotateX(0deg) rotateY(0deg)";

        productPreview.style.transform =
            "scale(1)";


        // Reset engraving
        engravingPreview.textContent =
            "Your Name";

        characterCount.textContent =
            "0 / 20 characters";


        // Reset messages
        formMessage.textContent =
            "Configurator has been reset.";

        formMessage.style.color =
            "#2563eb";

        previewMessage.textContent =
            "Move your mouse over the product.";

        cartMessage.textContent =
            "";


        // Reset cart design
        cartDropArea.style.borderColor =
            "#9ca3af";

        cartDropArea.style.background =
            "white";

    }, 0);

});


// ================================
// Copy Protection
// ================================

productDescription.addEventListener("copy", function (event) {

    event.preventDefault();

    alert(
        "Copying the product description is not allowed."
    );

});


// ================================
// Cut Protection
// ================================

productDescription.addEventListener("cut", function (event) {

    event.preventDefault();

    alert(
        "Cutting the product description is not allowed."
    );

});


// ================================
// Scroll
// ================================

window.addEventListener("scroll", function () {

    scrollMessage.textContent =
        "Page scrolling...";

});