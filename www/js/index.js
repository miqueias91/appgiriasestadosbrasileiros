var timeout = 5000;

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
    
    this.receivedEvent('deviceready');  
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('receivedEvent');
  },
  //FUNÇÃO DE BUSCA
  onSearchKeyDown: function(id) {
    if (id === '') {
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
              $('#conteudo_girias').append("<ons-card class='txt_giria' id='txt_giria"+i+"' marcado='0'><div class='title'>"+obj[i]['giria']+"\n</div><div class='content'>"+obj[i]['significado']+"</div></ons-card>");
            }

            var qtd_marcado = 0;
            $( ".txt_giria" ).click(function() {
              var marcado = $(this).attr('marcado');
              var id = $(this).attr('id');          

              if(parseInt(marcado) == 0) {
                $(this).css("background","#f5f5f5");
                $(this).attr('marcado',1);
                qtd_marcado++;
              }
              else{
                $(this).css("background","#fff");
                $(this).attr('marcado',0);
                qtd_marcado--;
              }

              if (parseInt(qtd_marcado) > 0) {
                $(".copiar").css("display","");
                $(".compartilha").css("display","");
              }
              else{
                $(".copiar").css("display","none");
                $(".compartilha").css("display","none");
              }                    
            });










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
          $('#resultado_girias').append("<ons-card><div class='title'>Ops!</div><div class='content'>Não encontramos nada parecido com essa gíria</div></ons-card>");
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
            $('#resultado_girias').append("<ons-card><div class='title'>Ops!</div><div class='content'>Não encontramos nada parecido com essa gíria</div></ons-card>");
          }
        },
    }); 
  },
  ultimasGiriasCadastradas: function() {
    //admob.interstitial.show();
    $.ajax({
        url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/ultimasGiriasCadastradas.php",
        dataType: 'json',
        type: 'GET',
        timeout: parseInt(timeout),
        data: {
          'ultimasGiriasCadastradas': 'sim'
        },
        error: function(a) {    
          console.log(a)      
          $('#ultimas_girias').append("<ons-card><div class='title'>Ops!</div><div class='content'>Nenhuma gíria cadastrada nos últimos dias.</div></ons-card>");
        },
        success: function(valorRetornado) { 
          var obj = valorRetornado;
          var timeoutID = 0;
          clearTimeout(timeoutID);
          timeoutID = setTimeout(function() { fn.hideDialog('modal-aguarde') }, 1);
          if (obj) {
            for(var i in obj) {
              $('#ultimas_girias').append(
                "<ons-card>"+
                  "<div class='title'>"+obj[i]['giria']+"</div>"+
                  "<div class='content'>"+obj[i]['significado']+"</div>"+
                  "<div class='content' style='text-align:right'>"+obj[i]['estado']+"</div>"+
                "</ons-card>");
            }
          }
          else{
            $('#ultimas_girias').append("<ons-card><div class='title'>Ops!</div><div class='content'>Nenhuma gíria cadastrada nos últimos dias.</div></ons-card>");
          }
        },
    }); 
  },
  cadastraGiria: function(giria_input, significado_giria, select_estado){
    var userId = localStorage.getItem('userId');
    var pushToken = localStorage.getItem('pushToken');
    $.ajax({
        url: "https://miqueiasmcaetano.000webhostapp.com/webservice/giriasestadosbrasileiros/cadastraGiriaEstado.php",
        dataType: 'html',
        type: 'POST',
        timeout: parseInt(timeout),
        data: {
          'giria': giria_input,
          'significado': significado_giria,
          'estado': select_estado,
          'userId': userId,
          'pushToken': pushToken,
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
  },
  trocaClasse: function(elemento, antiga, nova) {
    elemento.classList.remove(antiga);
    elemento.classList.add(nova);
  }
};

app.initialize();