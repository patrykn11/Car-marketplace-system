package com.pap25.eitimoto_backend.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    public String username;
    public String password;
    public String email;
    public String contactNumber;
    public String location;
}
