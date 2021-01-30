package com.example.akademise;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import androidx.fragment.app.Fragment;

public class RequestInvitationActivity extends AppCompatActivity {


    public static final String MyPEREFERENCES = "MyPrefs";
    public static final String accessToken = "XXXXX";
    public static final String MyIDPEREFERENCES = "MyIDPrefs";
    public static final String accessID = "XXXXXID";
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    private Integer projectId;
    RecyclerView recyclerView;
    List<Request> requests;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //set the layout
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_requests_and_invitations);
        Intent in= getIntent();
        Bundle b = in.getExtras();
        //get the project id of the  request thats made
        projectId = b.getInt("project_id");
        loadData();
    //init retrofit and api object
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(getString(R.string.baseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadIDData();


        Button btnAdd = findViewById(R.id.btnInvite);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //if you want to invite other people to this project
                //click the invite button to go to invite activity
                Intent intent = new Intent(RequestInvitationActivity.this,InvitationActivity.class);
                intent.putExtra("project_id", projectId);
                startActivity(intent);
            }
        });

        getRequests(projectId);

    }




    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }
//see the received requetss
    private void getRequests(Integer projectId) {
        List<Request> mod_req = new ArrayList<Request>();
        //get requests
        Call<List<Request>> call = akademiseApi.getRequests("Bearer " + myToken);
        call.enqueue(new Callback<List<Request>>() {
            @Override
            public void onResponse(Call<List<Request>> call, Response<List<Request>> response) {

                if (!response.isSuccessful()) {
                    Log.d("Request", "onResponse: not successful");
                    return;
                }

                requests = response.body();

                //only see received requests for this project
                for (int i = 0; i < requests.size(); i++) {
                    Request req = requests.get(i);
                    if (req.getProjectId().equals(projectId)) {
                        mod_req.add(req);
                    }
                }
                //set the rv to have a scrollable and responsive list of requests
                recyclerView = findViewById(R.id.rv_recyclerView2);
                RequestAdapter recyclerViewAdapter = new RequestAdapter(RequestInvitationActivity.this, mod_req);
                recyclerView.setLayoutManager(new LinearLayoutManager(RequestInvitationActivity.this));
                recyclerView.setAdapter(recyclerViewAdapter);
            }

            @Override
            public void onFailure(Call<List<Request>> call, Throwable t) {

                Log.d("Project", "onFailure: failed");

            }
        });


    }


    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }


}


