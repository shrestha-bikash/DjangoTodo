function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
var AddTodo = React.createClass({
	//to show the todo list at the starting of the page
	getTodo: function (){
		$.ajax({
			url: '/api/',
			dataType: 'json',
			method: 'GET',  

			success: function(data){
				for (var i=0; i<data.length; i++){
					 var id = data[i].id
					// console.log(id)
					var job = data[i].todo_job;
					if (data[i].completed){
						$("#showCheck").prepend("<tr>"+"<td style='text-decoration: line-through;' >"+job+"</td>"+"<td>"+"<a href='/deletetodo/"+id+"'" + " class= 'btn " + "btn-danger'"+"role='button'" +">"+"Delete"+"</a>"+"</td>"+"</tr>");
					}
					else{
						$("#showUncheck").prepend("<tr>"+"<td>"+job+"</td>"+"<td>"+"<a href='/deletetodo/"+id+"'" + " class= 'btn " + "btn-danger'"+"role='button'" +">"+"Delete"+"</a>"+"</td>"+"<td>"+"<a href='/checktodo/"+id+"'" + " class= 'btn " + "btn-success'"+"role='button'" +">"+"Check"+"</a>"+"</td>"+"</tr>");
					}
					
				}
				
			}.bind(this),

			error: function (xhr, status, err){
				
				console.error("http://localhost:8000", status, err.toString());
			}.bind(this)
		});
	},
	//to add new todo to the database
	addTodo: function (){
		
		var self = this;
		var date = new Date();
		date = date.toISOString();

		var sendData = {todo_job: $('#addTodoTags').val(), completed: "false", created_date: date};
		
		$.ajax({
			url: '/api/',
			dataType: 'json',
			method: 'POST',
			data: sendData,  

			beforeSend: function(xhr, settings) {
		        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
		            xhr.setRequestHeader("X-CSRFToken", csrftoken);
		        }
		    },

			success: function(data){
				
				console.log(data.id)
				$("#showUncheck").prepend("<tr>"+"<td>"+data.todo_job+"</td>"+"<td>"+"<a href='/deletetodo/"+data.id+"'" + " class= 'btn " + "btn-danger'"+"role='button'" +">"+"Delete"+"</a>"+"</td>"+"<td>"+"<a href='/checktodo/"+data.id+"'" + " class= 'btn " + "btn-success'"+"role='button'" +">"+"Check"+"</a>"+"</td>"+"</tr>");
				
			}.bind(this),

			error: function (xhr, status, err){
				
				console.error("http://localhost:8000", status, err.toString());
			}.bind(this)
		});
	},

	render: function (){
		this.getTodo();
		var addTodoBody = <div className="col-md-6">
							  <h2>Todos</h2>
							  <br/>
							  <label>Job: </label>
							  <textarea className="form-control" id="addTodoTags" rows="1" required></textarea><br/>
							  
							  <button className="btn btn-primary" onClick={this.addTodo} >Add</button>
							  <br/><hr/>

							  <div>
							  	<h2>Todo Items</h2><br/>
							  	<table className="table">
					            <thead>
					              <tr>
					                <th>Todo Items</th>
					                <th>Delete</th>
					                <th>Check</th>
					              </tr>
					            </thead>
						  		<tbody id="showUncheck">
              					
            					</tbody>
            					</table>
            					<br/>

							  	<h2>Checked Items</h2>
							  	
							  	<table className="table">
					            <thead>
					              <tr>
					                <th>Checked Items</th>
					                <th>Delete</th>

					               
					              </tr>
					            </thead>
						  		<tbody id="showCheck">
              					
            					</tbody>
            					</table>
						  	  </div>
						  </div>

						  
		return (

			<div>
				<TodoComponent body={addTodoBody} />
			</div>
		)
	}

});

var TodoComponent = React.createClass({
	render: function (){
		return (
				<div className="row">

					<div className="col-md-3"></div>
					{this.props.body}
					<div className="col-md-3"></div>
					<br/>
					


				</div>

		)
	}


});

ReactDOM.render(
	<AddTodo />,
	document.getElementById('content')
);
