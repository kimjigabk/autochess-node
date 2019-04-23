require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
// const dota = require(__dirname + "/dota.js");
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const gg = {
  antimage: "g",
  axe: "g",
  batrider: "g",
  bountyhunter: "g",
  clockwerk: "g",
  drowranger: "g",
  enchantress: "g",
  ogremagi: "g",
  shadowshaman: "g",
  tinker: "g",
  tiny: "g",
  tusk: "g",
  crystalmaiden: "g",
  beastmaster: "g",
  juggernaut: "g",
  timbersaw: "g",
  queenofpain: "g",
  puck: "g",
  witchdoctor: "g",
  chaosknight: "g",
  slardar: "g",
  treantprotector: "g",
  luna: "g",
  furion: "g",
  morphling: "g",
  slark: "g",
  abbadon: "g",
  shadowfiend: "g",
  lycan: "g",
  phantomassassin: "g",
  terrorblade: "g",
  sandking: "g",
  razor: "g",
  lina: "g",
  viper: "g",
  sniper: "g",
  windranger: "g",
  omniknight: "g",
  venomancer: "g",
  riki: "g",
  mirana: "g",
  dragonknight: "g",
  lonedruid: "g",
  kunkka: "g",
  medusa: "g",
  templarassassin: "g",
  disruptor: "g",
  doom: "g",
  alchemist: "g",
  necrophos: "g",
  trollwarlord: "g",
  keeperofthelight: "g",
  lich: "g",
  tidehunter: "g",
  enigma: "g",
  gyrocopter: "g",
  techies: "g",
  deathprophet: "g"
}

const app = express();
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  googleId: String,
  userGG: String,
  userSynDataStr: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id
    }, {
      userGG: JSON.stringify(gg),
      userSynDataStr: ""
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

// gg랑 unerStr 을 stringfy시켜서 DB에 집어넣었다가
// 로그인 되어있다면 불러오기하면됨.
// save시에만 작동. 세이브안하면 그냥 NULL로 놔둬도 상관없다.
// user생성시 gg는 일단 넣어줘야함!

app.get('/', function(req, res) {
  let authenticated = 0;
  if (req.isAuthenticated()) {
    authenticated = 1;
    User.findOne({
      googleId: req.user.googleId
    }, function(err, userFound) {
      if (err) {
        res.send(err);
      } else {
        if (userFound == null) {
          console.log(userFound);
        }
        //저장은 str로하는데 보내주는건 json인 웃기는 구조임 수정할까 생각중
        res.render('home', {
          gg: JSON.parse(userFound.userGG),
          userSynDataStr: JSON.parse(userFound.userSynDataStr),
          authenticated: authenticated
        });
      }
    });

  } else {
    res.render('home', {
      gg: gg,
      userSynDataStr: "",
      authenticated: authenticated
    });
  }
});

app.post('/', function(req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    unitData = JSON.parse(req.body.unitData);
    let userGG = JSON.parse(JSON.stringify(gg));
    //unitdata를 바탕으로 userGG를 업데이트하면 됨
    unitData.forEach(function(name) {
      userGG[name] = "";
    });

    User.updateOne({
        googleId: req.user.googleId
      }, {
        userGG: JSON.stringify(userGG),
        userSynDataStr: req.body.synData
      },
      function(err) {
        if (!err) {
          console.log("저장되었습니다");
        } else {
          res.send(err);
        }
      });
    // console.log(req.body.synData);
    // console.log("111111");
    // console.log(JSON.parse(req.body.synData));
  }
});

app.get('/guide', function(req, res) {
  let authenticated = 0;
  if (req.isAuthenticated()) {
    authenticated = 1;
  }
  res.render('guide', {
    authenticated: authenticated
  });
});

app.get('/login', function(req, res) {
  let authenticated = 0;
  if (req.isAuthenticated()) {
    authenticated = 1;
  }
  res.render("login", {
    userSynDataStr: "",
    authenticated: authenticated
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

app.get('/auth/google/secrets',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
