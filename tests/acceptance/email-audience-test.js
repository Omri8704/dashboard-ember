import { test } from 'qunit';
import moduleForAcceptance from 'dashboard/tests/helpers/module-for-acceptance';
import Page from 'dashboard/tests/pages/email';

moduleForAcceptance('Acceptance | email audience');

test('go through the email creation process', function(assert) {
  // create 5 emails
  server.createList('mailing', 5, {completed_steps: [], filter: server.create("filter")});

  // go to list of emails
  Page.visitIndex()
  andThen( () => {
    assert.equal( currentURL(), '/emails')
    assert.equal( find(".emails-list tr").length, 5, 'should be a list of 5 emails')
  });

  // go to first email
  Page.firstEmailBtn()

  andThen( () => {
    assert.equal( currentURL(), '/emails/1/audience', 'is on the first email\'s page')
    assert.ok( Page.audienceContainer("PROMOTING"), 'page has promotion option')
    assert.ok( Page.audienceContainer("EMAIL LIST"), 'page has user segment option') //assert.notOk( Page.audienceContainer("Filter your List"), 'page does not have filtering options')
  })

  // pick a promotion

  // pick a user segment

  // pick some filtering options

  // go to the template step

  // pick a template

  // go to the compose message step
  // pick all the final stuff here.
  // save and finalize.

});
