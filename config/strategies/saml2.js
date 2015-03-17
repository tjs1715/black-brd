'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  wsfedsaml2 = require('passport-wsfed-saml2').Strategy,
	User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new wsfedsaml2(
    {
      path: '/login/callback',
      realm: 'urn:node:app',
      homeRealm: '', // optionally specify an identity provider to avoid showing the idp selector
      identityProviderUrl: 'https://bbauth-signin-cdev.blackbaudhosting.com/wsfederation/metadata',
      cert: 'MIIDFjCCAf6gAwIBAgIQDRRprj9lv5RBvaQdlFltDzANBgkqhkiG9w0BAQUFADAvMS0wKwYDVQQDEyRhdXRoMTAtZGV2LmFjY2Vzc2NvbnRyb2wud2luZG93cy5uZXQwHhcNMTEwOTIxMDMzMjMyWhcNMTIwOTIwMDkzMjMyWjAvMS0wKwYDVQQDEyRhdXRoMTAtZGV2LmFjY2Vzc2NvbnRyb2wud2luZG93cy5uZXQwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCEIAEB/KKT3ehNMy2MQEyJIQ14CnZ8DC2FZgL5Gw3UBSdRb9JinK/gw7yOQtwKfJUqeoZaUSAAdcdbgqwVxOnMBfWiYX7DGlEznSfqYVnjOWjqqjpoe0h6RaOkdWovDtoidmqVV1tWRJFjkj895clPxkLpnqqcycfXtSdZen0SroGyirD2mhMc9ccLbJ3zRnBNjlvpo5zow1zYows09tNC2EhGROL/OS4JNRQnJRICZC+WkA7Igf3xb4btJOzIPYhFiqCGrd/81CHmAyEuNzyc60I5yomDQfZ91Eb5Uk3F7mlfAlYB2aZwDwldLSOlVE8G1E5xFexF/5KyPC4ShNodAgMBAAGjLjAsMAsGA1UdDwQEAwIE8DAdBgNVHQ4EFgQUyYfx/r0czsPgTzitqey+fGMQpkcwDQYJKoZIhvcNAQEFBQADggEBAB5dgQlM3tKS+/cjlvMCPjZH0Iqo/Wxecri3YWi2iVziZ/TQ3dSV+J/iTyduN7rJmFQzTsNERcsgyAwblwnEKXXvlWo8G/+VDIMh3zVPNQFKns5WPkfkhoSVlnZPTQ8zdXAcWgDXbCgvdqIPozdgL+4l0W0XVL1ugA4/hmMXh4TyNd9Qj7MWvlmwVjevpSqN4wG735jAZFHb/L/vvc91uKqP+JvLNj8tPFVxatzi56X1V8jBM61Hx1Z9D0RCDjtmcQVysVEylW9O6mNy6ZrhLm0q5yecWudfBbTKDqRoCHQRjrMU2c5q/ZFDtgjLim7FaNxFbgTyjeRCPclEhfemYVg='
    },
    function(profile, done) {
      return done('not implemented scott');
    })
  );
};
