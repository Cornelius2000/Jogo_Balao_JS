  var timerId = 0;
  var contaPontos = 1; //Variavel global que vai contar os pontos
  var tempo = 0;
  var bolaDaVez = "";
  var pontoFinal = 0;
  var pontosB = [0,0,0,0,0,0]
  var pontos = [1,2,3,4,5,6];
  var setTempo = 200;
  var setBalao = 1500;
  
  function Dificuldade(){
    var dificuldade = window.location.search.replace("?", "");    
    if(dificuldade == "2"){
      setTempo = 150;
      setBalao = 1000;
    }
    if(dificuldade == "3"){
      setTempo = 100;
      setBalao = 500;
    }
    if(dificuldade == "4"){
      setTempo = 60;
      setBalao = 200;
    }
  }
  
  function addBola(){//vai criar todo o elemento bola na tela
    var bola = document.createElement("div");
    var pos = novaPosicao();
    bola.setAttribute("style", "left:"+pos[0]+"px;top:"+pos[1]+"px;");
    bola.setAttribute("onclick", "estourar(this)");
    bola.setAttribute("class", bolaDaVez);// vai criar a div, e adicionar o atributo class da bola
    document.body.appendChild(bola);//adiciona o elemento  bola no conteúdo bola
    selectBola();
  }

  // sorteia um numero aleatório para a posiçãoptimize//floor transforma ele para inteiro 
  function novaPosicao(){  
    var pos = [];
    pos.push(Math.floor(Math.random() * 800));
    pos.push(Math.floor(Math.random() * 600));
    if(pos[0] < 146){
      pos[0] = pos[0]+(146-pos[0])*(Math.floor(Math.random() * 250)); 
    }
    if(pos[0] > 1000){
      pos[0] = pos[0]+(800-pos[0])*(Math.floor(Math.random() * 250)); 
    }
    if(pos[1] < 40){
      pos[1] = pos[1]+(40-pos[1])*(Math.floor(Math.random() * 200));  
    }
    if(pos[1] > 600){
      pos[1] = pos[1]+(600-pos[1])*(Math.floor(Math.random() * 200));  
    }
    return pos;
  }

  function estourar(elemento){// vai remover a bola quando clicar nela
    document.body.removeChild(elemento);
    contarPontos(elemento);
  }

  function cronometro (segundos){
  	document.getElementById("cronometro").innerHTML = segundos;
  	timerId = setTimeout("cronometro("+ (segundos + 1) +")", 1000); // A cada 1 seg uma chamada recursiva é chamada, atualizando o valor do cronomêtro
    if(timerId > setTempo){
      game_over();
    }
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
  }
  
  function somaFinal(){
    for(var i = 1; i<6 ; i++){
      pontoFinal += i*pontosB[i-1];
    }
  }
  
  function apenasNumeros(string){
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
  }

  function sortBolaDaVez(NumBolas){
    var sort = Math.floor(Math.random() * NumBolas);
    return sort;
  }
  
  function selectBola(){
    var tipoBola = ["bola1","bola2","bola3","bola4","bola5","bola6"];
    if(timerId > 15){
      sort = sortBolaDaVez(3);
      bolaDaVez = tipoBola[sort];
    }
    if(timerId > 30){
      sort = sortBolaDaVez(4);
      bolaDaVez = tipoBola[sort];
    }
    if(timerId > 40){
      sort = sortBolaDaVez(5);
      bolaDaVez = tipoBola[sort];
    }
    if(timerId > 50){
      sort = sortBolaDaVez(6);
      bolaDaVez = tipoBola[sort];
    }
  }
  
  function iniciar(){
    Dificuldade(); 
    $(document).ready(function(){
      alert('Clique em ok para Começar! Boa sorte');
      });
      cronometro(tempo);
      bolaDaVez = "bola1";
      setInterval(addBola, setBalao);
  }
  
  function game_over(){
    somaFinal();
  	alert('Fim de Jogo! Sua Pontuação total foi: '+pontoFinal+'  Parabéns ');
    window.location.href = "index.html";
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