import Ember from 'ember';

const {
  Component,
  inject,
  get,
  set
} = Ember;

export default Component.extend({
  settings: inject.service(),
  init() {
    this._super(...arguments);
    this.setOpenOnInit()
  },
  setOpenOnInit() {
    // on each route that is in a subnav,
    // I am setting the settings.currentSubnav on `Init`
    // the value must be the same string as the text value on its prospective
    // subnav
    // ie. if this component's text attribute is "emails"
    // every route in this subnav must inject the settings service and
    // set its currentSubnav property to "emails" on the route's init method.
    let subnav = get(this, "settings.currentSubnav")
    let open = subnav === get(this, "text")
    let regex = get(this, "openRegex" )

    if( !open && regex ){
      open = get(this, "settings.currentPath").match( new RegExp(regex, "i") ) !== null
    }
    set(this, "subNavOpen", open)
  },
  tagName: "li",
  icon: "fa-file",
  text: "link",
  subNavOpen: false,
  openRegex: null,
  classNameBindings: ['subNavOpen:open'],
  actions: {
    toggleSubNav() {
      this.set("subNavOpen", !this.get("subNavOpen"))
    }
  }
});
