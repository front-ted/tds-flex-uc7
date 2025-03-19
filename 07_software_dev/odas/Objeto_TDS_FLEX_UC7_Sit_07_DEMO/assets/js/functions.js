//unityExec  - pega a funçao do objeto da unity para enviar mensagens e atribui um nome mais amigavel
var unityExec = null;


var loadScreen = null;

var uiMessages = null;
var popupMsgWindow = null;
var infoMsgWindow = null;
var confirmacaoMsgWindow = null;

var simpleMsgDefaultTimer = 1700;
var simpleMsg = null;

var containerMsgFixa = null;
var msgFixa = null;
var menuConfig = null


var respostaDragEscala = null
var respostaDragConexao = null



/* verifica versao do ie */
function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
  
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return true;
    }
    else  // If another browser, return 0
    {
       return false;
    }
  
    
}

//funçoes relacionadas a mostrar e esconder a tela de loading

 function showLoadScreen(msg){
    if(msg){
      document.getElementById('loadMsg').innerHTML = msg;
    } else {
      document.getElementById('loadMsg').innerHTML = "Aguarde, carregando aplicação."
    }
    $(loadScreen).fadeIn(300);
   
  }

  function hideLoadScreen(){
    $(loadScreen).fadeOut(300);
  }

function skipLoader(){
    document.getElementById('loadScreen').classList.add('hidden');
    displayUnityApp();
}
  
//trava a tela sempre em landscape em dispositivos moveis, só funciona no chrome a principio
function lockscreen(){
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    document.getElementById('msg').innerHTML += " - Teste do lock executado."
    screen.orientation.lock('landscape');
}



//
var unityContainer = null;
function displayUnityApp(){
    //$(msgFixa).hide(0);
    $("#btnRequisitos").fadeOut(200);
    unityContainer.classList.remove('hidden');
}
//oculta a div que exibe a aplicaçao da unity
function hideUnityApp(){
    //unityInstance.SendMessage('SoundManager', 'Mute');
    //appExec('LoadSceneIndex', 0);  
    unityContainer.classList.add('hidden');
}



//mensagens na tela




function checkWindowMobile(){
  if(($(infoMsgWindow).height() < $(window).height()) && ($(window).width() < 800)){
    $(uiMessages).addClass('d-flex');
  } else if($(window).width() < 990){
    $(uiMessages).removeClass('d-flex');
  }
}

function checkPopUpWindowMobile(){
  if(($(popupMsgWindow).height() < $(window).height()) && ($(window).width() < 800)){
    $(uiMessages).addClass('d-flex');
  } else if($(window).width() < 990){
    $(uiMessages).removeClass('d-flex');
  }
}















DadosRelatorio = {
  dados : {},
  addData : function(key,data){
    this.dados[key] = data;
  },
  gerar : function(){
    Relatorios.previewRelatorio(this.dados);
  },
  clear: function(){
    this.dados = {};
  }
}

