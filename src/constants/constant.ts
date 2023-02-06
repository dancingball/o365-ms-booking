//**********************************************************************
//    Purpose: <contains the constant>
//   SN  Date       Change Description      created By
//   1   16/09/2021     Base Version        Krishan Sharma
//**********************************************************************
const apiEndPoint = 'https://graph.microsoft.com';
const apiVersion = 'v1.0';
export const constants = {
    API_URL: `${apiEndPoint}/${apiVersion}`,
    TENANT_URL: 'https://login.windows.net/',
    API_URL_IMAGE: '/',
    API: {
        BOOKING_BUSINESSES_URL: '/solutions/bookingBusinesses', 
        SERVICES: 'services',
        STAFF_MEMBERS: 'staffMembers',
        TENANT_URL_CONFIG: '.onmicrosoft.com/.well-known/openid-configuration',
        CALENDAR_VIEW: 'calendarView',
        QUESTIONS: 'customQuestions',
    },
    TITLE: {
        "o365 Booking": "o365 Booking",
    }
};

export const text_overwrite =  {
    selectService: "Reserve your time slot",
    selectTime: "",
    addYourDetails: "Add Your Details (Translated)",
    submitButtonTxt: "",
    message: "",
    yourName: "",
    creditordebitcard: "",
    messageHeading: "",
    addressHere: "",
    thankYouMessage: "",
    slotNotAvailable: "",
    phone: "",
    email: "",
    minutes: ""
  };

export const initializeData = {
    accessToken: "eyJ0eXAiOiJKV1QiLCJub25jZSI6ImhVdl85eUxhYmNiQ1FUd1RiYkJOVHBoQXlPeGRxdk5uZWJuMnRNVDhiSWsiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iN2UyOGJlZC1iZDliLTQ0ZTItODIzNi1mZmIxNTlmMjYzNGMvIiwiaWF0IjoxNjg4NDcyMjIwLCJuYmYiOjE2ODg0NzIyMjAsImV4cCI6MTY4ODQ3NjEyMCwiYWlvIjoiRTJaZ1lMaDgycjZPNDd1NnlYekw1c0I5dWJla0FRPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJib29raW5nIGxvY2FsIEFQUCIsImFwcGlkIjoiYWFiMjcyYTktZmNhYS00NzZjLWE4ZTQtOWM1MmVmMWY5MDA4IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjdlMjhiZWQtYmQ5Yi00NGUyLTgyMzYtZmZiMTU5ZjI2MzRjLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiMDdlNzUwYTQtZTAwMi00NmEwLWJlZTgtMjYwMmNiOGVmYzFhIiwicmgiOiIwLkFWc0E3WXZpdDV1OTRrU0NOdi14V2ZKalRBTUFBQUFBQUFBQXdBQUFBQUFBQUFCYkFBQS4iLCJyb2xlcyI6WyJCb29raW5nc0FwcG9pbnRtZW50LlJlYWRXcml0ZS5BbGwiLCJDYWxlbmRhcnMuUmVhZCIsIkJvb2tpbmdzLlJlYWQuQWxsIiwiQ2FsZW5kYXJzLlJlYWRCYXNpYy5BbGwiLCJDYWxlbmRhcnMuUmVhZFdyaXRlIl0sInN1YiI6IjA3ZTc1MGE0LWUwMDItNDZhMC1iZWU4LTI2MDJjYjhlZmMxYSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6ImI3ZTI4YmVkLWJkOWItNDRlMi04MjM2LWZmYjE1OWYyNjM0YyIsInV0aSI6IkdiaklRc2JHMTBXdjk1cExsckpOQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjA5OTdhMWQwLTBkMWQtNGFjYi1iNDA4LWQ1Y2E3MzEyMWU5MCJdLCJ4bXNfdGNkdCI6MTMwOTQ1NTE4MH0.UFyYWJGX044nn9AA3w58qX1PB2y2Cqm8orB4PrHnrcBM0jcvhnIJlo9nLWveBJrn-8BLgtCYdbWsO2eR6-Ig10ZXFT6W3O0K_xcpnpngG18jVZnKxzYdMk5nGFqe8bHVriS8yiSgioC2DG3TQfQGBjttpahNc1MX1yhxkUuUNlRxlR4SIpMrgnJwjITLDhEJnrCHpeoMTXjl1zjOZAHZT7mX3MlQGHgp9bmXiAscUXiaLzphN9FiDIUiZb6ISkeehw05p07tQsXAhSPiRmM1ckgqWN6D9ergMlmlG8c1h-N9aekOxblYtjvaxCV67550krQrvmyxyKgpGce5JS1uCg",
    userbinding: "no",
    template: "temp_ks_long_form_tpl.php",
    businessid: "TestBusiness@dwsnow.com",
    show_service_image: "yes",
    timeformat: "12",
    time_diff: "-240",
    timezone: "America/New_York",
    showtimezone: "no",
    cal_locale: "en",
    firstday: "",
    text_overwrite: text_overwrite,
    default_service: "", //c635047e-6d09-4d5b-98db-377c032e8dba,2e891f79-99ce-4247-852f-81fcd4f5ee91
    default_staff: "",
    is_redirect: "no",
    redirect_url: "https://wpintegrate.net/microsoft-booking-thank-you-page/",
    belowcontactdetail: "",
    booking_default_selected_service: "",
}