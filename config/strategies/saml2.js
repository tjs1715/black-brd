'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  wsfedsaml2 = require('passport-wsfed-saml2').Strategy,
  url = require('url'),
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function(){
    passport.use(new wsfedsaml2(
    {
      path: '/login/callback',
      realm: 'http://mailsrv-web2.pdnt.blackbaud.com/login/callback',
      wReply: 'http://mailsrv-web2.pdnt.blackbaud.com/login/callback',
      homeRealm: '', // optionally specify an identity provider to avoid showing the idp selector
      identityProviderUrl: 'http://signin.blackbaud.com/wsfederation/action',
      identityMetadata: 'http://signin.blackbaud.com/wsfederation/metadata',
      cert: 'MIIDNzCCAh+gAwIBAgIQxYTPfpRWiJ1Lva4fkHQerTANBgkqhkiG9w0BAQ0FADAoMSYwJAYDVQQDEx1CbGFja2JhdWQgQXV0aGVudGljYXRpb24gMjAyMDAeFw0wMDAxMDEwNDAwMDBaFw0yMDAxMDEwNDAwMDBaMCgxJjAkBgNVBAMTHUJsYWNrYmF1ZCBBdXRoZW50aWNhdGlvbiAyMDIwMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAldfhPNUa/R5rxOMPDhmL1+dkB0J42xOnFxojjdQnCEnR2HEZAnnbKTgPck8th7U35+PxKNwNPgxFIe4dEgfYY9fIzBv026NPgv62ViO9Yeuf4+2H6OXxzKKHyzxYn3t8LN4zlhoUvbApIYYUBCdd4gRyrsWZUARXp02kTCAyWdzd+aJUknylvdglsWghzkNKfK76ocpCjBNu/dGBl5OI8B4K9v7JhsNVjppwg7RdshA9BSqgqibZkmaLRnO5V/J0bxGr0o0SV9wpqtCpX+j1Iag0/6VilkiSEOLtkpbLnPknMspWCmvrQha7Sgjx06gtF9PFPMXf52dLS3POCp4jkQIDAQABo10wWzBZBgNVHQEEUjBQgBAzAJMeZZJq+0Z1uoUutvYVoSowKDEmMCQGA1UEAxMdQmxhY2tiYXVkIEF1dGhlbnRpY2F0aW9uIDIwMjCCEMWEz36UVoidS72uH5B0Hq0wDQYJKoZIhvcNAQENBQADggEBACZF+RIZuBP4/hhmrwIsCA+ReOasAP2ft8mMya8JZGIa6g5tmcYGWQ/LEM9A3J4JsABxxchyPWETLKxJcBOjXIzVHi/azG98Fftsm36ogi7Zq2K4NYNHQn6k5KDGlpTICOcg+MqhJI2L9sW3m0o2Xc2s2LTBHnNmitxQqgPl7CohaWdL7AbDxGWy67nhSO5jsYEDMRwszTDNIKfHlbuoa0UPeKN7r/TTtyYH55RS8SVsNSEwrc8Og6G8Rb6UFoIyx+9zxN7NvRxX6NZhvwKvsB00hBD7CxvUI6kZ2hg2r7o3MtppAqFgWEq604OqRavZxrIEy1sdmQTKPA8Oj8EAiHI='
    },
    function(profile, done) {
      // Set the provider data and include tokens
      var providerData = profile;

      // Create the user OAuth profile
      var providerUserProfile = {
        firstName: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
        lastName: profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
        email: profile.email,
        username: profile.email,
        provider: 'blackbaud',
        providerIdentifierField: 'nameidentifier',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(null, providerUserProfile, done);
    })
  );


};
