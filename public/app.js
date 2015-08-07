var Router = require('react-router');
var React = require('react');
var { Route,DefaultRoute } = Router;
require('./sample.less');

var SampleItem = require('./SampleItem.js');
var Index = require('./Index.js');
var App = require('./Sample.js');
var Setup = require('./Setup.js');

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="item" path=":sample" handler={SampleItem}/>
        <Route name="setup" path="setup/:setup" handler={Setup}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});