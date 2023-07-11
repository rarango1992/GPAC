const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();
const auth = require("../middlewares/auth");
const joi = require("joi");


router.post("/Login", (req, res, next) => {
  const schemaLogin = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
  });

  const { error } = schemaLogin.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    userModel.findOne(
      {
        name: req.body.name,
      },
      (err, db) => {
        if (!err) {
          if (db) {
            bcrypt.compare(req.body.password, db.password, (err, result) => {
              if (!err) {
                if (result) {
                  const token = jwt.sign(
                    { userId: db._id },
                    process.env.TOKEN_KEY,
                    { expiresIn: "1h" }
                  );
                  const response = {
                    data: {
                      login: true,
                      name: db.name,
                      adminPrivileges: db.adminPrivileges,
                      _id: db._id,
                    },
                    msg: "Login Success.",
                    code: 200,
                    token: token,
                  };
                  res.send(response);
                } else {
                  const response = {
                    data: {
                      login: false,
                    },
                    msg: "Invalid Password.",
                    code: 10,
                  };
                  res.send(response);
                }
              } else {
                console.log(err);
                const response = {
                  data: err.toString(),
                  msg: "API Error",
                  code: 1,
                };
                res.send(response);
              }
            });
          } else {
            const response = {
              data: {
                login: false,
              },
              msg: "Invalid User.",
              code: 10,
            };
            res.send(response);
          }
        } else {
          const response = {
            data: err.toString(),
            msg: "API Error",
            code: 1,
          };
          res.send(response);
        }
      }
    );
  }
});

router.post("/AddUser", auth, (req, res, next) => {
  const schemaUser = joi.object({
    name: joi.string().alphanum().min(5).max(255).required(),

    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .max(255)
      .required(),

    adminPrivileges: joi.boolean().required(),
  });

  const { error } = schemaUser.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (!err) {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (!err) {
            userModel.find({ name: req.body.name }, (err, db) => {
              if (!err) {
                if (db.length > 0) {
                  const response = {
                    data: {},
                    msg: "User already exists in DB.",
                    code: 10,
                  };
                  res.send(response);
                } else {
                  const registro = new userModel({
                    name: req.body.name,
                    password: hash,
                    adminPrivileges: req.body.adminPrivileges,
                  });
                  registro.save((err, db) => {
                    if (!err) {
                      db.password = undefined;
                      const response = {
                        data: db,
                        msg: "User created in DB.",
                        code: 200,
                      };
                      res.send(response);
                    } else {
                      const response = {
                        data: err.toString(),
                        msg: "API Error.",
                        code: 1,
                      };
                      res.send(response);
                    }
                  });
                }
              } else {
                const response = {
                  data: err.toString(),
                  msg: "API Error",
                  code: 1,
                };
                res.send(response);
              }
            });
          } else {
            const response = {
              data: err.toString(),
              msg: "API Error",
              code: 1,
            };
            res.send(response);
          }
        });
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

router.post("/SearchUsers", auth, (req, res, next) => {
  const schemaGet = joi.object({
    filter: {
      name: joi.string().alphanum().min(1).max(255),
      adminPrivileges: joi.boolean(),
    },
    order: {
      name: joi.string().valid("asc", "desc"),
      adminPrivileges: joi.string().valid("asc", "desc")
    },
  });
  const { error } = schemaGet.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    let filter = {};
    if (req.body.filter) {
      if (req.body.filter.name) {
        let regexp = new RegExp("^" + req.body.filter.name);
        filter.name = regexp;
      }
      if (req.body.filter.adminPrivileges)
        filter.adminPrivileges = req.body.filter.adminPrivileges;
    }
    let order = req.body.order;
    userModel.find(filter, { password: 0 }, (err, db) => {
      if (!err) {
        if (order) {
          if (order.adminPrivileges === "asc") {
            db.sort((a, b) => {
              if (a.adminPrivileges < b.adminPrivileges) {
                return 1;
              }
              if (a.adminPrivileges > b.adminPrivileges) {
                return -1;
              }
              return 0;
            });
          } else {
            if (order.adminPrivileges === "desc") {
              db.sort((a, b) => {
                if (a.adminPrivileges < b.adminPrivileges) {
                  return -1;
                }
                if (a.adminPrivileges > b.adminPrivileges) {
                  return 1;
                }
                return 0;
              });
            }
          }
          if (order.name === "asc") {
            db.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();

              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
          } else {
            if (order.name === "desc") {
              db.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();

                if (fa < fb) {
                  return 1;
                }
                if (fa > fb) {
                  return -1;
                }
                return 0;
              });
            }
          }
        }

        const response = {
          data: db,
          msg: "User List.",
          code: 200,
        };
        res.send(response);
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error.",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

router.get("/GetUsers", auth, (req, res, next) => {
  userModel.find({}, { password: 0 }, (err, db) => {
    if (!err) {
      const response = {
        data: db,
        msg: "User List.",
        code: 200,
      };
      res.send(response);
    } else {
      const response = {
        data: err.toString(),
        msg: "API Error.",
        code: 1,
      };
      res.send(response);
    }
  });
});

router.put("/UpdateUser", auth, (req, res, next) => {
  const schemaUser = joi.object({
    _id: joi.string().alphanum().min(24).max(24).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .max(255),
    adminPrivileges: joi.boolean(),
  });

  const { error } = schemaUser.validate(req.body);

  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    let newData = {};
    const saltRounds = 10;
    if (req.body.adminPrivileges != undefined)
      newData.adminPrivileges = req.body.adminPrivileges;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (!err) {
        if (req.body.password) {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (!err) {
              newData.password = hash;
              userModel.findOneAndUpdate(
                { _id: req.body._id },
                newData,
                (err, db) => {
                  if (!err) {
                    if (db) {
                      userModel.findOne(
                        { _id: db._id },
                        { password: 0 },
                        (err, dbUpdated) => {
                          if (!err) {
                            if (dbUpdated) {
                              const response = {
                                data: dbUpdated,
                                msg: "User updated in DB.",
                                code: 200,
                              };
                              res.send(response);
                            } else {
                              const response = {
                                data: {},
                                msg: "User not found in DB.",
                                code: 10,
                              };
                              res.send(response);
                            }
                          } else {
                            const response = {
                              data: err.toString(),
                              msg: "API Error",
                              code: 1,
                            };
                            res.send(response);
                          }
                        }
                      );
                    } else {
                      const response = {
                        data: {},
                        msg: "User not found in DB.",
                        code: 10,
                      };
                      res.send(response);
                    }
                  } else {
                    const response = {
                      data: err.toString(),
                      msg: "API Error",
                      code: 1,
                    };
                    res.send(response);
                  }
                }
              );
            } else {
              const response = {
                data: err.toString(),
                msg: "API Error",
                code: 1,
              };
              res.send(response);
            }
          });
        } else {
          userModel.findOneAndUpdate(
            { _id: req.body._id },
            newData,
            (err, db) => {
              if (!err) {
                if (db) {
                  userModel.findOne(
                    { _id: db._id },
                    { password: 0 },
                    (err, dbUpdated) => {
                      if (!err) {
                        if (dbUpdated) {
                          const response = {
                            data: dbUpdated,
                            msg: "User updated in DB.",
                            code: 200,
                          };
                          res.send(response);
                        } else {
                          const response = {
                            data: {},
                            msg: "User not found in DB.",
                            code: 10,
                          };
                          res.send(response);
                        }
                      } else {
                        const response = {
                          data: err.toString(),
                          msg: "API Error",
                          code: 1,
                        };
                        res.send(response);
                      }
                    }
                  );
                } else {
                  const response = {
                    data: {},
                    msg: "User not found in DB.",
                    code: 10,
                  };
                  res.send(response);
                }
              } else {
                const response = {
                  data: err.toString(),
                  msg: "API Error",
                  code: 1,
                };
                res.send(response);
              }
            }
          );
        }
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

router.delete("/DeleteUser", auth, (req, res, next) => {
  const schemaUser = joi.object({
    _id: joi.string().alphanum().min(24).max(24).required(),
  });
  const { error } = schemaUser.validate(req.body);
  if (error) {
    const response = {
      data: error.details,
      msg: "API Error.",
      code: 3,
    };
    res.send(response);
  } else {
    userModel.findOneAndDelete({ _id: req.body._id }, (err, db) => {
      if (!err) {
        if (db) {
          const response = {
            data: { db },
            msg: "User deleted in DB.",
            code: 200,
          };
          res.send(response);
        } else {
          const response = {
            data: {},
            msg: "User not found in DB.",
            code: 10,
          };
          res.send(response);
        }
      } else {
        const response = {
          data: err.toString(),
          msg: "API Error",
          code: 1,
        };
        res.send(response);
      }
    });
  }
});

module.exports = router;
