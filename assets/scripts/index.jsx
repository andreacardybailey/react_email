var React = require("react");
var ReactDOM = require("react-dom");


var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var Link = router.Link;
var IndexRoute = router.IndexRoute;

var Email = React.createClass({
  getInitialState: function() {
    return {
      inbox: {
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
    }
  },
  render: function() {
    return (
      <EmailContainer emailState={Email.state} />
    );
  }
});
// emailContainer component
var EmailContainer = function(props) {
  console.log(props); // why is this returning routing props instead of the properties of my stateful <Email /> component???
  var emailLists = [];
  for (var i=0; i<props.emailState.inbox.length; i++) {
    emailLists.push(<EmailList listItem={props.emailState.inbox[i]} 
                                       key={i} 
                                       from={props.emailState.inbox[i].from}
                                       title={props.emailState.inbox[i].title} 
                     />);
  }
  return (
    <main className="emailContainer clearfix">
      <Sidebar />
      <EmailList />
    </main>
  );
};

// sidebar component
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
};

// emailList component
var EmailList = function(props) {
  

  return (
    <section className="emailList">
      <ul>
        <li className="emailList-from">From</li>
        <li className="emailList-title">Title</li>
      </ul>
    </section>
  );
};

// emailDetails component

var EmailDetails = function(props) {
  return (
    <section className="emailDetails">
      <ul>
        <li className="from">From</li>
        <li className="to">Title</li>
        <li className="title">Title</li>
        <li className="content">Title</li>
      </ul>
    </section>
  );
};

var App = function(props) {
    return (
        <div>
            <h1>
                Email App
            </h1>
            <div>
                {props.children}
            </div>
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/email" component={App}>
            <IndexRoute component={EmailContainer} />
            <Route path=":emailId" component={EmailDetails} />
        </Route>
    </Router>
);

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(routes, document.getElementById("app"));
});

