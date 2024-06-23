var express = require('express');
const passport = require('passport');
var router = express.Router();
const userSchema = require('../models/db');
const Guest = require('../models/guest');
const {sendWelcomeEmail} = require("../utils/nodemailer")
// const flas = require("connect-flash")
// const flash = flas()

const User =require('../models/db');
const upload = require('../utils/multer');
// const { log } = require('debug/src/node');
// const { sendMail } = require('../utils/nodemailer');

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
  const guest = await Guest.findById(req.params.id);  
  res.render('guest', {guest} );
})

router.get('/guestupdate/:id', async function(req,res,next){
  const guest =await Guest.findById(req.params.id);
  res.render('guestupdate',{guest,User:req.user})
})

router.post('/update-user/:id', upload.single('profile'), async function(req, res, next) {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).send('Guest not found');
    }

    // Update guest information
    guest.name = req.body.name;
    guest.phone = req.body.phone;
    guest.email = req.body.email;
    guest.address = req.body.address;
    if (req.file) {
      guest.profile = req.file.path; // Store the file path
    }

    await guest.save();
    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get("/delete-guest/:id", async function (req, res, next) {
  try {
      const updateguest = await Guest.findByIdAndDelete(req.params.id);

      fs.unlinkSync(path.join(__dirname, `../public/images/${updateguest.profile}`));

      await updateguest.save();

      res.redirect("/profile");
  } catch (error) {
      console.log(error);
      res.send(error);
  }
});

router.post('/register', function(req, res, next) {
  const { username, email, password } = req.body;
  const userdata = new userSchema({ username, email });

  userSchema.register(userdata, password)
    .then(function(registeredUser) {
      passport.authenticate('local')(req, res, async function() {
        req.flash('success', 'Registered successfully');
        await sendWelcomeEmail(email, username);
        res.redirect('/profile');
      });
    })
    .catch(function(err) {
      req.flash('error', 'Registration failed');
      res.redirect('/register');
    });
});

router.get('/login', function(req, res, next) {
  res.render('login' ,{User:req.user} );
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'
 })

);

// router.get('/profile', async function(req, res, next) {
//   const allguest = await Guest.find();
//   console.log(allguest);
//   res.render('profile', {allguest,User},{message:"Registered successfully "} );
// })

router.get('/profile', async function(req, res, next) {
  try {
    const allguest = await Guest.find();
    res.render('profile', { 
      allguest,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      },
      User:req.user
    });
  } catch (err) {
    next(err);
  }
});

router.get('/userhome', function(req, res, next) {
  res.render('userhome',{User:req.user} );
})

router.get('/help', function(req, res, next) {
  res.render('help',{User:req.user} );
})

router.get('/library',async function(req, res, next) {
  const allguest = await Guest.find();
  console.log(allguest);
  res.render('library',{allguest,User:req.user} );
})

router.get('/about', function(req, res, next) {
  res.render('about',{User:req.user} );
})

router.get('/create',function(req, res, next) {
  res.render('create',{User:req.user} );
})


router.post('/create-user', upload.single('profile'), isLoggedIn, async function (req, res, next) {
  try {
    const { name, phone, email, address } = req.body;

    // Create the guest
    const createguest = await Guest.create({
      name,
      phone,
      email,
      address,
      profile: req.file.path, // Assuming 'profile' contains the file path
    });

    console.log('Guest created:', createguest);

    // Send welcome email
    await sendWelcomeEmail(email,name);

    // Redirect to profile page after successful creation
    res.redirect('/profile');
  } catch (error) {
    console.error('Error creating guest:', error);
    next(error);
    // Handle error and redirect accordingly
    res.redirect('/create-user');
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












