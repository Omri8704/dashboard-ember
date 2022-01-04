import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  classNames: ['filter-selector'],
  attributeBindings: ["value", "selected"],
  onChange: (function() {
    var dataSets, newData;
    newData = this.$().val();
    dataSets = this.get("dataSets");
    return this.set('data', dataSets[newData]);
  }).on('change'),
  types: (function() {
    var dataSets, o;
    dataSets = this.get("dataSets");
    o = [];
    if (dataSets) {
      Object.keys(dataSets).forEach((function(_this) {
        return function(dataset) {
          var i;
          i = {};
          i["key"] = dataset;
          i["value"] = _this.toTitleCase(dataset.replace(/_/g, " ").replace(/total/g, ""));
          return o.push(i);
        };
      })(this));
      return o;
    }
  }).property('dataSets'),
  toTitleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
});

