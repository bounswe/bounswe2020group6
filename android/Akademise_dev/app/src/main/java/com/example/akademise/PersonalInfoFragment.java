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
import android.widget.Toast;

import com.example.akademise.R;

import java.util.ArrayList;
import java.util.HashMap;

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
    ArrayList<String> researchTags = new ArrayList<String>();
    HashMap<String, String> affiliations = new HashMap<String, String>();

    @Nullable
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_personalinfo, container, false);

        return view;
    }

    @Override

    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        btn = this.getActivity().findViewById(R.id.btnNext);
        getActivity().getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);


        Spinner uni_select_spinner = (Spinner) getView().findViewById(R.id.uni_select);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getActivity().getBaseContext(),
                R.array.college_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        uni_select_spinner.setAdapter(adapter);

        Spinner degree_spinner = (Spinner) getView().findViewById(R.id.degree_select);
        ArrayAdapter<CharSequence> adapter_3 = ArrayAdapter.createFromResource(getActivity().getBaseContext(),
                R.array.degree_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        degree_spinner.setAdapter(adapter_3);

        Spinner department_select_spinner = (Spinner) getView().findViewById(R.id.department_select);
        ArrayAdapter<CharSequence> adapter_2 = ArrayAdapter.createFromResource(getActivity().getBaseContext(),
                R.array.department_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        department_select_spinner.setAdapter(adapter_2);

        Spinner research_tag_spinner = (Spinner) getView().findViewById(R.id.sResearchTag);
        ArrayAdapter<CharSequence> tag_adapter = ArrayAdapter.createFromResource(getActivity().getBaseContext(),
                R.array.research_tags,
                android.R.layout.simple_spinner_item);
        tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        research_tag_spinner.setAdapter(tag_adapter);

        loadData();
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("buttonId", btn.getText().toString());
                //getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.suFragment,   new HomeFragment()).commit();
                createAffiliation(researchTags,affiliations);

                openLoginActivity();
            }
        });
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);

        TextView tvChosenTags = view.findViewById(R.id.tvChosenResearchTags);

        research_tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position != 0) {
                    String currentText = tvChosenTags.getText().toString();
                    String tag = parent.getItemAtPosition(position).toString();
                    if (!currentText.contains(tag)) {
                        researchTags.add(tag);
                        currentText += " " + tag;

                        tvChosenTags.setText(currentText);
                    }

                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        uni_select_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String tag = parent.getItemAtPosition(position).toString();
                affiliations.put("university", tag);

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        degree_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String tag = parent.getItemAtPosition(position).toString();
                affiliations.put("degree", tag);

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        department_select_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {

            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String tag = parent.getItemAtPosition(position).toString();
                affiliations.put("department", tag);

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    private void createAffiliation(ArrayList<String> researchAreas, HashMap<String, String> affiliations) {

        Affiliation affiliation = new Affiliation(researchAreas, affiliations);
        Call<Affiliation> call = akademiseApi.createAffiliation(affiliation, "Bearer " + myToken);
        call.enqueue(new Callback<Affiliation>() {
            @Override
            public void onResponse(Call<Affiliation> call, Response<Affiliation> response) {


                if (!response.isSuccessful()) {
                    Log.d("Project", "onResponse: not successful");
                    Log.d("Project", myToken);
                    Log.d("NotCreated", response.toString());
                    Log.d("Project", researchAreas.toString());
                    Log.d("Project", affiliations.toString());


                    return;
                }
                Affiliation affResponse = response.body();
                String content = "" + response.code();
                Log.d("Project", "onResponse: successful" + content);


            }

            @Override
            public void onFailure(Call<Affiliation> call, Throwable t) {
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

    public void openLoginActivity() {
        Intent intent = new Intent(getActivity(), LoginActivity.class);
        startActivity(intent);
    }
}






