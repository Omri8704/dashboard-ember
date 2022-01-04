import ApplicationSerializer  from './application';

export default ApplicationSerializer.extend({
  include: ["filter"],
  embed: true
});

