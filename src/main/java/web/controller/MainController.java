package web.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import web.model.Role;
import web.model.User;
import web.service.RoleService;

import java.util.List;

@Controller
public class MainController {


    private final RoleService roleService;

    public MainController(RoleService roleService) {

        this.roleService = roleService;
    }

    @RequestMapping("/user")
    public String user(@AuthenticationPrincipal User user) {
        return "/user";
    }

    @RequestMapping("/admin")
    public ModelAndView admin(ModelAndView modelAndView) {
        List<Role> roles = roleService.allRoles();
        modelAndView.setViewName("admin");
        modelAndView.addObject("rolesList", roles);
        return modelAndView;
    }
}