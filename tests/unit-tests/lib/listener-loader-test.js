const {expect} = require ('chai');
const ListenerLoader = require ('../../../lib/listener-loader');
const messaging = require ('../../../lib/messaging');
const path = require ('path');

describe ('lib | ListenerLoader', function () {
  describe ('load', function () {
    it ('should load listeners', function () {
      const dirname = path.resolve (__dirname, '../../dummy/app/listeners');

      let app = { messaging: messaging () };
      let loader = new ListenerLoader ({app});

      return loader.load ({dirname}).then (results => {
        expect (results).to.have.property ('blueprint.app.init').that.has.keys (['echo','legacy']);

        expect (app.messaging)
          .to.have.property ('messengers')
          .to.have.property ('_')
          .to.have.property ('_listeners')
          .to.have.property ('blueprint.app.init')
          .to.have.property ('_on')
          .to.have.length (2);
      });
    });
  })
});