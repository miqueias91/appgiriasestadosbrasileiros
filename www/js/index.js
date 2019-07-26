function buscaGiriaEstado(estado) {
	$.ajax({
	    url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/buscaGiriaEstado.php",
	    dataType: 'json',
	    type: 'GET',
	    data: {
	      'uf': estado
	    },
	    error: function(a) {
	    	var timeoutID = 0;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
	    	ons.notification.alert("Não foi possível buscar as gírias desse estado.");
	    },
	    success: function(valorRetornado) {
			var timeoutID = 0;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
			if (valorRetornado == "ERROR") {
				ons.notification.alert("Não foi possível buscar as gírias desse estado.");
			}
			else{  
				var obj = valorRetornado;
				if (obj) {
					for(var i in obj) {
						$('#conteudo_girias').append("<ons-card><div class='title'>"+obj[i]['giria']+"</div><div class='content'>"+obj[i]['significado']+"</div></ons-card>");
					}
				}
			}
	    },
	});	
}

function pesquisaGiriaEstado(pesquisa) {
	$.ajax({
	    url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/buscaGiriaEstado.php",
	    dataType: 'json',
	    type: 'GET',
	    data: {
	      'pesquisa': pesquisa
	    },
	    error: function(a) {
	    	var timeoutID = 0;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
	        $('#resultado_girias').append("<ons-card><div class='title'>Desculpe</div><div class='content'>Não encontramos nada parecido com essa gíria</div></ons-card>");
	    },
	    success: function(valorRetornado) { 
	        var obj = valorRetornado;
	        var timeoutID = 0;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
				console.log(valorRetornado)
	        if (obj) {
	        	for(var i in obj) {
					$('#resultado_girias').append(
						"<ons-card>"+
							"<div class='title'>"+obj[i]['giria']+"</div>"+
							"<div class='content'>"+obj[i]['significado']+"</div>"+
							"<div class='content' style='text-align:right'>"+obj[i]['estado']+"</div>"+
						"</ons-card>");
				}
	        }
	        else{
	        	$('#resultado_girias').append("<ons-card><div class='title'>Desculpe</div><div class='content'>Não encontramos nada parecido com essa gíria</div></ons-card>");
	        }
	    },
	});	
}

function cadastraGiria(giria_input, significado_giria, select_estado){
	$.ajax({
	    url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/cadastraGiriaEstado.php",
	    dataType: 'html',
	    type: 'POST',
	    data: {
	      'giria': giria_input,
	      'significado': significado_giria,
	      'estado': select_estado
	    },
	    error: function(a) {
	    	var timeoutID = 0;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
	    	ons.notification.alert("Não foi possível enviar sua gíria.");
	    },
	    success: function(valorRetornado) {
	    	var timeoutID = 0;
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
	      	ons.notification.alert("Sua gíria foi enviada com sucesso. Em breve ela estará disponível no estado brasileiro selecionado.");
	    },
	});	
}

window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').right.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
  }
};

// SCRIPT PARA CRIAR O MODAL DE AGUARDE
window.fn.showDialog = function (id) {
  var elem = document.getElementById(id);      
  elem.show();            
};

//SCRIPT PARA ESCONDER O MODAL DE AGUARDE
window.fn.hideDialog = function (id) {
  document.getElementById(id).hide();
};