/* http://stackoverflow.com/a/20056060/2383984 */
(function(){
	angular
		.module('thirdparty')
		.directive('animateOnChange', function($animate,$timeout) {
			return function(scope, elem, attr) {
				scope.$watch(attr.animateOnChange, function(nv,ov) {
					if (nv!=ov) {
						var c = 'change';
						$animate.addClass(elem,c).then(function() {
							$timeout(function() {$animate.removeClass(elem,c);});
						});
					}
				});
			}
		});
})();