"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubjectAssessment extends Model {
    static validate(data) {
      const schema = Joi.object({
        name: Joi.string().trim().lowercase().min(2).max(100).required(),
        time: Joi.number().required(),
        totalQuestions: Joi.number().required(),
        markForCorrectAnswer: Joi.number().required(),
        negativeMark: Joi.number(),
        category: Joi.string().trim().lowercase().min(2).max(100).required(),
        UserId: Joi.string().uuid().required(),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(SubjectAssessment);
      SubjectAssessment.belongsTo(models.User);
    }
  }
  SubjectAssessment.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      markForCorrectAnswer: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
      },
      negativeMark: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SubjectAssessment",
    }
  );
  return SubjectAssessment;
};
