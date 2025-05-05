import { Component, inject, Inject } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../_services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {  
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);
  router = inject(Router);
  employeeObj: Employee = new Employee();

  public departments: string[] = [
    'Beszerzés',
    'HR',
    'Informatika',
    'Logisztika',
    'Marketing',
    'Pénzügy',
    'Ügyfélszolgálat'
  ].sort();

  ngOnInit() {
    const stored = this.employeeService.loadEmployees();
    if (stored.length === 0) {
      this.employeeService.loadInitialEmployees().subscribe(data => {
        localStorage.setItem('employees', JSON.stringify(data));
        this.employees = data;
      });
    } else {
      this.employees = stored;
    }
  }

  onEditEmployee(id: string) {
    const employee = this.employeeService.getEmployeeById(id);
    if (employee) {
      this.employeeObj = { ...employee }; // másolat, ne közvetlen referencia
    }
  }

  onDeleteEmployee(id: string) {
    if (confirm('Biztosan törölni szeretné?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getAllEmployees();
    }
  } 

  onSaveEmployee() {
    // Mezők kitöltésének ellenőrzése
  const {
    employeeName,
    emailId,
    department,
    gender,
    birthDate
  } = this.employeeObj;

  if (!employeeName || !emailId || !department || !gender || !birthDate) {
    alert('Minden mezőt ki kell tölteni!');
    return;
  }

  // Ellenőrzés: legalább 16 éves?
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const isOldEnough = (age > 16) || (age === 16 && today >= new Date(birth.setFullYear(birth.getFullYear() + 16)));

  if (!isOldEnough) {
    alert('A dolgozónak legalább 16 évesnek kell lennie!');
    return;
  }

    const newEmployee = new Employee();
    newEmployee.employeeId = crypto.randomUUID();
    newEmployee.employeeName = this.employeeObj.employeeName;
    newEmployee.emailId = this.employeeObj.emailId;
    newEmployee.department = this.employeeObj.department;
    newEmployee.gender = this.employeeObj.gender;
    newEmployee.birthDate = new Date(this.employeeObj.birthDate);
    this.employeeService.addEmployee(newEmployee);
    this.employees = this.employeeService.getAllEmployees();
    this.employeeObj = new Employee();
  }

  onUpdateEmployee() {
    const {
      employeeId,
      employeeName,
      emailId,
      department,
      gender,
      birthDate
    } = this.employeeObj;
  
    if (!employeeName || !emailId || !department || !gender || !birthDate) {
      alert('Minden mezőt ki kell tölteni!');
      return;
    }
  
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const isOldEnough = (age > 16) || (age === 16 && today >= new Date(birth.setFullYear(birth.getFullYear() + 16)));
  
    if (!isOldEnough) {
      alert('A dolgozónak legalább 16 évesnek kell lennie!');
      return;
    }

    const updatedEmployee = new Employee();
    updatedEmployee.employeeId = employeeId;
    updatedEmployee.employeeName = employeeName;
    updatedEmployee.emailId = emailId;
    updatedEmployee.department = department;
    updatedEmployee.gender = gender;
    updatedEmployee.birthDate = new Date(birthDate);
  
    this.employeeService.updateEmployee(updatedEmployee);
    this.employees = this.employeeService.getAllEmployees();
    this.employeeObj = new Employee();
  }

}
