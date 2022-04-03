"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamAssessment extends Model {
    static validate(data) {
      const schema = Joi.object({
        name: Joi.string().trim().lowercase().min(2).max(200).required(),
        time: Joi.number().required(),
        totalQuestions: Joi.number().required(),
        markForCorrectAnswer: Joi.number().required(),
        negativeMark: Joi.number(),
        subjectAssessIdWithNumOfQns: Joi.string().required(),
        UserId: Joi.string().uuid().required(),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static associate(models) {
      models.User.hasMany(ExamAssessment);
      ExamAssessment.belongsTo(models.User);
    }
  }
  ExamAssessment.init(
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
      subjectAssessIdWithNumOfQns: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExamAssessment",
    }
  );
  return ExamAssessment;
};
