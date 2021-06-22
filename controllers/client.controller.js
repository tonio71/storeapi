import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error(
        "Name, CPF, Phone, Email e Address são campos obrigatórios!"
      );
    }
    client = await ClientService.createClient(client);
    res.send(client);
    logger.info(`Post /client - ${JSON.stringfy(client)}`);
  } catch (err) {
    next(err);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await ClientService.getClients());
    logger.info(`Get /client`);
  } catch (err) {
    next(err);
  }
}

async function getClient(req, res, next) {
  try {
    res.send(await ClientService.getClient(req.params.id));
    logger.info(`Get /client`);
  } catch (err) {
    next(err);
  }
}

async function deleteClient(req, res, next) {
  try {
    let retorno = await ClientService.deleteClient(req.params.id);
    if (retorno === null) {
      res.status(404).send("cliente não encontrado!");
    } else {
      res.send("");
    }
    logger.info(`Delete /client`);
  } catch (err) {
    next(err);
  }
}

async function updateClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.client_id ||
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error(
        "Client_id, Name, CPF, Phone, Email e Address são campos obrigatórios!"
      );
    }
    client = await ClientService.updateClient(client);
    res.send(client);
    logger.info(`Update using PUT /client - ${JSON.stringfy(client)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
