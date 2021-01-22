const db = require('../database');

function getModelos() {
    return new Promise((resolve, reject) => {
        db.query('SELECT modelo.*, marca.marcaNome FROM modelo INNER JOIN marca ON modeloMarcaId = marca.id', function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        });
    });
}

function getModelosByMarca(marca_id) {
    return new Promise((resolve, reject) => {
        if (marca_id) {
            db.query('SELECT * FROM modelo WHERE modeloMarcaId = ?', [marca_id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            });
        }
    });
}

function inserirModelo(marcaId, modeloNome) {
    return new Promise((resolve, reject) => {
        if (marcaId &&
            modeloNome
        ) {
            db.query('INSERT INTO modelo (modeloNome, modeloMarcaId) VALUES (?, ?)', [modeloNome, marcaId], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: "Modelo inserido com sucesso.",
                        id: rows.insertId
                    });
                }
            });
        }
    });
}

function updateModelo(id, marcaId, modeloNome) {
    return new Promise((resolve, reject) => {
        if (id) {
            if (marcaId &&
                modeloNome
            ) {
                db.query('UPDATE modelo SET modeloNome = ?, modeloMarcaId = ? WHERE id = ?', [modeloNome, marcaId, id], function (err, rows) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            message: "Modelo atualizado com sucesso."
                        });
                    }
                });
            }
        }
    });
}

module.exports.getModelos = getModelos;
module.exports.getModelosByMarca = getModelosByMarca;
module.exports.updateModelo = updateModelo;
module.exports.inserirModelo = inserirModelo;