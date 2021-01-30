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
import android.widget.EditText;
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

//personal info of the user
public class PersonalInfoFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    AkademiseApi akademiseApi;
    private String myToken;
    Button btn;
    List<String> researchAreas = new ArrayList<String>();
    String title;
    String university;
    String department;
    Affiliation affiliation;
    PersonalInfo personalInfo;
    TextView titleEntry;
    TextView departmentEntry;
    TextView universityEntry;
    TextView researchTagEntry;


    TextView tvChosenTags;

    @Nullable
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_personalinfo, container, false);

        return view;
    }

    @Override
//set the layout and layput elements
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadData();

        btn = view.findViewById(R.id.personal_info_button);
        getActivity().getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        tvChosenTags = view.findViewById(R.id.tvChosenResearchTags);
        titleEntry = view.findViewById(R.id.etTitleEntry);
        researchTagEntry = view.findViewById(R.id.etResearchTagEntry);
        universityEntry = view.findViewById(R.id.etUniversityEntry);
        departmentEntry = view.findViewById(R.id.etDepartmentEntry);

//get the university options
        getUniversityList();


    }

    //create affiliation
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

    //load bearer token
    private void loadData() {
        SharedPreferences sharedPreferences = this.getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    //go back to main activivy
    public void openMainActivity() {
        Intent intent = new Intent(getActivity(), MainActivity.class);
        startActivity(intent);
    }

    //get the title options(prof., msc etc.)
    private void getTitleList() {
        Call<Result> call = akademiseApi.getTitles("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if (!response.isSuccessful()) {
                    Log.d("GetTitles", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetTitles-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetTitles-success", "GOR BUNU-------------------------");
                Log.d("GetTitles-success", result.getResult().toString());
                Spinner degree_spinner = (Spinner) getView().findViewById(R.id.degree_select);
                List<String> titleList = result.getResult();
                titleList.add(0, "Choose Title");
                titleList.add("Not Listed");
//dropdown list and spinner
                ArrayAdapter<String> adapter_3 = new ArrayAdapter<String>(getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item, titleList);

                adapter_3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

                degree_spinner.setAdapter(adapter_3);
                degree_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {
                            //get which title is selected
                            String tag = parent.getItemAtPosition(position).toString();
                            title = tag;

                        } else {
                            getDepartmentList();
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

    //get the department options
    private void getDepartmentList() {
        Call<Result> call = akademiseApi.getDepartments("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if (!response.isSuccessful()) {
                    Log.d("GetDepartments", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetDepartments-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetDepartments-success", result.getResult().toString());

                Spinner department_select_spinner = (Spinner) getView().findViewById(R.id.department_select);
//show the department list
                List<String> departmentList = result.getResult();
                departmentList.add(0, "Choose Department");
                departmentList.add("Not Listed");

                ArrayAdapter<String> adapter_2 = new ArrayAdapter<String>(getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item, departmentList);
                adapter_2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                department_select_spinner.setAdapter(adapter_2);
                department_select_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    //set the selected department
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {
                            String tag = parent.getItemAtPosition(position).toString();

                            department = tag;
                            Log.d("PersonalInfo", "onItemSelected: tag " + tag + " department: " + department);


                        } else {

                            getTagList();
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

    //get the available tag list
    private void getTagList() {
        Call<Result> call = akademiseApi.getTags("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if (!response.isSuccessful()) {
                    Log.d("GetTags", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetTags-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetTags-success", "GOR BUNU-------------------------");
                Log.d("GetTags-success", result.getResult().toString());
                Spinner tag_spinner = (Spinner) getView().findViewById(R.id.sResearchTag);
                List<String> tagList = result.getResult();
                tagList.add(0, "Choose Tag");
                ArrayAdapter<String> tag_adapter = new ArrayAdapter<String>(getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item, tagList);
                //show in dropdown menu
                tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                tag_spinner.setAdapter(tag_adapter);
                tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {

                            String currentText = tvChosenTags.getText().toString();
                            String tag = parent.getItemAtPosition(position).toString();
                            if (!currentText.contains(tag) && !tag.equals("Not Listed")) {
                                researchAreas.add(tag);
                                currentText += " " + tag;

                                tvChosenTags.setText(currentText);

                                Log.d("PersonalInfo", "onViewCreated: " + title + " " + university + "" + department);
                            }
                        }

                        //if user chose not listed as her title, add her title to the database
                        btn.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View v) {
                                if (title.equals("Not Listed")) {
                                    title = titleEntry.getText().toString();
                                    Title _title = new Title(title);
                                    Call<Title> inside_call = akademiseApi.addTitle(_title, "Bearer " + myToken);
                                    inside_call.enqueue(new Callback<Title>() {
                                        @Override
                                        public void onResponse(Call<Title> call, Response<Title> response) {
                                            if (!response.isSuccessful()) {
                                                Log.d("Not Successful", "onResponse: " + response.code());
                                                return;
                                            }
                                            Log.d("Successful", "onResponse: " + response.body());


                                        }

                                        @Override
                                        public void onFailure(Call<Title> call, Throwable t) {

                                        }
                                    });
                                }
                                //if user chose not listed as her university, add her university to the database

                                if (university.equals("Not Listed")) {
                                    university = universityEntry.getText().toString();
                                    University _university = new University(university);
                                    Call<University> inside_call2 = akademiseApi.addUniversity(_university, "Bearer " + myToken);
                                    inside_call2.enqueue(new Callback<University>() {
                                        @Override
                                        public void onResponse(Call<University> call, Response<University> response) {

                                        }

                                        @Override
                                        public void onFailure(Call<University> call, Throwable t) {

                                        }
                                    });
                                }
                                //if user chose not listed as her department, add her department  to the database

                                if (department.equals("Not Listed")) {
                                    department = departmentEntry.getText().toString();
                                    Department _department = new Department(department);
                                    Call<Department> inside_call3 = akademiseApi.addDepartment(_department, "Bearer " + myToken
                                    );
                                    inside_call3.enqueue(new Callback<Department>() {
                                        @Override
                                        public void onResponse(Call<Department> call, Response<Department> response) {

                                        }

                                        @Override
                                        public void onFailure(Call<Department> call, Throwable t) {

                                        }
                                    });
                                }
                                //if user chose not listed as a tag, add the tag  to the database

                                if (researchTagEntry.getText().length() > 0) {
                                    Tag _tag = new Tag(researchTagEntry.getText().toString());
                                    researchAreas.add(researchTagEntry.getText().toString());
                                    Call<Tag> inside_call4 = akademiseApi.addTag(_tag, "Bearer " + myToken);
                                    inside_call4.enqueue(new Callback<Tag>() {
                                        @Override
                                        public void onResponse(Call<Tag> call, Response<Tag> response) {

                                        }

                                        @Override
                                        public void onFailure(Call<Tag> call, Throwable t) {

                                        }
                                    });

                                }
                                //create the affiliation info
                                affiliation = new Affiliation(title, university, department);
                                //cerate the related personel info
                                personalInfo = new PersonalInfo(researchAreas, affiliation);
                                Log.d("buttonId", btn.getText().toString());
                                //getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,   new HomeFragment()).commit();
                                createAffiliation(personalInfo);
                                //go to main activity
                                openMainActivity();
                            }
                        });


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

    //get the university list in database
    private void getUniversityList() {
        Call<Result> call = akademiseApi.getUniversities("Bearer " + myToken);
        call.enqueue(new Callback<Result>() {
            @Override
            public void onResponse(Call<Result> call, Response<Result> response) {
                if (!response.isSuccessful()) {
                    Log.d("GetUniversity", "onResponse: " + response.code());
                    return;
                }
                Log.d("GetUniversity-success", "On response: " + response.message());
                Result result = response.body();
                Log.d("GetUniversity-success", result.getResult().toString());
                Spinner uni_spinner = (Spinner) getView().findViewById(R.id.uni_select);
                List<String> uniList = result.getResult();
                uniList.add(0, "Choose University");
                uniList.add("Not Listed");
                ArrayAdapter<String> adapter_uni = new ArrayAdapter<String>(getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item, uniList);

                adapter_uni.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                uni_spinner.setAdapter(adapter_uni);
                uni_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {
                            String tag = parent.getItemAtPosition(position).toString();
                            university = tag;
                        }

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






