import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  ajax(url, type, hash) {
    return this._super(url, type, hash);
  },
  ajaxOptions(url, type, options) {
    if(!options || !options.formData) {
      return this._super(url, type, options);
    }
    else {
      const data = options.data
      const hash = this._super(url, type, options);
      hash.data = data
      hash.processData = false;
      hash.contentType = false;
      return hash;
    }
  }
});
