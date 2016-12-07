(function() {
    'use strict';

    angular
        .module('app')
        .factory('todoFactory', todoFactory);

    todoFactory.$inject = ['$http'];

    /* @ngInject */
    function todoFactory($http) {
        var service = {
            create: create,
            getAll: getAll,
            getById: getById,
            update: update,
            remove: remove
        };
        return service;

        ////////////////

        function create(todo) {
        	return $http.post('http://localhost:60945/api/todoes', todo);
        }
        function getAll() {
        	return $http.get('http://localhost:60945/api/todoes');

        }
        function getById(id) {
        	return $http.get('http://localhost:60945/api/todoes/' + id);

        }
        function update(id, todo) {
        	return $http.put('http://localhost:60945/api/todoes/' + id, todo);

        }
        function remove(id) {
        	return $http.delete('http://localhost:60945/api/todoes/' + id);

        }
    }
})();