import { Component, inject, Inject } from '@angular/core';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../_services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);
  router = inject(Router);

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

  onEdit(id: string) {
    this.router.navigate(['/employee/edit', id]);
  }

  onDelete(id: string) {
    if (confirm('Biztosan törölni szeretné?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getAllEmployees();
    }
  }
}
