import $ from 'jquery';

$.ajaxSetup({
	beforeSend(xhr, options){
		if(options.url.match(/api.parse.com/)) {
			xhr.setRequestHeader('X-Parse-Application-Id', 'pBJg8JZ9YQbPSJFOOBKeR2DbHTK5wZedUL0WomUo' );
			xhr.setRequestHeader('X-Parse-REST-API-Key', '4zpIfEBIyQ3OGVXo7zzfHkGH8EfKYW9eLU0cKJQ7' )
		}
	}
})