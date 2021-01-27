package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import org.w3c.dom.Text;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SignupFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    Button btn;
    private String myToken;
    private  Integer myId;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_signup, container, false);
        btn = view.findViewById(R.id.signup_button);
        loadData();
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);



        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        TextView emailView = view.findViewById(R.id.email);
        TextView passwordView = view.findViewById(R.id.password);
        TextView nameView = view.findViewById(R.id.name_signup);
        TextView surnameView = view.findViewById(R.id.surname);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createUser(emailView.getText().toString(), passwordView.getText().toString(), nameView.getText().toString(), surnameView.getText().toString());
                System.out.println("EMAIL: " + emailView.getText().toString());
                System.out.println("PASSWORD: " + passwordView.getText().toString());
                System.out.println("NAME: " + nameView.getText().toString());
                System.out.println("SURNAME: " + surnameView.getText().toString());
            }
        });
    }

    private void createUser(String email, String password, String name, String surname){
        User user = new User(email, password, name, surname);

        Call<User> call = akademiseApi.createUser(user);


        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if(!response.isSuccessful()){
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getActivity(), "Try again", Toast.LENGTH_LONG).show();
                    return;
                }
                User userResponse = response.body();
                System.out.println("SUCCESSFUL");
                System.out.println("Token: " + userResponse.getAccessToken());
                System.out.println("userId: " + userResponse.getUserId());
                saveData(userResponse.getAccessToken());
                saveIDData(userResponse.getUserId());
                btn.setText(getString(R.string.validate));
                getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,
                        new ValidationFragment()).commit();

            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });
    }

    private void saveData(String token){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(accessToken, token);
        editor.apply();
    }

    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");

    }

    private void saveIDData(Integer id){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putInt(accessID, id);
        editor.apply();
    }

    private void loadIDData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }
}
