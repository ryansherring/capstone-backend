const bcrypt = require('bcryptjs');
const db = require('../models');

/* Post Register - Create new User */
const signup = (req, res) => {
	console.log(req.body)
	if (!req.body.name || !req.body.email || !req.body.password) {
	  return res.status(400).json({
		status: 400,
		message: 'Please enter your name, email and password'
	  });
	}
	// Verify Account Does Not Already Exist
	db.User.findOne({ email: req.body.email }, (err, foundUser) => {
	  if (err)
		return res.status(500).json({
		  status: 500,
		  message: 'Something went wrong. Please try again'
		});
  
	  if (foundUser)
		return res.status(400).json({
		  status: 400,
		  message: 'Email address has already been registered. Please try again'
		});
  
	  // Generate Salt
	  bcrypt.genSalt(10, (err, salt) => {
		if (err)
		  return res.status(500).json({
			status: 500,
			message: 'Something went wrong. Please try again'
		  });
  
		// Hash User Password
		bcrypt.hash(req.body.password, salt, (err, hash) => {
		  if (err)
			return res.status(500).json({
			  status: 500,
			  message: 'Something went wrong. Please try again'
			});
  
		  const newUser = {
			name: req.body.name,
			email: req.body.email,
			password: hash
		  };
  
		  db.User.create(newUser, (err, savedUser) => {
			if (err) return res.status(500).json({ status: 500, message: err });
			res.sendStatus(201);
		  });
		});
	  });
	});
};

/* Post Login - Check if User Matches credentials */
const login = (request, response) => {
	db.User.findOne({ email: request.body.email }, (error, foundUser) => {
		if(error) return response.status(500).json({message: 'Something went wrong', error: error});
		if(!foundUser) return response.status(400).json({message: 'User does not exist'});
		bcrypt.compare(request.body.password, foundUser.password, (error, isMatch) => {
			if(error) return response.status(500).json({message: "Something went wrong", error: error});
			if(isMatch) {
			  request.session.currentUser = {
			  	id: foundUser._id,
			  	name: foundUser.name,
			  	email: foundUser.email
			  };
			  const responseObj = {
			  	status: 200,
			  	data: foundUser._id,
			  	requestedAt: new Date().toLocaleString(),
			  	message: 'Success',
			  }
				return response.status(200).json(responseObj);
			} else {
				return response.status(400).json({message: 'Username/password is incorrect'});
			}
		})
	})
};

/* Get - Verify session of logged in User */
const verify = (request, response) => {
	if(!request.session.currentUser) {
		return response.status(401).json({message: 'Unauthorized'})
	}
	response.status(200).json({message: `Current user verified. User ID: ${request.session.currentUser.id}`})
};

/* Delete - Delete Session */
const logout = (request, response) => {
	if(!request.session.currentUser) return response.status(401).json({ messsage: 'Unauthorized'})
	request.session.destroy(error => {
		if(error) return response.status(500).json({message: 'Something went wrong. Please try again'});
		response.sendStatus(200);
	})
};

module.exports = {
	signup,
	login,
	verify,
	logout,
}