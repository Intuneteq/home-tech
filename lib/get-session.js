import nextSession from "next-session";

const oneDay = 1000 * 60 * 60 * 24;

const options = {
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
};
export const getSession = nextSession(options);
