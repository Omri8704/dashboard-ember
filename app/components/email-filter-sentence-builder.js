import Ember from 'ember';
import moment from 'moment';
import { formatFilter } from '../formatters/filter-formatters/index';

export default Ember.Component.extend({
  filterProperties: Ember.computed('filter', {
    get(){
      const filterProps = this.get('filter').getProperties(
        'donated',
        'opens',
        'clicks',
        'contribute_button',
        'donate_button',
        'share_button',
        'carousel',
        'facebook',
        'email',
        'twitter',
        'sms',
        'registered',
        'ticket_level'
      );

      return Object.keys(filterProps);
    }
  }),

  model: Ember.computed(
    'filter.donated',
    'filter.opens',
    'filter.clicks',
    'filter.contribute_button',
    'filter.donate_button',
    'filter.share_button',
    'filter.carousel',
    'filter.facebook',
    'filter.email',
    'filter.twitter',
    'filter.sms',
    'filter.scope',
    'filter.any_all',
    'filter.tags.[]',
    'filter.start_date',
    'filter.end_date',
    'filter.registered',
    'filter.ticket_level',
    {
      get() {
        let model = this.get('filter').getProperties(
          'donated',
          'opens',
          'clicks',
          'contribute_button',
          'donate_button',
          'share_button',
          'carousel',
          'facebook',
          'email',
          'twitter',
          'sms',
          'scope',
          'any_all',
          'tags',
          'start_date',
          'end_date',
          'registered',
          'ticket_level'
        );

        if( model.scope === 'campaign' ) model.promotionScope = 'this campaign';
        else if( model.scope === 'event' ) model.promotionScope = 'this event';
        else model.promotionScope = 'any promotion';

        let mailing = this.get("mailing");
        model.userScope = 'all users';
        if( mailing && mailing.userSegment && mailing.userSegment.name ) model.userScope = mailing.userSegment.name + ' email list';


        let attrs = this.get("filterProperties");

        let formattedAttrs = [];

        attrs.map( (attr) => {
          if (model[attr]) {
            formattedAttrs.push(formatFilter(attr, model[attr]));
          }
        });

        model.formattedAttrs = formattedAttrs;
        model.formattedAnyAll = model.any_all === 'all' ? 'and' : 'or';

        model.formattedStartDate = moment(model.start_date).format('MM/DD/YYYY');
        model.formattedEndDate = moment(model.end_date).format('MM/DD/YYYY');

        return model;
      }
  })
});
