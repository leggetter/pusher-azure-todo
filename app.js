$(function() {

	//// Configure the MobileServiceClient to communicate with your mobile service by
    //// uncommenting the following code and replacing AppUrl & AppKey with values from  
    //// your mobile service, which are obtained from the Windows Azure Management Portal.
	//// Do this after you add a reference to the Mobile Services client to your project.
    var MobileServiceClient = WindowsAzure.MobileServiceClient,
		client = new MobileServiceClient('https://pusher-azure-todo.azure-mobile.net/', 'AFkyeKECemqKAsDJQLmwNoOzPflsRe81'),
        todoItemTable = client.getTable('todoitem');

	// TODO: Comment-out the following lines of code used for in-memory data.
	// var itemCount = 0;
	// var staticItems = [];
	// End of code to comment-out.

    // TODO: Uncomment the following method. 
    function refreshTodoItems() {

		// var query = todoItemTable;
		var query = todoItemTable.where({ complete: false });

		query.read().then(function(todoItems) {
			listItems = $.map(todoItems, function(item) {
				return $('<li>')
					.attr('data-todoitem-id', item.id)
					.append($('<button class="item-delete">Delete</button>'))
					.append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
					.append($('<div>').append($('<input class="item-text">').val(item.text)));
			});
				   
			$('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
			$('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
		});
	}

	
	//// TODO: Comment-out the following method.
	// function refreshTodoItems() {
 //        var todoItems = staticItems;

 //        var listItems = $.map(todoItems, function(item) {
	// 		if(item.complete !== true){
	// 			return $('<li>')
	// 				.attr('data-todoitem-id', item.id)
	// 				.append($('<button class="item-delete">Delete</button>'))
	// 				.append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
	// 				.append($('<div>').append($('<input class="item-text">').val(item.text)));
	// 		}
	// 	});
		
 //        $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
 //        $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
 //    }

    function getTodoItemId(formElement) {
        return Number($(formElement).closest('li').attr('data-todoitem-id'));
    }

	// Handle inserts.
    
	// TODO: Uncomment the following event hander. 
    $('#add-item').submit(function(evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });
	
	// TODO: Comment-out the following event handler.
  //   $('#add-item').submit(function(evt) {
  //       var textbox = $('#new-item-text'),
  //           itemText = textbox.val();
  //       if (itemText !== '') {
		
		// staticItems.push({id: itemCount, text: itemText, complete: false});
		
		// itemCount ++;	
		// refreshTodoItems();            
  //       }
  //       textbox.val('').focus();
  //       evt.preventDefault();
  //   });

    // Handle updates.
	
	// TODO: Uncomment the following event handlers. 
	$(document.body).on('change', '.item-text', function() {
			var newText = $(this).val();
			todoItemTable.update({ id: getTodoItemId(this), text: newText });
		});

		$(document.body).on('change', '.item-complete', function() {
			var isComplete = $(this).prop('checked');
			todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems);
		});

	// TODO: Comment-out the following event handlers.	
  //   $(document.body).on('change', '.item-text', function() {
  //       var newText = $(this).val(),
  //           id = getTodoItemId(this);
		// 	staticItems[id].text = newText;        
			
		// 	refreshTodoItems();
  //   });

  //   $(document.body).on('change', '.item-complete', function() {
  //       var isComplete = $(this).prop('checked'),
  //           id = getTodoItemId(this);
  //       staticItems[id].complete = true;
		
		// refreshTodoItems();
  //   });

    // Handle deletes.
	
	// TODO: Uncomment the following event handler. 	 
	$(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems);
    });
	
	// TODO: Comment-out the following event handlers.	
  //   $(document.body).on('click', '.item-delete', function () {
  //       var id = getTodoItemId(this) ;
  //       staticItems.splice(id, 1);
		
		// refreshTodoItems();
  //   });

    // On initial load, start by fetching the current data
    refreshTodoItems();
});