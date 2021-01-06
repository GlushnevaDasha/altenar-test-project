import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./page/Home";

const ThemeContext = React.createContext({
  isLight: true
});

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} />
        {/* <Route path='/feed/exclusives' component={Feed} />
        <Route path='/feed/wylsa_posts' component={Feed} />
        <Route exact path='/feed/exclusive/:id?' component={TextEditor} />

        <Route path='/videos/video' component={Videos} />
        <Route path='/videos/announcement' component={Videos} />
        <Route path='/videos/headings' component={Videos} />
        <Route path='/videos/channels' component={Videos} />
        <Route path='/videos/playlist' component={HadingPlaylist} />

        <Route path='/profile/:id?' component={Profile} />
        <Route path='/shop' component={Shop} />
        <Route path='/product' component={Product} />
        <Route path='/add_shop' component={ShopCreate} />
        <Route path='/edit_shop' component={ShopCreate} />
        <Route path='/competitions' component={Competitions} />
        <Route path='/add_competition' component={AddCompetitionPage} />
        <Route path='/edit_competition' component={AddCompetitionPage} />
        <Route path='/competition/:id?' component={Competition} />
        <Route path='/competition_result/:id?' component={CompetitionResult} />
        <Route path='/podcasts' component={Podcasts} />
        <Route path='/comments' component={Comments} />
        <Route path='/users' component={Users} />
        <Route exact path='/' component={SignInPage} />
        <Route path='/sign_in' component={SignInPage} />
        <Route path='/sign_up' component={SignUpPage} />
        <Route
          exact
          path='/reset_password_by_email'
          component={ResetPasswordByEmailPage}
        />
        <Route exact path='/reset_password' component={ResetPasswordPage} />
        <Route path='/control_users' component={ControlUsers} />
        <Route component={NoContent} /> */}
      </Switch>
    </Router>
  );
}
