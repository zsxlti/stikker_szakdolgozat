package security;

import entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import repositories.IUserRepository;

@Service
public class AppUserDetailsService extends Exception implements UserDetailsService
{
    @Autowired
    private IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String uniqID)
    {
        try
        {
            final UserEntity user = userRepository.findByUniqID(uniqID);


            if (user == null)
            {
                throw new UsernameNotFoundException("User with uniq ID: '" + uniqID + "' not found");
            }

            return org.springframework.security.core.userdetails.User.withUsername(user.getUniqID())
                                                                     .password(user.getPassword())
                                                                     .authorities(user.getRole())
                                                                     .accountExpired(false)
                                                                     .accountLocked(false)
                                                                     .credentialsExpired(false)
                                                                     .disabled(false)
                                                                     .build();
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}
