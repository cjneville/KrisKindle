const User = require('../models/user');

const user_index = (req, res) => {
  User.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('users/index', { users: result, title: 'All users' });
    })
    .catch(err => {
      console.log(err);
    });
}

const user_create_get = (req, res) => {
  res.render('users/create', { title: 'Create a new user' });
}

const user_details = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then(result => {
      res.render('users/details', { user: result, title: 'User Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'User not found' });
    });
}

const user_create_post = (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(result => {
      res.redirect('/users');
    })
    .catch(err => {
      console.log(err);
    });
}

function between(min, max) {

  return Math.floor(
    Math.random() * (max - min) + min
  )
}



async function matchNames(names)  {
  var array = [];
//   if (names.length % 2 != 0) {
//       console.log("You must have an even number of names. You currently have " + names.length + " names.");
//   } else {
      var arr1 = names.slice(), // copy array
          arr2 = names.slice(); // copy array again
  //console.log('arr1' + arr1 + " " + arr1.length);

      arr1.sort(function() { return 0.5 - Math.random();}); // shuffle arrays
      arr2.sort(function() { return 0.5 - Math.random();});

      while (arr1.length) {
          var name1 = arr1.pop(), // get the last value of arr1
              name2 = arr2[0] == name1 ? arr2.pop() : arr2.shift();
              //        ^^ if the first value is the same as name1,
              //           get the last value, otherwise get the first
          name1.giftingToName = name2.name;
          name1.giftingToId = name2._id;
           await User.updateOne({_id: name1._id}, name1);



          console.log(name1.name + ' gets ' + name2.name);
      }
  //}
}

const user_assign = (req, res) => {
  var array = [];
  for (var i = 0; i < 10; i++) {


  User.find().sort({ createdAt: -1 })
    .then(function(result) {
            matchNames(result).then(() => {res.redirect('/users')});
    })
    .catch(err => {
      console.log(err);
    });
  }
//   const user = new User(req.body);
//   user.save()
//     .then(result => {

//     })
//     .catch(err => {
//       console.log(err);
//     });
 }

const user_delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/users' });
    })
    .catch(err => {
      console.log(err);
    });
}

const user_update = (req, res) => {
  const id = req.params.id;
  //const user = new User(req.body);
  console.log(id);
  //console.log(user);
   User.updateOne({_id: id}, req.body)
     .then(result => {
       res.redirect('/users');
       //res.json({ redirect: '/users' });
     })
     .catch(err => {
       console.log(err);
     });
}

const user_put = (req, res) => {
  const id = req.params.id;
//  console.log(req.body);
  const user = new User(req.body);
 User.updateOne({_id: id}, req.body)
   .then(result => {
     res.json({ redirect: '/users' });
     //res.json({ redirect: '/users' });
   })
   .catch(err => {
     console.log(err);
   });


}

module.exports = {
  user_index,
  user_create_get,
  user_create_post,
  user_details,
  user_delete,
  user_update,
  user_put,
  user_assign
}
