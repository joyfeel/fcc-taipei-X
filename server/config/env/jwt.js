export default {
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpiresIn: '600 days',
    emailTokenExpiresIn: '1 days',
    OAuth2TokenExpiresIn: '1 days',
  },
}
