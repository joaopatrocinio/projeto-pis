class Carro {

    constructor(id, marcaId, modeloId, userId, descricao, atributos, imagem) {
        this.id = id;
        this.marcaId = marcaId;
        this.modeloId = modeloId;
        this.atributos = atributos;
        this.userId = userId;
        this.descricao = descricao;
        this.imagem = imagem;
    }

    linhaCarro(table) {
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = this.descricao;
        cell2.innerHTML = this.atributos["preco"].toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.') + "€";

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/carros/views/" + this.id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        let self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    cell3.innerHTML = xhr.response.views;
                } else {
                    cell3.innerHTML = 0;
                    console.error("Erro ao buscar visualizações ao servidor.");
                }
            }
        };
        xhr.send();

        cell4.innerHTML = "<button class='btn btn-primary'>Detalhes</button>";
        cell4.addEventListener("click", function () {
            self.showDetails();
        })
    }

    showCarList(list) {

        let car = document.createElement("div");
        car.classList.add("card");
        car.classList.add("m-2")
        car.classList.add("car-list-item");
        let carImage = document.createElement("img");
        carImage.classList.add("card-img-top");
        carImage.src = "uploads/" + this.imagem;
        let carInfo = document.createElement("div");
        carInfo.classList.add("card-body");
        let carName = document.createElement("h5");
        carName.innerText = this.descricao;
        let carPrice = document.createElement("p");
        carPrice.innerText = this.atributos["preco"].toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.') + "€";
        
        let detalhesBtn = document.createElement("button");
        detalhesBtn.classList.add("btn");
        detalhesBtn.classList.add("btn-secondary");
        detalhesBtn.classList.add("float-right");
        detalhesBtn.innerText = "Detalhes";
        let self = this;
        detalhesBtn.addEventListener("click", function () {
            self.showDetails();
        })
        
        carInfo.append(carName);
        carInfo.append(carPrice);
        carInfo.append(detalhesBtn);
        car.append(carImage);
        car.append(carInfo);

        list.append(car);
    }
    
    showDetails() {
        console.log(this)
        document.getElementById("detalhes-img-carro").src = "uploads/" + this.imagem;
        document.getElementById("car-title").innerText = this.descricao;
        document.getElementById("car-year-kms").innerText = "Ano - " + this.atributos.ano + " | " + this.atributos.quilometro.toString().replace(/\d(?=(?:\d{3})+$)/g, '$& ') + " km";
        document.getElementById("car-price").innerText = "PREÇO: " + this.atributos.preco.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.') + "€";

        let atributosDiv = document.getElementById("detalhes-atributos");
        atributosDiv.innerHTML = "";
        for (let attr in this.atributos) {
            if (attr != "preco" && attr != "ano" && attr != "quilometro") {
                let atributo = document.createElement("p");
                atributo.innerHTML = "<b>" + attr.charAt(0).toUpperCase() + attr.slice(1) + "</b>: " + this.atributos[attr];

                if (attr == "cilindrada") {
                    atributo.innerHTML += " cm<sup>3</sup>";
                } else if (attr == "velocidadeMax") {
                    atributo.innerHTML += " km/h";
                } else if (attr == "potencia") {
                    atributo.innerHTML += " cv";
                }

                atributosDiv.append(atributo);
            }
        }

        let vendedorDiv = document.getElementById("detalhes-vendedor");
        vendedorDiv.innerHTML = "";

        for (let user of window.info.utilizadores) {
            if (user.id == this.userId) {
                let nome = document.createElement("p");
                nome.innerHTML = "<b>Nome</b>: " + user.firstName + " " + user.lastName;
                vendedorDiv.append(nome);
                let contacto = document.createElement("p");

                if (!window.info.loggedInUser)
                    contacto.innerHTML = "<b>Contacto</b>: <a href='javascript: info.showLogin()'>Necessita fazer login para fazer esta ação.</a>";
                else {
                    contacto.innerHTML = "<b>Contacto</b>: <a id='contacto-field' href='javascript: info.mostrarTlm(" + this.id + ")'>Mostrar número de telemóvel</a>";
                }
                vendedorDiv.append(contacto);
            }
        }

        changeView("detalhes");
    }
}