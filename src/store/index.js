// @ts-check
import { init } from "@rematch/core";
import firebase from "firebase";
import * as models from "./models";

const store = init({
    models
});

export default store;

// Listen to profile changes!
let profileListener;
function resetProfileListener() {
    if (profileListener) {
        profileListener();
    }
}
firebase.auth().onAuthStateChanged(user => {
    resetProfileListener();
    if (user) {
        profileListener = firebase
            .firestore()
            .collection("profiles")
            .doc(user.uid)
            .onSnapshot(snap => {
                if (snap.exists) {
                    const profile = { ...snap.data(), id: snap.id };
                    store.dispatch.profile.setProfile(profile);
                    store.dispatch.orders.loadMyOrders(profile.organizationId);
                    store.dispatch.organizations.loadMyOrganization(
                        profile.organizationId
                    );
                    if (profile.admin === true) {
                        store.dispatch.orders.loadRecentOrders();
                        store.dispatch.organizations.loadOrganizationsList();
                        store.dispatch.litigationCases.loadRecentCases();
                    }
                } else {
                    store.dispatch.profile.clearProfile();
                }
                // snap.docs
            });
    } else {
        store.dispatch.profile.clearProfile();
    }
});
