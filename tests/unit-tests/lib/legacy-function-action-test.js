const LegacyFunctionAction = require ('../../../lib/legacy-function-action')
  , expect = require ('chai').expect
  ;

function legacyNoCallback (req, res) {
  res.status (200);
}

function legacyWithCallback (req, res, callback) {
  res.status (300);
  callback (null);
}

describe ('lib | LegacyFunctionAction', function () {
  context ('create()', function () {
    it ('should create an AbstractAction', function () {
      let action = new LegacyFunctionAction ({action: legacyNoCallback});

      expect (action).to.be.instanceof (LegacyFunctionAction);
      expect (action).to.have.property ('action').is.a ('function')
    });
  });

  context ('doRequest()', function () {
    context ('no callback', function () {
      it ('should execute the doRequest method', function (done) {
        let req = {};

        let res = {
          status (n) {
            this._status = n
          }
        };

        let action = new LegacyFunctionAction ({action: legacyNoCallback});

        action.doRequest (req, res).then (() => {
          expect (res).to.have.property ('_status', 200);
          done (null);

        }).catch (reason => done (reason));
      });
    });

    context ('callback', function () {
      it ('should execute the doRequest method', function (done) {
        let req = {};

        let res = {
          status (n) {
            this._status = n
          }
        };

        let action = new LegacyFunctionAction ({action: legacyWithCallback});

        action.doRequest (req, res).then (() => {
          expect (res).to.have.property ('_status', 300);
          done (null);

        }).catch (reason => done (reason));
      });
    });
  });
});
