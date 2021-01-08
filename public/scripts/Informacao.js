class Informacao {
    constructor() {
        this.carros = [];
        this.marcas = [];
        this.modelos = [];
        this.utilizadores = [];
        this.tiposUtilizador = [];
        this.loggedInUser;
    }

    showHome() {
        changeView("home");
    }

    showCarros() {
        changeView("");

        let pageTitle = document.createElement("h4");
        pageTitle.classList.add("display-4");
        pageTitle.innerText = "Carros";
        document.querySelector("main").append(pageTitle);

        let hrAntes = document.createElement("hr");
        let hrDepois = document.createElement("hr");
        let filtrosDiv = document.createElement("div");
        filtrosDiv.classList.add("form-inline");
        let labelMarcas = document.createElement("label");
        labelMarcas.innerText = "Marcas:";
        labelMarcas.classList.add("mr-2");
        let selectMarcas = document.createElement("select");
        selectMarcas.classList.add("form-control");
        selectMarcas.classList.add("mr-2");
        let labelModelos = document.createElement("label");
        labelModelos.innerText = "Modelos:";
        labelModelos.classList.add("mr-2");
        let selectModelo = document.createElement("select");
        selectModelo.classList.add("form-control");

        selectMarcas.innerHTML = "";
        selectModelo.innerHTML = "";

        let opMarcas = document.createElement("Option");
        opMarcas.value = -1;
        opMarcas.innerText = "Todos";
        selectMarcas.appendChild(opMarcas);

        for (let marca of info.marcas) {
            let option = document.createElement("option");
            option.value = marca.id;
            option.innerText = marca.marcaNome;
            selectMarcas.append(option);
        }

        let op = document.createElement("Option");
        op.value = -1;
        op.innerText = "Todos";
        selectModelo.appendChild(op);

        for (let modelos of info.modelos) {
            if (modelos.marcaId == selectMarcas.value) {
                let op = document.createElement("Option");
                op.value = modelos.id;
                op.innerText = modelos.modeloNome;
                selectModelo.appendChild(op);
            }
        }

        selectMarcas.addEventListener("change", function (event) {
            selectModelo.innerHTML = "";
            let op = document.createElement("Option");
            op.value = -1;
            op.innerText = "Todos";
            selectModelo.appendChild(op);
            for (let modelos of info.modelos) {
                if (modelos.marcaId == event.target.value) {
                    let op = document.createElement("Option");
                    op.value = modelos.id;
                    op.innerText = modelos.modeloNome;
                    selectModelo.appendChild(op);
                }
            }

            let carrosFiltrados;

            if (selectMarcas.value != -1) {
                carrosFiltrados = info.carros.filter(carro => carro.marcaId == selectMarcas.value);
            } else {
                carrosFiltrados = info.carros;
            }

            if (document.getElementById("carrosPesquisados")) document.getElementById("carrosPesquisados").outerHTML = "";
            if (document.getElementById("carrosList")) document.getElementById("carrosList").outerHTML = "";
            if (carrosFiltrados.length > 0) {
                let list = document.createElement("div");
                list.id = "carrosPesquisados";
                list.classList.add("d-flex");
                list.classList.add("justify-content-around");
                list.classList.add("flex-wrap");
                for (let carro of carrosFiltrados) {
                    carro.showCarList(list);
                }
                document.querySelector("main").append(list);
            }
            console.log(carrosFiltrados)
        });

        selectModelo.addEventListener("change", function (event) {
            if (document.getElementById("carrosPesquisados")) document.getElementById("carrosPesquisados").outerHTML = "";
            if (document.getElementById("carrosList")) document.getElementById("carrosList").outerHTML = "";

            let carrosFiltrados;

            if (selectModelo.value != -1) {
                carrosFiltrados = info.carros.filter(carro => carro.modeloId == selectModelo.value);
            } else {
                carrosFiltrados = info.carros.filter(carro => carro.marcaId == selectMarcas.value);
            }

            if (carrosFiltrados.length > 0) {
                let list = document.createElement("div");
                list.id = "carrosPesquisados";
                list.classList.add("d-flex");
                list.classList.add("justify-content-around");
                list.classList.add("flex-wrap");
                for (let carro of carrosFiltrados) {
                    carro.showCarList(list);
                }
                document.querySelector("main").append(list);
            }
            console.log(carrosFiltrados)
        });

        filtrosDiv.append(labelMarcas);
        filtrosDiv.append(selectMarcas);
        filtrosDiv.append(labelModelos);
        filtrosDiv.append(selectModelo);
        document.querySelector("main").append(hrAntes);
        document.querySelector("main").append(filtrosDiv);
        document.querySelector("main").append(hrDepois);

        if (this.carros.length > 0) {
            let list = document.createElement("div");
            list.id = "carrosList";
            list.classList.add("d-flex");
            list.classList.add("justify-content-around");
            list.classList.add("flex-wrap");
            for (let carro of this.carros) {
                carro.showCarList(list);
            }
            document.querySelector("main").append(list);
        } else {
            let alert = createAlert("alert-danger", "Ainda não foram publicados anúncios de carros.");
            document.querySelector("main").append(alert);
        }
    }

    showLogin() {
        changeView("login");
    }

    showRegisto() {
        changeView("registo");
    }

    showCarrosVendedor() {
        changeView("");

        let pageTitle = document.createElement("h4");
        pageTitle.classList.add("display-4");
        pageTitle.innerText = "Os meus anúnios";
        document.querySelector("main").append(pageTitle);

        if (this.carros.length > 0) {
                
                let createTable = document.createElement("table");
                createTable.id = "usersTable";
                createTable.classList.add("table");
                createTable.classList.add("table-striped");
                createTable.classList.add("table-bordered");
                createTable.classList.add("rounded");
                document.querySelector("main").append(createTable);
                let table = document.getElementById('usersTable');
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = "<b>Descrição</b>"
                cell2.innerHTML = "<b>Preço</b>";
                cell3.innerHTML = "<b>Visualizações</b>";
                cell4.innerHTML = "";

                for (let carro of info.carros) {
                    if (carro.userId == info.loggedInUser.id) {
                        carro.linhaCarro(createTable);
                    }
                }

                document.querySelector("main").append(createTable);
        } else {
            let alert = createAlert("alert-danger", "Ainda não foram publicados anúncios de carros.");
            document.querySelector("main").append(alert);
        }
    }

    showEstatisticas() {
        changeView("estatisticas");
        document.getElementById("statsTotalUsers").innerText = this.utilizadores.length;
        document.getElementById("statsTotalCarros").innerText = this.carros.length;
        document.getElementById("statsTotalMarcas").innerText = this.marcas.length;
        
        const xhrUtilizadores = new XMLHttpRequest();
        xhrUtilizadores.open("GET", "carros/views/getViews/getTotal");
        xhrUtilizadores.responseType = "json";
        xhrUtilizadores.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let result = xhrUtilizadores.response;
                    document.getElementById("statsTotalViews").innerText = result.views;
                } else {
                    console.error("Erro ao pedir views ao servidor.");
                }
            }
        };
        xhrUtilizadores.send();

        let maxCarPrice = 0;
        for (let i = 0; i < this.carros.length; i++) {
            if (this.carros[i].atributos["preco"] > maxCarPrice) {
                maxCarPrice = this.carros[i].atributos["preco"];
            }
        }
        document.getElementById("statsMaxCarPrice").innerText = maxCarPrice.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.') + "€";
    }

    logout() {
        this.loggedInUser = null;
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    }

    checkUserLinks(user) {
        document.getElementById("nav-login").style.display = "none";

        // Admin
        if (user.userTypeId == 1) {
            // Utilizadores
            let linkUsers = document.createElement("li");
            linkUsers.classList.add("nav-item");
            let link = document.createElement("a");
            link.classList.add("nav-link");
            link.href = "javascript: info.showListUser()";
            link.innerHTML = "<i class='fas fa-users'></i> Utilizadores";
            linkUsers.append(link);
            document.getElementById("mainNav").append(linkUsers);
            
            // Marcas
            let linkMarcas = document.createElement("li");
            linkMarcas.classList.add("nav-item");
            let link2 = document.createElement("a");
            link2.classList.add("nav-link");
            link2.href = "javascript: info.showMarcas()";
            link2.innerHTML = "<i class='fas fa-clipboard'></i> Marcas";
            linkMarcas.append(link2);
            document.getElementById("mainNav").append(linkMarcas);

            // Modelos
            let linkModelos = document.createElement("li");
            linkModelos.classList.add("nav-item");
            let link3 = document.createElement("a");
            link3.classList.add("nav-link");
            link3.href = "javascript: info.showModelos()";
            link3.innerHTML = "<i class='fas fa-clipboard'></i> Modelos";
            linkModelos.append(link3);
            document.getElementById("mainNav").append(linkModelos);

            // Estatisticas
            let linkEstatisticas = document.createElement("li");
            linkEstatisticas.classList.add("nav-item");
            let link4 = document.createElement("a");
            link4.classList.add("nav-link");
            link4.href = "javascript: info.showEstatisticas()";
            link4.innerHTML = "<i class='fas fa-chart-line'></i> Estatísticas";
            linkEstatisticas.append(link4);
            document.getElementById("mainNav").append(linkEstatisticas);
        }
        // Vendedor
        if (user.userTypeId == 2) {
            // Criar carro
            let linkCarro = document.createElement("li");
            linkCarro.classList.add("nav-item");
            let link = document.createElement("a");
            link.classList.add("nav-link");
            link.href = "javascript: info.showAddCar()";
            link.innerHTML = "<i class='fas fa-plus'></i> Criar anúncio";
            linkCarro.append(link);
            document.getElementById("mainNav").append(linkCarro);

            // Carros vendedor
            let linkCarros = document.createElement("li");
            linkCarros.classList.add("nav-item");
            let link5 = document.createElement("a");
            link5.classList.add("nav-link");
            link5.href = "javascript: info.showCarrosVendedor()";
            link5.innerHTML = "<i class='fas fa-list'></i> Meus anúncios";
            linkCarros.append(link5);
            document.getElementById("mainNav").append(linkCarros);
        }

        let linkLogout = document.createElement("li");
        linkLogout.classList.add("nav-item");
        let link = document.createElement("a");
        link.classList.add("nav-link");
        link.id = "nav-logout";
        link.href = "javascript: info.logout()";
        link.innerHTML = "<i class='fas fa-sign-out-alt'></i> Logout";
        linkLogout.append(link);
        document.getElementById("mainNav").append(linkLogout);
    }

    login () {
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;
        let body = JSON.stringify({
            "email": email,
            "password": password
        });
        var url = "/authentication/login";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = "json";
        let self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    self.loggedInUser = xhr.response.user;
                
                    // Remember me
                    if (document.getElementById("loginRememberMe").checked) {
                        localStorage.setItem("loggedInUser", JSON.stringify(xhr.response.user));
                    }

                    self.checkUserLinks(xhr.response.user);
                    self.showHome();
                    return true;
                } else {
                    alert("Autenticação falhada, combinação email/password incorreta.");
                }
            }
        };
        xhr.send(body);
    }

    addCarroObj(id, marcaId, modeloId, userId, descricao, atributos, imagem) {
        let novoCarro = new Carro(id, parseInt(marcaId), parseInt(modeloId), parseInt(userId), descricao, atributos, imagem);
        this.carros.push(novoCarro);
    }

    addCarro() {
        let atributo =[];
        let id = this.carros.length + 1;
        let descricao = document.getElementById("descricao").value;
        let modeloId = document.getElementById("idmodelo").value;
        let marcaId = document.getElementById("idmarca").value;
        let preco = document.getElementById("preco").value;
     
        let ano = document.getElementById("ano").value;
        let cilindrada = document.getElementById("cilindrada").value;
        let quilometro = document.getElementById("quilometro").value;
        let velocidadeMax = document.getElementById("velocidadeMax").value;
        let potencia = document.getElementById("potencia").value;
        let combustivelElement = document.getElementById("combustivel");
        let tipoCaixaElement = document.getElementById("tipoCaixa");
        let combustivel = combustivelElement.options[combustivelElement.selectedIndex].innerHTML;
        let tipoCaixa = tipoCaixaElement.options[tipoCaixaElement.selectedIndex].innerHTML;

        let imagem = document.getElementById("imagemCarro").files[0];

        atributo = {
            preco: parseFloat(preco),
            ano: parseInt(ano),
            quilometro: parseFloat(quilometro),
            cilindrada: parseInt(cilindrada),
            velocidadeMax : parseFloat(velocidadeMax),
            combustivel : combustivel,
            potencia: potencia,
            tipoCaixa: tipoCaixa
        };

        const xhr = new XMLHttpRequest();
        
        var formData = new FormData();
        formData.append('file', imagem);
        var xhrImagem = new XMLHttpRequest();
        xhrImagem.open('POST', "/carros/imagem/id/" + id, true);
        xhrImagem.responseType = "json";
        let self = this;
        xhrImagem.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {

                    xhr.open("POST", "/carros/");
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.responseType = "json";
                    const request = JSON.stringify({
                        marcaId: marcaId,
                        modeloId: modeloId,
                        descricao: descricao,
                        preco: preco,
                        ano: ano,
                        quilometro: quilometro,
                        cilindrada: cilindrada,
                        velocidadeMax : velocidadeMax,
                        combustivel : combustivel,
                        imagem: xhrImagem.response.filename,
                        potencia: potencia,
                        tipoCaixa: tipoCaixa
                    });
                    
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                alert("O anúncio foi publicado com sucesso.")
                                let limpar = document.querySelectorAll("#criarCarro input");
                                for (let elem of limpar) {
                                    elem.value = "";
                                }
                                let limparCombos = document.querySelectorAll("#criarCarro select");
                                for (let elem of limparCombos) {
                                    elem.selectedIndex = 0;
                                }
                                let novoCarro = new Carro(id, parseInt(marcaId), parseInt(modeloId), info.loggedInUser.id, descricao, atributo, xhrImagem.response.filename);
                                self.carros.push(novoCarro);
                                novoCarro.showDetails();
                                
                            } else {
                                console.error("Erro ao inserir anúncio no servidor.");
                            }
                        }
                    };
                    xhr.send(request);

                    
                } else {
                    alert(xhrImagem.response.message);
                }
            }
        };
        xhrImagem.send(formData);

        

        
    }

    addMarca(id, marcaNome) {
        let novaMarca = new Marca(id, marcaNome);
        this.marcas.push(novaMarca);
    }

    addModelo(id, modeloNome, marcaId) {
        let novoModelo = new Modelo(id, modeloNome, marcaId);
        this.modelos.push(novoModelo);
    }

    registo() {
        let userType = parseInt(document.querySelector('input[name="registoTipoUser"]:checked').value);
        let email = document.getElementById("registoEmail").value;
        let password = document.getElementById("registoPassword").value;
        let firstName = document.getElementById("registoPrimeiroNome").value;
        let lastName = document.getElementById("registoApelido").value;
        let contacto = parseInt(document.getElementById("registoContacto").value);

        this.addUser(email, password, firstName, lastName, contacto, userType);

        let body = JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            contacto: contacto,
            userTypeId: userType
        });
        var url = "/authentication/signup";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.responseType = "json";
        let self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Registo concluído, faça login para começar a usar o site.");
                } else {
                    alert(xhr.response.message);
                }
            }
        };
        xhr.send(body);

        
    }

    addUser(id, email, /*password,*/ firstName, lastName, userTypeId, contacto) {
        let novoUser = new User(id, email, /*password,*/ firstName, lastName, userTypeId, contacto);
        this.utilizadores.push(novoUser);
    }
    
    //delete 
    deleteCar(id) {
        for (let x =0 ;x<this.carros.length;x++){
            if (id==this.carros[x].id){
                this.carros.splice(x);
            }
        }

    }

    deleteUser(id) {
        if (confirm("Deseja apagar o utilizador?")) {
            var url = "/utilizadores/id/" + id;
            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", url);
            xhr.responseType = "json";
            let self = this;
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let utilizador = self.utilizadores.find(utilizador => utilizador.id == id);
                        self.utilizadores.splice(self.utilizadores.indexOf(utilizador), 1);
                        self.showListUser();
                    } else {
                        alert(xhr.response.message);
                    }
                }
            };
            xhr.send();
        }
    }

    //update
    updateCarro(id,marcaId, modeloId, descricao) {
    
        for (let x =0 ;x<this.carros.length;x++){
            if (id==this.carros[x].id){
                   this.carros[x].marcaId = marcaId; 
                   this.carros[x].modeloId =modeloId;
                   this.carros[x].descricao =descricao;
                   
            }

        }
    }
   
    updateUtilizador(id) {

        const xhr = new XMLHttpRequest();
        const request = JSON.stringify({
            email: document.getElementById("email-update").value,
            firstName: document.getElementById("firstName-update").value,
            lastName: document.getElementById("lastName-update").value,
            userTypeId: document.getElementById("userTypeId-update").value,
            contacto: document.getElementById("contacto-update").value
        });

        xhr.open("PUT", "/utilizadores/id/" + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        let self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let user = self.utilizadores.find(user => user.id == id);
                    user.email = document.getElementById("email-update").value;
                    user.firstName = document.getElementById("firstName-update").value; 
                    user.lastName = document.getElementById("lastName-update").value;
                    user.userTypeId = document.getElementById("userTypeId-update").value;
                    info.showListUser();
                } else {
                    console.error("Erro ao atualizar utilizador no servidor.");
                }
            }
        };
        xhr.send(request);

        
    }
    
    updateMarca(id) {

        let marca = info.marcas.find(marca => marca.id == id);
        console.log(marca)
        document.getElementById("nomeMarca-Update").value = marca.marcaNome;

        // limpar eventListeners anteriores
        var old_element = document.getElementById("update-marca");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        document.getElementById("update-marca").addEventListener("click", function () {
            
            const xhr = new XMLHttpRequest();
            const request = JSON.stringify({
                marcaNome: document.getElementById("nomeMarca-Update").value
            });

            xhr.open("PUT", "/marcas/id/" + id);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            let self = this;
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let marca = info.marcas.find(marca => marca.id == id);
                        marca.marcaNome = document.getElementById("nomeMarca-Update").value;
                        info.showMarcas();
                    } else {
                        console.error("Erro ao atulizador marca no servidor.");
                    }
                }
            };
            xhr.send(request);
        })
    }
    
    updateModelo(id) {
    
        const xhr = new XMLHttpRequest();
        const request = JSON.stringify({
            marcaId: document.getElementById("marca-update").value,
            modeloNome: document.getElementById("modelo-Update").value
        });

        xhr.open("PUT", "/modelos/id/" + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        let self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let modelo = self.modelos.find(modelo => modelo.id == id);
                    modelo.marcaId = parseInt(document.getElementById("marca-update").value);
                    modelo.modeloNome = document.getElementById("modelo-Update").value;
                    self.showModelos();
                } else {
                    console.error("Erro ao atulizador modelo no servidor.");
                }
            }
        };
        xhr.send(request);
    }

    showAddCar(){
        changeView("criarCarro");
        //marcas

        let input = document.querySelector(".custom-file-input");
        input.addEventListener("change", function () {
            var fileName = input.value.split("\\").pop();
            document.querySelector(".custom-file-label").classList.add("selected");
            document.querySelector(".custom-file-label").innerHTML = fileName;
        })

        if (this.marcas && this.modelos) {
            let selectMarcas = document.getElementById("idmarca");
            let selectModelo = document.getElementById("idmodelo");

            selectMarcas.innerHTML = "";
            selectModelo.innerHTML = "";

            for(let marcas of this.marcas){
                let op = document.createElement("Option");
                op.value = marcas.id;
                op.innerText =marcas.marcaNome;
                selectMarcas.appendChild(op);
            }

            
             for (let modelos of info.modelos) {
                    if (modelos.marcaId == selectMarcas.value) {
                        let op = document.createElement("Option");
                        op.value = modelos.id;
                        op.innerText = modelos.modeloNome;
                        selectModelo.appendChild(op);
                    }
                }
      
            selectMarcas.addEventListener("change", function (event) {
                selectModelo.innerHTML = "";
                for (let modelos of info.modelos) {
                    console.log(event.target.value)
                    if (modelos.marcaId == event.target.value) {
                        let op = document.createElement("Option");
                        op.value = modelos.id;
                        op.innerText = modelos.modeloNome;
                        selectModelo.appendChild(op);
                    }
                }
            });

            selectModelo.addEventListener("change", function (event) {
                console.log(event.target.value);
            });
        }
              
    }

    showMarcas() {
        changeView("");
        let pageTitle = document.createElement("h4");
        pageTitle.classList.add("display-4");
        pageTitle.innerText = "Marcas";
        document.querySelector("main").append(pageTitle);
        let x=0;
            if (document.getElementById("marcaTable") == undefined){
            let createTable = document.createElement("table");
            createTable.id = "marcaTable";
            createTable.classList.add("table");
            createTable.classList.add("table-striped");
            createTable.classList.add("table-bordered");
            createTable.classList.add("rounded");
            document.querySelector("main").append(createTable);
            let table = document.getElementById('marcaTable');
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 =row.insertCell(2);;
            cell1.innerHTML = "ID"
            cell2.innerHTML = "Marca";
            for ( x=0;x<this.marcas.length;x++){
                var row = table.insertRow(1);
                row.id =this.marcas[x].id;
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 =row.insertCell(2);
                cell1.innerHTML = this.marcas[x].id;
                cell2.innerHTML = this.marcas[x].marcaNome;
                cell3.innerHTML =`<i class='fas fa-user-edit' title='Editar' data-toggle="modal" data-target="#updateMarca" onClick=info.updateMarca(${this.marcas[x].id})></i>`;
            }
            var row = table.insertRow(x+1);
            var cell4 = row.insertCell(0);
            cell4.innerHTML =`<i class='fas fa-plus' title='Nova marca' data-toggle="modal" data-target="#adicionarMarcaModal" onClick=info.addMarc()></i>` ;
        }
    } 

    showModelos() {
        changeView("");

        document.getElementById("marca-update").innerHTML = "";
        for (let marca of info.marcas) {
            let option = document.createElement("option");
            option.value = marca.id;
            option.innerText = marca.marcaNome;
            document.getElementById("marca-update").append(option);
        }

        let pageTitle = document.createElement("h4");
        pageTitle.classList.add("display-4");
        pageTitle.innerText = "Modelos";
        document.querySelector("main").append(pageTitle);
        let x=0;
            if (document.getElementById("modeloTable") == undefined){
            let createTable = document.createElement("table");
            createTable.id = "modeloTable";
            createTable.classList.add("table");
            createTable.classList.add("table-striped");
            createTable.classList.add("table-bordered");
            createTable.classList.add("rounded");
            document.querySelector("main").append(createTable);
            let table = document.getElementById('modeloTable');
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 =row.insertCell(2);
            var cell4 =row.insertCell(3);
            cell1.innerHTML = "ID"
            cell2.innerHTML = "Marca";
            cell3.innerHTML = "Modelo";
            for ( x=0;x<this.modelos.length;x++){
                var row = table.insertRow(1);
                row.id =this.modelos[x].id;
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = this.modelos[x].id;
                let marcaNome = info.marcas.find(marca => marca.id == this.modelos[x].marcaId);
                cell2.innerHTML = marcaNome.marcaNome;
                cell3.innerHTML = this.modelos[x].modeloNome;
                cell4.innerHTML =`<i class='fas fa-user-edit' title='Editar' data-toggle="modal" data-target="#updateModeloModal" onClick=info.carregarModeloModal(${this.modelos[x].id})></i>`;
            }
            var row = table.insertRow(x+1);
            var cell5 = row.insertCell(0);
            cell5.innerHTML =`<i class='fas fa-plus' title='Adicionar marca' data-toggle="modal" data-target="#adicionarModeloModal" onClick=info.carregarMarcasInserir()></i>` 
        }
    }

    addMarc(){
        // limpar eventListeners anteriores
        var old_element = document.getElementById("Adicionar-Marca");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        document.getElementById("Adicionar-Marca").addEventListener("click", function () {
            const xhr = new XMLHttpRequest();
            const request = JSON.stringify({
                marcaNome: document.getElementById("nomeMarca-insert").value
            });

            xhr.open("POST", "/marcas");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.responseType = "json";
            let self = this;
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let marca = new Marca(
                            xhr.response.id,
                            document.getElementById("nomeMarca-insert").value
                        );
                        info.marcas.push(marca)
                        document.getElementById("nomeMarca-insert").value = "";
                        info.showMarcas();
                    } else {
                        console.error("Erro ao inserir marca no servidor.");
                    }
                }
            };
            xhr.send(request);
        });
    }

    carregarMarcasInserir() {
        document.getElementById("marca-insert").innerHTML = "";
        for (let marca of info.marcas) {
            let option = document.createElement("option");
            option.value = marca.id;
            option.innerText = marca.marcaNome;
            document.getElementById("marca-insert").append(option);
        }

        let self = this;
        // limpar eventListeners anteriores
        var old_element = document.getElementById("Adicionar-Modelo");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        document.getElementById("Adicionar-Modelo").addEventListener("click", function () {
            self.addMod();
        });
    }

    addMod(){

        const xhr = new XMLHttpRequest();
        const request = JSON.stringify({
            marcaId: document.getElementById("marca-insert").value,
            modeloNome: document.getElementById("modeloNome-insert").value
        });

        xhr.open("POST", "/modelos");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        let self = this;
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let modelo = new Modelo(
                        xhr.response.id,
                        document.getElementById("modeloNome-insert").value,
                        document.getElementById("marca-insert").value
                    );
                    self.modelos.push(modelo)
                    document.getElementById("modeloNome-insert").value = "";
                    self.showModelos();
                } else {
                    console.error("Erro ao inserir modelo no servidor.");
                }
            }
        };
        xhr.send(request);
    }

    showListUser() {
        changeView("");

        document.getElementById("userTypeId-update").innerHTML = "";
        for (let tipo of info.tiposUtilizador) {
            let option = document.createElement("option");
            option.value = tipo.id;
            option.innerText = tipo.userType;
            document.getElementById("userTypeId-update").append(option);
        }

        let pageTitle = document.createElement("h4");
        pageTitle.classList.add("display-4");
        pageTitle.innerText = "Utilizadores";
        document.querySelector("main").append(pageTitle);
        if (document.getElementById("usersTable") == undefined){
            let createTable = document.createElement("table");
            createTable.id = "usersTable";
            createTable.classList.add("table");
            createTable.classList.add("table-striped");
            createTable.classList.add("table-bordered");
            createTable.classList.add("rounded");
            document.querySelector("main").append(createTable);
            let table = document.getElementById('usersTable');
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell4 = row.insertCell(2);
            var cell5 = row.insertCell(3);
            var cell6 = row.insertCell(4);
            var cell7 = row.insertCell(5);
            var cell8 = row.insertCell(6); //apagar 
            var cell9 = row.insertCell(7); //update
            cell1.innerHTML = "ID"
            cell2.innerHTML = "Email";
            cell4.innerHTML = "Primeiro Nome";
            cell5.innerHTML = "Apelido";
            cell6.innerHTML = "Contacto";
            cell7.innerHTML = "Tipo de Utilizador";
            for (let x=0;x<this.utilizadores.length;x++){
                //falta fazer os estilos
                var row = table.insertRow(1);
                row.id =this.utilizadores[x].id;
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell4 = row.insertCell(2);
                var cell5 = row.insertCell(3);
                var cell6 = row.insertCell(4);
                var cell7 = row.insertCell(5);
                var cell8 = row.insertCell(6); //apagar 
                var cell9 = row.insertCell(7); //update
                cell1.innerHTML = this.utilizadores[x].id;
                cell2.innerHTML = this.utilizadores[x].email;
                cell4.innerHTML = this.utilizadores[x].firstName;
                cell5.innerHTML = this.utilizadores[x].lastName;
                cell6.innerHTML = this.utilizadores[x].contacto;
                let tipo = info.tiposUtilizador.find(tipo => tipo.id == this.utilizadores[x].userTypeId);
                cell7.innerHTML = tipo.userType;
                cell8.innerHTML =`<i class='fas fa-user-minus' title='Apagar' onClick=info.deleteUser(${this.utilizadores[x].id})></i>`;
                cell9.innerHTML =`<i class='fas fa-user-edit' title='Editar' data-toggle="modal" data-target="#updateModal" onClick=info.carregarUtilizadorModal(${this.utilizadores[x].id})></i>`;
            }
        }
    }

    carregarUtilizadorModal(id) {
        let utilizador = info.utilizadores.find(utilizador => utilizador.id == id);
        document.getElementById("email-update").value = "";
        document.getElementById("firstName-update").value = "";
        document.getElementById("lastName-update").value = "";
        document.getElementById("userTypeId-update").value = "";
        document.getElementById("contacto-update").value = "";
        document.getElementById("email-update").value = utilizador.email;
        document.getElementById("firstName-update").value = utilizador.firstName;
        document.getElementById("lastName-update").value = utilizador.lastName;
        document.getElementById("contacto-update").value = utilizador.contacto;
        document.getElementById("userTypeId-update").value = utilizador.userTypeId;
        console.log(utilizador);
        // limpar eventListeners anteriores
        var old_element = document.getElementById("gravar-update");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        document.getElementById("gravar-update").addEventListener("click", function () {
            info.updateUtilizador(id);
        });
    }

    carregarModeloModal(id) {
        let modelo = info.modelos.find(modelo => modelo.id == id);
        document.getElementById("marca-update").value = "";
        document.getElementById("modelo-Update").value = "";
        document.getElementById("marca-update").value = modelo.marcaId;
        document.getElementById("modelo-Update").value = modelo.modeloNome;

        // limpar eventListeners anteriores
        var old_element = document.getElementById("gravar-Modelo");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        document.getElementById("gravar-Modelo").addEventListener("click", function () {
            info.updateModelo(id);
        });
    }

    mostrarTlm(carroId) {
        if (carroId) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "/carros/" + carroId + "/contacto");
            xhr.responseType = "json";
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let result = xhr.response;
                        
                        document.getElementById("contacto-field").outerHTML = result.contacto;
                    } else {
                        console.error("Erro ao pedir contacto ao servidor.");
                    }
                }
            };
            xhr.send();
        }
    }
}