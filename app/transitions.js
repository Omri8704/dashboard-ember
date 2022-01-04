export default function() {

  /*
   * Campaigns routes transitions
   */

  this.transition(
    this.fromRoute(["campaigns.index", "campaigns.index_loading"]),
    this.toRoute("campaigns.campaign"),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  this.transition(
    this.fromRoute(["campaigns.index", "campaigns.index_loading"]),
    this.toRoute("campaigns.new"),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  this.transition(
    this.fromRoute("emails.new"),
    this.toRoute("emails.email"),
    this.use("toLeft")
  )

  this.transition(
    this.fromRoute("emails.index"),
    this.toRoute("emails.email"),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  this.transition(
    this.fromRoute("emails.index"),
    this.toRoute("emails.new"),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  /*
   * transitions for the email steps for the wizard.
   * audience -> template -> compose -> finish
   */

  this.transition(
    this.fromRoute("emails.email.audience"),
    this.toRoute(["emails.email.template",
      "emails.email.template_loading",
      "emails.email.message",
      "emails.email.message_loading",
      "emails.email.finish"]),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  this.transition(
    this.fromRoute("emails.email.template"),
    this.toRoute(["emails.email.message",
      "emails.email.message_loading",
      "emails.email.finish"]),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  this.transition(
    this.fromRoute(["emails.email.message",
    "emails.email.message_loading"
    ]),
    this.toRoute("emails.email.finish"),
    this.use("toLeft"),
    this.reverse("toRight")
  )

  this.transition(
    this.hasClass("audience-wizard"),
    this.toValue(function(toValue, fromValue){
      return toValue > fromValue
    }),
    this.use("explode", {
      pick: ".content",
      use: ['toLeft']
    }),
    this.reverse("explode", {
      pick: ".content",
      use: ['toRight']
    })
    //this.toValue("finished"),
    //this.reverse("toRight", {duration: 3000})
  )

  this.transition(
    this.hasClass('date-time-picker-editing'),

    this.toValue(true),
    this.use('toDown', { duration: 800 }),

    this.reverse('toUp', { duration: 1000 })
  )

  this.transition(
    this.hasClass("date-time-picker-step"),
    this.toValue(false),

    this.use('toLeft', { duration: 1000}),
    this.reverse('toLeft', { duration: 1000 })
  )


  // These transitions can be improved later with a custom transition
  this.transition(
    this.hasClass('email-list-drawer'),
    this.toValue(true),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.hasClass('email-list-selectors'),
    this.toValue(false),
    this.use('toLeft'),
    this.reverse('toRight')
  );

}
