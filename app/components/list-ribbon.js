import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    this.setWrapperWidth();
    $().find(".left-button").click(function() {
      return $('.list-view-campaigns').animate({
        scrollLeft: "-=200"
      });
    });
    return $().find(".right-button").click(function() {
      return $('.list-view-campaigns').animate({
        scrollLeft: "+=200"
      });
    });
  },
  classNames: ['list-ribbon'],
  setWrapperWidth: (function() {
    var width;
    width = this.get('filteredModel').length * $().find('.campaign').outerWidth();
    return $('.list-wrapping-container').width(width);
  }).observes('filteredModel.length'),
  filter: "",
  filteredModel: (function() {
    var filter, model, rx;
    filter = this.get("filter");
    rx = new RegExp(filter, "gi");
    model = this.get("model");
    return model.filter(function(item) {
      var description, name;
      if (item.get("name")) {
        name = item.get("name").match(rx);
      }
      if (item.get("description")) {
        description = item.get("description").match(rx);
      }
      return name || description;
    }).splice(0, 52);
  }).property("filter", "model", "model.length")
});
