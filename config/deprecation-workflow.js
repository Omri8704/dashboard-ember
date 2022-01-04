window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
  //   { handler: "silence", matchMessage: "`lookup` was called on a Registry. The `initializer` API no longer receives a container, and you should use an `instanceInitializer` to look up objects from the container." },
  //   { handler: "silence", matchMessage: "The default behavior of shouldReloadAll will change in Ember Data 2.0 to always return false when there is at least one \"current-user\" record in the store. If you would like to preserve the current behavior please override shouldReloadAll in your adapter:application and return true." },
  //   { handler: "silence", matchMessage: "store.push(type, data) has been deprecated. Please provide a JSON-API document object as the first and only argument to store.push." },
  //   { handler: "silence", matchMessage: "A property of <dashboard@view:-outlet::ember1231> was modified inside the didInsertElement hook. You should never change properties on components, services or models during didInsertElement because it causes significant performance degradation." },
  //   { handler: "silence", matchMessage: /To determine if a block was specified/ },    { handler: "silence", matchMessage: "Ember.Select is deprecated. Consult the Deprecations Guide for a migration strategy." },
  //   { handler: "silence", matchMessage: "Using DS.Snapshot.get() is deprecated. Use .attr(), .belongsTo() or .hasMany() instead." },
  //   { handler: "silence", matchMessage: "Usage of `snapshot.constructor` is deprecated, use `snapshot.type` instead." },
  //   { handler: "silence", matchMessage: /twice in a single render. This was unreliable in Ember 1.x and will be removed in Ember 2.0/},
  //   { handler: "silence", matchMessage: /during didInsertElement because it causes significant performance degradation./},
  //   { handler: "silence", matchMessage: /Using the same function as getter and setter is deprecated./},
  //   { handler: "silence", matchId: "ds.adapter.should-background-reload-record-default-behavior"},
  //   { handler: "silence", matchId: "ds.serializer.extract-hooks-deprecated"},
  //   { handler: "silence", matchId: "ds.store.metadata-for-deprecated"},
  //   { handler: 'silence', matchMessage: "Using the injected `container` is deprecated. Please use the `getOwner` helper instead to access the owner of this object."},
  //   { handler: 'silence', matchMessage: "Using `ApplicationInstance.container.lookup` is deprecated. Please use `ApplicationInstance.lookup` instead"}
  ]
};
