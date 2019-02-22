// Import friend data.
var friendData = require('../data/friends.js');

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {

    res.json(friendData);

  });

  app.post("/api/friends", function (req, res) {

    var newData = req.body;
    var differences = [];

    if (friendData.length > 1) {
    
        friendData.forEach(function(user) {
            var totalDifference = 0;

            for (var i = 0; i < newData.scores.length; i++) {
                var userScores = user.scores[i];
                var CurrentScores = newData.scores[i];
                var difference = +userScores - +CurrentScores;
                totalDifference += Math.abs(difference);
            }

            differences.push(totalDifference);
        });

        var minimumDifference = Math.min.apply(null, differences);       
        var bestMatches = [];

       
        for (var i = 0; i < differences.length; i++) {
            if (differences[i] === minimumDifference) {
                bestMatches.push(friendData[i]);
            }
        }       
        res.json(bestMatches);
  
    } else {
        res.json(friendData);
    }
      
      friendData.push(newData);  
});
};
