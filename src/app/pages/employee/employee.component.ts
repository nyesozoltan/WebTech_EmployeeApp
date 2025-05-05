import { Component, inject, Inject } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../_services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);
  router = inject(Router);

employeeObj: Employee = new Employee();

  ngOnInit() {
    const stored = this.employeeService.getAllEmployees();
    if (stored.length === 0) {
      this.employeeService.loadInitialEmployees().subscribe(data => {
        localStorage.setItem('employees', JSON.stringify(data));
        this.employees = data;
      });
    } else {
      this.employees = this.employeeService.loadEmployees();
    }
  }

  onEditEmployee(id: string) {
    this.router.navigate(['/employee/edit', id]);
  }

  onDeleteEmployee(id: string) {
    if (confirm('Biztosan törölni szeretné?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getAllEmployees();
    }
  } 

  addEmployee() {
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
  
}


