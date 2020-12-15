package web.model;

import java.util.Set;

public class UserDTO {

    private int id;

    private String name;

    private String lastName;

    private String password;

    private Set<Role> roles;

    public UserDTO(String name, String lastName, String password, String admin, String user, Set<Role> roles) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.roles = roles;
    }

    public UserDTO() {
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
