import {
	createApp as createClientApp,
    resolveDynamicComponent,
    h,
	VNode,
	provide,
	Transition,
	App,
} from 'vue'

import { RouterView } from 'vue-router'

import { createRouter } from './router'

import { session, api } from './composable/useApi'
type AppOptions = {
  enhanceApp?: (app: App) => Promise<void>
}

export async function createApp({ enhanceApp }: AppOptions) {
	const router = createRouter();
	const _session = session;
	const _api = api;

	const app = createClientApp({
		setup() {
			
			return () => {
				const defaultSlot = ({ Component: _Component }: any) => {
				  const Component = resolveDynamicComponent(_Component) as VNode
		
				  return [
					h(
					  Transition,
					  { name: 'fade-slow', mode: 'out-in' },
					  {
						default: () => [h(Component)],
					  }
					),
				  ]
				}
		
				return [
				  h(RouterView, null, {
					default: defaultSlot,
				  }),
				]
			  }
		},
	})

	app.use(router)
	return app
}