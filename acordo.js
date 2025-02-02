function verificarSenha() {
  const senhaCorreta = "@Megaatendimento2025"; 
  const senhaInput = document.getElementById("senha").value;
  const erroMsg = document.getElementById("erro");
  const loginSection = document.getElementById("login-section");
  const conteudo = document.getElementById("conteudo");

  if (senhaInput === senhaCorreta) {
      loginSection.style.display = "none";
      conteudo.style.display = "block";
  } else {
      erroMsg.style.display = "block";
  }
}

function calcularDesconto() {
  const valorBoleto = parseFloat(document.getElementById("valor-boleto").value);
  const boletosAbertos = document.getElementById("boletos-abertos").value;
  const historicoSelect = document.getElementById("historico");


  document.getElementById("historico-section").style.display = "none";
  document.getElementById("calcular-btn").textContent = "Calcular Desconto"; 

  if (isNaN(valorBoleto) || valorBoleto <= 0) {
    alert("Por favor, insira um valor de boleto válido.");
    return;
  }

  let mensagem = "";
  let totalBoletoComDesconto = 0;  
 
  const quantidadeBoletos = parseInt(boletosAbertos, 10);
  totalBoletoComDesconto = valorBoleto * quantidadeBoletos;

  switch (boletosAbertos) {
    case "1":
      const totalMin1 = (totalBoletoComDesconto * 0.95).toFixed(2);
      const totalMax1 = (totalBoletoComDesconto * 0.90).toFixed(2);
      mensagem = `Valor total com desconto para 1 boleto: R$ ${totalMin1} a R$ ${totalMax1}.
Caso o associado se negue a pagar, solicite o pagamento do boleto atual e cancele o boleto em atraso.`;
      break;

    case "2":
    case "3":
      
      document.getElementById("historico-section").style.display = "block";
      document.getElementById("calcular-btn").textContent = "Calcular Total";

     
      document.getElementById("calcular-btn").onclick = function () {
        const historico = historicoSelect.value;
        let valorComDescontoMin, valorComDescontoMax;

        if (historico === "1") {
          valorComDescontoMin = (totalBoletoComDesconto * 0.60).toFixed(2);
          valorComDescontoMax = (totalBoletoComDesconto * 0.70).toFixed(2);
          mensagem = `Total a pagar para ${quantidadeBoletos} boletos: R$ ${valorComDescontoMax} a R$ ${valorComDescontoMin}`;
        } else if (historico === "2") {
          valorComDescontoMin = (totalBoletoComDesconto * 0.70).toFixed(2);
          valorComDescontoMax = (totalBoletoComDesconto * 0.80).toFixed(2);
          mensagem = `Total a pagar para ${quantidadeBoletos} boletos: R$ ${valorComDescontoMax} a R$ ${valorComDescontoMin}`;
        } else if (historico === "3") {
          valorComDescontoMin = (totalBoletoComDesconto * 0.80).toFixed(2);
          valorComDescontoMax = (totalBoletoComDesconto * 0.90).toFixed(2);
          mensagem = `Total a pagar para ${quantidadeBoletos} boletos: R$ ${valorComDescontoMax} a R$ ${valorComDescontoMin}`;
        } else if (historico === "4") {
          valorComDescontoMin = (totalBoletoComDesconto * 0.80).toFixed(2);
          valorComDescontoMax = (totalBoletoComDesconto * 0.90).toFixed(2);
          mensagem = `Total a pagar para ${quantidadeBoletos} boletos: R$ ${valorComDescontoMax} a R$ ${valorComDescontoMin}`;
        } else {
          mensagem = "Histórico inválido. Nenhum desconto aplicado.";
        }

        document.getElementById("resultado").textContent = mensagem;
      };
      return;

    case "4+":
      mensagem = "Será preciso fazer um novo contrato com o consultor.";
      break;

    case "evento":
      mensagem = "Desconto não aplicável. A má conduta impossibilita a concessão de desconto.";
      break;

    default:
      mensagem = "Selecione uma opção válida.";
      break;
  }

  document.getElementById("resultado").textContent = mensagem;
}


document.getElementById("calcular-btn").addEventListener("click", calcularDesconto);


document.getElementById("boletos-abertos").addEventListener("change", function() {
  const boletosAbertos = this.value;

  
  if (boletosAbertos !== "2" && boletosAbertos !== "3") {
    document.getElementById("historico-section").style.display = "none";
    document.getElementById("resultado").textContent = "";
    document.getElementById("calcular-btn").textContent = "Calcular Desconto"; 
  } else {
    document.getElementById("historico-section").style.display = "block";
  }
  document.getElementById("resultado").textContent = "";
  document.getElementById("calcular-btn").onclick = calcularDesconto;
});
