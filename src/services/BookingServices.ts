/**
 * booking services.
 */
import { httpservice } from "./httpservice";
import { constants } from "../constants/constant";
const businessid = localStorage.getItem('businessId');


export function getBusinessData() {
    // solutions/
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}`)
        .then(function ({ data }: any) {            
            return data;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}

export function getBookingServices() {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.SERVICES}`)
        .then(function ({ data }: any) {
            // console.log('get getBookingServices', data);
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}

export function getCustomQuestion(serviceId: string) {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.SERVICES}/${serviceId}`)
        .then(function ({ data }: any) {
            console.log('get getCustomQuestion', data);
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}

export function getStaffMembers() {
    return httpservice()
        .get(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.STAFF_MEMBERS}`)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}

export function getTimeSlots(payload) {
    console.log("payload in service", payload);
    return httpservice()
        .post(`${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.STAFF_MEMBERS}`)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}

export function getCalenderAppointment({ startDateTime, endDateTime, filterType, filterName, selectQuery }: any) {
    // console.log("payload in service", filterType, filterName, selectQuery);
    const filter = `${filterType} eq '${filterName}'`
    const url = `${constants.API.BOOKING_BUSINESSES_URL}/${businessid}/${constants.API.CALENDAR_VIEW}?startDateTime=${startDateTime}&endDateTime=${endDateTime}$select=${selectQuery}&$filter=${filter}`
    return httpservice()
        .get(url)
        .then(function ({ data }: any) {
            return data.value;
        })
        .catch(function (error: { data: any; }) {
            return error.data;
        });
}





