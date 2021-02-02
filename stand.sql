drop database if exists stand;
create database stand;
use stand;


CREATE TABLE userstype (
    id INT NOT NULL PRIMARY KEY,
    userType varchar(50) NOT NULL
);

INSERT INTO userstype VALUES (1, "Administrador");
INSERT INTO userstype VALUES (2, "Vendedor");
INSERT INTO userstype VALUES (3, "Comprador");

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email varchar(125) NOT NULL,
    password varchar(200) not null,
    firstName varchar(30),
    lastName varchar(30),
    userTypeId int,
    contacto int,
    foreign key(usertypeId) references userstype(id)
);

INSERT INTO users VALUES ('1', 'admin@admin.com', '$2b$10$OKvp3bkcfYsVXoA0t4xIhOkI0DXfIqOMDlx/PrpkBnYBXVwtzbxby', 'admin', 'admin', '1', '912345678');
INSERT INTO users VALUES ('2', 'teste@teste.com', '$2b$10$cKYxW4apzlVPvduLFs.HPeIY5jgGJcR29QQicPjATKUYN4c9b5UAW', 'teste', 'teste', '3', '917382562');
INSERT INTO users VALUES ('3', 'seller@seller.com', '$2b$10$hjoeOk052UngqgIXDW6jl.ifOOc8Ouqcn/0cvzDAlFnzLEat2V0.C', 'seller', 'seller', '2', '917362925');




CREATE TABLE marca (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    marcaNome VARCHAR(30)
);
INSERT INTO marca VALUES ('1', 'Abarth');
INSERT INTO marca VALUES ('2', 'Alfa Romeo');
INSERT INTO marca VALUES ('3', 'Aston Martin');
INSERT INTO marca VALUES ('4', 'Audi');
INSERT INTO marca VALUES ('5', 'BMW');
INSERT INTO marca VALUES ('6', 'Chevrolet');
INSERT INTO marca VALUES ('7', 'Citroën');
INSERT INTO marca VALUES ('8', 'Dacia');
INSERT INTO marca VALUES ('9', 'DS');
INSERT INTO marca VALUES ('10', 'Ferrari');
INSERT INTO marca VALUES ('11', 'Honda');
INSERT INTO marca VALUES ('12', 'Hyundai');
INSERT INTO marca VALUES ('13', 'Jaguar');
INSERT INTO marca VALUES ('14', 'Jeep');
INSERT INTO marca VALUES ('15', 'Land Rover');
INSERT INTO marca VALUES ('16', 'Mazda');
INSERT INTO marca VALUES ('17', 'Mercedes-Benz');
INSERT INTO marca VALUES ('18', 'MINI');
INSERT INTO marca VALUES ('19', 'Mitsubishi');
INSERT INTO marca VALUES ('20', 'Nissan');
INSERT INTO marca VALUES ('21', 'Opel');
INSERT INTO marca VALUES ('22', 'Peugeot');
INSERT INTO marca VALUES ('23', 'Porsche');
INSERT INTO marca VALUES ('24', 'Renault');
INSERT INTO marca VALUES ('25', 'SEAT');
INSERT INTO marca VALUES ('26', 'Skoda');
INSERT INTO marca VALUES ('27', 'Suzuki');
INSERT INTO marca VALUES ('28', 'Tesla');
INSERT INTO marca VALUES ('29', 'Toyota');
INSERT INTO marca VALUES ('30', 'Volkswagen');
INSERT INTO marca VALUES ('31', 'Volvo');

CREATE TABLE modelo (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    modeloNome VARCHAR(30),
    modeloMarcaId INT
);

INSERT INTO `modelo` VALUES ('1', 'Model S', '28');
INSERT INTO `modelo` VALUES ('2', 'Model 3', '28');
INSERT INTO `modelo` VALUES ('3', 'Model X', '28');
INSERT INTO `modelo` VALUES ('4', 'Model Y', '28');
INSERT INTO `modelo` VALUES ('5', 'Clio', '24');
INSERT INTO `modelo` VALUES ('6', 'Megane', '24');
INSERT INTO `modelo` VALUES ('7', 'Captur', '24');
INSERT INTO `modelo` VALUES ('8', 'Zoe', '24');
INSERT INTO `modelo` VALUES ('9', 'A3', '4');
INSERT INTO `modelo` VALUES ('10', 'S4', '4');
INSERT INTO `modelo` VALUES ('11', 'Q8', '4');
INSERT INTO `modelo` VALUES ('12', 'R8', '4');
INSERT INTO `modelo` VALUES ('13', 'F40', '10');
INSERT INTO `modelo` VALUES ('14', '488 Pista', '10');
INSERT INTO `modelo` VALUES ('15', '468 Italia Speciale', '10');
INSERT INTO `modelo` VALUES ('16', 'F430', '10');
INSERT INTO `modelo` VALUES ('17', 'CX-5', '16');
INSERT INTO `modelo` VALUES ('18', 'CX-30', '16');
INSERT INTO `modelo` VALUES ('19', 'MX-5', '16');
INSERT INTO `modelo` VALUES ('20', 'CX-3', '16');
INSERT INTO `modelo` VALUES ('21', 'Jazz', '11');
INSERT INTO `modelo` VALUES ('22', 'Civic', '11');
INSERT INTO `modelo` VALUES ('23', 'HR-V', '11');
INSERT INTO `modelo` VALUES ('24', 'CR-V', '11');
INSERT INTO `modelo` VALUES ('25', 'Yaris', '29');
INSERT INTO `modelo` VALUES ('26', 'Corolla', '29');
INSERT INTO `modelo` VALUES ('27', 'Prius', '29');
INSERT INTO `modelo` VALUES ('28', 'GR Supra', '29');
INSERT INTO `modelo` VALUES ('29', 'X1', '5');
INSERT INTO `modelo` VALUES ('30', 'X2', '5');
INSERT INTO `modelo` VALUES ('31', 'M3', '5');
INSERT INTO `modelo` VALUES ('32', 'Z4', '5');
INSERT INTO `modelo` VALUES ('33', 'A180', '17');
INSERT INTO `modelo` VALUES ('34', 'CLA 45 AMG', '17');
INSERT INTO `modelo` VALUES ('35', 'CLS 350', '17');
INSERT INTO `modelo` VALUES ('36', 'EQC 400', '17');
INSERT INTO `modelo` VALUES ('37', '108', '22');
INSERT INTO `modelo` VALUES ('38', '208', '22');
INSERT INTO `modelo` VALUES ('39', '3008', '22');
INSERT INTO `modelo` VALUES ('40', 'Logan', '8');
INSERT INTO `modelo` VALUES ('41', 'Sandero', '8');
INSERT INTO `modelo` VALUES ('42', 'Dokker', '8');
INSERT INTO `modelo` VALUES ('43', 'Duster', '8');
INSERT INTO `modelo` VALUES ('44', 'Lodgy X', '8');
INSERT INTO `modelo` VALUES ('45', 'Micra', '20');
INSERT INTO `modelo` VALUES ('46', 'Juke', '20');
INSERT INTO `modelo` VALUES ('47', 'Leaf', '20');
INSERT INTO `modelo` VALUES ('48', 'Qashqai', '20');
INSERT INTO `modelo` VALUES ('49', '500', '1');
INSERT INTO `modelo` VALUES ('50', 'Giulia', '2');
INSERT INTO `modelo` VALUES ('51', '159', '2');
INSERT INTO `modelo` VALUES ('52', '3 Crossback', '9');
INSERT INTO `modelo` VALUES ('53', '7 Crossback', '9');
INSERT INTO `modelo` VALUES ('54', 'E-Pace', '13');
INSERT INTO `modelo` VALUES ('55', 'I-Pace', '13');
INSERT INTO `modelo` VALUES ('56', '3', '16');
INSERT INTO `modelo` VALUES ('57', 'MX-5', '16');
INSERT INTO `modelo` VALUES ('58', '6', '16');
INSERT INTO `modelo` VALUES ('59', 'Leaf', '13');
INSERT INTO `modelo` VALUES ('60', 'Micra', '13');
INSERT INTO `modelo` VALUES ('61', 'GT-R', '13');
INSERT INTO `modelo` VALUES ('62', 'Corsa', '21');
INSERT INTO `modelo` VALUES ('63', 'Astra', '21');
INSERT INTO `modelo` VALUES ('64', 'Clio', '21');
INSERT INTO `modelo` VALUES ('65', 'Megane', '21');
INSERT INTO `modelo` VALUES ('66', 'Swift', '27');
INSERT INTO `modelo` VALUES ('67', 'Swift Sport', '27');
INSERT INTO `modelo` VALUES ('68', 'Vitara', '27');
INSERT INTO `modelo` VALUES ('69', 'Ibiza', '25');
INSERT INTO `modelo` VALUES ('70', 'Leon', '25');
INSERT INTO `modelo` VALUES ('71', 'Arona', '25');
INSERT INTO `modelo` VALUES ('72', 'DB11', '3');
INSERT INTO `modelo` VALUES ('73', 'DBS', '3');
INSERT INTO `modelo` VALUES ('74', 'Vantage', '3');
INSERT INTO `modelo` VALUES ('75', 'Impala', '6');
INSERT INTO `modelo` VALUES ('76', 'Malibu', '6');
INSERT INTO `modelo` VALUES ('77', 'Volt', '6');
INSERT INTO `modelo` VALUES ('78', 'C1', '7');
INSERT INTO `modelo` VALUES ('79', 'C3', '7');
INSERT INTO `modelo` VALUES ('80', 'C4 Cactus', '7');
INSERT INTO `modelo` VALUES ('81', 'i20', '12');
INSERT INTO `modelo` VALUES ('82', 'i20 Active', '12');
INSERT INTO `modelo` VALUES ('83', 'i30 Fastback', '12');
INSERT INTO `modelo` VALUES ('84', 'Veloster', '12');
INSERT INTO `modelo` VALUES ('85', 'Cherokee', '14');
INSERT INTO `modelo` VALUES ('86', 'Renegade', '14');
INSERT INTO `modelo` VALUES ('87', 'Defender', '15');
INSERT INTO `modelo` VALUES ('88', 'Discovery', '15');
INSERT INTO `modelo` VALUES ('89', 'Freelander', '15');
INSERT INTO `modelo` VALUES ('90', 'One', '18');
INSERT INTO `modelo` VALUES ('91', 'Cooper', '18');
INSERT INTO `modelo` VALUES ('92', 'Colt', '19');
INSERT INTO `modelo` VALUES ('93', 'Lancer', '19');
INSERT INTO `modelo` VALUES ('94', 'Space Star', '19');
INSERT INTO `modelo` VALUES ('95', 'ASX', '19');
INSERT INTO `modelo` VALUES ('96', 'Boxter', '23');
INSERT INTO `modelo` VALUES ('97', 'Panamera', '23');
INSERT INTO `modelo` VALUES ('98', 'Cayenne', '23');
INSERT INTO `modelo` VALUES ('99', 'Taycan', '23');
INSERT INTO `modelo` VALUES ('100', '911', '23');
INSERT INTO `modelo` VALUES ('101', 'Fabia', '26');
INSERT INTO `modelo` VALUES ('102', 'Scala', '26');
INSERT INTO `modelo` VALUES ('103', 'Octavia', '26');
INSERT INTO `modelo` VALUES ('104', 'Golf', '30');
INSERT INTO `modelo` VALUES ('105', 'Golf R', '30');
INSERT INTO `modelo` VALUES ('106', 'Polo', '30');
INSERT INTO `modelo` VALUES ('107', 'Up!', '30');
INSERT INTO `modelo` VALUES ('108', 'Sharan', '30');
INSERT INTO `modelo` VALUES ('109', 'T-Roc', '30');
INSERT INTO `modelo` VALUES ('110', 'V40', '31');
INSERT INTO `modelo` VALUES ('111', 'C30', '31');
INSERT INTO `modelo` VALUES ('112', 'S70', '31');
INSERT INTO `modelo` VALUES ('113', 'V90', '31');
INSERT INTO `modelo` VALUES ('114', 'A 45 AMG', '17');

CREATE TABLE carro (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    marcaID INT NOT NULL,
    modeloId INT,
    userId INT,
    descricao VARCHAR(255),
    imagem VARCHAR(255),
    FOREIGN KEY (userId)
        REFERENCES users (id)
        ON DELETE CASCADE
);

INSERT INTO carro VALUES ('1', '16', '18', '3', 'Mazda CX-30 1.8 Sky-D Excellence ', '1.jpeg');
INSERT INTO carro VALUES ('2', '20', '48', '3', 'Nissan Qashqai 1.5 DCi Business Edition', NULL);
INSERT INTO carro VALUES ('3', '4', '9', '3', 'Audi A3 Limousine 1.6 TDi S-Line S Tronic', NULL);
INSERT INTO carro VALUES ('4', '22', '39', '3', 'Peugeot 3008 1.6 BlueHDi Allure EAT6 J18', NULL);
INSERT INTO carro VALUES ('5', '17', '114', '3', 'Mercedes-Benz A 45 AMG 4-Matic', NULL);
INSERT INTO carro VALUES ('6', '29', '25', '3', 'Toyota Yaris 1.4 D-4D Active', NULL);

CREATE TABLE atributos (
    carroid INT,
    atributo VARCHAR(20),
    descricao VARCHAR(20),
    FOREIGN KEY (carroid)
        REFERENCES carro (id)
        ON DELETE CASCADE
);

INSERT INTO atributos VALUES ('1', 'quilometro', '600');
INSERT INTO atributos VALUES ('1', 'velocidadeMax', '198');
INSERT INTO atributos VALUES ('1', 'cilindrada', '1800');
INSERT INTO atributos VALUES ('1', 'preco', '30250');
INSERT INTO atributos VALUES ('1', 'combustivel', 'Gasolina');
INSERT INTO atributos VALUES ('1', 'ano', '2021');
INSERT INTO atributos VALUES ('1', 'potencia', '118');
INSERT INTO atributos VALUES ('1', 'tipoCaixa', 'Manual');
INSERT INTO atributos VALUES ('2', 'quilometro', '90543');
INSERT INTO atributos VALUES ('2', 'velocidadeMax', '194');
INSERT INTO atributos VALUES ('2', 'cilindrada', '1461');
INSERT INTO atributos VALUES ('2', 'preco', '17250');
INSERT INTO atributos VALUES ('2', 'combustivel', 'Diesel');
INSERT INTO atributos VALUES ('2', 'ano', '2018');
INSERT INTO atributos VALUES ('2', 'potencia', '115');
INSERT INTO atributos VALUES ('2', 'tipoCaixa', 'Manual');
INSERT INTO atributos VALUES ('3', 'quilometro', '92000');
INSERT INTO atributos VALUES ('3', 'velocidadeMax', '205');
INSERT INTO atributos VALUES ('3', 'cilindrada', '1598');
INSERT INTO atributos VALUES ('3', 'preco', '22900');
INSERT INTO atributos VALUES ('3', 'combustivel', 'Diesel');
INSERT INTO atributos VALUES ('3', 'ano', '2016');
INSERT INTO atributos VALUES ('3', 'potencia', '110');
INSERT INTO atributos VALUES ('3', 'tipoCaixa', 'Automática');
INSERT INTO atributos VALUES ('4', 'quilometro', '162410');
INSERT INTO atributos VALUES ('4', 'velocidadeMax', '202');
INSERT INTO atributos VALUES ('4', 'cilindrada', '1560');
INSERT INTO atributos VALUES ('4', 'preco', '24900');
INSERT INTO atributos VALUES ('4', 'combustivel', 'Diesel');
INSERT INTO atributos VALUES ('4', 'ano', '2016');
INSERT INTO atributos VALUES ('4', 'potencia', '120');
INSERT INTO atributos VALUES ('4', 'tipoCaixa', 'Automática');
INSERT INTO atributos VALUES ('5', 'quilometro', '121000');
INSERT INTO atributos VALUES ('5', 'velocidadeMax', '257');
INSERT INTO atributos VALUES ('5', 'cilindrada', '1991');
INSERT INTO atributos VALUES ('5', 'preco', '39500');
INSERT INTO atributos VALUES ('5', 'combustivel', 'Gasolina');
INSERT INTO atributos VALUES ('5', 'ano', '2016');
INSERT INTO atributos VALUES ('5', 'potencia', '381');
INSERT INTO atributos VALUES ('5', 'tipoCaixa', 'Automática');
INSERT INTO atributos VALUES ('6', 'quilometro', '91379');
INSERT INTO atributos VALUES ('6', 'velocidadeMax', '170');
INSERT INTO atributos VALUES ('6', 'cilindrada', '1400');
INSERT INTO atributos VALUES ('6', 'preco', '12100');
INSERT INTO atributos VALUES ('6', 'combustivel', 'Diesel');
INSERT INTO atributos VALUES ('6', 'ano', '2016');
INSERT INTO atributos VALUES ('6', 'potencia', '90');
INSERT INTO atributos VALUES ('6', 'tipoCaixa', 'Manual');

CREATE TABLE `sessions` (
  `session_id` varchar(32) NOT NULL,
  `expires` varchar(12) DEFAULT NULL,
  `data` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`session_id`)
);

CREATE TABLE `log_mostrar_contacto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carroId` int NOT NULL,
  `userId` int NOT NULL,
  `datahora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


ALTER TABLE carro
ADD FOREIGN KEY (marcaID) REFERENCES marca(id);

ALTER TABLE carro
ADD FOREIGN KEY (modeloId) REFERENCES modelo(id);

ALTER TABLE modelo
ADD FOREIGN KEY (modeloMarcaId) REFERENCES marca(id);

DROP FUNCTION IF EXISTS f_contacto_carro;
DELIMITER //
CREATE FUNCTION f_contacto_carro(carro_id int)
RETURNS int
DETERMINISTIC
BEGIN
declare user_id int default 0;
declare result int default 0;
select
    userId
into user_id 
from
    carro
where id = carro_id;

select contacto into result from users where id = user_id;

return result;

END //

DELIMITER // 
CREATE PROCEDURE sp_inserir_carro(
    IN  c_marca_id  int,
    IN  c_modelo_id  int,
    IN  c_descricao  varchar(100),
    IN  c_ano  varchar(100),
    IN  c_preco  varchar(100),
    IN  c_quilometro  varchar(100),
    IN  c_velocidade_max  varchar(100),
    IN  c_cilindrada  varchar(100),
    IN  c_user_id  int,
    IN  c_combustivel varchar(100),
    IN  c_imagem varchar(255),
    IN  c_potencia varchar(10),
    IN  c_tipocaixa varchar(20))
BEGIN
  DECLARE carro_id INT DEFAULT 0;
  INSERT INTO carro (marcaID, modeloId, userId, descricao, imagem) VALUES (c_marca_id, c_modelo_id, c_user_id, c_descricao, c_imagem);
  SELECT LAST_INSERT_ID() INTO carro_id;
  INSERT INTO atributos VALUES (carro_id, "quilometro", c_quilometro);
  INSERT INTO atributos VALUES (carro_id, "velocidadeMax", c_velocidade_max);
  INSERT INTO atributos VALUES (carro_id, "cilindrada", c_cilindrada);
  INSERT INTO atributos VALUES (carro_id, "preco", c_preco);
  INSERT INTO atributos VALUES (carro_id, "combustivel", c_combustivel);
  INSERT INTO atributos VALUES (carro_id, "ano", c_ano);
  INSERT INTO atributos VALUES (carro_id, "potencia", c_potencia);
  INSERT INTO atributos VALUES (carro_id, "tipoCaixa", c_tipocaixa);
END //
COMMIT;