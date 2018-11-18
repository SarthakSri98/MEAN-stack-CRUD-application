import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BindingService } from '../services/binding.service';
import { FormControlName,FormControl,FormGroup } from "@angular/forms";
import { Route, Routes, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @ViewChild('pickPhoto' ) pickPhoto:ElementRef 
  constructor(private _bind:BindingService, public route:ActivatedRoute, private _authService: AuthService) { }
    private mode:string = 'create';
    private postid:string;
    private postToEdit:any={};
    imagePreview:any;
    isLoading=false;
    private postsUpdated = new Subject();
    

  ngOnInit() {


    
     this.route.paramMap.subscribe( ( paramMap:ParamMap )=>{
       if(paramMap.has('postid'))
       {
          this.mode = 'edit';
          this.postid = paramMap.get('postid');
          console.log('postid',this.postid);
          this.postToEdit = this._bind.fetchPost(this.postid);
          // .then(()=>{
          //   console.log('sb');
          //   this.isLoading = false;
          // }).catch(err=>{
          //   console.log('caught the error',err);
          // });          
          console.log('imagepath',this,this.postToEdit.imagepath);
          console.log('imagepath',this,this.postToEdit.description);

          this.userForm.controls['heading'].setValue(this.postToEdit.heading);
          this.userForm.controls['description'].setValue(this.postToEdit.description);
          this.userForm.controls['image'].setValue(this.postToEdit.imagePath);
          this.imagePreview = this.postToEdit.imagePath;
       }
       else{
          this.mode = 'create';
          this.postid = null;
       }
      

     } );
  }
  onSubmit(){
    //  console.log(this.userForm.value);
    //  this._bind.warriors.push({heading:this.userForm.value.heading , content: this.userForm.value.description },
    // )
    if(this.mode == 'edit'){
      console.log('edit form',this.userForm.value);
      this._bind.updatePost(this.postid,this.userForm.value);
      this.isLoading = true;
    }
    else{
      this._bind.postData(this.userForm.value);
      console.log('create form',JSON.stringify(this.userForm.value)); 
      this.isLoading = true;  

    }
  }
  
  onImagePicked(event : Event){
    var file = (event.target as HTMLInputElement ).files[0];
    this.userForm.patchValue({image:file});  //image has been set a value equal to the file object in the userForm(reactive)
    this.userForm.get('image').updateValueAndValidity();  //This basically informs angular that I 
    //changed the value and should re evaluate that stored at value internally and all to check whether the value dispatch is valid.
    
    const reader = new FileReader(); //through this we can read data from file and save it in a variable
    reader.onload = () =>{
      this.imagePreview = reader.result;
      console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
    console.log("read"+this.pickPhoto.nativeElement.value);
    console.log(file);


    }

  userForm = new FormGroup({
    _id: new FormControl(''),
    heading: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  });
}
