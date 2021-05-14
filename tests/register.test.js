// ::::::::::::::::::: TEST DIVERS ::::::::::::::::::: \\

const { runSetup } = require('./tests.setup');

const request = require("graphql-request").request;
const host = require('./test.configs');

// ::::::::::::::::::: REGISTER TEST CONFIG ::::::::::::::::::: \\
const User = require('../src/entities/User');


const email = "testuser1@test.com";
const usrName = "TestUser1";
const password = "tester1";

const registerMutation = `
	mutation { 
		register(email:"${email}", usrName:"${usrName}", password:"${password}")
	}
`;

// @TEST
test('Register New User', async () => {

	// Run Test Setup
	await runSetup();

	const response = await request(host, registerMutation)
	expect(response).toEqual({ register: true });

	const users = await User.find({ email: email});
	const user = users[0];

	// #RULE Only one user with this email
	expect(users).toHaveLength(1);
	// #RULE Email matches signup
	expect(user.email).toEqual(email);

	// #RULE No plaintext passwords
	expect(user.password).not.toEqual(password);
});