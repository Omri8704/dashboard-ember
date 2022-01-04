import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),
  didTransition() {
    this._super(...arguments)
    this._trackPage()
  },
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url')
      const title = this.getWithDefault('currentRouteName', 'unknown')
      Ember.get(this, 'metrics').trackPage({ page, title })
    })
  }
})

Router.map(function() {
  this.route('login')
  this.route('campaigns', function() {
    this.route('virtual-terminal')
    this.route('stats')
    this.route('donations')
    this.route('new')
    this.route('bulk-upload')
    this.route('campaign', { path: ':campaign_id' }, function() {
      this.route('edit', { path: 'edit' }, function() {
        this.route('details')
        this.route('donation_levels')
        this.route('media')
        this.route('custom')
      })
      this.route('recruit')
    })
  })

  this.route('emails', function() {
    this.route('templates', function() {
      this.route('edit', { path: ':id' })
      this.route('create')
    })

    this.route('email-lists', function() {
      this.route('new')
      this.route('email-list', { path: ':id' })
    })

    this.route('new', { path: 'new' })
    this.route('email', { path: ':id' }, function() {
      this.route('stats')
      this.route('audience')
      this.route('template')
      this.route('message')
      this.route('finish')
    })

    this.route('settings', function() {
      this.route('template', { path: ':id' })
    })
  })

  this.route('member_contacts')

  this.route('editor', function() {
    this.route('tiles-section', { path: ':id' }, function() {})
  })

  this.route('matching-gifts', function() {
    this.route('new', { path: 'new' })

    this.route('matching-gift', { path: ':matching_gift_id' }, function() {
      this.route('edit', { path: 'edit' })
    })
  })

  this.route('embedded-forms', function() {
    this.route('new', { path: 'new' })

    this.route('embedded-forms', { path: ':embedded-forms_id' }, function() {
      this.route('edit', { path: 'edit' })
    })
  })

  this.route('saved-forms', function() {
    this.route('new', { path: 'new' })
  })


  this.route('embedded-forms-edit', function() {
    this.route('edit', { path: 'edit' })
  })

  this.route('embedded-forms-welcome', function() {
    this.route('new', { path: 'new' })
  })

  this.route('matching-gifts-sections', function() {
    this.route('new', { path: 'new' })

    this.route(
      'matching-gifts-section',
      { path: ':matching_gifts_section_id' },
      function() {
        this.route('edit', { path: 'edit' })
      }
    )
  })

  this.route('sprout', function() {
    this.route('membership', { path: ':membership_id' }, function() {
      this.route('leader')
      this.route('participant')
      this.route('referrals')
      this.route('contacts')
    })
  })

  this.route('events', function() {
    this.route('new', function() {
      this.route('tickets')
      this.route('confirmation')
      this.route('details')
    })

    this.route('event', { path: ':event_id' }, function() {
      this.route('confirmation')
      this.route('details')
      this.route('tickets')
      this.route('view', function() {
        this.route('tickets')
        this.route('ticket-levels')
      })
    })
  })

  this.route('transactions')

  this.route('settings', function() {
    this.route('report-status')
    this.route('uploader-batch-stat')
    this.route('reports')
    this.route('account', function() {
      this.route('user')
      this.route('entity')
      this.route('entity-switcher')
      this.route('api')
      this.route('add-admin')
    })

    this.route('emails', function() {
      this.route('template', { path: ':id' })
    })
  })

  this.route('reporting', function() {
    this.route('impact', function() {
      this.route('show', { path: ':campaign_id' })
    })
    this.route('builder', function() {
      this.route('template', function() {
        this.route('edit', { path: ':report_template_id/edit' })
        this.route('new')
      })

      this.route('schedule', function() {
        this.route('new')
        this.route('edit', { path: ':report_schedule_id/edit' })
      })
    })
    this.route('instant', function() {})
  })
  this.route('importing', function() {
    this.route('campaigns')
    this.route('causes')
  })

  this.route('initiatives')
  this.route('causes')
  this.route('appeals')
  this.route('stripe')
  this.route('bbms')
})

export default Router
