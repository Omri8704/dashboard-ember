export default function( server ) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.
  let entity = server.create('entity');

  const currentUser = server.create('currentUser', {entities: [entity]});
  // creating campaigns
  server.createList('campaign', 5, entity);

  let campaignsTwo = server.createList('campaign', 5, {entity_id: 2});
  // creating entity 
  server.create('entity', {campaignsTwo, currentUser});

  let users = server.createList('user', 10);
  [1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3].map( ()=>{
    // creates donations and sets the users to a random user that has already been created.
    server.create('donation', {user: users[Math.floor(Math.random() * users.length)] });
  });

  [1,2,3,4,5].map( (index)=>{
    server.create('mailing', {campaign_id: index,
      filter_id: index,
      filter: server.create('filter') });
  });

  server.createList('emailTemplate', 10);
  server.createList('userSegment', 10);
  // server.createList('donation', 10, {user: users[Math.floor(Math.random() * users.length)]});
}
