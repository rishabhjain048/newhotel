var express = require('express');
const passport = require('passport');
var router = express.Router();
const userSchema = require('../models/db');
const guestSchema = require('../models/guest');



const User =require('../models/db');
const upload = require('../utils/multer');

const  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(User.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{User:req.user} );
});

router.get('/register', function(req, res, next) {
  res.render('register',{User:req.user} );
})


router.get('/guestData/:id', async function(req, res, next) {
  const guest = await guestSchema.findById(req.params.id);  
  res.render('guest', {guest} );
})

router.post('/guestupdate/:id', upload.single('profile'), async function(req, res, next) {
  const guest = await guestSchema.findById(req.params.id);
  guest.name = req.body.name;
  guest.phone = req.body.phone;
  guest.email = req.body.email;
  guest.address = req.body.address;
  guest.profile = req.file.profile;
  guest.save();
  res.redirect('/profile');
})


router.get("/delete-guest/:id", async function (req, res, next) {
  try {
      const updateguest = await guestSchema.findByIdAndDelete(req.params.id);

      fs.unlinkSync(path.join(__dirname, `../public/images/${updateguest.profile}`));

      res.redirect("/profile");
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});


router.post('/register', function(req, res, next) {
  var userdata = new userSchema({
    username: req.body.username,
    email: req.body.email
  });
  userSchema.register(userdata, req.body.password)
  .then(function(registerduser){
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile');
    })
  })
  
})

router.get('/login', function(req, res, next) {
  res.render('login' ,{User:req.user} );
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
 })

);



router.get('/profile', async function(req, res, next) {
  const allguest = await guestSchema.find();
  console.log(allguest);
  res.render('profile', {allguest,User} );
})

router.get('/help', function(req, res, next) {
  res.render('help',{User:req.user} );
})

router.get('/library',async function(req, res, next) {
  const allguest = await guestSchema.find();
  console.log(allguest);
  res.render('library',{allguest,User:req.user} );
})

router.get('/about', function(req, res, next) {
  res.render('about',{User:req.user} );
})

router.get('/create',function(req, res, next) {
  res.render('create',{User:req.user} );
})

router.post('/create-user', upload.single('profile'),isLoggedIn, async function (req, res, next) {
  try {
    const createguest = await Guest.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      profile: req.file.filename
    });

    console.log(createguest);
    req.flash('success_msg', 'User registered successfully!');
    res.redirect('/profile');
  } catch (error) {
    next(error);
    req.flash('error_msg', 'Failed to register user.');
  }
});


router.get('/logout', function(req, res){
  req.logout(function(err){
    if(err) return next(err);
  }
)
  res.redirect('/');
})

function isLoggedIn(req, res, next){
  if(req.
    isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }
  



module.exports = router;












