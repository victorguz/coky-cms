class CreateUserDto implements UserI{
  id:number;
  first_name:string;
  second_name:string;
  first_lastname:string;
  second_lastname:string;
  email:string;
  username:string;
  password:string;
  data:any;
  created:Date;
  modified:Date;
}
