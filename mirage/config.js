export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = "http://amplo.dev:80/";    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.post('/users/sign_in', function () {
    return {token: "1234", email: "something@gmail.com"};
  });

  // this.passthrough('/api/bee_free_token.json');
  this.namespace = '/api';    // make this `api`, for example, if your API is namespaced

  //
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  /* ~~~~~~~~~~~~~~~~~~~~~~~
    Current User Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/current_users.json', (schema) => {
    return schema.currentUsers.all();
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~
    Enity Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/entities/:id', function (schema, request) {
    let id = request.params.id.replace(".json", "");
    return schema.entities.find(id)
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~
   Campaign Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/campaigns.json', function (schema) {
   return schema.campaigns.all()
  });

  this.get('/campaigns/:id', function (schema, request) {
    let id = request.params.id.replace(".json", "");

    if (id.includes("campaign")){
      let campaign = schema.campaigns.where({slug: id})
      return campaign.models[0]
    }else{
      return schema.campaigns.find(id);
    }
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~
   Donation Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/donations.json', 'donations')

  //this.get('/donations.json', function (schema, request) {
    //let queryRx = new RegExp(request.queryParams.email.toUpperCase());
    //let donations = schema.donations.filter( (donation)=> {
      //if (donation.user.email.toUpperCase().match(queryRx)) {
        //return donation;
      //}
    //});
    //return donations;
  //});

  // refund route
  this.put('/donations/:id/refund.json', function (schema, request) {
    let donation = schema.donations.update(request.params.id, {status: 'refunded'});
    return  donation;
  });

  // create a donation route
  this.post('/donations.json', function (schema, request) {
    let params = JSON.parse(request.requestBody);

    let donation = schema.donations.create(params);
    return donation
  });


  /* ~~~~~~~~~~~~~~~~~~~~~~~
   User Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/entities/:id/users.json', function (schema, request) {
    // let id = request.params.id.replace(".json", "");
    let queryRx = new RegExp(request.queryParams.query.toUpperCase());
    let users = schema.users.filter( (user)=>{
      let matcher = `${user.first_name} ${user.last_name} ${user.email}`.toUpperCase();
      if (matcher.match(queryRx)) {
        return user;
      }
    });
    return users;
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~
   Email Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/email_stats.json', function(schema) {
    return {}
  });


  // get collection of emails
  this.get('/mailings.json', function(schema) {
    return schema.mailings.all()
  });

  // get email by id
  this.get('/mailings/:id', function(schema, request) {
    let id = request.params.id.replace(".json", "");
    return schema.mailings.find(id)
  });

  // create a new email
  this.post('/mailings.json', (schema, req) => {
    let campaignEmail = schema.campaign_emails.create(JSON.parse(req.requestBody));
    campaignEmail.campaign_email.filters = []
    campaignEmail.campaign_email.id = campaignEmail.id
    delete campaignEmail.campaign_email.filters_attributes
    return campaignEmail
  });

  // update an email
  //this.put('/mailings/:id', (schema, req) => {
    //let id = req.params.id.replace('.json', ""); // for some reason id is {id}.json
    //let attrs = JSON.parse(req.requestBody).campaign_email;

    //if (attrs.filters_attributes) {
      //attrs.filters = attrs.filters_attributes
      //delete attrs.filters_attributes
    //}
    //if (attrs.filters[0].id) {
      //let filter = schema.filters.find(attrs.filters[0].id)
      //filter.update(attrs.filters[0])
    //} else {
      //let filter = schema.filters.create(attrs.filters[0])
    //}
    //delete attrs.filters
    //let campaignEmail = schema.campaignEmails.find(id)
    //return campaignEmail.update(attrs);
  //});

  /* ~~~~~~~~~~~~~~~~~~~~~~~
   Email Template Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */

  this.get('/email_templates.json', function(schema) {
    return schema.emailTemplates.all();
  });
  // create new email-template
  this.post('/email_templates.json', function(schema, request){
    const attrs = JSON.parse(request.requestBody).email_template
    return schema.emailTemplates.create(attrs)
  })

  /* ~~~~~~~~~~~~~~~~~~~~~~~
   User Segments Endpoints
  ~~~~~~~~~~~~~~~~~~~~~~~ */
  this.get('/user_segments.json', 'user-segment')

  this.get('/user_segments/:id', function(schema, request){
    const id = request.params.id.replace(".json", "");
    return schema.userSegments.find(id);
  })

  this.put('/user_segments/:id/bulk_upload.json', function(schema, request){
    const id = request.params.id
    return schema.userSegments.find(id);
  })

  /* ~~~~~~~~~~~~~~~~~~~~~~~
    Raiser's Edge Endpoints
   ~~~~~~~~~~~~~~~~~~~~~~~ */
   this.get('/appeals.json', 'appeals')
   this.get('/initiatives.json', 'initiatives')
   this.get('/causes.json', 'causes')
   this.get('/causes', 'causes')
   this.get('/entity-custom-fields.json', 'entity-custom-fields')
   this.get('/entity_custom_fields.json', 'entity-custom-fields')

}
