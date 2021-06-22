import SupplierService from "../services/supplier.service.js";

async function createSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error(
        "Name, CNPJ, Phone, Email e Address são campos obrigatórios!"
      );
    }
    supplier = await SupplierService.createSupplier(supplier);
    res.send(supplier);
    logger.info(`Post /supplier - ${JSON.stringfy(supplier)}`);
  } catch (err) {
    next(err);
  }
}

async function getSuppliers(req, res, next) {
  try {
    res.send(await SupplierService.getSuppliers());
    logger.info(`Get /supplier`);
  } catch (err) {
    next(err);
  }
}

async function getSupplier(req, res, next) {
  try {
    res.send(await SupplierService.getSupplier(req.params.id));
    logger.info(`Get /supplier`);
  } catch (err) {
    next(err);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    let retorno = await SupplierService.deleteSupplier(req.params.id);
    if (retorno === null) {
      res.status(404).send("supplier s não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /supplier`);
  } catch (err) {
    next(err);
  }
}

async function updateSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.supplier_id ||
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error(
        "Supplier_id, Name, CNPJ, Phone, Email e Address são campos obrigatórios!"
      );
    }
    supplier = await SupplierService.updateSupplier(supplier);
    res.send(supplier);
    logger.info(`Update using PUT /supplier - ${JSON.stringfy(supplier)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
