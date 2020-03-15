import React from 'react';
/**Components */
import Layout from 'Layout';
/**Libraries */
import { Switch, Redirect, Route } from 'react-router-dom';
/**Config */
import { routes } from './config';

export const Routes = () => (
    <Switch>
        {/* Redirect */}
        <Redirect key="redirect" exact from="/" to="/home" />
        {/* Routes */}
        {Array.isArray(routes) &&
            routes.map((route, index) => {
                const { path, exact, RouteComponent } = route;
                return (
                    <Route
                        key={index}
                        path={path}
                        exact={exact}
                        render={props => (
                            <Layout>
                                <RouteComponent {...props} />
                            </Layout>
                        )}
                    />
                );
            })}
    </Switch>
);
