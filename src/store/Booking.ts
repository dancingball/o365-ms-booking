/**
 *  Booking Mobx Store Component
 * @author Krishan Sharma
 * @description Global store of the applicaion
 * @flow
 */
import { makeObservable, observable, action } from 'mobx';
import { getBookingServices, getBusinessData, getStaffMembers, getTimeSlots, getCalenderAppointment, getCustomQuestion } from '../services/BookingServices';
import { getHourSlots } from '../utils/hourSlots';
import { TextOverwriteType } from './model';
import moment from 'moment';
import momentTimeZone from 'moment-timezone';
import { firstLetterCapitalize, formGetDurationInSeconds } from '../utils/getDurationAndCurrency';

class Booking {
  public isLoading: boolean = false;
  public businessid: string = "";
  public accessToken: string = "";
  public bookingBusinesses: any = {};
  public businessInformation: any = {};
  public defaultBusinessHours: any = [];
  public defaultBusinessSchedulingPolicy: any = {};
  public schedulingPolicySlotInterval: any = {};
  public bookingSlots: any = [];
  public preBookingSlots: any = [];
  public initializeDataObj: any = {};
  public selectedService: any = {};
  public serviceCustomQuestions: any = {};
  public selectedStaff: any = {};
  public selectedTimeSlot: any = {}; 
  public selectDate: any = null;
  public selectedMinCurrentDate: any = null;
  public startDateTime: any = null;
  public endDateTime: any = null;
  public services = [];
  public staffMembers = [];
  public servicesSelectedDate: any = {};
  public defaultDurationBuffer:any = {};
  public selectedServiceStaffMembers = [];
  public initialize(data: any) {    
    if (data.accessToken && data.businessid) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('businessId', data.businessid);
    }
    this.initializeDataObj = data;
    console.log("initializeDataObj", this.initializeDataObj);
  }

  public setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }


  public async setbookingBusinesses() {
    try {
      const bookingBusinesses = await getBusinessData();
      this.businessInformation = bookingBusinesses;
      this.defaultBusinessHours = bookingBusinesses?.businessHours;
      this.defaultBusinessSchedulingPolicy = bookingBusinesses?.schedulingPolicy;
    } catch (error) {
      console.log(error);
    }
  }


  public async setSelectedServiceCustomQuestions(selectedServiceId: any) {
    try {
      const selectedService = await getCustomQuestion(selectedServiceId);
      console.log("setSelectedServiceCustomQuestions ~ selectedService", selectedService)

    } catch (error) {
      console.log(error);
    }
  }

  public async selectedDate(selectDate: string, isDateSelect = false) {
    const dateObj = moment(selectDate, "YYYY-MM-DD HH:mm:ss");
    const dow = dateObj.format('dddd');
    const selectedDayTimeSlot = this.defaultBusinessHours.filter((businessHour: any) => businessHour.day === dow.toLowerCase());
    // no slots available
    if (selectedDayTimeSlot?.[0].timeSlots?.[0]) {
      const startTime = selectedDayTimeSlot?.[0].timeSlots[0].startTime.split('.')[0];
      const endTime = selectedDayTimeSlot?.[0].timeSlots[0].endTime.split('.')[0];
      const schedulingInterval = this.schedulingPolicySlotInterval[this.selectedService?.id];
      const bufferObj = this.defaultDurationBuffer[this.selectedService.id];
      this.preBookingSlots = getHourSlots(startTime, endTime, this.initializeDataObj.timeformat, schedulingInterval, true, bufferObj);
      const timezoneHours = momentTimeZone().tz(momentTimeZone.tz.guess()).format('Z');
      const timeDiff = moment(timezoneHours, 'HH:mm:ss').add(-Number(this.initializeDataObj.time_diff) / 60, 'hours').format('HH:mm');
      const convertStartTime = moment(startTime, 'HH:mm:ss').add(timeDiff, 'hours').format('HH:mm');
      const convertEndTime = moment(endTime, 'HH:mm:ss').add(timeDiff, 'hours').format('HH:mm');
      this.startDateTime = `${dateObj.format("YYYY-MM-DD")}T00:00:00Z+${timeDiff}`;
      this.endDateTime = `${dateObj.format("YYYY-MM-DD")}T23:59:00Z+${timeDiff}`;
      console.log("this.selected Service", this.defaultDurationBuffer[this.selectedService.id],  this.selectedService.id);
      if(isDateSelect){
        this.selectDate = selectDate;
      }
      console.log("*******************************************************here is booking slots********************************************************")
      this.bookingSlots = getHourSlots(convertStartTime, convertEndTime, this.initializeDataObj.timeformat, schedulingInterval, false, bufferObj);
    }
  }


  public async setMinCurrentDate () {
    if(!this.selectedMinCurrentDate) {
      this.selectedMinCurrentDate = this.selectDate;
    }
  }


  public async setService(service: any, selectedDate: string) {

    const defaultDuration = formGetDurationInSeconds(service?.defaultDuration);
    const postbuffer = formGetDurationInSeconds(service?.postBuffer);
    const prebuffer = formGetDurationInSeconds(service?.preBuffer);
    this.defaultDurationBuffer[service.id] = { duration: defaultDuration, prebuffer: prebuffer , postbuffer: postbuffer};
    if(!service?.schedulingPolicy) {
      const minutes = formGetDurationInSeconds(this.defaultBusinessSchedulingPolicy?.minimumLeadTime);
      const date = moment(selectedDate).add(minutes, 'minutes').format('YYYY-MM-DD');
      this.servicesSelectedDate[service.id] = date;
      this.schedulingPolicySlotInterval[service.id] = formGetDurationInSeconds(this.defaultBusinessSchedulingPolicy?.timeSlotInterval);
    }
    if (service?.schedulingPolicy?.minimumLeadTime) {
      const minutes = formGetDurationInSeconds(service?.schedulingPolicy?.minimumLeadTime);
      const date = moment(selectedDate).add(minutes, 'minutes').format('YYYY-MM-DD');
      this.servicesSelectedDate[service.id] = date;
      this.schedulingPolicySlotInterval[service.id] = formGetDurationInSeconds(service?.schedulingPolicy?.timeSlotInterval);
    }

  }


  public async makeServiceData (services: any) {
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    this.services = services.filter((service: any) => {
      this.setService(service, currentDate)
      this.serviceCustomQuestions[service.id] = service?.customQuestions;
      if (this.initializeDataObj.default_service.includes(service.id)) { 
         return service;
      }
      if (!this.initializeDataObj.default_service) { 
          return service;
      }
    })
  }


  public async bookingServices() {
    try {
      const services = await getBookingServices();
      console.log("lion service");
      console.log(services);
      this.makeServiceData(services)
      console.log("this.services", this.services, this.serviceCustomQuestions);
    } catch (error) {
      console.log(error);
    }
  }

  public async getAvailabilityPersonalCalendar() {
    // API call and get personal calendar data
  }

  public async getWorkingStaffHours() {
    // get working hours
  }

  public async getStaffAvailabilityBusinessHours() {
    // get staff avaiable businessHours
  }

  public async getServiceCalenderView () {
    const { displayName } = this.selectedService;
    const selectQuery = 'customerName,serviceName,staffMemberIds,start';
    const filterType = 'serviceName';
    const filterName = `${displayName}`;
    console.log(this.startDateTime, this.endDateTime);

    // https://graph.microsoft.com/beta/bookingBusinesses/TestBusiness@dwsnow.com/calendarView?startDateTime=2021-11-15T00:00:00Z+05:30&endDateTime=2022-01-16T00:00:00Z+05:30$select=customerName,serviceName,staffMemberIds,start&$filter=serviceName eq 'Pet Groomer'
    const startDateTime = this.startDateTime;
    const endDateTime = this.endDateTime;
    console.log("payload in service", filterType, filterName, selectQuery, startDateTime, endDateTime);
    const calenderViewData = await getCalenderAppointment({ filterType, filterName, selectQuery, startDateTime, endDateTime });
    console.log({ calenderViewData })
  }

  public staffWorkingHoursSlot() {
    // console.log("selectedStaffMember", this.selectedStaff);
    if(this.selectedStaff.availabilityIsAffectedByPersonalCalendar) {
      this.getAvailabilityPersonalCalendar();
    };
    if(!this.selectedStaff.useBusinessHours) {
      this.getWorkingStaffHours();
    };
    if(this.selectedStaff.useBusinessHours) {
      this.getStaffAvailabilityBusinessHours();
    };
  }

  public selectedStaffMember(selectStaffId: string) {
    console.log("selectedStaffMember", selectStaffId);
    if(selectStaffId === 'anyone') {
      // all booking slots are selected
      return;
    };

    if(selectStaffId !== 'anyone') {
      // fetch selected staff
      // fetch calendarView 
      this.selectedStaff = this.staffMembers.filter(staff => staff?.id === selectStaffId);
      console.log('this.selected date', this.selectDate);
    }
  }

  public async bookingSaffMembers() {
    try {
      const staff = await getStaffMembers();
      this.staffMembers = staff;
      // console.log("staff", staff);
      this.setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  public async timeSlotsBySerivce(payload: any) {
    console.log({ payload });
    debugger;
    try {
      const timeSlots = await getTimeSlots(payload);
      console.log(timeSlots);
    } catch (error) {
      console.log(error);
    }
  }

  public async resetSelectService() {
    this.selectDate = null;
    this.selectDate = null;
    this.selectedMinCurrentDate = null;
    this.selectedService = {};
    this.selectedStaff = [{id: 'anyone', displayName: 'Anyone'}];
    this.selectedServiceStaffMembers = [];
    this.bookingSlots = [];
  }

  public async getDateOnServiceSelect(date: any) {
    const selectedDateWeek = moment(date).day()
    if (this.defaultBusinessHours[selectedDateWeek]?.timeSlots?.length) {
      this.selectDate = moment(date).weekday(selectedDateWeek).format('YYYY-MM-DD');
      this.setMinCurrentDate();
      if (this.selectDate) this.selectedDate(this.selectDate);
      return;
    } else {
      if (!this.selectDate) {
        const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
        this.getDateOnServiceSelect(nextDate);
      }
    }
  }


  public setSelectedService(service: any) {
    // console.log("services", this.services);
    this.resetSelectService();
    this.selectedService = service;
    this.setSelectedServiceCustomQuestions(service?.id);
    const filterMembers = this.staffMembers.filter((staff): any => {
      if (service.staffMemberIds.includes(staff?.id)) {
        return staff;
      }
    });
    this.selectedServiceStaffMembers = [{id: 'anyone', displayName: 'Anyone'},...filterMembers];
    const minLeadDate = this.servicesSelectedDate[service.id];
    if(minLeadDate) {
      this.getDateOnServiceSelect(minLeadDate);
      // this.getServiceCalenderView();
    }
    // console.log("preBookingSlots", this.preBookingSlots);
  }

  public async setSelectedTimeSlot(slot: any, index) {
    console.log("index", index);
    this.selectedTimeSlot = slot;
  }

  public dateTimeTimeZone (dateTime?: string) {
    // convert date into datetime according to timezone and pre and post buffer
    return {
      "@odata.type" : "#microsoft.graph.dateTimeTimeZone",
      "dateTime" : `${dateTime}.0000000Z`,
      "timeZone" : "UTC"
    }
  }


  public makeAppointmentData ({ customeraddress }) {
			const CustomerLocation = {
					"@odata.type" : "#microsoft.graph.location",
					"displayName" : customeraddress,
					"address" : {
						"@odata.type" : "#microsoft.graph.physicalAddress",
						"street" : customeraddress,
						"type@odata.type" : "#microsoft.graph.physicalAddressType"
           }
          };
          
        const serviceId = ''
        const serviceName = '';
        const start = this.dateTimeTimeZone(this.selectDate);
        const end = this.dateTimeTimeZone();
  }



  public createAppointment ({ name, phone, email, address, notes}: any) {
    console.log({ name, phone, email, address, notes});
    console.log("selected service,staff and selected Date", this.selectedService.id, this.selectDate, this.preBookingSlots);
  }

  public constructor() {
    makeObservable(this, {
      initialize: action,
      setbookingBusinesses: action,
      bookingServices: action,
      setSelectedService: action,
      bookingSaffMembers: action,
      createAppointment: action,
      setSelectedTimeSlot: action, 
      isLoading: observable,
      accessToken: observable,
      businessid: observable,
      initializeDataObj: observable,
      services: observable,
      selectedService: observable,
      selectedServiceStaffMembers: observable,
      selectedMinCurrentDate: observable,
      selectedStaff: observable,
      bookingSlots: observable,
      selectDate: observable,
      selectedTimeSlot: observable,
    })
  }
}
export default new Booking();
