// @ts-check
import firebase from "./firebase";
import uuidV1 from "uuid/v1";
import store from "./store";
import axios from "axios";

const registerMemberURL =
    "https://us-central1-mwema-solutions.cloudfunctions.net/registerOrganizationStaff";

export function acceptOrder(orderId: string) {
    const orderRef = firebase
        .firestore()
        .collection("orders")
        .doc(orderId);

    return orderRef.update({ status: "in progress" });
}

export function rejectOrder(orderId: string) {
    const orderRef = firebase
        .firestore()
        .collection("orders")
        .doc(orderId);

    return orderRef.update({ status: "rejected" });
}

export function requestOrderChanges(orderId: string, changes: string) {
    const orderRef = firebase
        .firestore()
        .collection("orders")
        .doc(orderId);

    return orderRef.update({ status: "changes requested", changes });
}

/**
 * Changes the status of an order to completed
 *
 * @export
 * @param {*} orderId
 * @returns promise fo the update firestore method
 */
export function completeOrder(orderId: string) {
    const orderRef = firebase
        .firestore()
        .collection("orders")
        .doc(orderId);

    return orderRef.update({ status: "completed" });
}

export function createNewCase(caseDetails: Object) {
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    return firebase
        .firestore()
        .collection("preLitigationCases")
        .add({
            ...caseDetails,
            status: "in progress",
            createdAt: serverTime,
            referenceNumber: generateOrderRefNo("Mwema Advocates")
        });
}

export function addCaseUpdate({ caseId, status, comments, attachmentURL }) {
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const profile = store.getState().profile;
    const userId = firebase.auth().currentUser.uid;
    return firebase
        .firestore()
        .collection("preLitigationCases")
        .doc(caseId)
        .collection("updates")
        .add({
            status,
            comments,
            updatedById: userId,
            updatedByName: profile.username,
            attachmentURL,
            createdAt: serverTime
        });
}

export function updateOrderFields(orderId, update) {
    return firebase
        .firestore()
        .collection("orders")
        .doc(orderId)
        .update({ ...update });
}

export function persistOrderResults(orderId, resultType, results) {
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const update = { [resultType]: { ...results }, updatedAt: serverTime };
    return firebase
        .firestore()
        .collection("orders")
        .doc(orderId)
        .update(update);
}

export function persistOrderEmbeddedResults(
    orderId,
    resultType,
    resultKey,
    results
) {
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const update = {
        [`${resultType}.${resultKey.toString()}`]: {
            ...results,
            updatedAt: serverTime
        }
    };
    return firebase
        .firestore()
        .collection("orders")
        .doc(orderId)
        .update(update);
}

/**
 * Uploads a given file to the destination folder in the default bucket
 *
 * @export
 * @param {string} file the reference to the file
 * @param {string} folder the remote folder you will be storing the file in
 * @returns {promise} to the firebase storage put method
 */
export function uploadFile(file, folder) {
    if (!folder) {
        throw new Error("You must specify what folder to upload the file in!");
    }
    const fileName = uuidV1() + "___" + file.name;
    const storageRef = firebase.storage().ref(`${folder}/`);
    return storageRef.child(fileName).put(file);
}

/**
 * Creates a new KYC specific order
 *
 * @export
 * @param {*} {
 * 	customerName,
 * 	registeretedOrganization,
 * 	registrationNumber,
 * 	tinNumber,
 * 	attachmentURL,
 * 	address,
 * 	organizationId,
 * 	organizationName,
 * 	notes
 * }
 * @returns
 */
export function createKYCOrder({
    customerName,
    registeretedOrganization,
    registrationNumber,
    tinNumber,
    country,
    region,
    district,
    box,
    attachmentURL,
    organizationId,
    organizationName,
    notes
}) {
    // Creates new orders and sets up new sub documents to keep track of the results
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("You must be registered to create an order!");
    }
    const organization = store.getState().organizations.myOrganization;
    const deliveryDate = getDeliveryDate(
        organization ? organization.packageType : "standard"
    );
    return firebase
        .firestore()
        .collection("orders")
        .add({
            customerName,
            registeretedOrganization,
            registrationNumber,
            tinNumber,
            attachmentURL,
            country,
            region,
            district,
            box,
            notes,
            createdAt: serverTime,
            deliveryDate,
            referenceNumber: generateOrderRefNo(organizationName),
            status: "pending",
            organizationId,
            organizationName,
            orderType: "kyc"
        });
}

/**
 * Creates a new order given the specific details and the services needed.
 *
 * @export
 * @param {*} object {
 * 	firstName,
 * 	lastName,
 * 	middleName,
 * 	dateOfBirth,
 * 	address,
 * 	gender,
 * 	screeningTypes,
 * 	assetsURL,
 * 	organizationId,
 * 	organizationName
 * }
 * @returns {*} promise batch commit
 */
export function createOrder({
    firstName,
    lastName,
    middleName,
    telephone,
    dateOfBirth,
    gender,
    screeningTypes = [],
    assetsURL,
    organizationId,
    organizationName,
    telephoneCode,
    idType,
    idNumber,
    country,
    region,
    box,
    district,
    idExpiry
}) {
    // Creates new orders and sets up new sub documents to keep track of the results
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("You must be registered to create an order!");
    }

    const organization = store.getState().organizations.myOrganization;
    const deliveryDate = getDeliveryDate(
        organization ? organization.packageType : "standard"
    );

    const sreenings = {};
    screeningTypes.forEach(type => (sreenings[type] = {}));

    return firebase
        .firestore()
        .collection("orders")
        .add({
            firstName,
            lastName,
            middleName,
            dateOfBirth,
            telephoneCode,
            idType,
            idNumber,
            country,
            region,
            box,
            district,
            idExpiry,
            gender,
            telephone,
            screeningTypes,
            orderType: "kye",
            ...sreenings,
            organizationId,
            organizationName,
            assetsURL,
            status: "pending",
            notes: "",
            deliveryDate,
            referenceNumber: generateOrderRefNo(organizationName),
            createdAt: serverTime,
            personMAID: null,
            updatedAt: serverTime
        });
}

export function updateOrganization(organization, organizationId) {
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("You must be registered to create an order!");
    }

    return firebase
        .firestore()
        .collection("organizations")
        .doc(organizationId)
        .update({
            ...organization,
            updatedAt: serverTime
        });
}

export function registerOrganizationMember({
    fullName,
    email,
    password,
    permissions,
    telephone,
    organizationId
}) {
    // const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("You must be registered to create an order!");
    }

    const response = {
        error: false,
        message: ""
    };

    return axios
        .post(registerMemberURL, {
            personObj: {
                fullName,
                email,
                password,
                permissions,
                telephone,
                organizationId,
                registeredBy: user.uid,
                registeredByEmail: user.email
            },
            organizationId
        })
        .then(result => {
            if (result.status !== 200) {
                // There was an error.
                response.error = true;
            }
            response.message = result.data;
            return response;
        })
        .catch(error => {
            console.error("Error making request to register [400]", error);
            response.error = true;
            response.message = "Error making request to register";
            return response;
        });

    // return firebase.firestore().collection("profiles").add
}

export function registerOrganization(organization) {
    const serverTime = firebase.firestore.FieldValue.serverTimestamp();
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("You must be registered to create an order!");
    }

    return firebase
        .firestore()
        .collection("organizations")
        .add({
            ...organization,
            createdAt: serverTime,
            timeStamp: new Date().getTime(),
            registeredBy: user.uid,
            registeredByEmail: user.email
        });
}

export function generateOrderRefNo(companyName = "") {
    let abbreviation = "";
    if (companyName.length > 3 && companyName.split(" ").length > 1) {
        abbreviation = companyName
            .split(" ")
            .map(el => el[0])
            .join("")
            .toUpperCase();
    } else if (companyName.length > 3 && companyName.split(" ").length <= 1) {
        abbreviation = companyName.substr(0, 3).toUpperCase();
    } else {
        abbreviation = companyName;
    }

    const d = new Date();
    const rand = Math.random()
        .toString(36)
        .replace("0.", "")
        .substr(6);
    return `${abbreviation}/${d.getMonth() + 1}/${d.getFullYear()}/${rand}`;
}

export function fullFormatDate(timeStamp) {
    const dateObj = new Date(timeStamp);

    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${date} ${getMonthName(dateObj)} ${year}`;
}

export function getMonthName(timeStamp) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    return months[new Date(timeStamp).getMonth()];
}

/**
 * Check if the date is valid, less than 5 years in the future, and within the past 100 years.
 *
 * @export
 * @param {*}
 * @returns
 */
export function isValidDate(dates) {
    const futureMaxYears = 10;
    const pastMaxYears = 100;
    if (Array.isArray(dates)) {
        const invalid = dates.filter(date => {
            const d = new Date(date);
            const now = new Date();
            if (isNaN(d.getTime())) {
                return true;
            }
            if (d.getFullYear() > now.getFullYear() + futureMaxYears) {
                // Check if the date is more than futureMaxYears years in the future
                return true;
            }
            if (d.getFullYear() < now.getFullYear() - pastMaxYears) {
                // check if the date is older than pastMaxYears years
                return true;
            }
            return false;
        });
        if (invalid.length > 0) {
            return false;
        }
        return true;
    }
    const d = new Date(dates);
    const now = new Date();
    if (isNaN(d.getTime())) {
        return false;
    }
    if (d.getFullYear() > now.getFullYear() + futureMaxYears) {
        // Check if the date is more than 5 years in the future
        return false;
    }
    if (d.getFullYear() < now.getFullYear() - pastMaxYears) {
        // check if the date is older than pastMaxYears years
        return false;
    }
    return true;
}

export function friendlyFormatMoney(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function friendlyFormatDate(timeStamp) {
    const dateObj = new Date(timeStamp);

    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    return `${date}/${month}/${year}`;
}

/**
 * Check to see if all the fields in a form have been filled out
 * Currently accounts for strings, boolean values and supports things to skip (exceptions)
 * @export
 * @param {*} [formState={}]
 * @param {*} [exceptions=[]]
 * @returns
 */
export function isCompleteForm(formState = {}, exceptions = []) {
    const emptyFields = Object.keys(formState).filter(key => {
        if (exceptions.includes(key)) return false; // ignore anything in exceptions
        if (typeof formState[key] === "boolean") return false; // ignore any boolean fields
        return formState[key].length < 2; // account for anything that is a string
    });

    console.log(formState);

    return emptyFields.length === 0;
}

function getDeliveryDate(packageType = "standard") {
    const date = new Date();
    if (packageType === "standard") {
        date.setDate(new Date().getDate() + 21);
    } else if (packageType === "extended") {
        date.setDate(new Date().getDate() + 14);
    } else {
        date.setDate(new Date().getDate() + 21);
    }

    return date;
}
