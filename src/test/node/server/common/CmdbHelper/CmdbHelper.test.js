const include = require('nodejs-require-enhancer').include;
var chai = require('chai');
var path = require('path');
const jp = require('jsonpath');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
var CmdbHelper = include('/src/main/node/server/common/CmdbHelper.js');

describe('CmdbHelper: readFromYaml', function() {
  it('should work', function() {
    var cmdbHelper = new CmdbHelper();
    var cmdb = cmdbHelper.readFromYaml(path.join(__dirname,"test.yaml"));
    console.log(JSON.stringify(cmdb, null, 4));    
    expect(cmdb.nodes.length).to.equal(4);
    expect(cmdb.links.length).to.equal(3);

    //nodes

    var acmeApi = jp.value(cmdb, '$.nodes[?(@.name=="acme-api")]')
    expect(acmeApi.position).to.equal(0);
    expect(acmeApi.dependencies.includes("acme-db")).to.equal(true);
    expect(acmeApi.dependencies.includes("acme-security")).to.equal(true);

    var acmeWeb = jp.value(cmdb, '$.nodes[?(@.name=="acme-web")]')
    expect(acmeWeb.position).to.equal(1);
    expect(acmeWeb.dependencies.includes("acme-api")).to.equal(true);

    var acmeDb = jp.value(cmdb, '$.nodes[?(@.name=="acme-db")]')
    expect(acmeDb.position).to.equal(2);
    expect(acmeDb.dependencies).to.equal(null);

    var acmeSecurity = jp.value(cmdb, '$.nodes[?(@.name=="acme-security")]')
    expect(acmeSecurity.position).to.equal(3);
    expect(acmeSecurity.dependencies).to.equal(null);

    //links

    var link1 = jp.value(cmdb, '$.links[?(@.source==0 && @.target==2)]')
    expect(link1.type).to.equal("depends");

    var link1 = jp.value(cmdb, '$.links[?(@.source==0 && @.target==3)]')
    expect(link1.type).to.equal("depends");

    var link1 = jp.value(cmdb, '$.links[?(@.source==1 && @.target==0)]')
    expect(link1.type).to.equal("depends");
    

    
  });
});
