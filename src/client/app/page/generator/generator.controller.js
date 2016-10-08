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

        vm.isLoading = false;

        vm.submit = submit;

	vm.copy = copy;
	vm.copied = false;

        init();
        /////

        function init() {}

        function submit() {
            vm.isLoading = true;
            vm.error = null;
            ApiService.get(vm.config)
            .then(function(resp){
                vm.isLoading = false;
                if (resp.status != 200) {
                    vm.error = resp;
                    if (!ngDialog.isOpen('modal-error'))
                        ngDialog.open({
                            template: '/src/client/app/layout/modal.error.template.html',
                            closeByDocument: false
                        });
                } else {
                    vm.result = resp.data;
		    vm.copied = false;
                }
            }, function(error){
                vm.isLoading = false;
                console.log('An error has occurred!');
            })
        }

	function copy() {
	    vm.copied = true;
	}
    }
})();
