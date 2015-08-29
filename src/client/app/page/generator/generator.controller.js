(function(){
    'use strict';

    angular
        .module('generator')
        .controller('GeneratorCtrl', GeneratorCtrl);

    function GeneratorCtrl(ApiService){
        var vm = this;

        vm.config = {
            w: 8,
            s: 6,
            p: 3
        };
        vm.result;

        vm.submit = submit;

        init();
        /////

        function init() {}

        function submit() {
            ApiService.get(vm.config)
            .then(function(resp){
                vm.result = resp;
            }, function(error){
                console.log('ERROR with accessing API')
            })
        }
    }
})();