"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReportedQuestion extends Model {
    static validate(data) {
      const schema = Joi.object({
        reportMessage: Joi.string().trim().lowercase().required(),
        QuestionId: Joi.string().uuid().required(),
        UserId: Joi.string().uuid().required(),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(ReportedQuestion);
      ReportedQuestion.belongsTo(models.User);

      models.Question.hasMany(ReportedQuestion);
      ReportedQuestion.belongsTo(models.Question);
    }
  }
  ReportedQuestion.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      reportMessage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ReportedQuestion",
    }
  );
  return ReportedQuestion;
};
