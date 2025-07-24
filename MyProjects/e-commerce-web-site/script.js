// Ürün verisi
const products = [
  { id: 1, name: "Kablosuz Kulaklık", price: 799, image: "../../images/product1.jpg", description: "Yüksek kaliteli ses deneyimi ile konfor bir arada.", category: "Elektronik" },
  { id: 2, name: "Bluetooth Hoparlör", price: 599, image: "../../images/product2.jpg", description: "Partiler için mükemmel ses çıkışı ve taşınabilirlik.", category: "Elektronik" },
  { id: 3, name: "Gaming Mouse", price: 349, image: "../../images/product3.jpg", description: "RGB ışıklı, yüksek hassasiyetli oyuncu faresi.", category: "Aksesuar" },
  { id: 4, name: "LED Monitör", price: 1899, image: "../../images/product4.jpg", description: "Full HD çözünürlük, 75Hz yenileme hızı.", category: "Bilgisayar" }
];

// Sepet verisi (localStorage'dan yükle ya da boş array)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM elementleri
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");

const darkModeToggle = document.getElementById("dark-mode-toggle");

const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

const productModal = document.getElementById("product-modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");

const addToCartBtn = document.getElementById("add-to-cart-btn");

const checkoutModal = document.getElementById("checkout-modal");
const checkoutForm = document.getElementById("checkout-form");
const paymentMessage = document.getElementById("payment-message");

let currentProductId = null;

// Tema Yönetimi
function loadTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    document.body.classList.add("light");
    darkModeToggle.textContent = "🌙";
    darkModeToggle.setAttribute("aria-pressed", "true");
  } else {
    document.body.classList.remove("light");
    darkModeToggle.textContent = "☀️";
    darkModeToggle.setAttribute("aria-pressed", "false");
  }
}

function toggleTheme() {
  if (document.body.classList.contains("light")) {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
    darkModeToggle.textContent = "☀️";
    darkModeToggle.setAttribute("aria-pressed", "false");
  } else {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    darkModeToggle.textContent = "🌙";
    darkModeToggle.setAttribute("aria-pressed", "true");
  }
}

// Ürünları DOM'a ekle
function renderProducts(list) {
  productList.innerHTML = "";
  if (list.length === 0) {
    productList.innerHTML = "<p>Aradığınız ürün bulunamadı.</p>";
    return;
  }
  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("data-category", product.category);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <h3>${product.name}</h3>
      <p class="price">₺${product.price.toFixed(2)}</p>
      <button aria-label="${product.name} ürününü sepete ekle" data-id="${product.id}">Sepete Ekle</button>
    `;

    // Ürün kartına tıklayınca detay modal aç
    card.addEventListener("click", (e) => {
      // Eğer butona basıldıysa zaten ekleme yapacak, sadece detay modal açma.
      if (e.target.tagName === "BUTTON") return;
      openProductModal(product.id);
    });

    productList.appendChild(card);
  });
}

// Ürün detay modalını aç
function openProductModal(id) {
  currentProductId = id;
  const product = products.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-image").alt = product.name;
  document.getElementById("product-modal-title").textContent = product.name;
  document.getElementById("modal-description").textContent = product.description;
  document.getElementById("modal-price").textContent = `Fiyat: ₺${product.price.toFixed(2)}`;

  productModal.classList.remove("hidden");
  productModal.focus();
}

// Modal kapatma
modalCloseButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    closeAllModals();
  })
);

function closeAllModals() {
  productModal.classList.add("hidden");
  cartModal.classList.add("hidden");
  checkoutModal.classList.add("hidden");
  paymentMessage.classList.remove("visible");
  checkoutForm.reset();
}

// Sepete ekle
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  const cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
  updateCartCount();
}

// Sepeti DOM'a render et
function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<li>Sepetiniz boş.</li>";
    document.getElementById("total-price").textContent = "₺0";
    return;
  }
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong> x ${item.quantity}
      </div>
      <div>
        <button aria-label="Ürünü azalt" data-id="${item.id}" class="decrease">−</button>
        <button aria-label="Ürünü artır" data-id="${item.id}" class="increase">+</button>
        <button aria-label="Sepetten çıkar" data-id="${item.id}" class="remove">×</button>
      </div>
    `;
    cartItemsContainer.appendChild(li);
  });
  document.getElementById("total-price").textContent = `₺${total.toFixed(2)}`;

  // Butonlara event bağla
  cartItemsContainer.querySelectorAll(".decrease").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      changeQuantity(id, -1);
    })
  );
  cartItemsContainer.querySelectorAll(".increase").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      changeQuantity(id, 1);
    })
  );
  cartItemsContainer.querySelectorAll(".remove").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
    })
  );
}

function changeQuantity(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
    updateCartCount();
  }
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  let count = 0;
  cart.forEach((item) => (count += item.quantity));
  cartCount.textContent = count;
  cartCount.setAttribute("aria-label", `${count} adet ürün sepette`);
}

// Sepet modal aç/kapa
cartBtn.addEventListener("click", () => {
  const expanded = cartBtn.getAttribute("aria-expanded") === "true";
  if (expanded) {
    cartModal.classList.add("hidden");
    cartBtn.setAttribute("aria-expanded", "false");
  } else {
    renderCart();
    cartModal.classList.remove("hidden");
    cartBtn.setAttribute("aria-expanded", "true");
    cartModal.focus();
  }
});

// Sepete ekle butonları event delegation ile
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

// Modal sepete ekle butonu
addToCartBtn.addEventListener("click", () => {
  if (currentProductId !== null) {
    addToCart(currentProductId);
    productModal.classList.add("hidden");
  }
});

// Kategori filtrele
categoryFilter.addEventListener("change", () => {
  filterProducts();
});

// Arama input
searchInput.addEventListener("input", () => {
  filterProducts();
});

function filterProducts() {
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase();

  let filtered = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(searchTerm);
    return matchCategory && matchSearch;
  });

  renderProducts(filtered);
}

// Temayı toggle et
darkModeToggle.addEventListener("click", toggleTheme);

// Sepeti temizle
clearCartBtn.addEventListener("click", () => {
  if (confirm("Sepeti boşaltmak istediğinize emin misiniz?")) {
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    cartModal.classList.add("hidden");
    cartBtn.setAttribute("aria-expanded", "false");
  }
});

// Checkout modal aç
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Sepetiniz boş!");
    return;
  }
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
  checkoutModal.focus();
});

// Ödeme formu gönderme
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Basit validasyon
  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  paymentMessage.textContent = "Ödemeniz başarılı! Teşekkürler.";
  paymentMessage.classList.add("visible");

  // Sepeti temizle ve modalı kapat
  cart = [];
  saveCart();
  updateCartCount();

  setTimeout(() => {
    checkoutModal.classList.add("hidden");
    paymentMessage.classList.remove("visible");
  }, 3000);
});

// İlk render ve tema yükle
loadTheme();
renderProducts(products);
updateCartCount();
