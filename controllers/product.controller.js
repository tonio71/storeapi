import ProductService from "../services/product.service.js";

async function createProduct(req, res, next) {
  try {
    let product = req.body;
    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        "Name, Description, Value, Stock e Supplier_id  são campos obrigatórios!"
      );
    }
    product = await ProductService.createProduct(product);
    res.send(product);
    logger.info(`Post /product - ${JSON.stringfy(product)}`);
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    res.send(await ProductService.getProducts());
    logger.info(`Get /product`);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    res.send(await ProductService.getProduct(req.params.id));
    logger.info(`Get /product`);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    let retorno = await ProductService.deleteProduct(req.params.id);
    if (retorno === null) {
      res.status(404).send("producte não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /product`);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    let product = req.body;
    if (
      !product.product_id ||
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        "Product_id, Name, Description, Value, Stock e Supplier_id são campos obrigatórios!"
      );
    }
    product = await ProductService.updateProduct(product);
    res.send(product);
    logger.info(`Update using PUT /product - ${JSON.stringfy(product)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
