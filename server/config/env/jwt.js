export default {
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtTokenExpiresIn: '3 days',
    emailTokenExpiresIn: 60 * 60    
  }
}
