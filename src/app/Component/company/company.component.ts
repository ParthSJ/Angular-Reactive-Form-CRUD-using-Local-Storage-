import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray} from '@angular/forms';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  form!: FormGroup;
  data: any[] = [];
  editingIndex: number = -1;
  submitButtonText: string = 'Add';
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    
    this.loadData();
  }
  

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.editingIndex === -1) {
        this.data.push(formData);
      } else {       
        this.data[this.editingIndex] = formData;
        this.editingIndex = -1; 
      }
      this.saveData();
      this.form.reset(); 
      const skillsArray = this.form.get('skills') as FormArray;
      skillsArray.clear(); 
      skillsArray.push(this.fb.control('')); 
    }
  }
  
  
  
  onEdit(index: number) {
    this.editingIndex = index;
    const selectedItem = this.data[index];
    this.form.patchValue({
      name: selectedItem.name,
      email: selectedItem.email
    });
    this.submitButtonText = 'Update'; 
  }

  onDelete(index: number) {
    this.data.splice(index, 1);
    this.saveData();
  }

  onCheckChange(event: any, index: number) {
    this.data[index].checked = event.target.checked;
  }

  onAllCheck(event: any) {
    const checked = event.target.checked;
    this.data.forEach(item => item.checked = checked);
  }
  
  onDeleteSelected() {
    this.data = this.data.filter(item => !item.checked);
    this.saveData();
  }

  loadData() {
    this.data = JSON.parse(localStorage.getItem('tableData') || '[]');
  }

  saveData() {
    localStorage.setItem('tableData', JSON.stringify(this.data));
  }
  reset(){
    this.form.reset();
    this.submitButtonText = 'Add'; 
  }
}


