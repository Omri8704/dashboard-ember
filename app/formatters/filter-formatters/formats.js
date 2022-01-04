const TRUE_FILTER_VALUE = 'yes';
const FALSE_FILTER_VALUE = 'no';

export class Formatter {
  constructor(attr) {
    this._attr = attr;
    this._formattedTrue = 'has done action';
    this._formattedFalse = 'has not done action';
    this._formatted = ( val ) => { return 'has ' + val; }
  }

  format(value) {
    if (value === TRUE_FILTER_VALUE) {
      return this._formattedTrue;
    }else if( value === FALSE_FILTER_VALUE) {
      return this._formattedFalse;
    }else{
      return this._formatted( value );
    }
  }
}

export class nullFormatter extends Formatter {}

export class donatedFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has donated';
    this._formattedFalse = 'has not donated';
  }
}

export class opensFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has opened';
    this._formattedFalse = 'has not opened';
  }
}

export class clicksFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has clicked on the email button';
    this._formattedFalse = 'has not clicked on the email button';
  }
}

export class contribute_buttonFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has clicked the contribute button';
    this._formattedFalse = 'has not clicked the contribute button';
  }
}

export class donate_buttonFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has clicked the donate button';
    this._formattedFalse = 'has not clicked the donate button';
  }
}

export class share_buttonFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has clicked the share button';
    this._formattedFalse = 'has not clicked the share button';
  }
}

export class carouselFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has clicked the carousel';
    this._formattedFalse = 'has not clicked the carousel';
  }
}

export class facebookFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has shared via facebook';
    this._formattedFalse = 'has not shared via facebook';
  }
}

export class twitterFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has shared via twitter';
    this._formattedFalse = 'has not shared via twitter';
  }
}

export class smsFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has shared via text';
    this._formattedFalse = 'has not shared via text';
  }
}

export class registeredFormatter extends Formatter {
  constructor() {
    super();
    this._formattedTrue = 'has registered for this event';
    this._formattedFalse = 'has not registered for this event';
  }
}

export class ticketLevelFormatter extends Formatter {
  constructor() {
    super();
    this._formatted = (val) => { return 'has purchased a(n) ' + val + ' ticket'; }
  }
}
