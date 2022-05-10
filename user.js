let users;

class User {
  static async injectDB(conn) {
    users = await conn.db("WEEK07").collection("users")
  }

  static async register(username, password) {

   // TODO: Check if username exists
   // used CRUD insert
  	return users.findOne({        
  
   'username': username,    
   }).then(async user =>{
  	if (user) {
   		if ( user.username == username )
   		{
    		return "username already existed";
   		}
	}
  	
	else
  	{
		  
   	// TODO: Save user to database
   	await users.insertOne({      
    	'username' : username,
    	'password' : password
   })
   	
   	return "new user registered";
  	}
   	}) 
}
 
  	static async login(username, password) {
   	// TODO: Check if username exists
   	return users.findOne({        
  
   	'username': username   
   	}).then(async user =>{

   	// TODO: Validate password
  	if (user) {
    
    	if(user.password!=password){
      		return "invalid password";
    		}
    	else{

   	// TODO: Return user object
    	return user;
    }
  	}
  	
	else{
   		return "login succesful";
  	}
   })
  }
 }
 
 module.exports = User;