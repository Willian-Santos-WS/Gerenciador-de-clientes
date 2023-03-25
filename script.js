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

const abreCalc = () => document.querySelector('#calculador').style.display = 'flex';

const fechaCalc = () => document.querySelector('#calculador').style.display = 'none';

const apenasResult = () => {
    let olho = document.querySelector('.visivel');
    if(olho.id == 'olho') {
        document.querySelector("#calcForm").style.display = 'none';
        olho.src = 'imagens/olho-fechado.png';
        olho.id = '';
    } else {
        document.querySelector("#calcForm").style.display = 'block';
        olho.src = 'imagens/olho.png';
        olho.id = 'olho';
    }
}

const cancelar = () => location.reload();

const remover = (element) => {
    listaClientes.splice(element.parentNode.id, 1);
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    location.reload();
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