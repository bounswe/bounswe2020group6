package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.w3c.dom.Text;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private Button btnLogin;
    private Button btnSignup;
    private TextView email;
    private TextView password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        btnLogin = (Button) findViewById(R.id.btnLogin);
        btnSignup = (Button) findViewById(R.id.btnSignup);
        btnLogin.setOnClickListener(login);
        btnSignup.setOnClickListener(signup);
        email= findViewById(R.id.email);
        password = findViewById(R.id.password);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);


    }


    View.OnClickListener login = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            createUser(email.getText().toString(), password.getText().toString());
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

    private void createUser(String email, String password){
        User user = new User(email, password);

        Call<User> call = akademiseApi.createUserLogin(user);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    return;
                }

                User userResponse = response.body();
                System.out.println("SUCCESSFUL");
                System.out.println("Token: " + userResponse.getAccessToken());

            }
            @Override
            public void onFailure(Call<User> call, Throwable t) {
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }


}