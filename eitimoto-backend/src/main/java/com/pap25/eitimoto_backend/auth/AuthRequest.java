package com.pap25.eitimoto_backend.auth;

import lombok.Data;

@Data
public class AuthRequest {
    public String username;
    public String password;
    public String email;
    public String contactNumber;
    public String location;
}
