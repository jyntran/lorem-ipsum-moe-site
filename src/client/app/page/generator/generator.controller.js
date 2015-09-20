(function(){
    'use strict';

    angular
        .module('generator')
        .controller('GeneratorCtrl', GeneratorCtrl);

    function GeneratorCtrl(ApiService, ngDialog){
        var vm = this;

        vm.config = {
            w: 8,
            s: 6,
            p: 3,
            format: 'json'
        };
        vm.result;

        vm.submit = submit;

        init();
        /////

        function init() {}

        function submit() {
            vm.error = null;
            ApiService.get(vm.config)
            .then(function(resp){
                if (resp.status != 200) {
                    vm.error = resp;
                    if (!ngDialog.isOpen('modal-error'))
                        ngDialog.open({
                            template: '/src/client/app/layout/modal.error.template.html',
                            closeByDocument: false
                        });
                } else {
                    vm.result = resp.data;                    
                }
            }, function(error){
                console.log('An error has occurred!');
            })
        }
    }
})();