(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['todoFactory'];

    /* @ngInject */
    function HomeController(todoFactory) {
        var vm = this;
        vm.things = [];
        vm.addThing = addThing;

      activate();

      ///////////////

      function activate() {
        todoFactory
            .getAll()
            .then(function(response) {
              vm.things = response.data;
              console.log(vm.things);

        
            });
      }
      vm.classSort = classSort;
      vm.revClassSort = revClassSort;
      vm.textSort = textSort;
      vm.selectToDo = selectToDo;
      vm.deleteSelected = deleteSelected;
      vm.typeSort = '';
      vm.newId = 0;
      vm.getClass = getClass;
      vm.updateSelected = updateSelected;
      vm.updatePriority = updatePriority;


        function addThing() {

          var obj = {
            name: vm.newThing, 
            priority: vm.newPriority
          }

          todoFactory
              .create(obj)
              .then(function(response) {
                vm.things.push(response.data);
                
                console.log(obj);
              })
              .catch(function(error) {
                console.log('error');
              });

              vm.newThing = '';
          
        };
       
        
        function classSort() {
          vm.typeSort = 'priority';
        }
        function revClassSort() {
          vm.typeSort = '-priority';
        }
        function textSort() {
          vm.typeSort = 'name';
        }

        function selectToDo(todo) {
          vm.selectedToDo = todo;
          console.log('goodbye');
        }

        function deleteSelected(obj) {
          todoFactory
              .remove(obj.id)
              .then(function(response) {
                vm.index = vm.things.indexOf(obj);
                vm.things.splice(vm.index, 1);
                
                console.log(obj);
              })
              .catch(function(error) {
                console.log('error');
              });
          
        }
        function updateSelected(obj) {
          obj.name = vm.changeName;
          todoFactory
            .update( obj.id, obj)
            .then(function(response) {

            });
        }



        function getClass(obj) {
        switch (obj.priority) {
            case 1:
              return "list-group-item-danger"
              
              break;
            case 2:
              return "list-group-item-warning"
             
              break;
            case 3:
              return "list-group-item-info"
            
              break;
            default:
              return "list-group-item-info"
              
            }
          }



      }
})();




// list-group-item-danger
// list-group-item-info
// list-group-item-warning