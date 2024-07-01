// Declare variables using var, let, and const
const productTable = document
  .getElementById("productTable")
  .getElementsByTagName("tbody")[0];
const addProductButton = document.getElementById("addProductButton");
const removeProductButton = document.getElementById("removeProductButton");
const productNameInput = document.getElementById("productName");
const productModelInput = document.getElementById("productModel");
const productCostInput = document.getElementById("productCost");
const productQuantityInput = document.getElementById("productQuantity");

// Create an array to hold the inventory of store items
let inventory = [];

// Create three product items
const product1 = {
  name: "Embroidered Crewneck",
  model: "Dark Thorns",
  cost: 100.0,
  quantity: 9,
};
const product2 = {
  name: "Leather Jacket",
  model: "Cursed Souls",
  cost: 200.0,
  quantity: 90,
};
const product3 = {
  name: "Silver Assymetrical Chain",
  model: "String of Fate",
  cost: 300.0,
  quantity: 99,
};

// Add the product objects to the inventory array
inventory.push(product1, product2, product3);

// Function to display the inventory data in the HTML table
function displayInventory() {
  productTable.innerHTML = ""; // Clear existing rows
  inventory.forEach((product) => {
    const row = productTable.insertRow();
    row.insertCell(0).textContent = product.name;
    row.insertCell(1).textContent = product.model;
    row.insertCell(2).textContent = `$${product.cost.toFixed(2)}`;
    row.insertCell(3).textContent = product.quantity;
  });
}

// Event handler to remove a product
function removeProduct() {
  const name = productNameInput.value.trim();
  const model = productModelInput.value.trim();
  const quantityToRemove = parseInt(productQuantityInput.value, 10);

  if (name && model && !isNaN(quantityToRemove) && quantityToRemove > 0) {
    // Find product in inventory
    const productIndex = inventory.findIndex(
      (product) => product.name === name && product.model === model
    );

    if (productIndex !== -1) {
      const existingProduct = inventory[productIndex];

      if (existingProduct.quantity >= quantityToRemove) {
        // Reduce quantity of the existing product
        existingProduct.quantity -= quantityToRemove;

        // If quantity is equal or less than zero, remove the product completely from list
        if (existingProduct.quantity === 0) {
          inventory.splice(productIndex, 1);
        }

        // Update input values
        displayInventory();
        productNameInput.value = "";
        productModelInput.value = "";
        productCostInput.value = "";
        productQuantityInput.value = "";
      } else {
        alert("Quantity to remove exceeds available quantity in inventory.");
      }
    } else {
      alert("Product not found in inventory.");
    }
  } else {
    alert("Please fill in all fields with valid values.");
  }
}

// Event handler to add a new product
function addProduct() {
  const name = productNameInput.value.trim();
  const model = productModelInput.value.trim();
  const cost = parseFloat(productCostInput.value);
  const quantity = parseInt(productQuantityInput.value, 10);

  if (name && model && !isNaN(cost) && !isNaN(quantity)) {
    const newProduct = { name, model, cost, quantity };
    inventory.push(newProduct);
    displayInventory();
    productNameInput.value = "";
    productModelInput.value = "";
    productCostInput.value = "";
    productQuantityInput.value = "";
  } else {
    alert("Please fill in all fields with valid values.");
  }
}

// Add event listeners
addProductButton.addEventListener("click", addProduct);
removeProductButton.addEventListener("click", removeProduct);

// Display initial inventory
displayInventory();
