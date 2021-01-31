package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
/*
Displays the validation page.
The user enters the validation code.
Makes a validation request.
 */
public class ValidationFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    AkademiseApi akademiseApi;
    TextView validation;
    Button btn;
    private String myToken;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_validation, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        btn = view.findViewById(R.id.validation_button);

        loadData();
        validation = getView().findViewById(R.id.validation_code);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("button_name", btn.getText().toString());
                    createValidationCode(validation.getText().toString());


            }
        });


    }

    private void loadData(){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
    private void saveData(String token){
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(accessToken, token);
        editor.apply();
    }

    private void createValidationCode(String validation_code){
        Validation validation = new Validation(validation_code);

        Call<Validation> call = akademiseApi.createValidation(validation, "Bearer "+myToken);

        call.enqueue(new Callback<Validation>() {
            @Override
            public void onResponse(Call<Validation> call, Response<Validation> response) {
                    if (!response.isSuccessful()) {
                        System.out.println("NOT SUCCESSFUL");
                        Toast.makeText(getActivity(), "Try Again", Toast.LENGTH_LONG).show();
                        return;
                    }
                    Validation validationResponse = response.body();
                    saveData(validationResponse.getAccessToken());
                    loadData();
                    System.out.println("Validation - SUCCESSFUL");
                    System.out.println("Validation - Token: " + myToken);
                    btn.setText(getString(R.string.next));
                    getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,
                            new PersonalInfoFragment()).commit();


            }

            @Override
            public void onFailure(Call<Validation> call, Throwable t) {
                Toast.makeText(getActivity(), "Be sure to be connected", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());

            }
        });
    }
}
