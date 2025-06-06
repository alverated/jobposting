import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { RouteName } from 'ziggy-js';
import { route } from '../../vendor/tightenco/ziggy';
import { PageProps } from './types';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            // @ts-expect-error: Suppress TypeScript error if necessary
            global.route<RouteName> = (name, params, absolute) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                route(name, params as any, absolute, {
                    ...(page.props.ziggy as PageProps['ziggy']),
                    location: new URL(
                        (page.props.ziggy as PageProps['ziggy']).location,
                    ),
                });

            return <App {...props} />;
        },
    }),
);
