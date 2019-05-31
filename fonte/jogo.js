  var timerId = 0;
  var contaPontos = 0; //Variavel global que vai contar os pontos
  var tempo = 0;
  var bolaDaVez = "";
  var pontoFinal = 0;
  var pontosB = [0,0,0,0,0]
  var pontos = [1,2,3,4,5];
  
  function addBola(){//vai criar todo o elemento bola na tela
    var bola = document.createElement("div");
    var pos = novaPosicao();
    bola.setAttribute("style", "left:"+pos[0]+"px;top:"+pos[1]+"px;");
    bola.setAttribute("onclick", "estourar(this)");
    console.log(bolaDaVez);
    bola.setAttribute("class", bolaDaVez);// vai criar a div, e adicionar o atributo class da bola
    document.body.appendChild(bola);//adiciona o elemento  bola no conteúdo bola
    selectBola();
  }

  // sorteia um numero aleatório para a posiçãoptimize//floor transforma ele para inteiro 
  function novaPosicao(){  
    var pos = [];
    pos.push(Math.floor(Math.random() * 800));
    pos.push(Math.floor(Math.random() * 600));
    return pos;
  }

  function estourar(elemento){// vai remover a bola quando clicar nela
    document.body.removeChild(elemento);
    contarPontos(elemento);
  }

  function cronometro (segundos){
  	document.getElementById("cronometro").innerHTML = segundos;
  	timerId = setTimeout("cronometro("+ (segundos + 1) +")", 1000); // A cada 1 seg uma chamada recursiva é chamada, atualizando o valor do cronomêtro
  		// clearTimeout(timerId); // Parar o cronometro
    if(timerId > 05){
      game_over();
    }
  		// document.getElementById("cronometro").innerHTML = 0;
  		// return false;
  	}

  function contarPontos(elemento){
    var l = document.getElementById("pontos");
    l.innerHTML = contaPontos;
    contaPontos++;
    
    var result = ($(elemento).attr('class'));
    result = apenasNumeros(result);
    var a = buscaBinaria(pontos, result);
    if(a == true){
      pontosB[result-1] += 1;
    }
    console.log(pontosB);
  }
  
  function somaFinal(){
    for(var i = 1; i<5 ; i++){
      pontoFinal += i*pontosB[i-1];
    }
  }
  
  function apenasNumeros(string){
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
  }

  function selectBola(){
    var tipoBola = ["bola1","bola2","bola3","bola4","bola5"];
    
    if(timerId > 15){
      // setInterval(addBola, 1500);
      bolaDaVez = "bola2";
      if(timerId > 30){
        bolaDaVez = "bola3";
        if(timerId > 60){
          bolaDaVez = "bola4";
          if(timerId > 90){
            bolaDaVez = "bola5";
          }
        }
      }
    }
  }
  
  function iniciar(){ 
    $(document).ready(function(){
      alert('Clique em ok para Começar! Boa srte');
      });
      cronometro(tempo);
      bolaDaVez = "bola1";
      setInterval(addBola, 2000);
  }
  
  function game_over(){
    somaFinal();
  	alert('Fim de Jogo! Sua soma total é: '+pontoFinal);
    window.location.href = "index.html?";
  }

  function buscaBinaria(umVetor, item) {
      let prim = 0;
      let ult = umVetor.length - 1;
      let achou = false;
      while (prim <= ult && !achou) {
          meioLista = Math.ceil((prim + ult) / 2);
          if (umVetor[meioLista] == item) {
              achou = true;
          }
          else {
              if (item < umVetor[meioLista]) {
                  ult = meioLista - 1;
              }
              else {
                  prim = meioLista + 1;
              }
          }
      }
      return achou;
  }