import { moduleForModel, test, skip } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('donation', 'Unit | Model | donation', {
  // Specify the other units that are required for this test.
  needs: [
    'model:entity', 'model:donation', 'model:user', 'model:current-user',
    'model:cause', 'model:invitation', 'model:campaign',
    'model:campaign_image', 'model:campaign_video', 'model:address',
    'model:contact', 'validator:presence', 'validator:ds-error',
    'validator:number', 'validator:conditional-don-type',
    'validator:card-number', 'validator:length', 'validator:format']
});

test('it exists', function(assert) {
  var donation;
  donation = this.subject();
  return assert.ok(!!donation);
});

skip('it saves', function(assert) {

  const donation = this.subject();
  const store = this.store();

  Ember.run(function() {

    //const current_user = store.find('current_user').then((response)=>{
      //return  response.firstObject;
    //});

    const address = store.createRecord('address');

    address.setProperties({
      address1: "1234 1st ave",
      city: 'seattle',
      region: 'washington',
      zip: '98103',
      country: 'United States'
    });

    const user = store.createRecord('user');

    user.setProperties({
      first_name: 'John',
      last_name: 'doe',
      email: 'john@example.com',
      address: address
    });

    const campaign = store.createRecord('campaign');

    donation.setProperties({
      card_number: '4242424242424242',
      card_expiration: '12/22',
      card_code: '123',
      amount: 123,
      note: 'this is a note',
      campaign: campaign,
      user: user
    });
  });
  return assert.ok(!!donation);
});

