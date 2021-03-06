/*
 * Copyright (c) 2018 One Hill Technologies, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require ('path');
const { expect } = require ('chai');

const blueprint = require ('../../../lib');

describe ('lib | ApplicationModule', function () {
  describe ('configure', function () {
    it ('should load an application module into memory', function () {
      const app = blueprint.app;

      expect (app.module.resources).to.have.nested.property ('controllers.main');
      expect (app.module.resources).to.have.nested.property ('controllers.namespace-user');
      expect (app.module.resources).to.have.nested.property ('controllers.user');

      expect (app.module.resources).to.have.nested.property ('listeners.blueprint\\.app\\.init');

      expect (app.module.resources).to.have.nested.property ('models.person');
      expect (app.module.resources).to.not.have.nested.property ('models.-options');
      expect (app.module.resources).to.not.have.nested.property ('models.options');

      expect (app.module.resources).to.have.nested.property ('policies.identity');

      expect (app.module.resources).to.have.nested.property ('services.cart');
      expect (app.module.resources).to.have.nested.property ('services.shopping-cart');

      expect (app.module.resources).to.have.nested.property ('routers.main');
      expect (app.module.resources).to.have.nested.property ('routers.users');
      expect (app.module.resources).to.have.nested.property ('routers.inner.main');
    });
  });

  describe ('viewsPath', function () {
    it ('should get the viewPaths property', function () {
      let app = blueprint.app;
      expect (app.module.viewsPath).to.equal (path.join (app.appPath, 'views'));
    });
  });

  describe ('hasViews', function () {
    it ('should test if the module has views', function () {
      let app = blueprint.app;
      expect (app.module.hasViews).to.be.true;
    });
  });

  describe ('lookup', function () {
    context ('string', function () {
      it ('should lookup an entity', function () {
        let app = blueprint.app;
        let controller = app.module.lookup ('controller:main');

        expect (controller).to.equal (app.module.resources.controllers.main);
      });
    });

    context ('array', function () {
      it ('should lookup an entity', function () {
        let app = blueprint.app;
        let controller = app.module.lookup (['controller', 'main']);

        expect (controller).to.equal (app.module.resources.controllers.main);
      });
    });
  });
});