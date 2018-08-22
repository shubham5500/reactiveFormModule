import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Molo', 'Yolo'];

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenUserName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asynValidator)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    


    //LESSON 

    
    //Setting the value of entire form at once:->

    // this.signUpForm.setValue({
    //   userData: {
    //     username: 'Shubham',
    //     email: 'Yolo@yolo.com'
    //   },
    //   gender: 'male',
    //   hobbies: []
    // })
    
    //Patching the value of form control at once:->

    // this.signUpForm.patchValue({
    //   userData: {
    //     username: 'Ashutosh'
    //   }
    // })
    

    //Listening to value change of the Entire form:->

    // this.signUpForm.valueChanges.subscribe((value)=>{
    //   console.log(value)
    // });


    //Listening to value change of the individual form control:->

    // this.signUpForm.get('userData.username').valueChanges.subscribe((value)=>{
    //   console.log(value)
    // })


    //Listening to status change of the individual form control & Similarli we can do this for the entire form:->
    // this.signUpForm.get('userData.email').statusChanges.subscribe((status)=>{
    //   console.log(status);
    // })
  }


  onSubmit(){
    console.log(this.signUpForm)
  }


  //Dynamic form control i.e FormArray
  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }


  //Custom Validator
  forbiddenUserName (control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'invalidNames': true};
    }
    return null;
  }
  
  //Custom Async Validator
  asynValidator(control){
   const promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
      if(control.value === 'test@test.com'){
        resolve({'invalidEmail': true})
      }else{
        resolve(null)
      }
    }, 3000);
   })
   return promise;
  } 
}
