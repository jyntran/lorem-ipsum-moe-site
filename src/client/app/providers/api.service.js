(function(){
    'use strict';

    angular
        .module('api')
        .factory('ApiService', ApiService);

    function ApiService($http){
        var service = {
            get: get
        }
        return service;

        /////

        function get(params) {
            return $http.get('/api/get', {params: params})
            .then(function(resp){
                return resp.data;
            }, function(error){
                console.log('ERROR: get()')
                console.log(error)
            });            
        }
    }
})();