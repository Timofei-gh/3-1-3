package web.model;

import java.util.Set;

public class UserDTO {

    private int id;
    private String name;
    private String lastName;
    private String password;
    private Set<Role> roles;

    public UserDTO() {
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

     public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLastName() { return lastName;}

    public String getPassword() {
        return password;
    }

    public Set<Role> getRoles() {
        return roles;
    }
}


