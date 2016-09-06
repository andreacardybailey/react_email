var React = require("react");
var ReactDOM = require("react-dom");


var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = router.Link;
var IndexRoute = router.IndexRoute;

var EMAILS = {
    'inbox': {
      0: {
        id: 0,
        from: "billg@microsoft.com",
        to: "TeamWoz@Woz.org",
        title: "Possible work opportunity",
        content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
      },
      1: {
        id: 1,
        from: "zuck@facebook.com",
        to: "TeamWoz@Woz.org",
        title: "Do you know PHP?",
        content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
      }
    },
    spam: {
      0: {
        id: 0,
        from: "ChEaPFl1ghTZ@hotmail.com",
        to: "TeamWoz@Woz.org",
        title: "WaNt CHEEp FlitZ",
        content: "Theyre CheEp"
      },
      1: {
        id: 1,
        from: "NiKEAIRJordanZ@hotmail.com",
        to: "TeamWoz@Woz.org",
        title: "JorDanz For SAle",
        content: "Theyre REELY CheEp"
      }
    }
};

var EmailListContainer = function(props) {
  // set default folder to be the inbox when page is loaded
  var thisFolder = "inbox";
  if(props.params.emailFolder) {
    thisFolder = props.params.emailFolder;
  }
  return <EmailList emails={EMAILS} folder={thisFolder} />
}

var EmailList = function(props) {
  var thisEmailFolder = EMAILS[props.folder];
  var thisFolder = props.folder
  return (
    <section className="emailList">
      <ShowEmails emails={thisEmailFolder} folder={thisFolder} />
    </section>
  );
};

var ShowEmails = function(props) {
  var showEmails = Object.keys(props.emails).map(function(emailId, index) {
    var showEmail = props.emails[emailId];
    return (
      <ul key={emailId}>
        <li className="emailList-from">
          <Link to={'email/' + props.folder + '/' + emailId}>{showEmail.from}</Link>
        </li>
        <li className="emailList-title">
          <Link to={'email/' + props.folder + '/' + emailId}>{showEmail.title}</Link>
        </li>
      </ul>
    );
  });
  return(
    <div> 
      {showEmails}
    </div>
  );
};

var EmailDetails = function(props) {
  var thisFolder = props.params.emailFolder;
  var thisId = props.params.emailId;
  var thisEmail = EMAILS[thisFolder][thisId];

  return (
    <section className="emailDetails">
      <ul>
        <li className="emailDetails-from">From: {thisEmail.from}</li>
        <li className="emailDetails-to">To: {thisEmail.to}</li>
        <li className="emailDetails-title">Subject: {thisEmail.title}</li>
        <li className="emailDetails-content">{thisEmail.content}</li>
      </ul>
    </section>
  );
};

var Sidebar = function(props) {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to='/email/inbox'>Inbox</Link>
        </li>
        <li>
          <Link to='/email/spam'>Spam</Link>
        </li>
      </ul>
    </nav>
  );
}

var EmailApp = function(props) {
  return (
    <div>
      <Sidebar />
      {props.children}
    </div>
    
  );
};

var routes = (
    <Router history={hashHistory}>
      <Route path="email" component={EmailApp}>
        <IndexRoute component={EmailListContainer} />
        <Route path=":emailFolder" component={EmailListContainer} />
        <Route path=":emailFolder/:emailId" component={EmailDetails} />
      </Route>
    </Router>
);

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(routes, document.getElementById("app"));
});