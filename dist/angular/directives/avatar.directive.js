(function(){
	angular
		.module('thirdparty')
		.directive('avatar', function() {
			return {
				replace: true,
				template: '<img src="/assets/img/index.png">',
				link: function(scope, elem, attr) {
					scope.images = ['index.png', 'readman.png', 'england.png'];
					scope.current = 0;

					function setCurrent() {
						if (scope.current == scope.images.length-1)
							scope.current = 0;
						else
							scope.current = scope.current+1;
						return scope.current;
					}

					elem.bind('click', function() {
						attr.$set('src', '/assets/img/' + scope.images[setCurrent()]);
					});
				}
			}
		});
})();