package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class PersonalInfoFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private String myToken;
    Button btn;
    List<String> researchAreas = new ArrayList<String>();
    String title;
    String university;
    String department;
    Affiliation affiliation;
    PersonalInfo personalInfo;

    TextView tvChosenTags;

    @Nullable
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_personalinfo, container, false);

        return view;
    }

    @Override

    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadData();

        btn = this.getActivity().findViewById(R.id.btnNext);
        getActivity().getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        tvChosenTags = view.findViewById(R.id.tvChosenResearchTags);


        getUniversityList();


    }

    private void createAffiliation(PersonalInfo personalInfo) {

        Call<PersonalInfo> call = akademiseApi.createAffiliation(personalInfo, "Bearer " + myToken);
        call.enqueue(new Callback<PersonalInfo>() {
            @Override
            public void onResponse(Call<PersonalInfo> call, Response<PersonalInfo> response) {


                if (!response.isSuccessful()) {
                    Log.d("Project", "onResponse: not successful");
                    Log.d("Project", myToken);
                    Log.d("NotCreated", response.toString());


                    return;
                }
                PersonalInfo affResponse = response.body();
                String content = "" + response.code();
                Log.d("Project", "onResponse: successful" + content);


            }

            @Override
            public void onFailure(Call<PersonalInfo> call, Throwable t) {
                Log.d("Project", "onFailure: failed");
                String content = "" + t.getMessage();
                System.out.println(content);

            }
        });
    }

    private void loadData() {
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    public void openMainActivity() {
        Intent intent = new Intent(getActivity(), MainActivity.class);
        startActivity(intent);
    }

    private void getTitleList(){
        Call<Result> call = akademiseApi.getTitles("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetTitles", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetTitles-success", "On response: " + response.message());
                 Result result = response.body();
                Log.d("GetTitles-success","GOR BUNU-------------------------");
                Log.d("GetTitles-success",result.getResult().toString());
                Spinner degree_spinner = (Spinner) getView().findViewById(R.id.degree_select);
                ArrayAdapter<String> adapter_3 = new ArrayAdapter<String> (getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,result.getResult());
                adapter_3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                degree_spinner.setAdapter(adapter_3);
                degree_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        String tag = parent.getItemAtPosition(position).toString();
                        title =tag;
                        getDepartmentList();

                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
            }
            @Override
            public void onFailure(Call<Result> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });
    }

    private void getDepartmentList(){
        Call<Result> call = akademiseApi.getDepartments("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetDepartments", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetDepartments-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetDepartments-success",result.getResult().toString());

                Spinner department_select_spinner = (Spinner) getView().findViewById(R.id.department_select);

                ArrayAdapter<String> adapter_2 = new ArrayAdapter<String> (getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,result.getResult());
                adapter_2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                department_select_spinner.setAdapter(adapter_2);
                department_select_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        String tag = parent.getItemAtPosition(position).toString();
                        department=tag;
                        Log.d("PersonalInfo", "onItemSelected: tag "+tag+" department: "+department);

                        getTagList();
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
            }
            @Override
            public void onFailure(Call<Result> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });
    }

    private void getTagList(){
        Call<Result> call = akademiseApi.getTags("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetTags", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetTags-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetTags-success","GOR BUNU-------------------------");
                Log.d("GetTags-success",result.getResult().toString());
                Spinner tag_spinner = (Spinner) getView().findViewById(R.id.sResearchTag);
                ArrayAdapter<String> tag_adapter = new ArrayAdapter<String> (getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,result.getResult());
                tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                tag_spinner.setAdapter(tag_adapter);
                tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {

                        String currentText = tvChosenTags.getText().toString();
                        String tag = parent.getItemAtPosition(position).toString();
                        if (!currentText.contains(tag)) {
                            researchAreas.add(tag);
                            currentText += " " + tag;

                            tvChosenTags.setText(currentText);

                            Log.d("PersonalInfo", "onViewCreated: "+title+" "+university+ ""+department);

                            affiliation= new Affiliation(title, university, department);
                            personalInfo= new PersonalInfo(researchAreas, affiliation);

                            btn.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    Log.d("buttonId", btn.getText().toString());
                                    //getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,   new HomeFragment()).commit();
                                    createAffiliation(personalInfo);

                                    openMainActivity();
                                }
                            });


                        }

                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
            }
            @Override
            public void onFailure(Call<Result> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });
    }

    private void getUniversityList(){
        Call<Result> call = akademiseApi.getUniversities("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if(!response.isSuccessful()){
                    Log.d("GetUniversity", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetUniversity-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetUniversity-success",result.getResult().toString());
                Spinner uni_spinner = (Spinner) getView().findViewById(R.id.uni_select);
                ArrayAdapter<String> adapter_uni = new ArrayAdapter<String> (getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,result.getResult());
                adapter_uni.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                uni_spinner.setAdapter(adapter_uni);
                uni_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        String tag = parent.getItemAtPosition(position).toString();
                        university=tag;

                        getTitleList();

                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> parent) {

                    }
                });
            }
            @Override
            public void onFailure(Call<Result> call, Throwable t) {

                Log.d("Get", "onFailure: " + t.getMessage());

            }
        });
    }
}






