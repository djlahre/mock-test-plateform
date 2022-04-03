"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static validate(data) {
      const schema = Joi.object({
        body: Joi.string().trim().lowercase().min(5).required(),
        optionA: Joi.string().trim().lowercase().min(1).max(255).required(),
        optionB: Joi.string().trim().lowercase().min(1).max(255).required(),
        optionC: Joi.string().trim().lowercase().min(1).max(255).required(),
        optionD: Joi.string().trim().lowercase().min(1).max(255).required(),
        answer: Joi.string()
          .trim()
          .lowercase()
          .valid("a", "b", "c", "d")
          .required(),
        explanation: Joi.string().trim().lowercase().min(1).required(),
        source: Joi.string().trim().lowercase().min(1).max(200),
        SubjectAssessmentId: Joi.string().uuid().required(),
        UserId: Joi.string().uuid().required(),
      });

      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(Question);
      Question.belongsTo(models.User);

      models.SubjectAssessment.hasMany(Question);
      Question.belongsTo(models.SubjectAssessment);
    }
  }
  Question.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      optionA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      optionB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      optionC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      optionD: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      explanation: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        defaultValue: "internet",
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
