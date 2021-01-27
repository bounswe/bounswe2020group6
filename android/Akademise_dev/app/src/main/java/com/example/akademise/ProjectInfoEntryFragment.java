package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//fragment for project creation
public class ProjectInfoEntryFragment extends Fragment {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    AkademiseApi akademiseApi;
    private String myToken;
    List<String> tags= new ArrayList<String>();


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_project_info_entry, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        loadData();
        //initialize api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        akademiseApi = retrofit.create(AkademiseApi.class);
        //spinner for setting privacy
        Spinner privacy_spinner = getView().findViewById(R.id.sPrivacy);
        //set privacy spinner's content
        ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(getActivity().getBaseContext(),
                R.array.privacy,
                android.R.layout.simple_spinner_item);

        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        privacy_spinner.setAdapter(adapter2);
        //set chosen tags for the new project
        TextView tvChosenTags =getView().findViewById(R.id.tvProjectTags);
        //set privact for the new project
        TextView text_privacy =getView().findViewById(R.id.textPrivacy);
        //api call for getting all tags from the database
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
                //initialize tag spinner
                Spinner tag_spinner = (Spinner) getView().findViewById(R.id.sAddResearchTag);
                List<String> tagList = result.getResult();
                tagList.add(0, "Choose Tag");
                //set tags of the tags spinner from the tags acquired from database
                ArrayAdapter<String> tag_adapter = new ArrayAdapter<String> (getActivity().getBaseContext(),
                        android.R.layout.simple_spinner_dropdown_item,tagList);
                tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                tag_spinner.setAdapter(tag_adapter);
                tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    //update selected tags after each tag selection
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        if (position != 0) {
                            String currentText = tvChosenTags.getText().toString();
                            String tag = parent.getItemAtPosition(position).toString();
                            //check the new tags validness for addition
                            if (!currentText.contains(tag)) {
                                if(currentText.endsWith(":")) {
                                    currentText += " " + tag;
                                }
                                else{
                                    currentText += ", "+ tag;
                                }
                                //update tags
                                tvChosenTags.setText(currentText);
                            }

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
        privacy_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            //set privacy of the new project
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                text_privacy.setText(parent.getItemAtPosition(position).toString());
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

    }
    //get token of the user from local storage
    private void loadData(){
        SharedPreferences sharedPreferences = getActivity().getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

}