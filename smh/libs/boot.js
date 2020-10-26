module.exports = (app) => {
  //Port
  const port = process.env.PORT || 9000;

  //Server Start
  app.listen(port, () => {
    console.log('Servidor rodando na url: http://localhost:' + port);
  });
};
