const bcrypt = require('bcryptjs');
const yup = require('yup');

const User = require("../../entities/User");
const schemaValidationError = require('../../utils/schemaValidationError');
const errorMessages = require('./error-constants');

const registerSchema = yup.object().shape({
	username: yup.string()
		.min(3)
		.max(255),
		// .required(),
	email: yup.string()
		.min(6, errorMessages.emailMinLength)
		// .required()
		.max(255, errorMessages.emailMaxLength)
		.email(errorMessages.emailInvalid),
	password: yup.string()
		.min(8, errorMessages.passwordMinLength)
		.max(255),
		// .required(),
});


const resolvers = {
	Query: {
		hello: (_, { name }) => `Hello ${name || 'World'}`,
	},

	Mutation: {
		register: async (_, args) => {

			// Validate the schema
			try {
				// Show all errors
				await registerSchema.validate(args, { abortEarly: false });
			} catch (err) {
				//console.error(`[>>] Register :: ${err}`);
				return schemaValidationError(err);
			}

			const { email, username, password } = args;
			// Only one user with constants username and email allowed
			const userExists = await User.findOne({email: email}, '_id');

			if (userExists) {
				return [
					{
						relation: "email",
						message: errorMessages.emailInUse
					}
				];
			}


			// Hash password with 10 len salt
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new User({
				username: username,
				email: email,
				password: hashedPassword,
			});

			const writeUser = await user.save();
			if (!writeUser)
				console.error("[>>] Failed to save new User to DB");

			/**
			 * Send confirmation email stub
			 * */
			// await generateConfirmationEmail();

			return [
				{
					relation: "register",
					message: "success"
				}
			];
		}
	}
}


module.exports = resolvers;