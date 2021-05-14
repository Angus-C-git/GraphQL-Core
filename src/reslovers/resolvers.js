const bcrypt = require('bcryptjs');
const User = require("../entities/User");

const resolvers = {
	Query: {
		hello: (_, { name }) => `Hello ${name || 'World'}`,
	},

	Mutation: {
		// TODO: Validate schema
		register: async (_, { usrName, email, password }) => {
			// Hash password with 10 len salt
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({
				usrName: usrName,
				email: email,
				password: hashedPassword,
			});

			const writeUser = await user.save();
			if (!writeUser)
				console.error("[>>] Failed to save new User to DB");

			return true;
		}
	}
}

module.exports = resolvers;