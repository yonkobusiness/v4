async function loadProductButton(productId) {
  const res = await fetch('/v4/products.json');
  const products = await res.json();
  const product = products.find(p => p.id === productId);

  const container = document.getElementById('add-to-cart-container');
  const btn = document.createElement('button');
  btn.textContent = `Ajouter ${product.name} au panier`;
  btn.onclick = () => addToCart(product);
  container.appendChild(btn);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} a été ajouté au panier.`);
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function generateWhatsAppLink() {
  const cart = getCart();
  if (cart.length === 0) return '#';

  let message = 'Commande :\n';
  let total = 0;

  cart.forEach(p => {
    message += `• ${p.name} - ${p.price} FCFA\n`;
    total += p.price;
  });

  message += `\nTotal: ${total} FCFA`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/221778396468?text=${encoded}`;
}
