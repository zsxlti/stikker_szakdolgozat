package security;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Base64;

public class PasswordHasher implements PasswordEncoder
{
    @Override
    public String encode(CharSequence charSequence)
    {
        String password = charSequence.toString();
        String secret = Base64.getEncoder().encodeToString(password.getBytes());

        return  secret;
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {

        String data = encode(charSequence);
        boolean isMatch = data.equals(s);

        return isMatch;
    }
}

