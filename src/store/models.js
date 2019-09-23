// @ts-check

export const count = {
	state: {}, // initial state
	reducers: {
		// handle state changes with pure functions
		increment(state, payload) {
			return state + payload;
		}
	},
	effects: dispatch => ({
		// handle state changes with impure functions.
		// use async/await for async actions
		async incrementAsync(payload, rootState) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			dispatch.count.increment(payload);
		}
	})
};

export const profile = {
	state: {
		loading: true
	},
	reducers: {
		setProfile(state, payload) {
			return Object.assign({ loading: false }, payload);
		},
		clearProfile(state) {
			return Object.assign({ loading: false });
		}
	},
	effects: dispatch => ({
		// handle state changes with impure functions.
		// use async/await for async actions
		async incrementAsync(payload, rootState) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			dispatch.count.increment(payload);
		}
	})
};
