import Ember from 'ember';

const { set, get } = Ember

export default Ember.Component.extend({
  init() {
    this._super(...arguments)
    set(this, "loading", true)
    if(!this.spreedlyLoaded()) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://core.spreedly.com/iframe/iframe-v1.min.js'
      script.setAttribute("data-spreedly-loaded", "true");
      $('head').append(script)
    }
  },

  runValidation: false,
  loading: true,
  expirationError: false,
  cvvError: false,
  cardNumberError: false,
  observeValidation: Ember.observer('runValidation', function() {
    if (get(this, 'runValidation') == true) {
      this.handleValidation()
    }
  }),

  didInsertElement() {
    this.spreedlyCheckInterval = setInterval(() => {
      if(this.spreedlyLoaded()) {
        clearInterval(get(this, "spreedlyCheckInterval"));
        this.initSpreedlyForm();
      }
    }, 500);
  },

  willDestroyElement() {
    set(this, 'loading', false)
    clearInterval(get(this, "spreedlyCheckInterval"))
    if(this.spreedlyLoaded()) {
      Spreedly.removeHandlers();
    }
  },

  spreedlyLoaded() {
    return !!window.Spreedly
  },

  generateStyling() {
    Spreedly.setLabel("number", "Card Number");
    Spreedly.setLabel("cvv", "CVV");

    const inputStyles = 'width: 100%;  height: 2.5em; border-radius: 2px; ' +
      'border: 1px solid #e2e2e2; font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;' +
      'padding-left: 5%; font-size: 14px; color: #333; box-sizing: border-box;'

    Spreedly.setStyle("number", inputStyles);
    Spreedly.setStyle("cvv", inputStyles);
    Spreedly.setNumberFormat("prettyFormat");
  },

  handleValidation() {
    Spreedly.validate()
  },

  resetErrors(){
    this.setProperties({
      expirationError: false,
      cvvError: false,
      cardNumberError: false,
    })
  },

  initSpreedlyForm() {
    Spreedly.init(get(this, 'spreedlyKey'), {
      numberEl: "spreedly-number",
      cvvEl: "spreedly-cvv"
    });

    Spreedly.on('ready', this.spreedlyReady.bind(this));
  },

  spreedlyReady() {
    this.generateStyling()
    set(this, "loading", false);

    Spreedly.on('errors', this.spreedlyErrors.bind(this));
    Spreedly.on('validation', this.spreedlyValidation.bind(this));
    Spreedly.on('paymentMethod', this.spreedlyPaymentMethod.bind(this));
  },

  spreedlyValidation(inputProperties) {
    const { validCvv, validNumber } = inputProperties

    if (validCvv && validNumber) {
      this.handleSubmit()
    }
    else {
      this.afterFailedSubmit()
      this.setProperties({
        cvvError: !validCvv,
        cardNumberError: !validNumber
      })
    }
  },

  spreedlyErrors(errors) {
    const formatted = errors.reduce( (prev, err) => {
      prev[err.attribute] = err.message

      return prev
    }, {})
    this.afterFailedSubmit();

    if (formatted['year']) {
      set(this, 'expirationError', true)
    }
  },

  spreedlyPaymentMethod(token) {
    this.resetErrors()
    this.afterSpreedlyValidation(token)
  },

  handleSubmit() {
    const {
      spreedlyKey,
      first_name,
      last_name,
      card_expiration,
      address,
      city,
      state,
      zip,
      country,
      phone,
    } = this.getProperties(
      'spreedlyKey',
      'first_name',
      'last_name',
      'card_expiration',
      'address',
      'city',
      'state',
      'zip',
      'country',
      'phone',
    )

    const [month, year] = card_expiration.split('/')

    Spreedly.tokenizeCreditCard({
      environment_key: spreedlyKey,
      first_name,
      last_name,
      month,
      year: `20${year}`,
      address1: address,
      city,
      state,
      zip,
      country,
      phone_number: phone
    });
  },

});
