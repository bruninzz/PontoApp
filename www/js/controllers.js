angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup, $timeout, Marcacoes) {

// $scope.marcacoes = Marcacoes.all();
 var dia = getDia();
 var marcacaoDia= {};
 $scope.botaoEntradaStyle = "button button-block button-stable";
 $scope.botaoSaidaStyle = "button button-block button-stable";
 Marcacoes.getMarcacao(dia , function (data){
  $scope.horaEntrada = data.horaEntrada; 
  $scope.horaSaida = data.horaSaida;
   marcacaoDia = data;  

   if (data.horaEntrada != "")
      $scope.botaoEntradaStyle = "button icon-left ion-checkmark button-block button-balanced";
   if (data.horaSaida != "")
     $scope.botaoSaidaStyle ="button icon-left ion-checkmark button-block button-balanced";
 }); 
 

 

   $scope.showConfirm = function(tipo) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Marcar ponto',
       template: 'Deseja marcar o ponto?'
     });
     confirmPopup.then(function(res) {
       if(res) {    
        // var marcacao = {};  
        // Marcacoes.getMarcacao(dia , function (data){
        //   marcacao = data;
        // });     
         var dataAtual = getDia();          
         var horaAtual =  getHora();  
         var horaEntrada ="";
         var horaSaida = "";         
         if (tipo == 'e')
         {        
            horaEntrada = horaAtual;
            $scope.horaEntrada = horaAtual;
            $scope.botaoEntradaStyle = "button icon-left ion-checkmark button-block button-balanced";
         }
         else
         {        
            horaSaida = horaAtual;
            $scope.horaSaida = horaAtual;
            $scope.botaoSaidaStyle ="button icon-left ion-checkmark button-block button-balanced";
         }                  
         if (marcacaoDia.data == undefined)
         {            
            var marcacao = {         
            data: dataAtual ,
            horaEntrada: horaEntrada,
            horaSaida: horaSaida,         
            tipo:1
            }
            Marcacoes.add(marcacao);
            marcacaoDia = marcacao;
         }
         else
         {            
            marcacaoDia.horaEntrada = $scope.horaEntrada;
            marcacaoDia.horaSaida = $scope.horaSaida;
            console.log(marcacaoDia);
            Marcacoes.add(marcacaoDia);
         }
         console.log('Marcação registrada!');
       } else {
         console.log('Ação cancelada!');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

   function getDia () {
     var today = new Date();  
         var dd = today.getDate();
         var mm = today.getMonth()+1; //January is 0!
         var yyyy = today.getFullYear();         
         if(dd<10){
            dd='0'+dd
         } 
         if(mm<10){
            mm='0'+mm
         } 
      return dd+'/'+mm+'/'+yyyy;   
   }
   function getHora () {
      var today = new Date();  
      var hh = today.getHours(); 
         var mi = today.getMinutes(); 
         var ss =  today.getSeconds(); 
         return hh+':'+mi+':'+ss;  
   }
})

.controller('ChatsCtrl', function($scope, Chats, $cordovaCalendar) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


 $scope.createEvent = function() {
        $cordovaCalendar.createEvent({
            title: 'Space Race',
            location: 'The Moon',
            notes: 'Bring sandwiches',
            startDate: new Date(2015, 0, 15, 18, 30, 0, 0, 0),
            endDate: new Date(2015, 1, 17, 12, 0, 0, 0, 0)
        }).then(function (result) {
            console.log("Event created successfully");
        }, function (err) {
            console.error("There was an error: " + err);
        });
    };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
