const Menu = require("../models/menu.model");

filen = "";

exports.create = (req, res) => {
  const { body } = req;
  let menuToSave = new Menu(body);
  menuToSave.img = filen;
  menuToSave
    .save()
    .then((success) => {
      console.log("the new menu is : ", success);
      filen = "";
      res.send(success);
    })
    .catch((error) => {
      console.log("menu not saved :( ", error);
      res.status(400).send(error);
    });
};

exports.findAll = (req, res) => {
  Menu.find()
    .then((success) => {
      // console.log("all my menus are : ", success);
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

exports.findMenuById = (req, res) => {
  const { id } = req.params;
  Menu.findById({ _id: id })
    .then((success) => {
      console.log(`Menu ${id} est :`, success);
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};
exports.findMenuByWeight = (req, res) => {
  let { weight } = req.params;
  Menu.findOne({ weight: weight })
    .then((success) => {
      console.log(`Menu de ${weight} est :`, success);
      res.send(success);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

exports.updateMenu = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log("req" + req);

  if (filen.length > 0) {
    body.img = filen;
  }
  Menu.findOneAndUpdate({ _id: id }, body)
    .then((success) => {
      console.log(`le menu ${id} est modifié :) `, success);
      filen = "";
      console.log("body" + body);
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.deleteMenu = (req, res) => {
  const { id } = req.params;
  Menu.findOneAndDelete({ _id: id })
    .then((success) => {
      console.log(`le menu ${id} est supprimé :) `, success);
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
};
