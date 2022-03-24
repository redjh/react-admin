import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
export default class index extends Component {
  render() {
    let { routes } = this.props;
    routes = routes.map(r => {
      return {
        id: r.id,
        path: r.path,
        component: lazy(() => {
          let path = r.component;
          if (!path.startsWith("/")) {
            path = `/${path}`;
          }
          return import(`@/pages${path}`);
        }),
      };
    });
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          {routes.map(r => {
            return <Route exact key={r.id} path={r.path} component={r.component} />;
          })}
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Suspense>
    );
  }
}
