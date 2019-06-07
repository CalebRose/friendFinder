var friends = require("./../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newFriend = req.body;

    //userData.scores is where the values are located
    // totalDifference array to count up the total difference with each digimon in the js file
    // Difference. So user - digimon = difference
    // Digimon with the closest to 0 is the digimon to match
    for (var i = 0; i < newFriend.scores.length; i++)
      newFriend.scores[i] = parseInt(newFriend.scores[i]);

    var digiIndex = 0;
    var minimumScore = 100; // A large, unreachable number

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(newFriend.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }
      if (totalDifference < minimumScore) {
        digiIndex = i;
        minimumScore = totalDifference;
      }
    }

    // We then add the json the user sent to the character array
    friends.push(newFriend);

    // We then display the JSON to the users
    res.json(friends[digiIndex]);
  });
};
