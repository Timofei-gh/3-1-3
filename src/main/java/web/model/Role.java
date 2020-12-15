package web.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @Column(name = "role")
    private String role;

    public Role() {

    }

    public Role(int id, String role) {
        this.id = id;
        this.role = role;
    }

    public Role(int id) {
        this.id = id;
    }

    public Role(String role) {
        this.role = role;
    }

    @Transient
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String getAuthority() {
        return role;
    }
}
