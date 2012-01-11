/*
 * authentication-test.js: Tests for pkgcloud Rackspace compute authentication
 *
 * (C) 2010 Nodejitsu Inc.
 *
 */

var vows = require('vows'),
    assert = require('../../helpers/assert'),
    macros = require('../macros'),
    helpers = require('../../helpers');

var testData = {},
    client = helpers.createClient('rackspace', 'compute');

vows.describe('pkgcloud/rackspace/compute/authentication').addBatch({
  "The pkgcloud Rackspace compute client": {
    "should have core methods defined": macros.shouldHaveCreds(client),
    "the getVersion() method": {
      topic: function () {
        client.getVersion(this.callback);
      },
      "should return the proper version": function (versions) {
        assert.isArray(versions);
        assert.isFalse(versions.length == 0);
      }
    },
    "the auth() method": {
      "with a valid username and api key": macros.shouldAuthenticate(client),
      "with an invalid username and api key": macros.shouldNotAuthenticate('compute')
    }
  }
}).addBatch({
  "The pkgcloud Rackspace compute client": {
    "the getLimits() method": {
      topic: function () {
        client.getLimits(this.callback);
      },
      "should return the proper limits": function (limits) {
        assert.isNotNull(limits);
        assert.include(limits, 'absolute');
        assert.include(limits, 'rate');
        assert.isArray(limits.rate);
      }
    }
  }
}).export(module);
