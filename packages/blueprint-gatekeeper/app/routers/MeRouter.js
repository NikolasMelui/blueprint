var blueprint = require ('@onehilltech/blueprint')
  , auth      = require ('../../lib').auth
  ;

var passport  = blueprint.app.server.middleware.passport;
passport.use (auth.bearer ());

module.exports = exports = {
  // Define the different account routes. We are going to protect all routes
  // under the /accounts base uri.
  '/me' : {
    use: [
      passport.authenticate('bearer', {session: false})
    ],
  },

  '/me/notifications': {
    post : {action: 'MeController@setPushNotificationToken'},
  },
};