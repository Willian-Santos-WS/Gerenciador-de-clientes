const inputNome = document.querySelector('#inputNome');
const inputDesc = document.querySelector('#inputDesc');
let listaClientes = new Array;

if(localStorage.getItem('listaClientes') != null) {
    listaClientes = JSON.parse(localStorage.getItem('listaClientes'));

    listaClientes.forEach((element) => {
        let clientes = document.querySelector('#clientes');
        let item = document.createElement('div');
        let cliente = document.createElement('div');
        let select = document.createElement('button');
        let nome = document.createElement('div');
        let servico = document.createElement('div');

        item.setAttribute('class', 'item');
        item.setAttribute('id', listaClientes.indexOf(element));
        cliente.setAttribute('id', 'cliente');
        nome.setAttribute('id', 'nome');
        servico.setAttribute('id', 'servico');
        select.setAttribute('class', 'select');
        select.setAttribute('onclick', 'remover(this)');
        select.textContent = 'x';

        nome.textContent = element.name;
        servico.textContent = element.desc;

        cliente.appendChild(nome);
        cliente.appendChild(servico);
        item.appendChild(cliente);
        item.appendChild(select);
        clientes.appendChild(item);
    });
}

class Cliente {
    constructor(name, descricao) {
        this.name = name;
        this.desc = descricao;
    }
}

const abreForm = () => document.querySelector('#formulario').style.display = 'flex';

const cancelar = () => location.reload();

const remover = (element) => {
    listaClientes.splice(element.parentNode.id, 1);
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    location.reload();
}

addEventListener('submit', (event) => {
    event.preventDefault();
    let novoCliente = {};
    novoCliente = new Cliente(inputNome.value, inputDesc.value);
    listaClientes.push(novoCliente);
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    location.reload();
    
})
