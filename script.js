const inputNome = document.querySelector('#inputNome');
const inputDesc = document.querySelector('#inputDesc');
let listaClientes = new Array;
let listaEntregues = new Array;


addEventListener('load', () => {
    const criando = (name) => {
        return document.createElement(name);
    }

    if(localStorage.getItem('listaEntregues') != null) {
        listaEntregues = JSON.parse(localStorage.getItem('listaEntregues'));
        
        listaEntregues.forEach((element) => {
            const item = criando('div');
            const cliente = criando('div');
            const nome = criando('div');
            const servico = criando('div');
            const select = criando('button');

            cliente.setAttribute('id', 'cliente');
            nome.setAttribute('id', 'nome');
            servico.setAttribute('id', 'servico');
            item.setAttribute('class', 'item');
            item.setAttribute('id', listaEntregues.indexOf(element));
            servico.setAttribute('id', 'servico');
            select.setAttribute('class', 'select');
            select.setAttribute('onclick', 'apagarDoHistorico(this)');
            select.textContent = 'x';

            nome.textContent = element.name;
            servico.textContent = element.desc;

            cliente.appendChild(nome);
            cliente.appendChild(servico);
            item.appendChild(cliente);
            item.appendChild(select);
            document.querySelector('#entregues').appendChild(item);
        })
    }
    
    if(localStorage.getItem('listaClientes') != null) {
        listaClientes = JSON.parse(localStorage.getItem('listaClientes'));
        let clientes = document.querySelector('#clientes');
        
        listaClientes.forEach((element) => {
            const item = criando('div');
            const select = criando('button');
            const edit = criando('button');
            const cliente = criando('div');
            const selectEdit = criando('div');
            const concluir = criando('button');
            const nome = criando('div');
            const servico = criando('div');
            const imgEdit = criando('img');
            const imgGuard = criando('img');

            item.setAttribute('class', 'item');
            item.setAttribute('id', listaClientes.indexOf(element));
            nome.setAttribute('id', 'nome');
            servico.setAttribute('id', 'servico');
            select.setAttribute('class', 'select');
            select.setAttribute('onclick', 'remover(this)');
            select.textContent = 'x';
            edit.setAttribute('class', 'select');
            edit.setAttribute('id', 'edit');
            edit.setAttribute('onclick', 'edit(this)');
            selectEdit.setAttribute('id', 'selectEdit');
            cliente.setAttribute('id', 'cliente');
            concluir.setAttribute('class', 'select');
            concluir.setAttribute('id', 'concluir');
            concluir.setAttribute('onclick', 'guardar(this)')
            imgEdit.src = 'imagens/edit.png';
            imgGuard.src = 'imagens/guardar.png';
            edit.appendChild(imgEdit);
            concluir.appendChild(imgGuard);

            nome.textContent = element.name;
            servico.textContent = element.desc;

            cliente.appendChild(nome);
            cliente.appendChild(servico);
            item.appendChild(cliente);
            selectEdit.appendChild(select);
            selectEdit.appendChild(edit);
            selectEdit.appendChild(concluir);
            item.appendChild(selectEdit);
            clientes.appendChild(item);
        });
}})

class Cliente {
    constructor(name, descricao) {
        this.name = name;
        this.desc = descricao;
    }
}

const openDisplay = (x) => document.getElementById(x).style.display = 'flex';

const apenasResult = () => {
    let olho = document.querySelector('.visivel');
    if(olho.id == 'olho') {
        document.querySelector("#calcForm").style.display = 'none';
        olho.src = 'imagens/olho-fechado.png';
        olho.id = '';
    } else {
        document.querySelector("#calcForm").style.display = 'flex';
        olho.src = 'imagens/olho.png';
        olho.id = 'olho';
    }
}

document.querySelectorAll('.fechar').forEach((element) => {
    element.addEventListener('click', () => {
        window.location.reload();
    })
})

const apagarDoHistorico = (element) => {
    console.log(element.parentNode.id)
    listaEntregues.splice(element.parentNode.id, 1);
    localStorage.setItem('listaEntregues', JSON.stringify(listaEntregues));
    location.reload();
}

const remover = (element) => {
    listaClientes.splice(element.parentNode.parentNode.id, 1);
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    location.reload();
}

const guardar = (element) => {
    listaEntregues.push(new Cliente(element.parentNode.parentNode.firstChild.firstChild.textContent,
        element.parentNode.parentNode.firstChild.lastChild.textContent));
    localStorage.setItem('listaEntregues', JSON.stringify(listaEntregues));
    remover(element)
}

const edit = (element) => {
    openDisplay('formulario');

    inputNome.value = element.parentNode.parentNode.firstChild.firstChild.textContent;

    inputDesc.value = element.parentNode.parentNode.firstChild.lastChild.textContent;

    addEventListener('submit', () => {
        remover(element)
    })
}

document.getElementById('formulario').addEventListener('submit', (event) => {
    let novoCliente = new Cliente(inputNome.value, inputDesc.value);
    listaClientes.push(novoCliente);
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
})

document.getElementById('calcForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let valorBruto = Number(document.getElementById('valor').value);
    let valorServico;
    let valorServicoavista;

    let parcelas = document.getElementById('parcelas');
    let valorCartao = document.getElementById('valorCartao');
    document.getElementById('formasPag').style.display = 'flex';
    let valoravista = document.getElementById('valoravista');
    
    const botaJuro = (x) => {
        valorServico = valorBruto + x*(valorBruto/100);
        valorServicoavista = valorServico - 5 * (valorServico/100);

        valorServico = valorServico.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
        valorServicoavista = valorServicoavista.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }

    const adicionaFilho = () => {
        valorCartao.textContent = valorServico;
        valoravista.textContent = valorServicoavista;
    }

    if (valorBruto < 75) {
        botaJuro(6);
        parcelas.textContent = '1x';
    } else if (valorBruto < 101) {
        botaJuro(8);
        parcelas.textContent = '2x';
    }

    adicionaFilho();
})

