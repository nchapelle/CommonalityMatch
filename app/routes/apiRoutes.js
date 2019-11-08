// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body parsing middleware
      
        // default friend match is the first friend but result will be whoever has the minimum difference in scores
  var user = req.body
  var bestFriendIndex = 0;
  var minimumDifference = 1000;
  // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
  //  whatever the difference is, add to the total difference
  for(var i = 0; i < friends.length; i++) {
    var totalDifference = 0;
    for(var j = 0; j < friends[i].scores.length; j++) {
      var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
      totalDifference += difference;
    }
    // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
    if(totalDifference < minimumDifference) {
      bestFriendIndex = i;
      minimumDifference = totalDifference;
    }
  }
  // send back to browser the best friend match
  res.json(friends[bestFriendIndex]);
  // after finding match, add user to friend array
  friends.push(user);


  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function(req, res) {
//     // Empty out the arrays of data
//     friendData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
};
