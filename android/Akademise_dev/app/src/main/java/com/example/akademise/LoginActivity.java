package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
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
    /*
    Applications starts from here. If it is first time, login is expected.
    If there is a token saved (logged in before), then it says "already logged in",
    and goes to the home page.
     */
    //variables to get and save the token
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    //variables to get and save the ID
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    //API
    AkademiseApi akademiseApi;
    //xml variables
    private Button btnLogin;
    private Button btnSignup;
    private TextView email;
    private TextView password;
    //token variable
    private String myToken;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        //load token
        loadData();
        //initialize xml variables
        btnLogin = (Button) findViewById(R.id.btnLogin);
        btnSignup = (Button) findViewById(R.id.btnSignup);
        btnLogin.setOnClickListener(login);
        btnSignup.setOnClickListener(signup);
        email= findViewById(R.id.email);
        password = findViewById(R.id.password);
        //initialize retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        //initialize API
        akademiseApi = retrofit.create(AkademiseApi.class);
        //if there is a token saved already, then go to home
        jwt_validation();
    }
    //on click listener of login
    View.OnClickListener login = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            //login to app
            createUser(email.getText().toString(), password.getText().toString());
        }
    };
    //on click listener of signup
    View.OnClickListener signup = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            //go to the signup page
            openSignupActivity();
        }
    };
    //go to main activity
    public void openMainActivity(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
    //go to signup activity
    public void openSignupActivity(){
        Intent intent = new Intent(this, SignupActivity.class);
        startActivity(intent);
    }
    //after getting login info, this method is called
    private void createUser(String email, String password){
        //create a user class
        User user = new User(email, password);
        System.out.println("SAVED TOKEN: " + accessToken);

        Call<User> call = akademiseApi.createUserLogin(user);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(!response.isSuccessful()){ //there is no user with this email or password
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(LoginActivity.this, "Wrong email or password. Try again. ", Toast.LENGTH_LONG).show();
                    return;
                }
                //logged in
                User userResponse = response.body();
                System.out.println("SUCCESSFUL");
                //save token
                saveData(userResponse.getAccessToken());
                //save id
                saveIDData(userResponse.getUserId());

                Toast.makeText(LoginActivity.this, "Successful. ", Toast.LENGTH_LONG).show();
                //go to main activity after logged in successfully
                openMainActivity();

            }
            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Be sure to be connected. ", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }
    //save token
    private void saveData(String token){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(accessToken, token);
        editor.apply();
    }
    //load token
    private void loadData(){
        SharedPreferences sharedPreferences = getSharedPreferences(MyPEREFERENCES, MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }
    //if there is a token already saved, go to home
    private void jwt_validation(){
        //get loaded token
        Token token = new Token(myToken);
        //check if there is a token like this in the system
        Call<Token> call = akademiseApi.sendToken(token);
        call.enqueue(new Callback<Token>() {
            @Override
            public void onResponse(Call<Token> call, Response<Token> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");

                    return;
                }
                //if logged in before go to main activity without login.
                openMainActivity();
                Toast.makeText(LoginActivity.this, "Already logged in ", Toast.LENGTH_LONG).show();

            }
            @Override
            public void onFailure(Call<Token> call, Throwable t) {
                Toast.makeText(LoginActivity.this, "Be sure to be connected ", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }
    //save id of user
    private void saveIDData(Integer id){
        SharedPreferences sharedPreferences = getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt(accessID, id);
        editor.apply();
    }


}