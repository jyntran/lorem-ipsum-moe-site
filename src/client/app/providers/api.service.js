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
                return resp;
            }, function(error){
                //console.log('ERROR: ' + error.status + ' - ' + error.data);
                return error;
            });            
        }
    }
})();