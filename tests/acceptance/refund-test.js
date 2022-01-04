import { test } from 'qunit';
import moduleForAcceptance from 'dashboard/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | refund', {
  beforeEach() {
    let campaign = server.create('campaign');
    let entity = server.create('entity', {campaigns: [campaign] } );
    server.create('current_user', {entities: [entity], entity_admin: true});
    server.createList('donation', 5, {user: server.create('user'), donType: "cc", refundable: true});
    //server.createList('donation', 5, {user: server.create('user'), don_type: "cc", refundable: true});
  }
});

test('refunding donation', function(assert) {
  visit('/campaigns/donations');
  andThen(function() {
    assert.equal(currentURL(), '/campaigns/donations', "on donation route");
    let done = assert.async();
    server.put('/donations/:donation_id/refund.json', (db, request) => {
      let index = db.donations.all().models.map(d=> d.id.toString()).indexOf(request.params.donation_id);
      assert.notEqual(index, -1,`donation_id: ${request.params.donation_id}`);
      done();
    });
    let donationsList = find("#donations .donation");
    assert.equal(donationsList.length, 5, "five donations");
    click('.refund:first', donationsList);
    click('.refund-confirm');
  });
});
