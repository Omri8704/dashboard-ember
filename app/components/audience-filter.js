import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  computed,
  inject,
  get
} = Ember

export default Component.extend({
  changedFilters: false,
  mailingFilter: null,
  settings: inject.service(),
  anyAll: ['any', 'all'],
  scopeHash: {
    "event": "Restrict this email to only prospects associated with this Event",
    "campaign": "Restrict this email to only prospects associated with this Campaign",
    "entity": "Send this email to all of your Prospects"
  },

  scopeFilters: computed("mailingFilter", "mailingFilter.scope", "mailingFilter.mailing.promotion", function(){
    return [ this.scopeHash["entity"], this.scopeHash[ (this._isEventPromotion() ? 'event' : 'campaign' ) ] ];
  }),

  renderedFilterComponents: [],

  tags: computed("settings.current_entity.tags", function() {
    if (this.get("settings.current_entity.tags")) {
      return this.get("settings.current_entity.tags");
    }
    else {
      return []
    }
  }),

  init() {
    this._super(...arguments);
    this.toggleProperty("changedFilters")
    this.set("newAttr", {
        name: null,
        value: null,
        options: this._validAttrOptions( null )
    })
    if( this.get('mailingFilter.scope') === 'entity' ){
      this.showDates = true
    }
  },

  _validAttrOptions( attr ){
    if( attr === "ticket_level" && this.get('mailingFilter.scope') === 'event' ){
      let ticketLevels = this.get("mailingFilter.mailing.promotion.ticketLevels")
      return ticketLevels.map( (row) => { return row.get("name"); });
    }else{
      return ['yes', 'no'];
    }
  },

  _isEventPromotion(){
    let promo = this.get("mailingFilter.mailing.promotion")
    return ( promo && ( promo.content.constructor.modelName === 'event' ) );
  },

  // returns the all the attributes minus the already picked ones
  nonPickedAttributes: computed("changedFilters", 'mailingFilter.scope', function(){
    const allAttrs = this.allFilterAttributes(this.get("mailingFilter"))
    const pickedAttrs = this.pickedFilterAttributes()
    return allAttrs.filter(x => pickedAttrs.indexOf(x) < 0 );
  }),

  // returns the all the attributes currently assigned to the mailing
  // as an array of strings
  pickedFilterAttributes(){
    const mailingFilter = this.get("mailingFilter")
    const props = this.allFilterAttributes(mailingFilter)
    const attributes = mailingFilter.getProperties(props)
    return props.filter( (prop) => { if (attributes[prop]) { return prop } })
  },

  // returns all the picked attributes in an array of objects
  pickedFilterAttributesFormatted: computed('mailingFilter', 'changedFilters', 'mailingFilter.scope', function(){
    const mailingFilter = this.get("mailingFilter")
    return this.pickedFilterAttributes().map( (attr) => {
      return {
        name: attr,
        value: get(mailingFilter, attr),
        options: this._validAttrOptions( attr )
      }
    })
  }),

  // returns all the filter attributes by name, in an array of strings
  allFilterAttributes(mailingFilter) {
    const excludedAttrs = [
      "mailing_id", "entity_id", "any_all",
      "scope", "tags", "start_date", "end_date"
    ];
    const eventAttrs = ["registered", "ticket_level"];
    const emailFiltersNotWork = ["contribute_button", "donate_button", "share_button",
                                 "carousel", "facebook", "email" , "twitter", "sms"];
    let filterAttrs = []

    if( this.get('mailingFilter.scope') === 'event' ){
      return eventAttrs
    }else{
      mailingFilter.eachAttribute( (attr) => {
        if ( !excludedAttrs.includes(attr) && !eventAttrs.includes(attr) &&
         !emailFiltersNotWork.includes(attr) ){
          filterAttrs.push(attr)
        }
      })
      if( this.get('mailingFilter.scope') !== 'event' && this._isEventPromotion() ){
        filterAttrs.push("registered")
      }
      return filterAttrs
    }
  },

  selectedScopeText: computed('mailingFilter.scope', function(){
    return this.scopeHash[ get(this, 'mailingFilter.scope') ]
  }),

  _addFilter: function(attr, value){
    // set the new filter attribute
    this.set(`mailingFilter.${attr}`, value)
    // update the formatted filter attributes
    this.toggleProperty("changedFilters")
    this.set('newAttr.name', null)
    this.set('newAttr.value', null)
  },

  actions: {
    changeFilter(oldAttribute, newAttribute, option) {
      // remove the old attribute on the mailing filter
      this.set(`mailingFilter.${oldAttribute}`, null)
      // set the attribute on the mailing filter
      this.set(`mailingFilter.${newAttribute}`, option)
      // update the formatted filter attributes
      this.toggleProperty("changedFilters")
    },

    addFilter(attr, value) {
      this._addFilter(attr, value)
    },

    deleteFilter(attr) {
      // un-set the mailingFilter attribute
      this.set(`mailingFilter.${attr}`, null)
      // update the formatted filter attributes
      this.toggleProperty("changedFilters")
      this.renderedFilterComponents.removeObject(attr)
    },

    selectNewFilter(oldAttribute, newAttribute, option) {
      // set the attribute on the mailing filter
      this.set('newAttr.name', newAttribute)
      this.set('newAttr.value', option)
      this.set('newAttr.options', this._validAttrOptions( newAttribute ) )
    },

    dateFrom(date) {
      this.set('mailingFilter.start_date', moment(date).toISOString() );
    },

    dateTo(date) {
      this.set('mailingFilter.end_date', moment(date).toISOString() );
    },

    scopeSelected(scope) {
      if ( scope.toLowerCase().indexOf("campaign") >= 0 ){
        this.showDates = false
        this.set('mailingFilter.scope', 'campaign');
      }else if ( scope.toLowerCase().indexOf("event") >= 0 ){
        this.showDates = false
        this.set('mailingFilter.scope', 'event');
      }else{
        this.showDates = true
        this.set('mailingFilter.scope', 'entity');
      }

      this.mailingFilter.reset()
    }
  }
});
