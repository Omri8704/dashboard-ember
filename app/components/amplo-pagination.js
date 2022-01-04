import Ember from 'ember';

const {
  Component,
  computed,
  set,
  get
} = Ember

export default Component.extend({
  init() {
    this._super(...arguments)
    // if current page is set use it, else set to 0
    //const currentPage = this.get("currentPage")
  },
  limit: null,
  offset: 0,
  count: 0,
  currentPage: null,
  totalPages: computed("count", "limit", function(){
    return  Math.ceil(get(this, "count") / get(this, "limit"))
  }),
  lastPage: computed("offset", "limit", "count", function(){
    const max = get(this, "limit") + get(this, "offset")
    return max >= get(this, "count")
  }),
  _currentPage: computed("offset", "limit", function() {
    return  Math.floor(get(this, "offset") / get(this, "limit"))
  }),
  pageLinks: computed('_currentPage', 'totalPages', function(){
    const totalPages = this.get('totalPages')
    const currentPage = this.get('_currentPage')
    const pagesDisplayed = 5

    if (totalPages === 0){
      return [{ pageNumber: 0, active: true}]
    }

    let pagesArray = [];

    for (let i = 0; i < totalPages; i++ ) {
      pagesArray.push({
        pageNumber: i,
        active: currentPage === i,
      })
    }

    if (totalPages > pagesDisplayed) {
      let pagesToBeRendered = [];
      let positionArray = [2,1,0,-1,-2]

      if (currentPage === 0) {
        positionArray = [0,-1,-2,-3,-4]
      }

      if (currentPage === 1) {
        positionArray = [1,0,-1,-2,-3]
      }

      if (currentPage === totalPages) {
        positionArray = [4,3,2,1,0]
      }

      if (currentPage === totalPages - 1) {
        positionArray = [3,2,1,0,-1]
      }

      const maxPageLength = pagesArray.length - 1

      positionArray.forEach((index) => {
        const pageNumber = currentPage - index

        if (pageNumber <= maxPageLength) {
          pagesToBeRendered.push(pagesArray[currentPage - index])

        }
      })

      return pagesToBeRendered
    }
    else{
      return pagesArray
    }

  }),
  actions: {
    previousPage() {
      this.decrementProperty("offset", get(this, "limit"))
      this.sendAction("action", this.get("offset") )
    },
    nextPage() {
      this.incrementProperty("offset", get(this, "limit"))
      this.sendAction("action", this.get("offset") )
    },
    updatePage(page) {
      set(this, "offset", page * get(this, "limit") )
      this.sendAction("action", get(this, "offset") )
    }
  }
});
