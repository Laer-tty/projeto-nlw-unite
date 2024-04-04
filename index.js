let participantes = [
  {
    nome: "Laertty",
    email: "laertty@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 20),
    dataCheckIn: new Date(2024, 2, 27, 10)
  },
  {
    nome: "João",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 12),
    dataCheckIn: null
  },
  {
    nome: "Maria",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 9),
    dataCheckIn: new Date(2024, 2, 27, 12)
  },
  {
    nome: "Pedro",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 15),
    dataCheckIn: new Date(2024, 2, 27, 13)
  },
  {
    nome: "Ana",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 18),
    dataCheckIn: null
  },
  {
    nome: "Lucas",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 7),
    dataCheckIn: new Date(2024, 2, 27, 15)
  },
  {
    nome: "Beatriz",
    email: "beatriz@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14),
    dataCheckIn: new Date(2024, 2, 27, 16)
  },
  {
    nome: "Carolina",
    email: "carolina@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 10),
    dataCheckIn: new Date(2024, 2, 27, 17)
  },
  {
    nome: "Fernando",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 16),
    dataCheckIn: new Date(2024, 2, 27, 18)
  },
  {
    nome: "Rafael",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 11),
    dataCheckIn: new Date(2024, 2, 27, 19)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
      data-email="${participante.email}
      "onClick="fazerCheckIn(event)"
    
    >
      Confirmar check-in
    </button>
    `
  }


  return `
  <tr>
    <td>
      <strong>
      ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</th>
    <td>${dataCheckIn}</th>
  </tr>`;
}

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  document.querySelector("tbody")
  .innerHTML = output;
}

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target)
  
  const participante = {
    nome : dadosDoFormulario.get("nome"),
    email : dadosDoFormulario.get("email"),
    dataInscricao : new Date(),
    dataCheckIn : null
  }

  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email;
  })

  if (participanteExiste){
    alert("Email já cadastrado!")
    return
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);

  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[email="email"]').value = "";
}

const fazerCheckIn = (event) => {
  const resultado = "Tem certeza que deseja fazer o check-in?";
  
  if (confirm(resultado) == false){
    return 
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  })
  participante.dataCheckIn = new Date()

  atualizarLista(participantes);
}