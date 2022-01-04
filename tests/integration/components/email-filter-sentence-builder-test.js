import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('email-filter-sentence-builder', 'Integration | Component | email filter sentence builder | ready', {
  integration: true
});

test('Builds sentence with attributes, start date', function(assert) {
  let filterObject = Ember.Object.create({
    scope: 'campaign',
    donated: 'yes',
    contribute_button: 'no',
    start_date: "2016-02-09T08:00:00.000Z"
  });

  this.set('campaignFilter', filterObject);
  this.render(hbs`{{email-filter-sentence-builder filter=(readonly campaignFilter)}}`);

  let text = this.$('span').text().trim();
  // spacing missing between some words because of how .text() behaves, best way to make
  // the string testable
  assert.equal(text,
    `Search within all users where a participanthas donated orhas not clicked the contribute buttonfrom 02/09/2016 to todayinside this campaign`,
    `Sentence for filter attrs, tags, start date`
  );
});


test('Builds sentence with attributes, tags, end date', function(assert) {
  let filterObject = Ember.Object.create({
    scope: 'campaign',
    donated: 'yes',
    contribute_button: 'no',
    end_date: "2016-02-09T08:00:00.000Z"
  });

  this.set('campaignFilter', filterObject);
  this.render(hbs`{{email-filter-sentence-builder filter=(readonly campaignFilter)}}`);

  let text = this.$('span').text().trim();
  // spacing missing between some words because of how .text() behaves, best way to make
  // the string testable
  assert.equal(text,
    `Search within all users where a participanthas donated orhas not clicked the contribute buttonuntil 02/09/2016inside this campaign`,
    `Sentence for filter attrs, tags, end date`
  );
});

test('Builds sentence with attributes, tags, start date, and end date', function(assert) {
  let filterObject = Ember.Object.create({
    scope: 'campaign',
    donated: 'yes',
    contribute_button: 'no',
    tags: ['wildling', 'Lannisters'],
    start_date: "2016-02-09T08:00:00.000Z",
    end_date: "2016-02-18T08:00:00.000Z"
  });

  this.set('campaignFilter', filterObject);
  this.render(hbs`{{email-filter-sentence-builder filter=(readonly campaignFilter)}}`);

  let text = this.$('span').text().trim();
  // spacing missing between some words because of how .text() behaves, best way to make
  // the string testable
  assert.equal(text,
    `Search within all users where a participanthas donated orhas not clicked the contribute buttonorhas tag wildling orhas tag Lannistersfrom 02/09/2016 to 02/18/2016inside this campaign`,
    `Sentence for filter attrs, tags, start date, end date`
  );
});
