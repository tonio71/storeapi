import SaleService from "../services/sale.service.js";

async function createSale(req, res, next) {
  try {
    let sale = req.body;
    if (!sale.value || !sale.date || !sale.client_id || !sale.product_id) {
      throw new Error(
        "Value, Date, Cliend Id e Product Id são campos obrigatórios!"
      );
    }
    sale = await SaleService.createSale(sale);
    res.send(sale);
    logger.info(`Post /sale - ${JSON.stringfy(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function getSales(req, res, next) {
  try {
    res.send(await SaleService.getSales(req.query.product_id));
    logger.info(`Get /sale`);
  } catch (err) {
    next(err);
  }
}

async function getSale(req, res, next) {
  try {
    res.send(await SaleService.getSale(req.params.id));
    logger.info(`Get /sale`);
  } catch (err) {
    next(err);
  }
}

async function deleteSale(req, res, next) {
  try {
    let retorno = await SaleService.deleteSale(req.params.id);
    if (retorno === null) {
      res.status(404).send("sale não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /sale`);
  } catch (err) {
    next(err);
  }
}

async function updateSale(req, res, next) {
  try {
    let sale = req.body;
    if (
      !sale.sale_id ||
      !sale.value ||
      !sale.date ||
      !sale.client_id ||
      !sale.product_id
    ) {
      throw new Error(
        "Sale Id, Value, Date, Cliend Id e Product Id são campos obrigatórios!"
      );
    }
    sale = await SaleService.updateSale(sale);
    res.send(sale);
    logger.info(`Update using PUT /sale - ${JSON.stringfy(sale)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
