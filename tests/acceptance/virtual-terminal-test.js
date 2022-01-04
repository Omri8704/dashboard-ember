import { test, skip } from 'qunit';
import moduleForAcceptance from 'dashboard/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | VirtualTerminal | ready',{
  beforeEach() {
    let campaign = server.create('campaign');
    let entity = server.create('entity', {campaigns: [campaign] } );
    server.create('current_user', {entities: [entity], entity_admin: true});
  }
});


test('visiting /virtual-terminal', function(assert) {
  visit('campaigns/virtual-terminal');
  andThen(() => assert.equal(currentURL(), 'campaigns/virtual-terminal'));
})

skip('visiting /virtual-terminal and making donation', function(assert) {
  visit('/virtual-terminal');

  let donation_params = {
    "amount": 1234,
    "campaign_id": "1",
    "card_code": "123",
    "card_expiration": "12/22",
    "card_number": "4242424242424242",
    "cause_names": null,
    "causes_allocation_hash": "{}",
    "check_number": null,
    "created_at": null,
    "don_type": "cc",
    "interval": null,
    "note": null,
    "occurrences": null,
    "public": true,
    "refundable": false,
    "status": null,
    "user": {
      "address": {
        "address1": "1234 1st ave w",
        "address2": null,
        "cell_phone": null,
        "city": "seattle",
        "country": "united states",
        "region": "wa",
        "zip": "98022"
      },
      "email": "something@example.com",
      "entity_id": null,
      "external_id": null,
      "first_name": "john",
      "image": "//placehold.it/150x150",
      "last_name": "doe",
      "mailing_id": null,
      "prospect_id": null,
      "provider": null,
      "user_id": null
    }
  };
  let done = assert.async();

  server.post('/donations.json', (db, request) => {
    let params = JSON.parse(request.requestBody).donation;
    assert.deepEqual(params, donation_params );
    done();
  });
  fillIn('.select-campaign select', '1');
  fillIn('.select-donation-type select', donation_params.don_type);
  fillIn('.donation-amount input', donation_params.amount);
  triggerEvent('.donation-amount input', 'blur');
  fillIn('.first-name input', donation_params.user.first_name);
  fillIn('.last-name input', donation_params.user.last_name);
  fillIn('.email input', donation_params.user.email);
  fillIn('.company input', 'inc');
  fillIn('.address1 input', '1234 1st ave w');
  triggerEvent('.address1 input', 'blur');
  fillIn('.city input', 'seattle');
  triggerEvent('.city input', 'blur');
  fillIn('.region input', 'wa');
  triggerEvent('.region input', 'blur');
  fillIn('.zip input', 98022);
  triggerEvent('.zip input', 'blur');
  fillIn('.country input', 'united states');
  triggerEvent('.country input', 'blur');
  fillIn('.card-number input', donation_params.card_number);
  triggerEvent('.card-number input', 'blur');
  fillIn('.card-expiration input', donation_params.card_expiration);
  triggerEvent('.card-expiration input', 'blur');
  fillIn('.card-code input', donation_params.card_code);
  triggerEvent('.card-code input', 'blur');
  click('.save-donation');
  click('.confirm-save-donation');

});
