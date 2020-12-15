package web.initializer;

import org.springframework.stereotype.Component;
import web.model.Role;
import web.model.User;
import web.service.RoleService;
import web.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;

@Component
public class DbInit {
    private final UserService userService;
    private final RoleService roleService;

    public DbInit(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //@PostConstruct
    void postConstruct() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");
        roleService.add(roleAdmin);
        roleService.add(roleUser);

        User admin = new User("admin", "admin", "admin", new HashSet<>(Arrays.asList(roleAdmin, roleUser)));
        User user = new User("user", "user", "user", new HashSet<>(Collections.singleton(roleUser)));
        userService.add(admin);
        userService.add(user);
    }
}
