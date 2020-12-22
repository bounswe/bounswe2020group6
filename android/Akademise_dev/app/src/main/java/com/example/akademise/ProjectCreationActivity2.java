package com.example.akademise;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ProjectCreationActivity2 extends AppCompatActivity {
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    Button done;
    AkademiseApi akademiseApi;
    private String myToken;
    String currentText;
    List<String> tags;
    private int privacy;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_creation2);

        loadData();
        done = findViewById(R.id.btnPublicationCreation2);
        done.setOnClickListener(btnNextClickListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation2,
                new ProjectInfoEntryFragment2()).commit();
        /*
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        */

    }

    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {

            /*
            Spinner research_tag_spinner = findViewById(R.id.sAddResearchTag);

            ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getBaseContext(),
                    R.array.research_tags,
                    android.R.layout.simple_spinner_item);

            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

            research_tag_spinner.setAdapter(adapter);

            Spinner privacy_spinner = findViewById(R.id.sPrivacy);

            ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(getBaseContext(),
                    R.array.privacy,
                    android.R.layout.simple_spinner_item);

            adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

            privacy_spinner.setAdapter(adapter2);

            TextView tvChosenTags =findViewById(R.id.tvProjectTags);
            TextView text_privacy =findViewById(R.id.textPrivacy);
            research_tag_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
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
            privacy_spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    text_privacy.setText(parent.getItemAtPosition(position).toString());
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });

            EditText etTitle = findViewById(R.id.etTitle);
            //EditText etAbstract = findViewById(R.id.etAbstract);
            EditText etDeadline = findViewById(R.id.etMilestone);



            createProject(privacy,etTitle.getText().toString(),
                    "Insert abstract here!",
                    etDeadline.getText().toString(),
                    etRequirements.getText().toString(), tags, null);
*/
            finish();
        }
    };

   /* private  void getPosts(Integer id){
        Call<List<Project>> call= akademiseApi.getProjects(id, "Bearer "+myToken);
        call.enqueue(new Callback<List<Project>>() {
            @Override
            public void onResponse(Call<List<Project>> call, Response<List<Project>> response) {
                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    return;
                }
                List<Project> projects = response.body();
                int count=0;
                for (Project project : projects){
                    count++;
                }
                Log.d("Project", String.valueOf(count));
            }
            @Override
            public void onFailure(Call<List<Project>> call, Throwable t) {
                Log.d("Project", "onFailure: failed");
            }
        });
    }


    private void createProject(Integer privacy, String title, String _abstract, String deadline, String requirements, List<String> tags, List<Integer> collaborators){
        Project project = new Project(privacy, 0,title,  _abstract, null, null, null, deadline, requirements,tags);
        Call<Project> call = akademiseApi.createProject(project, "Bearer "+ myToken);
        call.enqueue(new Callback<Project>() {
            @Override
            public void onResponse(Call<Project> call, Response<Project> response) {

                if(!response.isSuccessful()){
                    Log.d("Project", "onResponse: not successful");
                    Log.d("Project", myToken);
                    Log.d("NotCreated", response.toString());
                    Toast.makeText(ProjectCreationActivity2.this, "Not created, try again", Toast.LENGTH_LONG).show();
                    return;
                }

                Log.d("Project", "onResponse: successful");
                Toast.makeText(ProjectCreationActivity2.this, "Project is updated", Toast.LENGTH_LONG).show();

                finish();
            }

            @Override
            public void onFailure(Call<Project> call, Throwable t) {
                Toast.makeText(ProjectCreationActivity2.this, "Be sure to be connected", Toast.LENGTH_LONG).show();
                Log.d("Project", "onFailure: failed");
            }
        });
    }
    */


    private void loadData(){
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }


}