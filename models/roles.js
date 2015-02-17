//	C = CREATE, R = READ, U = UPDATE, D = DELETE
	
	//	Provider Access gives CRUD on the services provided BY THEM ONLY
var provider_access 	= ['CRUD'],
	user_access			= ['R'],
	//	CRUD+ is a special permission to include administrator relative activities
	admin_access		= ['CRUD+'],
	//	'_' is meant to fetch the roles dynamically which means depending on the 
	//	bought services a developer could have bought.
	developer_access	= ['_'];