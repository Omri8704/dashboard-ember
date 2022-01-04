import {
  create,
  clickable,
  contains,
  text,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),
  visitIndex: visitable('/emails'),
  visitFirstEmail: visitable('/emails/1/audience'),
  firstEmailBtn: clickable('.emails-list .email-link:first'),
  promotion: text('[data-test="promotion"]'),
  audienceContainer: contains('[data-test="audienceContainer"]')

});
