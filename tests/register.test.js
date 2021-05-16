// ::::::::::::::::::: INIT DIVERS ::::::::::::::::::: \\

const { runSetup } = require('./drivers/tests.setup');

const request = require("graphql-request").request;
const host = require('./drivers/test.configs').host;

// ::::::::::::::::::: REGISTER TEST VARS ::::::::::::::::::: \\
const User = require('../src/entities/User');

const email = "testuser1@test.com";
const usrName = "TestUser1";
const password = "tester1";

// @Query
const registerMutation = `
	mutation { 
		register(email:"${email}", usrName:"${usrName}", password:"${password}") {
			relation
			message
		}
	}
`;


// @TEST
test('Register New User', async () => {

	// Run Test Setup
	await runSetup();

	const registerResponse = await request(host, registerMutation);
	expect(registerResponse.register[0].message).toEqual("success");

	const users = await User.find({ email: email});
	const user = users[0];

	// #RULE Only one user with this email
	expect(users).toHaveLength(1);
	// #RULE Email matches signup
	expect(user.email).toEqual(email);
	// #RULE No plaintext passwords
	expect(user.password).not.toEqual(password);


	const duplicateRegister = await request(host, registerMutation);
	expect(duplicateRegister.register).toHaveLength(1);

	// #RULE no duplicate users
	expect(duplicateRegister.register[0].relation).toEqual("email");
});