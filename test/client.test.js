/* eslint-disable no-underscore-dangle */
import should from 'should';
import i18n from 'i18n';
import client from '../src/ffi/client_manager';
import * as helper from './helper';
import CONST from '../src/constants.json';

describe('Client', () => {
  let randomCredentials = null;
  const encodedUri = 'safe-auth:AAAAAI1br8UAAAAAAAAAAAAAAB5uZXQubWFpZHNhZmUuZXhhbXBsZXMudG' +
    'VzdC1hcHABAAAAAAAAAAAAAAAAAAAAEk5vZGVKUyBleGFtcGxlIEFwcAAAAAAAAAARTWFpZFNhZmUubmV0IEx' +
    '0ZC4AAAAAAAAAAAEAAAAAAAAAB19wdWJsaWMAAAAAAAAABQAAAAAAAAABAAAAAgAAAAMAAAAE';

  describe('Create Account', () => {
    after(() => helper.clearAccount());

    it('throws an error when account locator is empty', () => client.createAccount()
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Locator')));
      })
    );

    it('throws error when account secret is empty', () => client.createAccount('test')
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Secret')));
      })
    );

    it('throws an error when account locator is not string', () => client.createAccount(1111, 111)
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.must_be_string', i18n.__('Locator')));
      })
    );

    it('throws an error when account secret is not string', () => client.createAccount('test', 111)
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.must_be_string', i18n.__('Secret')));
      })
    );

    it('throws an error when account locator is empty string', () => client.createAccount(' ', 'test')
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Locator')));
      })
    );

    it('throws an error when account secret is empty string', () => client.createAccount('test', ' ')
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Secret')));
      })
    );

    it('sets authenticator handle when account creation is successful', () => {
      randomCredentials = helper.getRandomCredentials();
      return client.createAccount(randomCredentials.locator, randomCredentials.secret)
        .should.be.fulfilled()
        .then(() => {
          should(client.authenticatorHandle).not.be.empty();
          should(client.authenticatorHandle).not.be.null();
          should(client.authenticatorHandle).not.be.undefined();
          should(client.authenticatorHandle).be.instanceof(Buffer);
        });
    });

    it('emit network state as connected when account creation is successful', () => (
      new Promise((resolve) => {
        client.setNetworkListener((err, state) => {
          should(err).be.null();
          should(state).not.be.undefined();
          should(state).be.equal(CONST.NETWORK_STATUS.CONNECTED);
          return resolve();
        });
        helper.createRandomAccount();
      }))
    );
  });

  describe('Login', () => {
    before(() => helper.createRandomAccount()
      .then((credential) => (randomCredentials = credential))
    );

    after(() => helper.clearAccount());

    it('throws an error when account locator is empty', () => client.login()
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Locator')));
      })
    );

    it('throws an error when account secret is empty', () => client.login('test')
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Secret')));
      })
    );

    it('throws an error when account locator is not string', () => client.login(1111, 111)
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.must_be_string', i18n.__('Locator')));
      })
    );

    it('throws an error when account secret is not string', () => client.login('test', 111)
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.must_be_string', i18n.__('Secret')));
      })
    );

    it('throws an error when account locator is empty string', () => client.login('  ', 'test')
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Locator')));
      })
    );

    it('throws an error when account secret is empty string', () => client.login('test', '  ')
      .should.be.rejectedWith(Error)
      .then((err) => {
        should(err.message).be.equal(i18n.__('messages.should_not_be_empty', i18n.__('Secret')));
      })
    );

    it('sets authenticator handle when account login is successful', () => client.login(randomCredentials.locator,
      randomCredentials.secret)
      .should.be.fulfilled()
      .then(() => {
        should(client.authenticatorHandle).not.be.empty();
        should(client.authenticatorHandle).not.be.null();
        should(client.authenticatorHandle).not.be.undefined();
        should(client.authenticatorHandle).be.instanceof(Buffer);
      })
    );

    it('emit network state as connected when account login is successful', () => (
      new Promise((resolve) => {
        client.setNetworkListener((err, state) => {
          should(err).be.null();
          should(state).not.be.undefined();
          should(state).be.equal(CONST.NETWORK_STATUS.CONNECTED);
          return resolve();
        });
        helper.createRandomAccount();
      }))
    );
  });

  describe('Decrypt request', () => {
    it('throws an error when encoded URI is empty', () =>
      client.decryptRequest().should.be.rejected()
    );

    it('throws an error when Authenticator is not registered', () =>
      client.decryptRequest(encodedUri).should.be.rejected()
        .then((err) => (err.message).should.be.equal(i18n.__('unauthorised')))
    );

    it('returns a decoded request for encoded Auth request', () => (
      new Promise((resolve, reject) => {
        client.setAuthReqListener((res) => {
          should(res).not.be.undefined().and.be.Object().and.not.empty().and.have.properties(['reqId', 'authReq']);
          should(res.reqId).not.be.undefined().and.be.Number();
          should(res.authReq).be.Object().and.not.empty().and.have.properties([
            'app',
            'app_container',
            'containers',
            'containers_len',
            'containers_cap']);
          should(res.authReq.app).be.Object().and.not.empty().and.have.properties([
            'id',
            'scope',
            'name',
            'vendor']);
          should(res.authReq.app.id).not.be.undefined().and.not.be.empty().and.be.String();
          should(res.authReq.app.scope).not.be.undefined().and.be.String();
          should(res.authReq.app.name).not.be.undefined().and.not.be.empty().and.be.String();
          should(res.authReq.app.vendor).not.be.undefined().and.not.be.empty().and.be.String();
          should(res.authReq.app_container).not.be.undefined().and.be.Boolean();
          should(res.authReq.containers).not.be.undefined().and.be.Array();
          should(res.authReq.containers_len).not.be.undefined().and.be.Number();
          should(res.authReq.containers_cap).not.be.undefined().and.be.Number();

          if(res.authReq.containers_len > 0) {
            const container0 = res.authReq.containers[0];
            should(container0).be.Object().and.not.empty().and.have.properties([
              'cont_name',
              'access',
              'access_len',
              'access_cap'
            ]);
            should(container0.cont_name).not.be.undefined().and.not.be.empty().and.be.String();
            should(container0.access).not.be.undefined().and.not.be.empty().and.be.Array();
            should(container0.access_len).not.be.undefined().and.be.Number();
            should(container0.access_cap).not.be.undefined().and.be.Number();
          }
          return resolve();
        });

        client.setReqErrorListener((err) => reject(err));

        helper.createRandomAccount()
          .then(() => client.decryptRequest(encodedUri));
      })
    ))
  });
});
