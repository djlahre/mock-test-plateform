"use strict";
const Joi = require("joi");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static validate(data) {
      const schema = Joi.object({
        firstName: Joi.string().trim().lowercase().min(2).max(25).required(),
        lastName: Joi.string().trim().lowercase().min(2).max(25).required(),
        email: Joi.string()
          .trim()
          .lowercase()
          .email({
            minDomainSegments: 2,
          })
          .required(),
        password: Joi.string().trim().min(8).required(),
        confirmPassword: Joi.ref("password"),
        phoneNumber: Joi.string().trim().min(10).max(13),
        gender: Joi.string()
          .trim()
          .lowercase()
          .valid("male", "female", "other"),
        dob: Joi.date().min("1970-01-01").max(Date.now()),
      });
      return schema.validateAsync(data, { abortEarly: false });
    }

    static filterPassword(user) {
      delete user.dataValues.password;
      return user;
    }

    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      dob: DataTypes.DATEONLY,
      role: {
        type: DataTypes.STRING,
        defaultValue: "student",
      },
      member: {
        type: DataTypes.STRING,
        defaultValue: "free",
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
