package com.planning.api.security.models;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotNull
    private String username;

    @NotNull
    private String password;
}
