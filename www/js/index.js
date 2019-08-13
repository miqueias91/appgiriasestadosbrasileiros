let timeout = 5000;

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

var app = {
  // Application Constructor
  initialize: function() {
    console.log('initialize');
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  // deviceready Event Handler    
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    console.log('onDeviceReady');
    this.receivedEvent('deviceready');
    // this.onSearchKeyDown('searchbutton');
    this.buscaGiriaEstado(estado);
    this.pesquisaGiriaEstado(pesquisa);
    this.cadastraGiria(giria_input, significado_giria, select_estado);
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('receivedEvent');
  },
  //FUNÇÃO DE BUSCA
  onSearchKeyDown: function(id) {
    if (id === '') {
      // ons.notification.alert("Informe o nome da gíria.",{title: 'Ops!'});
      return false;
    }
    else{
      $('#resultado_girias').html("");
      fn.showDialog('modal-aguarde');
      app.pesquisaGiriaEstado(id);
    }
  },
  buscaGiriaEstado: function(estado) {
    $.ajax({
        url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/buscaGiriaEstado.php",
        dataType: 'json',
        type: 'GET',
        timeout: parseInt(timeout),
        data: {
          'uf': estado
        },
        error: function(a) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
          ons.notification.alert("Não foi possível buscar as gírias desse estado.",{title: 'Ops!'});
        },
        success: function(valorRetornado) {
        var timeoutID = 0;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
        if (valorRetornado == "ERROR") {
          ons.notification.alert("Não foi possível buscar as gírias desse estado.",{title: 'Ops!'});
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
  },
  pesquisaGiriaEstado: function(pesquisa) {
    $.ajax({
        url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/buscaGiriaEstado.php",
        dataType: 'json',
        type: 'GET',
        timeout: parseInt(timeout),
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
  },
  cadastraGiria: function(giria_input, significado_giria, select_estado){
    $.ajax({
        url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/cadastraGiriaEstado.php",
        dataType: 'html',
        type: 'POST',
        timeout: parseInt(timeout),
        data: {
          'giria': giria_input,
          'significado': significado_giria,
          'estado': select_estado
        },
        error: function(a) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
          ons.notification.alert("Não foi possível enviar sua gíria.",{title: 'Ops!'});
        },
        success: function(valorRetornado) {
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
          ons.notification.alert("Sua gíria foi enviada com sucesso. Em breve ela estará disponível no estado brasileiro selecionado.",{title: 'Parabéns!'});
        },
    }); 
  }
};
app.initialize();