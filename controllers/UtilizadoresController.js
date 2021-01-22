const db = require('../database');

function getUtilizadores() {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, email, firstName, lastName, userTypeId, contacto FROM users', function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows);
            }
        });
    });
}

function getUtilizadoresById(id) {
    return new Promise((resolve, reject) => {
        if (id) {
            db.query('SELECT id, email, firstName, lastName, userTypeId, contacto FROM users WHERE id = ?', [id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            });
        }
    });
}

function updateUtilizador(id, firstName, lastName, email, userTypeId, contacto) {
    return new Promise((resolve, reject) => {
        if (id &&
            firstName &&
            lastName &&
            email &&
            userTypeId &&
            contacto
        ) {
            db.query('UPDATE users SET email = ?, firstName = ?, lastName = ?, userTypeId = ?, contacto = ? WHERE id = ?', [
                email,
                firstName,
                lastName,
                userTypeId,
                contacto,
                id
            ], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: "Utilizador atualizado com sucesso."
                    });
                }
            });
        } else {
            reject({
                message: "Campos em falta."
            });
        }
    });
}

function deleteUtilizador(id) {
    return new Promise((resolve, reject) => {
        if (id) {
            db.query('DELETE FROM users WHERE id = ?', [id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: "O utilizador foi apagado com sucesso."
                    });
                }
            });
        }
    });
}

function getUserTypes() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM userstype', function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports.getUtilizadores = getUtilizadores;
module.exports.getUtilizadoresById = getUtilizadoresById;
module.exports.updateUtilizador = updateUtilizador;
module.exports.deleteUtilizador = deleteUtilizador;
module.exports.getUserTypes = getUserTypes;
