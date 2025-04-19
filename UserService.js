const s=require('/.RepositoryUser')
const repository_user= new s.RepisitoryUser
class UserService{
    consructor()
    {
   this.Name=Name;
   this.u_id=u_id;
   this.rol=rol;
    }
CreateUsers(Name, rol){
const p= repository_user.getID()
repository_user.SaveUser(Name,p,rol)
}
getByID(id){
return repository_user.getByID(id)
}
getallUser(){

return repository_user.getallUser() 
} 
}
exports.UserService=UserService