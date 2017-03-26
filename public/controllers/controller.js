var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http){

var refresh = function(){
	$http.get('/contact').then(function(response){
		console.log(response);
		$scope.contacts = response.data;

		console.log($scope.contacts);
		
		
	});
};

refresh();
	$scope.submit = function(){
		console.log($scope.contact);
		$http.post('/contact', $scope.contact).then(function(response){
			console.log(response);
			refresh();
			$scope.contact = null;
			refresh();
		});
	};

		$scope.delete = function(id){
		console.log(id);
		$http.delete('/contact/' + id).then(function(response){
			
			refresh();
			
		});
	};


	$scope.edit = function(id){
		$http.get('/contact/' + id).then(function(response){
			console.log(response);
			$scope.update = response.data;
		});

		$scope.updat = function(){
			console.log($scope.update._id);

			$http.put('contact/' + $scope.update._id, $scope.update).then(function(response){
				refresh();
			});
		};
	};

// 	$scope.login = function(){
// 		console.log($scope.contacts.length);

// var log = document.getElementById('user').value;

// console.log(log);

// for (var i=0; i<=$scope.contacts.length; i++) {
		

// 		if(log == $scope.contacts[i].name){
// 			console.log("true");
// 		window.location = "http://www.google.com";
// 		}else{
// 			console.log("login failed");
// 		}
// 	};

// 	};
	
	
});

