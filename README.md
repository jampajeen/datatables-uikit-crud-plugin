# datatables-uikit-crud-plugin

jQuery plugin for [datatables.js with UIKit styling](https://datatables.net/examples/styling/uikit.html)

![example-img](https://dl.dropboxusercontent.com/u/68317444/datatables-uikit-add2.png)


![example-img2](https://dl.dropboxusercontent.com/u/68317444/datatables-uikit-add.png)

#### Features
  * Custom top-right button for create new record.
  * Custom top-right refresh button.
  * Modal dialog for "Add", "Edit", "View".
  * Support for server-side data only.
  
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
    columns: [ // this is normal datatables columns usage
        {
            "data": "userId",
            "visible": false
        }, 
        {
            "data": "username"
        }, 
        {
            "data": "email"
        }, 
        {

            "data": "activated"
        }, 
        {

            "data": "clientId"
        }, 
        {
            "data": "authorityList",
            orderable: false
        }
    ],
    customSearchParams: { // search parameter for serverside processing
        s_fromdate: '',
        s_todate: '',
        s_category: '',
        s_status: '',
        s_location: '',
        s_keyword: ''
    },
    dataUrl: VH_APP_CONTEXT + '/users/datatables', // URL for request records to show in table
    onClickEdit: function(data) {
        // after click edit button
    },
    onClickView: function(data) {
        // after click view button
    },
    onClickAdd: function() {
        // after click create button
    },
    onSubmitAdd: function(data) {
        // do ajax post to server
    },
    onSubmitEdit: function(data) {
        // do ajax post to server
    }
});
```

*** You can see full completed example in test/index.html

See also official [UIKit website](http://getuikit.com/)

