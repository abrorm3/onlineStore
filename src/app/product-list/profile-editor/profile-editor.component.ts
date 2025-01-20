import {Component, effect, input, model, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Profile} from '../../shared/types';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-profile-editor',
  imports: [
    FormsModule,
    NgForOf,
    MatCheckbox
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css'
})
export class ProfileEditorComponent {
  value = input<Profile>({type: 'furniture'});
  valueChange = output<Profile>();

  options = ['furniture', 'equipment', 'stationary', 'part'];

  constructor() {
  }

  onChange() {
    this.valueChange.emit(this.value());
  }

}
