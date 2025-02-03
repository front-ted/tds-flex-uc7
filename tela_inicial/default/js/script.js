var uc = "TDSflexUC05" // aqui vai a sigla do curso e o numero da uc

$(document).ready(function(){

	$('.voltar-topo').click(function(){
		$('html, body').animate({scrollTop:0}, 'slow'); //slow, medium, fast
	})

	$("li[data-item]").each(function(){
		var data = $(this).data('item');
		var local =JSON.parse(localStorage.getItem(uc+"_"+data))
		if (local != null && local['uc'] == uc) {
			var grupo = $("#"+ local['grupo'] + "").attr('data-index')
		
			if(grupo == 'lista-fazendo')	{
				$("li[data-item='"+local['item']+"'").addClass('fazendo')
				$("li[data-item='"+local['item']+"'] .dropdown-menu .mover-fazendo").hide()	
				$("li[data-item='"+local['item']+"'] .dropdown-menu .mover-fazer").show()
			} 
			if(grupo == 'lista-feito'){
				$("li[data-item='"+local['item']+"'").addClass('feito')
				$("li[data-item='"+local['item']+"'] .dropdown-menu .mover-feito").hide()
				$("li[data-item='"+local['item']+"'] .dropdown-menu .mover-fazer").show()
			} 
			$("li[data-item='"+local['item']+"'").prependTo($("#"+ local['grupo'] + ""))
		}
	});

	$("div[data-group]").each(function(){
		verificaCompleto($(this).data('group'))
	})


	if($( window ).width() <= 991 && !localStorage.getItem(uc+"_"+'primeiraMobile')){
		$('.mao').show();
		setTimeout(function(){
			$('.mao').hide()
		}, 5500)
		localStorage.setItem(uc+"_"+"primeiraMobile",true)
	}

	$(".drag-item").on("taphold",function(){
		var item = $(this).attr('data-item')
		var lista = $(this).parent().attr('id');
		
		if($( window ).width() <= 991){
			$('.botao-fazendo').attr("onClick","fazendo('"+item+"','"+lista+"')")
			$('.botao-feito').attr("onClick","feito('"+item+"','"+lista+"')")
			$('#modal-id').modal('show')
		}
	});
})

$('.mover-fazer').click(function(){
	var item = $(this).parent().parent().parent().attr('data-item')
	var aux = $(this).parent().parent().parent().parent().attr('id')
	var id = 0
	var grupo = $(this).parent().parent().parent().parent().parent().parent().attr('data-group')
	
	if($(this).parent().parent().parent().parent().attr('data-index') == 'lista-fazendo'){
		id = parseInt(aux) - 1 
	} else if ($(this).parent().parent().parent().parent().attr('data-index') == 'lista-feito'){
		id = parseInt(aux) - 2
	}

	$(this).parent().parent().parent().removeClass("fazendo")
	$(this).parent().parent().parent().removeClass("fazer")
	$(this).parent().parent().parent().addClass("fazer")
	$("li[data-item='"+item+"'").prependTo($("#"+ id + ""))

	var salvarItem = {"grupo": id, "item": item, "uc": uc}
	localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))
	verificaCompleto(grupo)
	alternaBotoesBubble("lista-fazer", $(this).parent());

})

$('.mover-fazendo').click(function(){
	var item = $(this).parent().parent().parent().attr('data-item')
	var aux = $(this).parent().parent().parent().parent().attr('id')
	var id = parseInt(aux) + 1 ;
	console.log(item, aux, id);
	console.log('mover fazendo')
	/*if ($("#"+ id + "").attr('data-index') == "lista-fazendo"){
		$(this).parent().parent().parent().addClass("fazendo")
		$("li[data-item='"+item+"'").prependTo($("#"+ id + ""))

		var salvarItem = {"grupo": id, "item": item, "uc": uc}
		localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem));
		console.log('executou')
	} else{
		console.log('nao executou')
	}*/

	if($(this).parent().parent().parent().parent().attr('data-index') == 'lista-fazer'){
		id = parseInt(aux) + 1 
	} else if ($(this).parent().parent().parent().parent().attr('data-index') == 'lista-feito'){
		id = parseInt(aux) - 1
	}
	
	$(this).parent().parent().parent().removeClass("feito")
	$(this).parent().parent().parent().removeClass("fazer")
	$(this).parent().parent().parent().addClass("fazendo")
	
	$("li[data-item='"+item+"'").prependTo($("#"+ id + ""))

	var salvarItem = {"grupo": id, "item": item, "uc": uc}
	localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))
	
	verificaCompleto(grupo)

	alternaBotoesBubble('lista-fazendo', $(this).parent());
	
})

$('.mover-feito').click(function(){
	var item = $(this).parent().parent().parent().attr('data-item')
	var aux = $(this).parent().parent().parent().parent().attr('id')
	var id = 0
	var grupo = $(this).parent().parent().parent().parent().parent().parent().attr('data-group')
	
	if($(this).parent().parent().parent().parent().attr('data-index') == 'lista-fazer'){
		id = parseInt(aux) + 2 
	} else if ($(this).parent().parent().parent().parent().attr('data-index') == 'lista-fazendo'){
		id = parseInt(aux) + 1
	}

	$(this).parent().parent().parent().addClass("feito")
	$("li[data-item='"+item+"'").prependTo($("#"+ id + ""))

	var salvarItem = {"grupo": id, "item": item, "uc": uc}
	localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))
	verificaCompleto(grupo)
	alternaBotoesBubble('lista-feito', $(this).parent())

})

$('.link').click(function(){
	if ($(this).parent().parent().parent().attr("data-index") == "lista-fazer"){
		var aux = $(this).parent().parent().parent().attr('id') 
		var id = parseInt(aux) + 1 
		$(this).parent().parent().addClass('fazendo')
		$(this).parent().parent().prependTo($("#"+ id + ""))
		if (localStorage.getItem(uc+"_"+'verificaPrimeira')){
			return
		} else {
			$('.setinha').show();
			$('.exemplo').show();
		}

		var item = $(this).parent().parent().attr("data-item")
		var salvarItem = {"grupo": id, "item": item, "uc": uc}
	

		localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))
		
	
	}
})

var grupo = ""
var listaOriginal = ""
function retornaGrupo(){
	return grupo
}
function retornaLista(){
	return listaOriginal
}
dragula([
	document.getElementById('1'),
	document.getElementById('2'),
	document.getElementById('3'),
	document.getElementById('4'),
	document.getElementById('5'),
	document.getElementById('6'),
	document.getElementById('7'),
	document.getElementById('8'),
	document.getElementById('9'),
	document.getElementById('10'),
	document.getElementById('11'),
	document.getElementById('12'),
	document.getElementById('13'),
	document.getElementById('14'),
	document.getElementById('15'),
	document.getElementById('16'),
	document.getElementById('17'),
	document.getElementById('18'),
])

.on('drag', function(el) {
	
	// add 'is-moving' class to element being dragged
	// el.classList.add('is-moving');
	//var elemento = el.getAttribute('id')
	//var lista = el.parentElement.getAttribute('id')

	grupo = el.parentElement.parentElement.parentElement.getAttribute('data-group')
	listaOriginal =  el.parentElement.getAttribute('id')
})
.on('dragend', function(el) {
	var verificaGrupo = retornaGrupo()
	verificaCompleto(verificaGrupo)
	if (el.parentElement.parentElement.parentElement.getAttribute('data-group') == verificaGrupo){
		
		// remove 'is-moving' class from element after dragging has stopped
		// el.classList.remove('is-moving');
		
		// console.log(el.parentElement.getAttribute('data-index'))
		var lista = el.parentElement.getAttribute('data-index')
		//var elemento = el.getAttribute('id')
		
		//localStorage.setItem(uc+"_"+elemento,lista)
		console.log(el)
		var i = el.getAttribute('data-item') 
		if (lista == 'lista-fazer') {
			el.setAttribute('class', 'drag-item fazer')
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-fazendo").show()
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-feito").show()
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-fazer").hide()
		}
		if (lista == 'lista-fazendo') {
			el.setAttribute('class','drag-item fazendo')
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-fazer").show()
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-feito").show()
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-fazendo").hide()
		}
		if (lista == 'lista-feito') {
			if (!localStorage.getItem(uc+"_"+'verificaPrimeira')){
				$('.exemplo').hide()
				$('.setinha').hide()
				localStorage.setItem(uc+"_"+'verificaPrimeira', true)
			}
			el.setAttribute('class', 'drag-item feito')
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-fazer").show()
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-feito").hide()
			$("li[data-item='"+i+"'] .dropdown-menu li.mover-fazendo").show()
		}
		
		var item = el.getAttribute('data-item')
		var grupo = el.parentElement.getAttribute('id')

		var salvarItem = {"grupo": grupo, "item": item, "uc": uc}
		localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))

		// add the 'is-moved' class for 600ms then remove it
		window.setTimeout(function() {
			el.classList.add('is-moved');
			window.setTimeout(function() {
				el.classList.remove('is-moved');
			}, 600);
		}, 100);
	} else {
		$("li[data-item='"+el.getAttribute('data-item')+"'").prependTo($("#"+ retornaLista() + ""))
	}
});


var createOptions = (function() {
	var dragOptions = document.querySelectorAll('.drag-options');
	
	// these strings are used for the checkbox labels
	var options = ['Research', 'Strategy', 'Inspiration', 'Execution'];
	
	// create the checkbox and labels here, just to keep the html clean. append the <label> to '.drag-options'
	function create() {
		for (var i = 0; i < dragOptions.length; i++) {

			options.forEach(function(item) {
				var checkbox = document.createElement('input');
				var label = document.createElement('label');
				var span = document.createElement('span');
				checkbox.setAttribute('type', 'checkbox');
				span.innerHTML = item;
				label.appendChild(span);
				label.insertBefore(checkbox, label.firstChild);
				label.classList.add('drag-options-label');
				dragOptions[i].appendChild(label);
			});

		}
	}
	
	return {
		create: create
	}
	
	
}());

var showOptions = (function () {
	
	// the 3 dot icon
	var more = document.querySelectorAll('.drag-header-more');
	
	function show() {
		// show 'drag-options' div when the more icon is clicked
		var target = this.getAttribute('data-target');
		var options = document.getElementById(target);
		options.classList.toggle('active');
	}
	
	
	function init() {
		for (i = 0; i < more.length; i++) {
			more[i].addEventListener('click', show, false);
		}
	}
	
	return {
		init: init
	}
}());

createOptions.create();
showOptions.init();

function fazendo(item, lista){
	var id = parseInt(lista) + 1 
	if ($("#"+ id + "").attr('data-index') == "lista-fazendo"){
		$("li[data-item='"+item+"'").addClass('fazendo')
		$("li[data-item='"+item+"'").prependTo($("#"+ id + ""))

		var salvarItem = {"grupo": id, "item": item, "uc": uc}
		localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))
	}

}

function feito(item,lista){
	console.log($("#"+ lista + "").attr('data-index'))

	if($("#"+ lista + "").attr('data-index') == 'lista-fazer'){
		id = parseInt(lista) + 2 
	} else if ($("#"+ lista + "").attr('data-index') == 'lista-fazendo'){
		id = parseInt(lista) + 1
	}
	$("li[data-item='"+item+"'").addClass('feito')
	$("li[data-item='"+item+"'").prependTo($("#"+ id + ""))

	var salvarItem = {"grupo": id, "item": item, "uc": uc}
	localStorage.setItem(uc+"_"+item,JSON.stringify(salvarItem))
}

function verificaCompleto(lista){
	if ($("div[data-group='"+ lista + "'] ul[data-index='lista-fazer']").has('li').length == 0 && $("div[data-group='"+ lista + "'] ul[data-index='lista-fazendo']").has('li').length == 0){
		$("div[data-group='"+ lista + "']").addClass('disabled')
	} else {
		$("div[data-group='"+ lista + "']").removeClass('disabled')
	}
}


function alternaBotoesBubble(local, container){
	console.log('alternando os botoes')
	if (local == 'lista-fazer') {
		$(container).find("li.mover-fazendo").show()
		$(container).find("li.mover-feito").show()
		$(container).find("li.mover-fazer").hide()
	}
	if (local == 'lista-fazendo') {	
		$(container).find("li.mover-fazer").show()
		$(container).find("li.mover-feito").show()
		$(container).find("li.mover-fazendo").hide()
	}
	if (local == 'lista-feito') {		
		$(container).find("li.mover-fazer").show()
		$(container).find("li.mover-feito").hide()
		$(container).find("li.mover-fazendo").show()
	}
}