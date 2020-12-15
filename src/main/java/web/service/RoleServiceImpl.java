package web.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import web.model.Role;
import web.repository.RoleRepository;

import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> allRoles() {
        return roleRepository.findAll();
    }

    @Override
    public void add(Role role) {
        roleRepository.save(role);
    }

}
