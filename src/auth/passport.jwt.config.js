import passport from "passport";
import passportJWT from "passport-jwt";
import User from "./auth.schema.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub, ["userName", "email", "_id"]);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);

export default passport;
