# datatables-uikit-crud-plugin

jQuery plugin for [datatables.js with UIKit styling](https://datatables.net/examples/styling/uikit.html) 

![example-img](https://github.com/jampajeen/datatables-uikit-crud-plugin/blob/master/doc/datatables-uikit-add2.png?raw=true)


![example-img2](https://github.com/jampajeen/datatables-uikit-crud-plugin/blob/master/doc/datatables-uikit-add.png?raw=true)

#### Features
  * Custom top-right button for create new record.
  * Custom top-right refresh button.
  * Modal dialog for "Add", "Edit", "View" event.
  * Support for server-side data only.
  * Easy & simple for UI customization.
  
#### Installation
```
bower install datatables-uikit-crud-plugin
```

#### Usage
Include plugin
```
<script type="text/javascript" src="vh.datatables.js"></script>
```  

Create html table template
```  
<table id="users-list-table" class="uk-table uk-table-hover uk-table-striped" cellspacing="0" width="100%">
...
</table>
```  

Create html add, edit, view template
```  
<div id="form-modal-add" class="uk-modal">
	<form class="uk-form uk-form-horizontal">
    	<div class="uk-modal-dialog">
		...
		</div>
    </form>
</div>
...
<div id="form-modal-edit" class="uk-modal">
	<form class="uk-form uk-form-horizontal">
		<div class="uk-modal-dialog">
        ...     
		</div>
    </form>
</div>
...
<div id="form-modal-view" class="uk-modal">
	<form class="uk-form uk-form-horizontal">
       	<div class="uk-modal-dialog">
    	...              
   		</div>
	</form>
</div>
```  

Create plugin object
```
var mytable = $('#users-list-table').vhDataTables({
    columns: [ 
    	// this is normal datatables.js columns binding 
    ],
    customSearchParams: { 
    	// custom search parameters used for serverside processing
    },
    dataUrl: '/users/datatables', // URL for request records to show in table
    onClickEdit: function(data) {
        // click edit button
    },
    onClickView: function(data) {
        // click view button
    },
    onClickAdd: function() {
        // click create button
    },
    onSubmitAdd: function(data) {
        // do ajax post to server
    },
    onSubmitEdit: function(data) {
        // do ajax post to server
    }
});
```

*** You can see completed example in test/index.html

See also official [UIKit website](http://getuikit.com/)

