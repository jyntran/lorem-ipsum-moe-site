(function(){
    'use strict';

    angular
        .module('routing', ['ui.router'])
        .config(routes);

    function routes($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/src/client/app/page/generator/generator.view.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/src/client/app/page/about/about.view.html'
            })
            .state('docs', {
                url: '/docs',
                templateUrl: '/src/client/app/page/documentation/documentation.view.html'
            });
    }

})();