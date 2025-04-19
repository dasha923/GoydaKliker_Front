class User{
    constructor(Name, id,rol)
{
this.Name=this.Name;
this.id=this.id;
this.rol=rol;
}
}


class RepositoryUser{
user_list=[new User("Иванов", 1, false)]

getID()
{ let user_id
 for( let i of this.user_list){ 
    
    if(i.id>=user_id){
        user_id=i.id;
}
return user_id+1
}
}
getByID(id)
{
for(i of this.user_list)
    {  
if(i.id=id){
    return i;
}
return null
}
}
SaveUser(Name, id, rol)
{
let user=this.getByID(id)
if(user)
{
 this.Name=Name;
 this.id=id;
 this.rol=rol;   
}
else{
user=new User(Name,id,rol)
this.user_list.push(user)
}
}
getallUser(){
console.log(this.user_list)
return this.user_list

}
}
exports.RepositoryUser=RepositoryUser