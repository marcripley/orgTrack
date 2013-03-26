
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Trello OrgTrack', public_key: '7809db7cede557bf5b7165ff63d6b3f1' });
};