package com.example.akademise;

import androidx.appcompat.app.AppCompatActivity;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

//todo: bu benim projem değili nasıl check etmeli ?
public class ProjectDetailsUserActivity extends AppCompatActivity {
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    private int myId;
    private String myToken;
    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    String baseURL = "http://ec2-54-173-244-46.compute-1.amazonaws.com:3000/";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    Project project;
    TextView title;
    TextView _abstract;
    TextView status;
    TextView milestones;
    TextView requirements;
    TextView tags;
    Button req_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_details_u);
        title = findViewById(R.id.title);
        _abstract = findViewById(R.id.tvAbstractProject);
        status = findViewById(R.id.tvStatusProject);
        milestones = findViewById(R.id.tvMilestoneProject);
        requirements = findViewById(R.id.tvRequirementsProject);
        tags = findViewById(R.id.tvTagsProject);
        req_button = findViewById(R.id.btnReqInvProject);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadData();
        getData();
        title.setText(project.getTitle());
        _abstract.setText(project.getAbstract1());
        //status.setText(project.getStatus());
        milestones.setText(project.getDeadline());
        requirements.setText(project.getRequirements());
        //[1,7,b,1] -> user1 7nin  b projesine dahil olmak istiyor (getReq)
        req_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                invite();
            }
        });


    }

    private void getData() {
        String test = getIntent().getClass().toString();
        //Toast.makeText(this, test, Toast.LENGTH_LONG).show();
        if (getIntent().hasExtra("project")) {
            project = (Project) getIntent().getSerializableExtra("project");
        } else {
            Toast.makeText(this, "Something went wrong", Toast.LENGTH_LONG).show();
        }
    }
    //[1,7,b,1] -> user1 7nin  b projesine dahil olmak istiyor (getReq)

    private void invite() {
        List<Integer> i = new ArrayList<Integer>() {{
            add(myId);
            add(project.getUserId());
            add(project.getId());
            add(1);
        }};
        Invitation invitation = new Invitation(i);
        Call<Invitation> call = akademiseApi.addInvitation(invitation, "Bearer " + myToken);
        call.enqueue(new Callback<Invitation>() {
            @Override
            public void onResponse(Call<Invitation> call, Response<Invitation> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getApplicationContext(), "WCouldnt send request. ", Toast.LENGTH_LONG).show();
                    return;
                }
                Invitation invResponse = response.body();
                Toast.makeText(getApplicationContext(), "Successful. ", Toast.LENGTH_LONG).show();

            }

            @Override
            public void onFailure(Call<Invitation> call, Throwable t) {
                Toast.makeText(getApplicationContext(), "Be sure to be connected. ", Toast.LENGTH_LONG).show();
                System.out.println("FAILURE");
                System.out.println(t.getMessage());
            }
        });

    }

    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
}