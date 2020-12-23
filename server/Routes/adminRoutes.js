const Service = require(__dirname + '/../models/Service');
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

module.exports = (app) => {
  app.get('/admin/listServices', loadServices);
  app.post('/admin/updateService', updateService);
  app.post('/admin/linkfunctoservice', linkFuncToService);
};
