package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import web.model.Role;
import web.service.RoleService;

import java.util.List;

@Controller
public class MainController {


    private final RoleService roleService;

    public MainController(RoleService roleService) {

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
}