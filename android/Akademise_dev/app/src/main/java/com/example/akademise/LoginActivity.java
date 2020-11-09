package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class LoginActivity extends AppCompatActivity {
    private Button btnLogin;
    private Button btnSignup;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        btnLogin = (Button) findViewById(R.id.btnLogin);
        btnSignup = (Button) findViewById(R.id.btnSignup);
        btnLogin.setOnClickListener(login);
        btnSignup.setOnClickListener(signup);
    }

    View.OnClickListener login = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            openMainActivity();
        }
    };
    View.OnClickListener signup = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            openSignupActivity();
        }
    };


    public void openMainActivity(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
    public void openSignupActivity(){
        Intent intent = new Intent(this, SignupActivity.class);
        startActivity(intent);
    }


}