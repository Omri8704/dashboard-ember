import ApplicationSerializer from './application';
export default ApplicationSerializer.extend({
  keyForAttribute(attr, method){

    const to_deserialize = ['contribute', 'donate', 'share'];
    const to_serialize = ['contribute_button', 'donate_button', 'share_button'];

    if (attr === 'has_donated') {
      return 'donated';
    }

    if (attr === 'donated') {
      return 'has_donated';
    }
    
    if (to_deserialize.includes(attr)) {
      // this adds _button for the ember model
      return `${attr}_button`;
    }else if (to_serialize.includes(attr)) {
      // this removes _button for the server
      return attr.split("_")[0];
    } else{
      return this._super(attr,method);
    }
  }
});
