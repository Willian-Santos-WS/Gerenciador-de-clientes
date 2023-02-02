let inputName = document.getElementById('inputName');
let inputDesc = document.getElementById('inputDesc');

let customersList = [];

if(localStorage.getItem('customersList') != null) {
    customersList = JSON.parse(localStorage.getItem('customersList'));

    let cont = 0;

    customersList.forEach((element) => {
        let item = document.createElement('div');
        item.setAttribute('id', 'item');

        let cliente = document.createElement('div');
        cliente.setAttribute('id', 'cliente');
        
        let nome = document.createElement('div');
        nome.setAttribute('id', 'nome');
        nome.textContent = element.name;

        let descricao = document.createElement('div');
        descricao.setAttribute('id', 'descricao');
        descricao.textContent = element.desc;

        let excluir = document.createElement('button');
        excluir.setAttribute('class', 'excluir');
        excluir.setAttribute('id', cont);
        cont++;
        excluir.textContent = 'X';
        excluir.addEventListener('click', (element) => {
            let id = element.target.id;
            customersList.splice(id, 1)
            console.log(id)
            
            localStorage.setItem('customersList', JSON.stringify(customersList));
            location.reload();
            console.log(customersList)
        })

        cliente.appendChild(nome);
        cliente.appendChild(descricao);
        item.appendChild(cliente);
        item.appendChild(excluir);
        document.getElementById('main').appendChild(item);
    })
} 

class Client {
    constructor() {
        this.name = inputName.value;
        this.desc = inputDesc.value;
    }
}

function showForm() {
    document.getElementById('adicionando').style.display = 'flex';
}

addEventListener('submit', (event) => {
    event.preventDefault();

    customersList.push(new Client());

    localStorage.setItem('customersList', JSON.stringify(customersList));

    location.reload()
})

function cancel() {
    location.reload()
}

