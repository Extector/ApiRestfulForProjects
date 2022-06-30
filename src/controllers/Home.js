class Home {
  index(req, res) {
    res.json({
      tudoCerto: true,
    });
  }
}

export default new Home();
