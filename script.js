class ShoppingCart {
  constructor() {
    this.initEventListeners();
    this.updateTotalPrice();
  }

  // selecting the prices 
  updateTotalPrice() {
    const totalPriceElement = document.querySelector(".total");
    const unitPrices = document.querySelectorAll(".unit-price");
    const quantities = document.querySelectorAll(".quantity");
    let total = 0;
// logic of the calculation
    unitPrices.forEach((priceElement, index) => {
      const unitPrice = parseFloat(priceElement.textContent.replace("$", ""));
      const quantity = parseInt(quantities[index].textContent);
      total += unitPrice * quantity;
    });

    totalPriceElement.textContent = `${total} $`;
  }

  // add quatity and remove quandtity
  updateQuantity(event) {
    const quantityElement =
      event.target.parentElement.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent);

    if (event.target.classList.contains("fa-plus-circle")) {
      quantity += 1;
    } else if (
      event.target.classList.contains("fa-minus-circle") &&
      quantity > 0
    ) {
      quantity -= 1;
    }

    quantityElement.textContent = quantity;
    this.updateTotalPrice();
  }

  // remove items card
  removeItem(event) {
    const card = event.target.closest(".card");
    card.remove();
    this.updateTotalPrice();
  }
// like items
  toggleLike(event) {
    event.target.classList.toggle("liked");
    event.target.style.color = event.target.classList.contains("liked")
      ? "red"
      : "black";
  }

  // add event listeners for buttons and icons
  initEventListeners() {
    document
      .querySelectorAll(".fa-plus-circle, .fa-minus-circle")
      .forEach((button) => {
        button.addEventListener("click", this.updateQuantity.bind(this));
      });

    document.querySelectorAll(".fa-trash-alt").forEach((trashIcon) => {
      trashIcon.addEventListener("click", this.removeItem.bind(this));
    });

    document.querySelectorAll(".fa-heart").forEach((heartIcon) => {
      heartIcon.addEventListener("click", this.toggleLike.bind(this));
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new ShoppingCart());
