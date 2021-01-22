const db = require('../database');

function getMarcas() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM marca', function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        });
    });
}

function getMarcaById(id) {
    return new Promise((resolve, reject) => {
        if (id) {
            db.query('SELECT * FROM marca WHERE id = ?', [id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            });
        }
    });
}

function inserirMarcas(marcaNome) {
    return new Promise((resolve, reject) => {
        if (marcaNome) {
            db.query('INSERT INTO marca (marcaNome) VALUES (?)', [marcaNome], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: "Marca inserida com sucesso.",
                        id: rows.insertId
                    });
                }
            });
        }
    });
}

function updateMarcas(marcaNome, id) {
    return new Promise((resolve, reject) => {
        if (id) {
            if (marcaNome) {
                db.query('UPDATE marca SET marcaNome = ? WHERE id = ?', [marcaNome, id], function (err, rows) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            message: "Marca atualizada com sucesso."
                        });
                    }
                });
            }
        }
    });
}

module.exports.getMarcas = getMarcas;
module.exports.getMarcaById = getMarcaById;
module.exports.inserirMarcas = inserirMarcas;
module.exports.updateMarcas = updateMarcas;