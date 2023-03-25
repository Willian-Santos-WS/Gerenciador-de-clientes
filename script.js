const inputNome = document.querySelector('#inputNome');
const inputDesc = document.querySelector('#inputDesc');
let listaClientes = new Array;

if(localStorage.getItem('listaClientes') != null) {
    listaClientes = JSON.parse(localStorage.getItem('listaClientes'));

    listaClientes.forEach((element) => {
        let clientes = document.querySelector('#clientes');
        let item = document.createElement('div');
        let cliente = document.createElement('div');
        let selecteEdit = document.createElement('div');
        let select = document.createElement('button');
        let edit = document.createElement('button');
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
        edit.setAttribute('class', 'select');
        edit.setAttribute('id', 'edit');
        edit.setAttribute('onclick', 'edit(this)');
        selecteEdit.setAttribute('id', 'selecteEdit');
        let img = document.createElement('img');
        img.src = 'imagens/edit.png'
        edit.appendChild(img);


        nome.textContent = element.name;
        servico.textContent = element.desc;

        cliente.appendChild(nome);
        cliente.appendChild(servico);
        item.appendChild(cliente);
        selecteEdit.appendChild(select);
        selecteEdit.appendChild(edit);
        item.appendChild(selecteEdit);
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

const cancelar = () => location.reload();

const remover = (element) => {
    listaClientes.splice(element.parentNode.parentNode.id, 1);
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
    location.reload();
}

const edit = (element) => {
    abreForm();

    inputNome.value = element.parentNode.parentNode.firstChild.firstChild.textContent;

    inputDesc.value = element.parentNode.parentNode.firstChild.lastChild.textContent;

    addEventListener('submit', () => {
        console.log(element) 
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