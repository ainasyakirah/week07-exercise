let users;
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");
const saltRounds = 10;
let encryptedPassword;

class User {
	static async injectDB(conn) {
    	users = await conn.db("WEEK07").collection("users")
  	}
	
	//Password hashing by using bycrypt
  	static async register(username, password) {
		bcrypt.genSalt(saltRounds, function (saltError, salt) {
			if (saltError) {
				throw saltError
			} else {
				bcrypt.hash(password, salt, function(hashError, hash) {
			  	if (hashError) {
					throw hashError
			  	} else {
					encryptedPassword=hash;
					console.log("Hash:",hash);
			  	}
				})
			}
			})

   		// TODO: Check if username exists
		return users.findOne({       
			 'username': username,
			  'password' : password,
			
			}).then(async user =>{
			if (user) {
				if ( user.username == username )
				{
					return "username already existed";
				}
			}
			  else{

   		// TODO: Save user to database
   		await users.insertOne({      
    		'username' : username,
    		'password' : password,
			'encrypt'  : encryptedPassword
   		})
   			return "new user registered";
  			}
   		}) 
		//return user;
	}
 
  	static async login(username, password) {
   		// TODO: Check if username exists
   		const user = await users.findOne({        
  			$or:[{'username': username},
			{'password': password}]  
   		}).then(async user =>{

   		// TODO: Validate password,username
  		if (user) {
			if(user.username != username && user.password == password){
				return "wrong username";
		  	} 
			  
			else if(user.username == username && user.password != password){
				return "invalid password";
		 	}

			// TODO: Return user object
    		else{
    			return user;
    		}
  		}

		else{
   			return "Error";
  		}		
   		})
		
		return user
  	}
}

module.exports = User;