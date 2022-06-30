class Home {
  index(req, res, next) {
    res.json({
      'Tudo certo': true,
    });
  }
}

export default new Home();
