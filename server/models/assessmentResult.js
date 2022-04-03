"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AssessmentResult extends Model {
    static validate(data) {
      const schema = Joi.object({
        paper: Joi.string().required(),
        totalQuestions: Joi.number().required(),
        attempted: Joi.number().required(),
        correct: Joi.number().required(),
        wrong: Joi.number().required(),
        totalMarks: Joi.number().required(),
        obtainedMarks: Joi.number().required(),
        correctAnswers: Joi.string().required(),
        selectedAnswers: Joi.string().required(),
        assessmentType: Joi.string()
          .lowercase()
          .valid("exam", "subject")
          .required(),
        assessmentId: Joi.string().uuid().required(),
        UserId: Joi.string().uuid().required(),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(AssessmentResult);
      AssessmentResult.belongsTo(models.User);
    }
  }
  AssessmentResult.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      paper: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attempted: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      wrong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      obtainedMarks: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      correctAnswers: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      selectedAnswers: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      assessmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assessmentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AssessmentResult",
    }
  );
  return AssessmentResult;
};
