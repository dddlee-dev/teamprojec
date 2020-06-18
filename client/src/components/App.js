import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from "./views/UploadProductPage/UploadProductPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import HomePage from './views/HomePage/HomePage'
import TablePage from './views/TablePage/TablePage'
import BoardPage from './views/BoardPage/BoardPage'
import Community from './views/community/community.js'
import Community_m from './views/community/community_m.js'
import Comm_con from './views/community/comm_con.js'
import Con from './views/community/con.js'
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
          <Route exact path="/home" component={Auth(HomePage, null)} />
          <Route exact path="/table" component={Auth(TablePage, null)} />
          <Route exact path="/board" component={Auth(BoardPage, null)} />
          <Route exact path="/community/:pageId/:pageId2/content/:pageId3" component={Auth(Con, null)} />
          {/*<Route exact path="/community/:pageId/:pageId2" component={Auth(Community, null)} /> */}
          <Route exact path="/community/:pageId/:pageId2" component={Auth(Community, null)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
