/**
 * Created by kwhatcher on 4/15/2016.
 */

window.config = {
    bucket:         'ares.kerryhather.com',
    folder_prefix:  '',
    role:           'arn:aws:iam::150179862823:role/ares-auth0',  // AWS role arn
    principal:      'arn:aws:iam::150179862823:saml-provider/auth0-provider', // AWS saml provider arn
    domain:         'kerryhatcher.auth0.com',                // Auth0 domain
    clientID:       'L77XIIPdRp2Ut7mjG0enQGSgZmyc4bYg', // Auth0 app client id
    targetClientId: 'L77XIIPdRp2Ut7mjG0enQGSgZmyc4bYg' // Auth0 AWS API client id
};
