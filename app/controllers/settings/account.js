import Ember from 'ember'
import Controller from '@ember/controller'
import { inject } from '@ember/service'
import { alias } from '@ember/object/computed'

export default Controller.extend({
  settings: inject(),
  session: Ember.inject.service(),
  currentEntity: alias('settings.current_entity'),
  currentUser: Ember.computed.alias('model'),

  canManageAdmins: Ember.computed('description', function() {
    const canManageAdminsAndEntities = this.get(
      'session.current_user.can_manage_other_admins_entities'
    )

    if (!canManageAdminsAndEntities) {
      return false
    }

    const entityId = this.get('settings.current_entity.id')
    const canManageAdminPermissions = JSON.parse(canManageAdminsAndEntities)

    return canManageAdminPermissions[entityId]
  })
})
