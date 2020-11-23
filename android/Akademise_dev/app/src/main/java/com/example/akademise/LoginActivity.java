package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.w3c.dom.Text;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private Button btnLogin;
    private Button btnSignup;
    private TextView email;
    private TextView password;
    private String myToken;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        loadData();


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
        System.out.println("SAVED TOKEN: " + accessToken);

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
                saveData(userResponse.getAccessToken());
                loadData();
                System.out.println("myToken: " + myToken);
                //Toast.makeText(LoginActivity.this, "TOKEN: " + myToken, Toast.LENGTH_LONG).show();
                openMainActivity();

            }
            @Override
            public void onFailure(Call<User> call, Throwable t) {
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }

    private void saveData(String token){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(accessToken, token);
        editor.apply();
    }

    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }
}