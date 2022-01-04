import Route from "@ember/routing/route";
export default Route.extend({

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    controller.set("newDonationLevel",
      model.store.createRecord("donation_level")
    )
    // Implement your custom setup after
    //
  },
  deactivate() {
    const controller = this.get("controller")
    controller.get("newDonationLevel").destroyRecord()
    controller.set("newDonationLevel", {})
  }
});
