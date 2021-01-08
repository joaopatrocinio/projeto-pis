window.onload = function (event) {
    var info = new Informacao();

    // Carregar marcas
    const xhrMarcas = new XMLHttpRequest();
    xhrMarcas.open("GET", "/marcas");
    xhrMarcas.responseType = "json";
    xhrMarcas.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = xhrMarcas.response;
                for (let marca of result) {
                    info.addMarca(marca.id, marca.marcaNome);
                }
            } else {
                console.error("Erro ao pedir marcas ao servidor.");
            }
        }
    };
    xhrMarcas.send();

    // Carregar modelos
    const xhrModelos = new XMLHttpRequest();
    xhrModelos.open("GET", "/modelos");
    xhrModelos.responseType = "json";
    xhrModelos.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = xhrModelos.response;
                for (let modelo of result) {
                    info.addModelo(modelo.id, modelo.modeloNome, modelo.modeloMarcaId);
                }
            } else {
                console.error("Erro ao pedir modelos ao servidor.");
            }
        }
    };
    xhrModelos.send();
    
    // Carregar carros
    const xhrCarros = new XMLHttpRequest();
    xhrCarros.open("GET", "/carros");
    xhrCarros.responseType = "json";
    xhrCarros.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = xhrCarros.response;
                for (let carro of result) {
                    info.addCarroObj(carro.id, carro.marcaID, carro.modeloId, carro.userId, carro.descricao, {}, carro.imagem);
                }
            } else {
                console.error("Erro ao pedir carros ao servidor.");
            }
        }
    };
    xhrCarros.send();

    // Carregar atributos
    const xhrAtributos = new XMLHttpRequest();
    xhrAtributos.open("GET", "/carros/atributos");
    xhrAtributos.responseType = "json";
    xhrAtributos.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = xhrAtributos.response;
                for (let atributo of result) {
                    let car = info.carros.find(carro => carro.id == atributo.carroid);
                    car.atributos[atributo.atributo] = atributo.descricao;
                }
               
            } else {
                console.error("Erro ao pedir atributos ao servidor.");
            }
        }
    };
    xhrAtributos.send();

    // Carregar tiposUtilizador
    const xhrTipos = new XMLHttpRequest();
    xhrTipos.open("GET", "/utilizadores/tipos");
    xhrTipos.responseType = "json";
    xhrTipos.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = xhrTipos.response;
                for (let tipo of result) {
                    info.tiposUtilizador.push(new UserType(tipo.id, tipo.userType));
                }
            } else {
                console.error("Erro ao pedir atributos ao servidor.");
            }
        }
    };
    xhrTipos.send();

    // Carregar utilizadores
    const xhrUtilizadores = new XMLHttpRequest();
    xhrUtilizadores.open("GET", "/utilizadores");
    xhrUtilizadores.responseType = "json";
    xhrUtilizadores.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = xhrUtilizadores.response;
                for (let utilizador of result) {
                    info.addUser(utilizador.id, utilizador.email, utilizador.firstName, utilizador.lastName, utilizador.userTypeId, utilizador.contacto);
                }
            
            } else {
                console.error("Erro ao pedir utilizadores ao servidor.");
            }
        }
    };
    xhrUtilizadores.send();

    if (localStorage.getItem("loggedInUser")) {
        info.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        info.checkUserLinks(info.loggedInUser);
    }

    info.showHome();

    window.info = info;
};

function changeView(id) {
    document.querySelector("main").innerHTML = "";
    let divs = document.querySelectorAll(".view");
    for (let div of divs) {
        if (div.id == id)
            div.style.display = "block";
        else
            div.style.display = "none";
    }
}

// Retorna um elemento DOM com propriedades de um alert de Bootstrap 4
function createAlert(alertCLass, alertMessage) {
    let alert = document.createElement("div");
    alert.classList.add("alert");
    alert.classList.add(alertCLass);
    alert.innerText = alertMessage;
    return alert;
}