import React, {Component} from 'react';
import {Inject, ScheduleComponent, Day, Week, Month, Agenda, WorkWeek} from '@syncfusion/ej2-react-schedule';
import axios from 'axios';

import {loadCldr } from '@syncfusion/ej2-base';

loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/es/ca-gregorian.json'),
    require('cldr-data/main/es/numbers.json'),
    require('cldr-data/main/es/timeZoneNames.json')
    );

export default class Calendar extends Component{
    constructor(props){
        super(props)
        this.state = {
            scheduleData: []
        }
    }

    componentDidMount(){
        axios.get('/get/events')
        .then(res => {
            const data = res.data
            const mySchedule = []
            data.map(event => {
                const eventData = {
                    Id: event.id,
                    Subject: event.subject,
                    StartTime: new Date(event.startTime),
                    EndTime: new Date(event.endTime),
                    IsAllDay: event.isAllDayEvent,
                    type: event.tipo
                }
                mySchedule.push(eventData)
                return true
            })
            this.setState({
                scheduleData: mySchedule
            })
        })
    }

    onActionBegin = (args) => {
        console.log(args)
        if(args.requestType === "eventCreate"){
            axios.post('/new/event', {
                subject: args.addedRecords[0].Subject,
                startTime: args.addedRecords[0].StartTime,
                endTime: args.addedRecords[0].EndTime,
                isAllDayEvent: args.addedRecords[0].IsAllDay,
                type: 'event'
            })
        }
        if (args.requestType === "eventRemove"){
            axios.delete('/event/del/'+args.data[0].Id)
        }
    }

    onEventRendered = (args) => {
        if (args.data.type === "comision"){
            args.element.style.backgroundColor = 'red'
        }
    }

    render(){
        return (
        <>
            <ScheduleComponent locale="es" actionBegin={this.onActionBegin} firstDayOfWeek={1} startHour="9:00" endHour="20:00" currentView="Week" eventSettings={{ dataSource: this.state.scheduleData }} eventRendered={this.onEventRendered}>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
        </>
       )
    }
    
}