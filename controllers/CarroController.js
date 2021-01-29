const db = require('../database');
const fs = require('fs');

function getCarros() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM carro', function (err, rows) {
            if (err) {
                reject(err)
            } else {
                db.query('SELECT * FROM atributos', function (err, rows2) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows.map(carro => {
                        carro.atributos = rows2.filter(atributo => {
                            if (atributo.carroid == carro.id) {
                                return {
                                    atributo: atributo.atributo,
                                    valor: atributo.valor
                                }
                            }
                        });
                        return carro
                    }))
                });
            }
        });
    })
}

function getCarroById(id) {
    return new Promise((resolve, reject) => {
        if (id) {
            db.query('SELECT * FROM carro WHERE id = ?', [id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    db.query('SELECT * FROM atributos', function (err, rows2) {
                        if (err) {
                            reject(err)
                        }
                        resolve(rows.map(carro => {
                            carro.atributos = rows2.filter(atributo => {
                                if (atributo.carroid == carro.id) {
                                    return {
                                        atributo: atributo.atributo,
                                        valor: atributo.valor
                                    }
                                }
                            });
                            return carro
                        }))
                    });
                }
            });
        }
    });
}

function verContacto(carro_id, user_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT f_contacto_carro(?) as "contacto"', [carro_id], function (err, rows) {
            if (err) {
                reject(err)
            } else {
                let result = rows[0];
                db.query('INSERT INTO log_mostrar_contacto (carroId, userId) VALUES (?, ?)', [carro_id, user_id], function (err, rows) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

function inserirCarro(marcaId, modeloId, descricao, ano, preco, quilometro, velocidadeMax, cilindrada, combustivel, imagem, potencia, tipoCaixa, user_id) {
    return new Promise((resolve, reject) => {
        if (marcaId &&
            modeloId &&
            descricao &&
            ano &&
            preco &&
            quilometro &&
            velocidadeMax &&
            cilindrada &&
            combustivel &&
            imagem &&
            potencia &&
            tipoCaixa
        ) {
            db.query('CALL sp_inserir_carro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                marcaId,
                modeloId,
                descricao,
                ano,
                preco,
                quilometro,
                velocidadeMax,
                cilindrada,
                user_id,
                combustivel,
                imagem,
                potencia,
                tipoCaixa
            ], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    db.query("SELECT id FROM carro ORDER BY id DESC LIMIT 1", (err, rows2) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve({
                                message: "Carro inserido com sucesso.",
                                id: rows2[0].id
                            });
                        }
                    })
                }
            });
        } else {
            resolve({
                message: "Campos em falta."
            });
        }
    });
}

function getViews(id) {
    return new Promise((resolve, reject) => {
        if (id) {
            db.query("SELECT count(*) as views FROM log_mostrar_contacto where carroId = ?", [id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows[0]);
                }
            })
        }
    });
}

function getViewsTotal(req, res) {
    return new Promise((resolve, reject) => {
        db.query("SELECT count(*) as views FROM log_mostrar_contacto", function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows[0]);
            }
        })
    });
}

function uploadPhoto(id, file) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync("./public/uploads/")) {
            console.log("criar pasta")
            fs.mkdirSync("./public/uploads/");
        }
        console.log(id)
        if (id) {
            var filename = id + "." + file.mimetype.split("/")[1];
            if (file.mimetype.split("/")[0] == "image") {
                file.mv("./public/uploads/" + filename, function (err) {
                    if (err) reject({
                        message: "Erro ao enviar ficheiro."
                    });
                    db.query("UPDATE carro SET imagem = ? WHERE id = ?", [filename, id], (err, rows) => {
                        if (err) reject({
                            message: "Erro ao enviar ficheiro."
                        });
                        resolve({
                            message: "Ficheiro enviado com sucesso.",
                            filename: filename
                        });
                    })
                    
                })
            } else {
                resolve({
                    message: "Não são suportados ficheiros que não sejam imagens."
                });
            }
        }
    });
}

function getCarrosVendedor(id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT id, descricao FROM carro WHERE userId = ?', [id], function (err, rows) {
            if (err) {
                reject(err)
            } else {
                db.query('SELECT * FROM atributos', function (err, rows2) {
                    if (err) {
                        reject(err)
                    }else{
                        db.query("SELECT * FROM log_mostrar_contacto ", function (err, rows3) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(rows.map(carro => {
                                    carro.preco = rows2.find(atributo => {
                                        if (atributo.atributo == "preco") {
                                            if (atributo.carroid == carro.id) {
                                                return true
                                            }
                                        }
                                    }).valor.replace(/\d(?=(?:\d{3})+$)/g, '$&.');
                                    carro.views = rows3.filter(x =>x.carroId == carro.id).length;
                                    return carro
                                }))
                            }
                        })
                    }                
                });
            }
        });
    })
}

module.exports.getCarros = getCarros;
module.exports.getCarroById = getCarroById;
module.exports.verContacto = verContacto;
module.exports.inserirCarro = inserirCarro;
module.exports.getViews = getViews;
module.exports.getViewsTotal = getViewsTotal;
module.exports.uploadPhoto = uploadPhoto;
module.exports.getCarrosVendedor = getCarrosVendedor;