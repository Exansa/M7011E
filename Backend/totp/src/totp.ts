import speakeasy from 'speakeasy';

export const generate = (
	username: string
): { secret: string; otpath_url: string } => {
	const secret = speakeasy.generateSecret({
		name: 'M7011E: ' + username,
		issuer: 'BITTRA'
	});
	return { secret: secret.base32, otpath_url: secret.otpauth_url ?? '' };
};

export const verify = (secret: string, totp: string): boolean => {
	const validates = speakeasy.totp.verify({
		secret: secret,
		encoding: 'base32',
		token: totp,
		window: 6
	});
	return validates;
};
