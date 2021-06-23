const create = (req, res, next) => {
  const { name, description, price, image_url } = req.body;

  const db = req.app.get("db");

  db.create_product([name, description, price, image_url])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500).json(error);
      console.log("You are failing at life.");
    });
};

const getOne = (req, res, next) => {
  const { product_id } = req.params;
  const db = req.app.get("db");
  db.read_product(product_id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
      console.log("Abort mission now!");
    });
};

const del = (req, res, next) => {
  const { product_id } = req.params;
  const db = req.app.get("db");
  db.delete_product(product_id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((error) => {
      res.status(500).json(error);
      console.log("This message is about to self-destruct!");
    });
};

const getAll = (req, res, next) => {
  const db = req.app.get("db");
  const { name, description, price, image_url } = req.body;
  db.read_products(name, description, price, image_url)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => console.log(error));
};

const update = (req, res, next) => {
  const { params, query } = req;
  const db = req.app.get("db");
  db.update_product([params.id, query.desc])
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  del,
};
