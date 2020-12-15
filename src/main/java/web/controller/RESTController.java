package web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import web.model.Role;
import web.model.User;
import web.model.UserDTO;
import web.service.RoleService;
import web.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
public class RESTController {

    private final UserService userService;
    private final RoleService roleService;

    public RESTController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @RequestMapping("/user")
    public ModelAndView user(ModelAndView modelAndView) {
        modelAndView.setViewName("user");
        return modelAndView;
    }

    @RequestMapping("/admin")
    public ModelAndView admin(ModelAndView modelAndView) {
        List<Role> roles = roleService.allRoles();
        modelAndView.setViewName("admin");
        modelAndView.addObject("rolesList", roles);
        return modelAndView;
    }

    @RequestMapping("/")
    public ModelAndView index(ModelAndView modelAndView) {
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @GetMapping("/getUser")
    public User getUser(Principal principal) {
        return userService.getUserByName(principal.getName());
    }

    @GetMapping("/allUsers")
    public List<User> allUsers() {
        return userService.allUsers();
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody UserDTO userDTO) {
        User user = new User(userDTO);
        userService.add(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PutMapping("/editUser")
    public ResponseEntity<?> editUser(@RequestBody UserDTO userDTO) {
        User user = new User(userDTO);
        userService.edit(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        userService.delete(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getUser/{name}")
    public User getById(@PathVariable(name = "name") String name) {
        return userService.getUserByName(name);
    }

    @GetMapping("/allRoles")
    public List<Role> allRoles() {
        return roleService.allRoles();
    }

}
