// @ts-check
import firebase from "firebase";

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
        // async incrementAsync(payload, rootState) {
        // 	await new Promise(resolve => setTimeout(resolve, 1000));
        // 	dispatch.count.increment(payload);
        // }
    })
};

export const organizations = {
    state: {
        loading: true,
        organizations: [],
        myOrganization: null
    },
    reducers: {
        setOrganizationsList(state, payload = []) {
            return { ...state, organizations: payload, loading: false };
        },
        setMyOrganization(state, payload) {
            return { ...state, myOrganization: payload };
        }
    },
    effects: dispatch => ({
        async loadOrganizationsList(payload, rootState) {
            await firebase
                .firestore()
                .collection("organizations")
                .get()
                .then(res => {
                    const orgs = res.docs.map(org => ({
                        ...org.data(),
                        id: org.id
                    }));
                    dispatch.organizations.setOrganizationsList(orgs);
                });
        },
        async loadMyOrganization(organizationId, rootState) {
            await firebase
                .firestore()
                .collection("organizations")
                .doc(organizationId)
                .get()
                .then(res => {
                    if (res.exists) {
                        dispatch.organizations.setMyOrganization({
                            ...res.data(),
                            id: res.id
                        });
                    } else {
                        dispatch.organizations.setMyOrganization(null);
                    }
                });
        }
    })
};

export const orders = {
    state: {
        loading: true,
        orders: [],
        myOrders: [],
        currentOrder: {},
        currentOrderScreeningType: ""
    },
    reducers: {
        setMyOrders(state, payload) {
            return { ...state, myOrders: payload, loading: false };
        },

        setRecentOrders(state, payload) {
            return { ...state, orders: payload, loading: false };
        },

        setCurrentOrder(state, payload) {
            return { ...state, currentOrder: payload };
        }
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        loadMyOrders(payload) {
            const myOrdersRef = firebase
                .firestore()
                .collection("orders")
                .where("organizationId", "==", payload);
            myOrdersRef.onSnapshot(snap => {
                const orders = [];
                snap.forEach(order =>
                    orders.push({ ...order.data(), id: order.id })
                );
                dispatch.orders.setMyOrders(orders);
            });
        },

        loadRecentOrders() {
            const ordersRef = firebase.firestore().collection("orders");
            ordersRef
                .orderBy("createdAt", "desc")
                .limit(30)
                .onSnapshot(snap => {
                    const orders = [];
                    snap.forEach(doc =>
                        orders.push({ ...doc.data(), id: doc.id })
                    );
                    dispatch.orders.setRecentOrders(orders);
                });
        }
    })
};

export const litigationCases = {
    state: {
        loading: true,
        cases: [],
        myCases: []
    },
    reducers: {
        setMyCases(state, payload) {
            return { ...state, myCases: payload, loading: false };
        },

        setRecentCases(state, payload) {
            return { ...state, cases: payload, loading: false };
        }
    },
    effects: dispatch => ({
        // handle state changes with impure functions.
        // use async/await for async actions
        loadMyCases(payload) {
            const myCasesRef = firebase
                .firestore()
                .collection("preLitigationCases")
                .where("organizationId", "==", payload);
            myCasesRef.onSnapshot(snap => {
                const cases = [];
                snap.forEach(c => cases.push({ ...c.data(), id: c.id }));
                dispatch.litigationCases.setMyCases(cases);
            });
        },

        loadRecentCases() {
            const casesRef = firebase
                .firestore()
                .collection("preLitigationCases");
            casesRef
                .orderBy("createdAt", "desc")
                .limit(30)
                .onSnapshot(snap => {
                    const cases = [];
                    snap.forEach(doc =>
                        cases.push({ ...doc.data(), id: doc.id })
                    );
                    dispatch.litigationCases.setRecentCases(cases);
                });
        }
    })
};

export const snackbar = {
    state: {
        open: false,
        vertical: "top",
        horizontal: "right",
        message: "",
        title: "",
        key: Math.random()
            .toString(36)
            .substring(2)
    },
    reducers: {
        toggleSnackBar(state, payload) {
            const openState = state.open;
            return { ...state, ...payload, open: !openState };
        }
    },
    effects: dispatch => ({
        asyncToggleSnackBar(payload, rootState) {
            // console.log("PAYLOAD:", payload, rootState)
            if (!rootState.snackbar.open) {
                setTimeout(
                    () => dispatch.snackbar.toggleSnackBar(payload),
                    3000
                );
            }
            dispatch.snackbar.toggleSnackBar(payload);
        }
    })
};

export const inputValidation = {
    state: [],
    reducers: {
        pushError(state, errorObject) {
            console.log(errorObject)
            return [...state, errorObject]
        },
        popError(state, errorId) {
            return state.filter(errorObject => errorObject.id !== errorId)
        },
        resetErrors() {
            return []
        },
        hasErrorById(state = [], payload) {
            return state.find(obj => obj.id === payload)
        },
        setErrors(state, errorsList) {
            return [...errorsList]
        },
    },
    // effects: dispatch => ({
    //     async setErrors(payload, rootState) {
    //         await new Promise(resolve => setTimeout(resolve, 1000))
    //         dispatch.setErrors(payload)
    //     }
    // })
}
