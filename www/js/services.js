angular.module('starter.services', [])

.factory('Marcacoes', function() {


 var marcacoes = {};

 function abrirConexao(storeName,keyPath,autoIncrement, indexes,sucess){
    
    // create a store ("table") for the customers
   var db = new IDBStore({
      dbVersion: 2,
      storeName: storeName,
      keyPath: keyPath,
      autoIncrement: autoIncrement,
      onStoreReady: function () {
         console.log("Ready!!");
         sucess(db)
      },

      onError: function(error){
       throw error;
      },
      indexes:indexes
    });      
  }

  function refreshTable(){
    // customers.getAll(listItems);
   
  }

  var onsuccess = function(id){
    console.log('Yeah, dude updated! id still is: ' + id);
  }
  var onerror = function(error){
    console.log('Oh noes, sth went wrong!', error);
  }
  var indexMarcacao = [{ name: 'data', keyPath: 'data', unique: true, multiEntry: false }];

  return {
    all: function(sucess, error) {
      abrirConexao('marcacoes','marcacaoid', true, indexMarcacao,function (db) {
          db;
      })
    },
    add: function(marcacao) {
      abrirConexao('marcacoes','marcacaoid', true,indexMarcacao, function (db) {
          db.put(marcacao, onsuccess, onerror);
      })
      
    },
    getMarcacao : function (dia, sucess)
    {        
        abrirConexao('marcacoes','marcacaoid', true, indexMarcacao,function (db) {
          var onItem = function (item) {
            console.log('got item:', item);
            sucess(item);
          };
          var onEnd = function (item) {
            console.log('All done.');

          };

          var keyRange = db.makeKeyRange({
            lower: dia,
            upper: dia
          });
           db.iterate(onItem, {
              index: 'data',
              keyRange: keyRange,
              onEnd: onEnd
           });
        })
        
    }

  };
  
  

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
