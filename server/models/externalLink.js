"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExternalLink extends Model {
    static validate(data) {
      const schema = Joi.object({
        category: Joi.string()
          .trim()
          .lowercase()
          .valid("important", "study-material", "current-opening")
          .required(),
        title: Joi.string().trim().lowercase().min(2).max(255).required(),
        link: Joi.string().uri().required(),
        openingDate: Joi.date(),
        closingDate: Joi.date(),
        UserId: Joi.string().uuid().required(),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(ExternalLink);
      ExternalLink.belongsTo(models.User);
    }
  }
  ExternalLink.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      openingDate: {
        type: DataTypes.DATEONLY,
      },
      closingDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "ExternalLink",
    }
  );
  return ExternalLink;
};
