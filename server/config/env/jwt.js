export default {
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpiresIn: '3 days',
    emailTokenExpiresIn: 60 * 60,
    OAuth2TokenExpiresIn: '1 days'
  }
}
