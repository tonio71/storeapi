import SaleRepository from "../repositories/sale.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import ClientRepository from "../repositories/client.repository.js";

async function createSale(sale) {
  let errors = [];
  const client = await ClientRepository.getClient(sale.client_id);
  const product = await ProductRepository.getProduct(sale.product_id);
  if (!client) {
    errors.push("Client Id não existe! Cadastre-o.");
  }
  if (!product) {
    errors.push("Product Id não existe! Cadastre-o.");
  }
  if (errors.length > 0) {
    throw new Error(errors);
  }

  if (product.stock > 0) {
    try {
      sale = await SaleRepository.insertSale(sale);
      product.stock--;
      await ProductRepository.updateProduct(product);
      return sale;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  } else {
    throw new Error("O produto informado não possui estoque");
  }
}

async function getSales(productId) {
  if (productId) {
    return SaleRepository.getSalesByProductId(productId);
  }
  return SaleRepository.getSales();
}
async function getSale(id) {
  return SaleRepository.getSale(id);
}
async function deleteSale(id) {
  const sale = await SaleRepository.getSale(id);
  if (sale) {
    const product = await ProductRepository.getProduct(sale.product_id);
    await SaleRepository.deleteSale(id);
    product.stock++;
    await ProductRepository.updateProduct(product);
  } else {
    throw new Error("O id da sale informado não existe!");
  }
}
async function updateSale(sale) {
  let errors = [];
  const client = await ClientRepository.getClient(sale.client_id);
  const product = await ProductRepository.getProduct(sale.product_id);
  if (!client) {
    errors.push("Client Id não existe! Cadastre-o.");
  }
  if (!product) {
    errors.push("Product Id não existe! Cadastre-o.");
  }
  if (errors.length > 0) {
    throw new Error(errors);
  }
  return SaleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
