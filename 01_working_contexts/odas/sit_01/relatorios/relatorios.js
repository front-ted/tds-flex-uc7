//o nome que aparece na janela de preview no titulo e o titulo principal do relatório.

var nomeRelatorio = 'Relatório  Inteligência Emocional';


/*
    <!-- esta é a estrutura do container para prever o relatorio na propria pagina ao invés de nova janela-->
	<section id="relatorioContainer" class="d-none">
		<header>
			<h1 class="text-center"> Relatório</h1>
			<button class="btClose btn btn-warning" title="fechar">X</button>
		</header>
		<div class="container">		
			<div id="relatorioPdfEmbed">                                
			</div>
			<footer class="text-center">
				 <a id="btDownloadPdfEmbed" class="btn btn-primary" role="button" download="relatorio.pdf">Baixar pdf</a>
				 <button class="btn btn-warning btClose" title="fechar">Fechar</button>
			</footer>
		</div>
	</section>
*/


var Relatorios = {
    /* Cria o embed pra usar o relatorio inline, mas eh possivel abrir numa nova janela*/
    createEmbed: function(){
        let relatorioContainer = document.createElement('div');
        relatorioContainer.id = "relatorioContainer";
        relatorioContainer.className = "d-none";
        let header = document.createElement("header");
          let h1 = document.createElement("h1")
          h1.classList = "text-center";
          h1.innerHTML = nomeRelatorio;
          let button = document.createElement("button");
          button.className = "btClose btn btn-warning mx-2"
          button.title = "fechar";
          button.innerHTML = "x";
        header.appendChild(h1);
        header.appendChild(button);  
        let container = document.createElement('div');
        container.className = "container";
            let relatorioPdfEmbed = document.createElement('div');
            relatorioPdfEmbed.id="relatorioPdfEmbed";
            let footer = document.createElement("footer");
            footer.className ="text-center";
                let alink = document.createElement("a");
                alink.id = "btDownloadPdfEmbed";
                alink.className = "btn btn-primary";
                alink.role = "button";
                alink.download = "relatorio.pdf";
                alink.innerHTML = "Baixar pdf";
                let btClose = document.createElement("button");
                btClose.className = "btn btn-warning btClose mx-2";
                btClose.title = "fechar";
                btClose.innerHTML = "Fechar";
            footer.appendChild(alink);
            footer.appendChild(btClose);
        container.appendChild(relatorioPdfEmbed);
        container.appendChild(footer);   
        relatorioContainer.appendChild(header) 
        relatorioContainer.appendChild(container);
        document.getElementById("application").appendChild(relatorioContainer);
        console.log("Container inline do relatorio criado para preview");
    },
    /* cria o relatorio numa nova pagina */
    createPage : function(resultado){
        var page = window.open("", 'MsgWindow')
        var title = document.createElement('title');
        title.innerText = "Relatório de atividades";
        var html_tags =         
        `
                    <!DOCTYPE html>
                    <html lang="pt-br">         
                      <head>
                         <link href="./assets/bootstrap/bootstrap.min.css" rel="stylesheet">
                         <link href="./assets/fas/css/all.min.css" rel="stylesheet">
                         <link href="./relatorios/relatorios.css" rel="stylesheet">
                      </head>
                      <body>
                        <header>
                            <h1 class="text-center">${nomeRelatorio}</h1>
                        </header>
                        <div class="container main">
                          <div id="relatorioPdf">                                
                          </div>
                          <footer class="text-center">
                               <button id="btDownloadPdf" class="btn btn-primary" role="button">Baixar pdf</button>
                          </footer>
                        </div>
        
                        <script src="./assets/bootstrap/jquery-3.2.1.min.js"></script>
                        <script src="./assets/bootstrap/popper.min.js"></script>
                        <script src="./assets/bootstrap/bootstrap.min.js"></script>
                      </body>
                    </html>
        `; 
        
        page.document.write(html_tags);
  
        var iframe = document.createElement('iframe');
        iframe.frameBorder = 0;
        iframe.setAttribute('style','position:absolute; top:0; left:0; width:100%; height:100%');
       
        html2pdf().from(resultado).toImg().output('datauristring').then(out =>{
          console.log("output=",typeof(out));        
          iframe.src = out
        });
        
        
        page.document.getElementById('relatorioPdf').appendChild(iframe);
     
        page.document.getElementById('btDownloadPdf').addEventListener('click', function(){
          console.log('download ativado!');
          //pdf.save("relatorio.pdf");
          console.log(resultado)
          var d = new Date();
          html2pdf().from(resultado).save("relatorio_"+d.getHours()+'h'+d.getMinutes()+'.pdf');
        }) 
       
    },
    previewRelatorio : function (data){
       
        /* var relatorio = document.createElement('div');
      
        resultado.id = "relatorio";
        resultado.style = "padding:10mm 10mm 10mm 10mm; width:200mm; height: auto";
       */

        if(typeof(data) == "string"){
            data = JSON.parse(data);           
        }        
        /*
        for (key in data){
            console.log('data do tipo = ',typeof(data[key]))            
            resultado.innerHTML += `<h2>${key}:</h2> <p>${data[key]}</p>`;
        }
        */

        var relatorio = this.parseData(data);
        this.createPage(relatorio);
    },
    downloadRelatorio: function(data){
      console.log('gerando o download');
      var relatorio = this.parseData(data);
      var d = new Date();
      var opt = {
        margin: [1,0.5,1,1],
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
      }
      html2pdf().from(relatorio).set(opt).save("relatorio_"+d.getHours()+'h'+d.getMinutes()+'.pdf').then(function(val){ setTimeout(function(){FixedMessage.unfixMessage()},300)}, function(val){UIMessages.popupMsg('Alerta!','Problema gerando o pdf!!')});;
      console.log('fim do processo download')
    },
    parseData: function(data){
      var parsedData = document.createElement('div');
      parsedData.id = "relatorio";
      parsedData.style = "padding:10mm 10mm 10mm 10mm; width:200mm; height: auto";
      parsedData.innerHTML += `<header><h1 style="text-align:center">${nomeRelatorio}</h1></header>`;      
      for (key in data){
        console.log('data do tipo = ',typeof(data[key]))            
        //parsedData.innerHTML += `<h2>${key}:</h2> <p>${data[key]}</p>`;
        //customizei pra simplificar o relatorio, assim pode qualquer html dentro, desde que aceitado pelo
        //gerador de pdf
        parsedData.innerHTML += `<div>${data[key]}</div>`;
    }
      return parsedData
    },
    previewRelatorioEmbed: function(data){
     
      console.log("abrindo embed na pagina")
      var relatorioContainer = document.getElementById('relatorioContainer');
      
      relatorioContainer.classList.remove('d-none');
      relatorioContainer.classList.add('d-block');
      

      var relatorio = this.parseData(data);      
      var relatorioEmbed = document.getElementById('relatorioPdfEmbed');
     
      var iframe = document.createElement('iframe');
      iframe.frameBorder = 0;
      iframe.setAttribute('style','position:relative; width:100%; height:100%');
     
      html2pdf().from(relatorio).toImg().output('datauristring').then(out =>{
        console.log("output=",typeof(out));        
        iframe.src = out
      });
      
      relatorioEmbed.innerHTML = "";
      relatorioEmbed.appendChild(iframe);
   
      document.getElementById('btDownloadPdfEmbed').addEventListener('click', function(){
        console.log('download ativado!');
        //pdf.save("relatorio.pdf");
        console.log(relatorio)
        var d = new Date();
        html2pdf().from(relatorio).save("relatorio_"+d.getHours()+'h'+d.getMinutes()+'.pdf');
      }) 

      $('.btClose').on('click',function(){
        relatorioContainer.classList.add('d-none');
        relatorioContainer.classList.remove('d-block');
      })
    }

}


/*DadosRelatorio, criei uma classe que cria um objeto com chave valor, pra ser interpretado pelo relatorio mesmo, o valor é em hmtl, simplifica bastante o processo, cada chave deve ser unica em dados relatorio */
//  Exemplo de uso:  DadosRelatorio.addData("tituloEDBV","<h2 style='page-break-before: always;margin-top:2cm'>Situação - Preenchimento e-DBV - Declaração Eletrônica de Bens do Viajante</h2>");
// usar css inline eh o mais recomendavel para gerar o html, eh possivel tbm passar um elemento criado dinamicamente...
//  DadosRelatorio.gerar() cria o pdf com preview
// o metodo download pode ser associado direto a um link ou botão pra iniciar um download direto do pdf sem preview



DadosRelatorio = {
  dados : {},
  addData : function(key,data){
    this.dados[key] = data;
  },
  gerar : function(){
    Relatorios.previewRelatorio(this.dados);
  },
  preview : function(){
    Relatorios.previewRelatorioEmbed(this.dados);
  },
  download : function(){
    Relatorios.downloadRelatorio(this.dados);
  },
  clear: function(){
    this.dados = {};
  }
}

$("#linkRelatorio").on('click', function(){
  DadosRelatorio.gerar();
})



window.addEventListener("load", function(){
  Relatorios.createEmbed();
})
