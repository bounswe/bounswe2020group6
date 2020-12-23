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
import androidx.recyclerview.widget.LinearLayoutManager;

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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_creation2);

        loadData();
        done = findViewById(R.id.btnPublicationCreation2);
        done.setOnClickListener(btnNextClickListener);

        getSupportFragmentManager().beginTransaction().replace(R.id.flPublicationCreation2,
                new ProjectInfoEntryFragment2()).commit();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
    }

    View.OnClickListener btnNextClickListener = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            updateAbstract();
        }
    };

    private void updateAbstract() {
        EditText _abstract = findViewById(R.id.etAbstract);
        Summary summary = new Summary(_abstract.getText().toString());
        int id = (int) getIntent().getSerializableExtra("id");
        Call<Project> call = akademiseApi.updateAbstract(id, summary, "Bearer " + myToken);
        call.enqueue(new Callback<Project>() {
            @Override
            public void onResponse(Call<Project> call, Response<Project> response) {

                if (!response.isSuccessful()) {
                    Log.d("Project", "onResponse: not successful");
                    Log.d("Project", myToken);
                    Log.d("NotCreated", response.toString());
                    Toast.makeText(ProjectCreationActivity2.this, "Not updated, try again", Toast.LENGTH_LONG).show();
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
        private void loadData () {
            SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
            myToken = sharedPreferences.getString(accessToken, "");
            Log.d("mytoken", myToken.toString());

    }
}