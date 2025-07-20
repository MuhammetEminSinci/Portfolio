// Ürünler (id, isim, fiyat, görsel, açıklama, kategori)
const products = [
  { id: 1, name: "Kablosuz Kulaklık", price: 799, image: "../../images/product1.jpg", description: "Yüksek kaliteli ses deneyimi ile konfor bir arada.", category: "Elektronik" },
  { id: 2, name: "Bluetooth Hoparlör", price: 599, image: "../../images/product2.jpg", description: "Partiler için mükemmel ses çıkışı ve taşınabilirlik.", category: "Elektronik" },
  { id: 3, name: "Gaming Mouse", price: 349, image: "../../images/product3.jpg", description: "RGB ışıklı, yüksek hassasiyetli oyuncu faresi.", category: "Aksesuar" },
  { id: 4, name: "LED Monitör", price: 1899, image: "../../images/product4.jpg", description: "Full HD çözünürlük, 75Hz yenileme hızı.", category: "Bilgisayar" }
];

// Sepet verisi localStorage'dan veya boş array
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartModal = document.getElementById("cart-modal");

const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("product-title");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.getElementById("close-modal");

const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search-input");
const darkModeToggle = document.getElementById("dark-mode-toggle");

const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");
const checkoutForm = document.getElementById("checkout-form");
const paymentMessage = document.getElementById("payment-message");

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Ürünleri filtrele ve ara
function filterAndSearchProducts() {
  const category = categoryFilter.value;
  const searchTerm = searchInput.value.toLowerCase();

  let filtered = category === "all" ? products : products.filter(p => p.category === category);

  if (searchTerm) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
  }

  renderProducts(filtered);
}

// Ürünleri render et
function renderProducts(list = products) {
  productContainer.innerHTML = "";
  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.dataset.category = product.category; // kategori bilgisi (stil için)

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₺${product.price}</p>
      <button>Sepete Ekle</button>
    `;

    // Ürün kutusuna tıklandığında detay modalı açılır
    div.addEventListener("click", () => showModal(product));

    // Butona tıklandığında sepete ekle (event bubbling'i önlemek için stopPropagation)
    div.querySelector("button").addEventListener("click", e => {
      e.stopPropagation();
      addToCart(product.id);
    });

    productContainer.appendChild(div);
  });
}

// Sepete ürün ekle veya miktar artır
function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Sepetten ürün kaldır (tamamen sil)
function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
}

// Sepette ürün miktarını azalt
function decreaseQuantity(productId) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

// Sepette ürün miktarını artır
function increaseQuantity(productId) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

// Sepeti güncelle ve localStorage’a kaydet
function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (₺${item.price} x ${item.quantity})
      <div>
        <button aria-label="Azalt" class="qty-btn">-</button>
        <button aria-label="Arttır" class="qty-btn">+</button>
        <button aria-label="Sil" class="remove-btn">×</button>
      </div>
    `;

    // Buton eventleri
    li.querySelector(".qty-btn:nth-child(1)").addEventListener("click", () => decreaseQuantity(item.id));
    li.querySelector(".qty-btn:nth-child(2)").addEventListener("click", () => increaseQuantity(item.id));
    li.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(item.id));

    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `₺${total}`;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Sepet modalını aç/kapa
function toggleCartModal() {
  cartModal.classList.toggle("hidden");
}

// Ürün detay modalını aç
function showModal(product) {
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalName.textContent = product.name;
  modalPrice.textContent = `₺${product.price}`;
  modalDescription.textContent = product.description;
  modal.classList.remove("hidden");
  modal.focus();
}

// Ürün detay modalını kapat
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Modal arka plan tıklaması ile kapatma
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Sepet butonuna tıklayınca modal açılır
document.querySelector(".cart").addEventListener("click", toggleCartModal);

// Sepeti temizle butonu
clearCartBtn.addEventListener("click", () => {
  cart.length = 0;
  updateCart();
});

// Kategori filtreleme ve arama inputu eventleri
categoryFilter.addEventListener("change", filterAndSearchProducts);
searchInput.addEventListener("input", filterAndSearchProducts);

// Karanlık mod toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const pressed = darkModeToggle.getAttribute("aria-pressed") === "true";
  darkModeToggle.setAttribute("aria-pressed", String(!pressed));
});

// Menü toggle (mobil)
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Sepet ve Ödeme modalları için fonksiyonlar
checkoutBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
  checkoutModal.focus();
});

closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  // Basit validasyon ve ödeme simülasyonu
  paymentMessage.textContent = "";
  paymentMessage.classList.remove("visible");

  const name = checkoutForm.name.value.trim();
  const cardNumber = checkoutForm["card-number"].value.trim();
  const expiry = checkoutForm.expiry.value.trim();
  const cvv = checkoutForm.cvv.value.trim();

  if (!name || !cardNumber.match(/^\d{16}$/) || !cvv.match(/^\d{3}$/)) {
    paymentMessage.textContent = "Lütfen formu doğru doldurun.";
    paymentMessage.style.color = "red";
    paymentMessage.classList.add("visible");
    return;
  }

  paymentMessage.textContent = "Ödeme başarılı! Teşekkürler.";
  paymentMessage.style.color = "green";
  paymentMessage.classList.add("visible");

  // Sepeti temizle
  cart.length = 0;
  updateCart();

  // Formu temizle
  checkoutForm.reset();

  setTimeout(() => {
    checkoutModal.classList.add("hidden");
    paymentMessage.classList.remove("visible");
  }, 3000);
});

// İlk render ve cart güncelleme
renderProducts();
updateCart();
