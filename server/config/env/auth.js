export default {
  fb: {
      clientID: 'dd',
      clientSecret: 'de',
      callbackURL: 'http://localhost:3000/home',
      profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
      passReqToCallback: true,
      requireState: false,
      scope: 'email',
      authorizationURL: 'http://localhost:3000/home'
  },
  google: {
    //         524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com
    clientID: '524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com',
    //clientSecret: 'AIzaSyAGd8mJk_fUYl00tKqpmOQCRjMEXU5Ln6I',
    //u8yj8r01dKIExw-al9OEigYU
    clientSecret: 'u8yj8r01dKIExw-al9OEigYU',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  github: {
    clientID: '52d9761ea3e15038b823',
    clientSecret: '4b6bb3901c66d0f97ddcc707afa92d0c02e4ff3e',
    callbackURL: 'http://localhost:3000/auth/github/oauth2callback'
  }
}
/*
{
	"web":{
		"client_id":"524481294139-03nll8r7ohb5hnb94m89jdtj8b319svc.apps.googleusercontent.com",
		"project_id":"fcc-taipei-x",
		"auth_uri":"https://accounts.google.com/o/oauth2/auth",
		"token_uri":"https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
		"client_secret":"u8yj8r01dKIExw-al9OEigYU"
	}
}
*/
