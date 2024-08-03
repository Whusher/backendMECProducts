const User = require("../models/User");

exports.addUser = async (req, res) => {
  const data = req.body;
  const insertUser = await User.insertUser({ data });
  if (insertUser) {
    return res.json({
      success: true,
      message: "Insertado Correctamente",
    });
  } else {
    return res.json({
      success: false,
      message: "Error al insertar usuario",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.getUsers();
  if (users) {
    return res.json({
      success: true,
      message: "Usuarios encontrados",
      data: users,
    });
  } else {
    return res.json({
      success: false,
      message: "No se encontraron usuarios",
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.getUserById(id);
  if (user) {
    return res.json({
      success: true,
      message: "Usuario encontrado",
      data: user,
    });
  } else {
    return res.json({
      success: false,
      message: "No se encontró el usuario",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleteUser = await User.deleteUser(id);
  if (deleteUser) {
    return res.json({
      success: true,
      message: "Eliminado Correctamente",
    });
  } else {
    return res.json({
      success: false,
      message: "Error al eliminar usuario",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updateUser = await User.updateUser({ id, data });
  if (updateUser) {
    return res.json({
      success: true,
      message: "Actualizado Correctamente",
    });
  } else {
    return res.json({
      success: false,
      message: "Error al actualizar usuario",
    });
  }
};
