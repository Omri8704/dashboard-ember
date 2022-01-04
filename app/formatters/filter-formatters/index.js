import {
  nullFormatter,
  donatedFormatter,
  opensFormatter,
  clicksFormatter,
  contribute_buttonFormatter,
  donate_buttonFormatter,
  share_buttonFormatter,
  carouselFormatter,
  facebookFormatter,
  twitterFormatter,
  smsFormatter,
  registeredFormatter,
  ticketLevelFormatter
} from './formats';

/*
  import a formatter class that has the string response for a true or false value
  to add additional formatters create a formatter with the name (filter_attr)Formatter
  import the class and add it to the classFormatters object
 */
export function formatFilter(attributeName, attributeValue) {
  const className = attributeName + 'Formatter';

  // to dynamically create a class, we wrap the formatter class into a formatting object
  const classFormatters = {
    undefinedFormatter:         nullFormatter,
    nullFormatter:              nullFormatter,
    donatedFormatter:           donatedFormatter,
    opensFormatter:             opensFormatter,
    clicksFormatter:            clicksFormatter,
    contribute_buttonFormatter: contribute_buttonFormatter,
    donate_buttonFormatter:     donate_buttonFormatter,
    share_buttonFormatter:      share_buttonFormatter,
    carouselFormatter:          carouselFormatter,
    facebookFormatter:          facebookFormatter,
    twitterFormatter:           twitterFormatter,
    smsFormatter:               smsFormatter,
    registeredFormatter:        registeredFormatter,
    ticket_levelFormatter:      ticketLevelFormatter
  }

  try {
    const klass = new classFormatters[className];

    return klass.format(attributeValue);
  }
  catch(e) {
    if (e == 'TypeError: classFormatters[className] is not a function') {
      Error(`Undefined Formatter for ${className} requested, make sure to create a formatter class and add it to the classFormatters object silly`);
      return;
    }
    else {
      throw new Error(e);
    }

  }
}
