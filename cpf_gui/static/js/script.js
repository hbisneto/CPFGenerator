var cpfData = ["00000000000","000.000.000-00"]
document.getElementById("cpf-box").value = cpfData[0]
var estado;
let counter = 0;

function createTable() {
    console.log("Userinput: " + cpfData[0]);
    console.log("Estado: " + estado);
    console.log("CPF DATA: " + cpfData[1])

    var table = document.getElementById('table_log');
    table.className='table'
    counter+= 1;
    for (var i = 0; i < 1; i++) {
        var tbody = document.getElementById('table_body')
        var tr = document.createElement('tr');
        var th = document.createElement('th');
        th.scope = 'row'

        var cell1 = document.createElement('td');
        cell1.style.fontWeight = "bold"
        cell1.textContent = counter;
        tr.appendChild(cell1);

        var cell2 = document.createElement('td');
        cell2.textContent = cpfData[1];
        tr.appendChild(cell2);

        var cell3 = document.createElement('td');
        cell3.textContent = cpfData[0];
        tr.appendChild(cell3);

        var cell4 = document.createElement('td');
        cell4.textContent = estado;
        tr.appendChild(cell4);

        tbody.appendChild(tr);
        row.appendChild(th);
        table.appendChild(tbody);
    }
}

const gerarCpf = () => {
    var ufInput = document.getElementById("estados");
    estado = ufInput.options[ufInput.selectedIndex].value;
    fetch(`http://127.0.0.1:8000/api/cpf/gerar/?estado=${estado}`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Erro na requisição")
        }
        return response.json()
    })
    .then(data => {
        document.getElementById("cpf-box").style.borderColor = "white"
        mostrarCpf(coletarCpf() === cpfData[0] ? data[0]: data[1])
        cpfData = Object.values(data)
        createTable();
    })
    .catch(error => {
        console.error("Erro:", error)
    })
}

const mostrarCpf = (cpf) => {
    let cpfBox = document.getElementById("cpf-box")
    cpfBox.value = cpf
}

const coletarCpf = () => {
    let cpfBox = document.getElementById("cpf-box")
    return cpfBox.value
}

const formatarCpf = () => {
    let cpf = coletarCpf()
    if(cpfData.indexOf(cpf) !== -1) {
        mostrarCpf(cpf === cpfData[0] ? cpfData[1]: cpfData[0])
    } else {
        cpfData = [
            cpf.replace(/\D/g, ""), 
            cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        ]
        mostrarCpf(cpf === cpfData[0] ? cpfData[1]: cpfData[0])
    }
}

const validarCpf = () => {
    let cpf = coletarCpf().replace(/\D/g, "")
    fetch(`http://127.0.0.1:8000/api/cpf/validar/?cpf=${cpf}`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Erro na requisição")
        }
        return response.json()
    })
    .then(data => {
        let cpfBox = document.getElementById("cpf-box")
        cpfBox.style.borderColor = data["estado"] ? "limegreen": "red"
    })
    .catch(error => {
        console.error("Erro:", error)
    })
}