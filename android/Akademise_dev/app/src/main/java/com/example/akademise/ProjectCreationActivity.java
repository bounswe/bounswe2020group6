package com.example.akademise;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

//activity for creating a new project
public class ProjectCreationActivity extends AppCompatActivity {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";

    Button next;
    AkademiseApi akademiseApi;
    private String myToken;
    String currentText;
    List<String> tags= new ArrayList<String>();
    private boolean privacy;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // initialize the view from the layout
        setContentView(R.layout.activity_project_creation);
        loadData();
        next = findViewById(R.id.btnPublicationCreation);
        next.setOnClickListener(btnNextClickListener);
        //call fragment to input fields
        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation,
                new ProjectInfoEntryFragment()).commit();
        //initialize api
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        akademiseApi = retrofit.create(AkademiseApi.class);
    }
    //button for making a call for project creation
    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            //spinner for privacy
            Spinner privacy_spinner = findViewById(R.id.sPrivacy);

            ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(getBaseContext(),
                    R.array.privacy,
                    android.R.layout.simple_spinner_item);

            adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

            privacy_spinner.setAdapter(adapter2);

            TextView tvChosenTags =findViewById(R.id.tvProjectTags);
            TextView text_privacy =findViewById(R.id.textPrivacy);
            //getting tags for putting them into spinner
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
                    Spinner tag_spinner = (Spinner) findViewById(R.id.sAddResearchTag);
                    List<String> tagList = result.getResult();
                    tagList.add(0, "Choose Tag");
                    ArrayAdapter<String> tag_adapter = new ArrayAdapter<String> (getBaseContext(),
                            android.R.layout.simple_spinner_dropdown_item,tagList);
                    //creating tags spinner
                    tag_adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    tag_spinner.setAdapter(tag_adapter);
                    tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                        //updating tags according to selections
                        @Override
                        public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                            if (position != 0) {
                                currentText = tvChosenTags.getText().toString();
                                String tag = parent.getItemAtPosition(position).toString();
                                if (!currentText.contains(tag)) {
                                    if(currentText.endsWith(":")) {
                                        currentText += " " + tag;
                                    }
                                    else{
                                        currentText += ", "+ tag;
                                    }
                                    tags.add(tag);
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
                //setting privacy of the project accordin to the selection
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    text_privacy.setText(parent.getItemAtPosition(position).toString());
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });
            //getting title, requirements of the project
            EditText etTitle = findViewById(R.id.etTitle);
            EditText etRequirements = findViewById(R.id.etRequirements);
            privacy = !text_privacy.getText().toString().equals("Private");

            //create project call for creating new project
            createProject(privacy,etTitle.getText().toString(),
                    "Insert abstract here!",
                    etRequirements.getText().toString(), tags, null);


        }
    };
    //function that makes a call for new project
    private void createProject(Boolean privacy, String title, String _abstract, String requirements, List<String> tags, List<Integer> collaborators){
        //gets the chosen tags
        TextView tvChosenTags =findViewById(R.id.tvProjectTags);
        EditText etNewTags = findViewById(R.id.etNewTags);
        String thetags = tvChosenTags.getText().toString();
        //aplies tokenization to new tags
        thetags= thetags.replace(", ", ",");
        thetags=thetags.replace("Tags: ","");
        List<String> tagging = Arrays.asList(thetags.split(","));
        List<String> Ltagging = new ArrayList<String>(tagging);
        String written = etNewTags.getText().toString();
        List<String> writtenTags = Arrays.asList(written.split(","));
        for(int i=0; i<writtenTags.size(); i++){
            //adds newly written tags into the database
            if(!writtenTags.get(i).equals("")){
                Call<Tag> call = akademiseApi.addTag(new Tag(writtenTags.get(i)), "Bearer " + myToken);
                call.enqueue(new Callback<Tag>() {
                    @Override
                    public void onResponse(Call<Tag> call, Response<Tag> response) {

                    }

                    @Override
                    public void onFailure(Call<Tag> call, Throwable t) {

                    }
                });
                //adding written tags into the tags will be added
                Ltagging.add(writtenTags.get(i));
            }
        }
        //project object creation for new project
        Project project = new Project(privacy, 4,title,  _abstract, null, requirements, Ltagging);
        //api call for creating new object
        Call<GetProjects> call = akademiseApi.createProject(project, "Bearer "+ myToken);
        call.enqueue(new Callback<GetProjects>() {
            @Override
            public void onResponse(Call<GetProjects> call, Response<GetProjects> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    Log.d("Project", myToken);
                    Log.d("NotCreated", response.toString());
                    Toast.makeText(ProjectCreationActivity.this, "Not created, try again", Toast.LENGTH_LONG).show();
                    return;
                }
                Log.d("Response", response.message());
                Log.d("Project", "onResponse: successful");
                Toast.makeText(ProjectCreationActivity.this, "Project is created", Toast.LENGTH_LONG).show();
                //getting id of the project and giving into next page for the project creation
                int id = response.body().getId();
                Intent intent = new Intent(ProjectCreationActivity.this, ProjectCreationActivity2.class);
                intent.putExtra("id", id);
                startActivity(intent);
                //closing activity
                finish();
            }

            @Override
            public void onFailure(Call<GetProjects> call, Throwable t) {
                Toast.makeText(ProjectCreationActivity.this, "Be sure to be connected", Toast.LENGTH_LONG).show();
                Log.d("Project", "onFailure: failed");
            }
        });


    }
    //get token of the user from local storage
    private void loadData(){
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }


}
