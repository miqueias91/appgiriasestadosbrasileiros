/*$('#aguarde').dialog({
    modal: true,
    autoOpen: false,
    resizable: false,
    draggable: false,
    dialogClass: "no-close",
});*/

function buscaGiriaEstado(estado) {
	$.ajax({
	    url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/buscaGiriaEstado.php",
	    dataType: 'json',
	    type: 'GET',
	    data: {
	      'uf': estado
	    },
	    error: function(a) {
	    	console.log(a)
	    	ons.notification.alert("Não foi possível buscar as gírias desse estado.");
	    },
	    success: function(valorRetornado) {
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
	        $('#resultado_girias').append("<ons-card><div class='title'>Desculpe</div><div class='content'>Não encontramos nada parecido com essa gíria</div></ons-card>");
	    },
	    success: function(valorRetornado) { 
	        var obj = valorRetornado;
	        if (obj) {
	        	for(var i in obj) {
					$('#resultado_girias').append("<ons-card><div class='title'>"+obj[i]['giria']+"</div><div class='content'>"+obj[i]['significado']+"</div></ons-card>");
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
	    	ons.notification.alert("Não foi possível cadastrar a gíria.");
	    },
	    success: function(valorRetornado) {
	    	console.log(valorRetornado)
	      	ons.notification.alert("Gíria cadastrada com sucesso.");
	    },
	});	
}