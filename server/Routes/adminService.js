const Service = require(__dirname + '/../models/Service');
const Functionary = require(__dirname + '/../models/Functionary');
const ServHasFunc = require(__dirname + '/../models/FunctionarysHasServices');

/**
 * @description Carrega todos os serviços cadastrados para o  administrador
 */
async function loadServices(req, res) {
  const services = await Service.list();
  if (services.length > 0) {
    res.status(200).json(JSON.parse(services));
  } else res.status(204).json({ menssage: 'Não existem serviços cadastrados' });
}

/**
 * @description Edita um serviço.
 */
async function updateService(req, res) {
  const service = await Service.update(
    req.body.service_id,
    req.body.serviceName,
    req.body.duration,
    req.body.description,
  );

  if (service)
    res
      .status(200)
      .json({ success: true, menssage: 'Serviço editado com sucesso' });
  else res.status(401).json({ menssage: 'Algo deu errado.' });
}

/**
 * @description Linka um funcionário a um serviço.
 */
async function linkFuncToService(req, res) {
  const link = await ServHasFunc.create(
    req.body.funcionary_id,
    req.body.service_id,
  );
  if (link === true)
    res.status(200).json({ menssage: 'O Funcionário foi linkado ao serviço.' });
  else res.status(401).json({ menssage: 'Algo deu errado' });
}

/**
 * @description Lista todos os funcionários.
 */
async function loadFunctionarys(req, res) {
  const listFun = await Functionary.list();
  if (listFun.menssage) res.status(401).json(listFun.menssage);
  else res.status(200).json(listFun);
}

/**
 * @description Deleta um serviço.
 */
async function deleteService(req, res) {
  const listService = req.body.servicesTarget;
  const verify = await Service.destroy(listService);
  if (verify === true) {
    res.status(200).json({
      success: true,
      menssage: 'Os funcionários foram deletados com sucesso.',
    });
  } else {
    res.status(401).json({ success: false, menssage: 'Algo deu errado' });
  }
}

/**
 * @description Cria um serviço.
 */
async function createService(req, res) {
  let verify = true;
  try {
    const service = await Service.create(
      req.body.serviceName,
      req.body.duration,
      req.body.description,
    );

    if (service.service_id) {
      const funList = req.body.funTargets;
      for (let ii = 0; ii < funList.length; ++ii) {
        if (
          (await ServHasFunc.create(funList[ii], service.service_id)) !== true
        ) {
          verify = false;
        }
      }
    }

    if (verify === true)
      res
        .status(200)
        .json({ success: true, menssage: 'Serviço criado com sucesso' });
  } catch (err) {
    res.status(401).json({ success: false, menssage: 'Algo deu errado' });
  }
}

module.exports = (app) => {
  app.get('/admin/listServices', loadServices);
  app.post('/admin/updateService', updateService);
  app.post('/admin/linkfunctoservice', linkFuncToService);
  app.post('/admin/deleteService', deleteService);
  app.post('/admin/createService', createService);
  app.get('/admin/listFunctionarys', loadFunctionarys);
};
