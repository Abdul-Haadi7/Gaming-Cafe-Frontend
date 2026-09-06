import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameRequirement } from '../../models/GameReq';
import { ActivatedRoute } from '@angular/router';
import { GameRequirementsService } from '../../game-requirements/game-requirements.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetRequirementsDTO } from '../../models/getRequirementsDTO';
import { EditRequirementsService } from '../edit-requirements.service';
@Component({
  selector: 'app-edit-requirements',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,CommonModule,
  ReactiveFormsModule
  ],
  templateUrl: './edit-requirements.component.html',
  styleUrl: './edit-requirements.component.css'
})
export class EditRequirementsComponent 
{
  requirements: GetRequirementsDTO =
  {
    os: '',
    processor: '',
    ram: '',
    graphicsCard: '',
    storage: '',
  }
  uploadNewReq: GameRequirement = 
  {
    gameId:0,
    os: '',
    processor: '',
    ram: '',
    graphicsCard: '',
    storage: '',
  }
  gameId = 0;
  requirementsForm: FormGroup;
  requirementsExist = false;
    constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private requirementsService: GameRequirementsService,
    private snackBar: MatSnackBar,
    private editReqService:EditRequirementsService,
    private addReqService: GameRequirementsService
  ) {
    this.requirementsForm = this.fb.group({
      os: ['', Validators.required],
      processor: ['', Validators.required],
      ram: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      storage: ['', Validators.required]
    });
  }
  ngOnInit() 
  {
    this.gameId = Number(this.route.snapshot.paramMap.get('gameId'));
    this.editReqService.getReqById(this.gameId).subscribe({
      next: (req) => 
      {
        if (req == null) 
        {
          this.requirementsExist = false;
          return;
        }
        this.requirementsExist = true;
        this.requirementsForm.patchValue({
          os: req.os,
          processor: req.processor,
          ram: req.ram,
          graphicsCard: req.graphicsCard,
          storage: req.storage,
        });
        console.log(this.requirements);
        console.log(req.graphicsCard);
      },
      error: (error) => 
      {
        console.error('Error getting game:', error);
      }
    });
  }
  get f() 
  {
    return this.requirementsForm.controls;
  }

  saveEditedReq()
  {
    if (this.requirementsForm.invalid) 
    {
      this.requirementsForm.markAllAsTouched();
      return;
    }
    const snackBarRef = this.snackBar.open(
    'Please wait',
    undefined,
    {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }
    );
    this.requirements = this.requirementsForm.value;
    if(this.requirementsExist)
    {
      this.editReqService.saveEditedReq(this.requirements, this.gameId).subscribe({
      next: (response) => 
      {
        snackBarRef.dismiss();
        console.log(response);
        this.snackBar.open('Requirements edited successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        },

        error: (error) => 
        {
          console.error('Error editing requirements:', error);

          this.snackBar.open(
            error.error?.message || 'Requirements could not be edited!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      });
    }


    else 
    {
      this.uploadNewReq.gameId = this.gameId;
      this.uploadNewReq.os = this.requirements.os;
      this.uploadNewReq.processor = this.requirements.processor;
      this.uploadNewReq.ram = this.requirements.ram;
      this.uploadNewReq.storage = this.requirements.storage;
      this.uploadNewReq.graphicsCard = this.requirements.graphicsCard;

      this.addReqService.uploadGameReq(
        this.uploadNewReq
      ).subscribe({
        next: () => {
          this.snackBar.open('Requirements added successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error(error);
          this.snackBar.open('Failed to add requirements.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
          });
        }
      });
  }
}

  onSubmit() 
  {
    if (this.requirementsForm.invalid) 
    {
      this.requirementsForm.markAllAsTouched();
      return;
    }
    this.requirements = this.requirementsForm.value;
  }
  home(){
    this.router.navigate(['/devHome']);
  }
}
