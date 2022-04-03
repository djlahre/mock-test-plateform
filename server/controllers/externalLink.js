const { Op } = require("sequelize");
const { ExternalLink } = require("../models");

const getAll = async (req, res) => {
  const { category } = req.params;
  if (!category) return res.status(400).json({ msg: "Category not found" });

  let externalLinks = [];
  if (category === "current-opening") {
    externalLinks = await ExternalLink.findAll({
      where: {
        category,
        closingDate: {
          [Op.gte]: new Date(),
        },
      },
      order: [["createdAt", "DESC"]],
    });
  } else if (category === "important" || category === "study-material") {
    externalLinks = await ExternalLink.findAll({
      where: { category },
      order: [["createdAt", "DESC"]],
    });
  }
  if (externalLinks.length > 0) return res.json(externalLinks);
  res.status(404).json({ msg: "Links not found" });
};

const create = async (req, res) => {
  if (req.body.category === "current-opening") {
    if (!(req.body.openingDate && req.body.closingDate))
      return res.status(400).json(["openingDate and closingDate required"]);
  }
  const data = await ExternalLink.validate(req.body);
  const createdData = await ExternalLink.create(data);
  if (createdData) return res.json(createdData);
  res.status(500).json({ msg: "Server error!!!" });
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = await ExternalLink.validate(req.body);
  const [isUpdated] = await ExternalLink.update(data, { where: { id } });
  if (isUpdated) return res.json({ msg: "Link updated successfully" });
  res.status(404).json({ msg: "Link not found" });
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await ExternalLink.destroy({ where: { id } });
  if (isDeleted) return res.json({ msg: "Link deleted successfully" });
  res.status(404).json({ msg: "Link not found" });
};

module.exports = {
  getAll,
  create,
  update,
  deleteData,
};
