import { Component } from '@angular/core';
import { Appointment } from '../models/appointment'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})
export class ApplicationListComponent implements OnInit{

  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit():void {
    
    let savedappointments = localStorage.getItem("appointments")
    this.appointments = savedappointments ? JSON.parse(savedappointments) : [];
  }

  addNewAppointment() {
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppmnt: Appointment ={
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }

      this.appointments.push(newAppmnt);
      console.log('------------------', this.appointments);
      this.newAppointmentDate = new Date();
      this.newAppointmentTitle = ""
    }

    localStorage.setItem('appointments', JSON.stringify(this.appointments))
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    console.log('------------------after deletion', this.appointments);
    localStorage.setItem('appointments', JSON.stringify(this.appointments))
  }
}
