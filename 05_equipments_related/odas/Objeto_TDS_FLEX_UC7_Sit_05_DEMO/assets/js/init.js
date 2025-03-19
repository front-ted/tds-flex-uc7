window.addEventListener("load", function(){
    console.log("Document Loaded");
    //$('#msgIe').hide(0);
    if(msieversion()){
    $('.main, #loadScreen').addClass('hidden');
         //alert('Atenção! Esta aplicação não é compatível com Internet Explorer e não poderá ser executada!');
         $('#msgIe').fadeIn(300);  
         $('html, body').css('overflow', 'hidden')
    }  
     loadScreen = document.getElementById('loadScreen');
     unityContainer = document.getElementById('application');
});


