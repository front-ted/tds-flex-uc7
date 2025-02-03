$(function (){
  if(typeof getSavedPage == 'function'){
    var actualPage = getSavedPage();
    $("img.imagesLoader").css("display","none");
    imagesLoader(actualPage);
  }


});

function imagesLoader( page ) // para funcionar, deve ser definido o enderço da imagem com data-src e se precisar adicionar um display alguma coisa, usar data-display
{ // page == false exibe todas as imagens
  // $("img.imagesLoader[data-page='"+page+"']").each(function (){
  var byPage = ".pagina:nth-child("+page+") ";
  if(page == false || page==null){
    byPage = "";
    }
        $(byPage+"img.imagesLoader").each(function (){
          if($(this).attr("data-src")!=""){
            $(this).attr('src',$(this).attr("data-src"));
            if($(this).attr("data-display"))
            {
              $(this).css("display",$(this).attr("data-display"));
            }else{
              $(this).css("display","");
            }
          }
        });

}
