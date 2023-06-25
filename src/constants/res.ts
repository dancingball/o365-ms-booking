export const busniessData = {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#solutions/bookingBusinesses/$entity",
    "id": "TestBusiness@dwsnow.com",
    "displayName": "Pet Hospital",
    "businessType": "Consulting Services",
    "phone": "1234567899",
    "email": "example@mail.com",
    "webSiteUrl": "http://wpintegrate.com/",
    "defaultCurrencyIso": "USD",
    "isPublished": true,
    "publicUrl": "https://outlook.office365.com/owa/calendar/TestBusiness@dwsnow.com/bookings/",
    "languageTag": null,
    "address": {
        "street": "",
        "city": "",
        "state": "",
        "countryOrRegion": "",
        "postalCode": ""
    },
    "businessHours": [
        {
            "day": "sunday",
            "timeSlots": []
        },
        {
            "day": "monday",
            "timeSlots": [
                {
                    "startTime": "08:00:00.0000000",
                    "endTime": "17:00:00.0000000"
                }
            ]
        },
        {
            "day": "tuesday",
            "timeSlots": [
                {
                    "startTime": "08:00:00.0000000",
                    "endTime": "17:00:00.0000000"
                }
            ]
        },
        {
            "day": "wednesday",
            "timeSlots": [
                {
                    "startTime": "08:00:00.0000000",
                    "endTime": "17:00:00.0000000"
                }
            ]
        },
        {
            "day": "thursday",
            "timeSlots": [
                {
                    "startTime": "08:00:00.0000000",
                    "endTime": "17:00:00.0000000"
                }
            ]
        },
        {
            "day": "friday",
            "timeSlots": [
                {
                    "startTime": "08:00:00.0000000",
                    "endTime": "17:00:00.0000000"
                }
            ]
        },
        {
            "day": "saturday",
            "timeSlots": []
        }
    ],
    "schedulingPolicy": {
        "timeSlotInterval": "PT1H",
        "minimumLeadTime": "P1D",
        "maximumAdvance": "P365D",
        "sendConfirmationsToOwner": true,
        "allowStaffSelection": true
    }
}