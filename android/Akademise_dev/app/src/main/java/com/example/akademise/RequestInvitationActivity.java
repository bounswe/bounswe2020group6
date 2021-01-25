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
    String baseURL = "http://ec2-52-91-31-85.compute-1.amazonaws.com:3000/";
    AkademiseApi akademiseApi;
    private String myToken;
    private Integer myId;
    private Integer projectId;
    RecyclerView recyclerView;
    List<Request> requests;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_requests_and_invitations);
        Intent in= getIntent();
        Bundle b = in.getExtras();
        projectId = b.getInt("project_id");
        loadData();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        akademiseApi = retrofit.create(AkademiseApi.class);
        loadIDData();


        Button btnAdd = findViewById(R.id.btnInvite);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                invite();
            }
        });

        getRequests(projectId);

    }




    private void loadData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyPEREFERENCES, Context.MODE_PRIVATE);
        myToken = sharedPreferences.getString(accessToken, "");
        Log.d("mytoken", myToken.toString());

    }

    private void getRequests(Integer projectId) {
        List<Request> mod_req = new ArrayList<Request>();
        Call<List<Request>> call = akademiseApi.getRequests("Bearer " + myToken);
        call.enqueue(new Callback<List<Request>>() {
            @Override
            public void onResponse(Call<List<Request>> call, Response<List<Request>> response) {

                if (!response.isSuccessful()) {
                    Log.d("Request", "onResponse: not successful");
                    return;
                }

                requests = response.body();


                for (int i = 0; i < requests.size(); i++) {
                    Request req = requests.get(i);
                    if (req.getProjectId().equals(projectId)) {
                        mod_req.add(req);
                    }
                }

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

    private void invite() {
        List<Integer> i = new ArrayList<Integer>() {{
            add(myId);
            add(1);
            add(projectId);
            add(0);
        }};
        Invitation invitation = new Invitation(i);

        Call<Invitation> call = akademiseApi.addInvitation(invitation, "Bearer " + myToken);
        call.enqueue(new Callback<Invitation> () {
            @Override
            public void onResponse(Call<Invitation> call, Response<Invitation> response) {
                if (!response.isSuccessful()) {
                    System.out.println("NOT SUCCESSFUL");
                    Toast.makeText(getApplicationContext(), "Couldnt send request. ", Toast.LENGTH_LONG).show();
                    return;
                }
                Invitation  invResponse = response.body();
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

    private void loadIDData() {
        SharedPreferences sharedPreferences = this.getSharedPreferences(MyIDPEREFERENCES, Context.MODE_PRIVATE);
        myId = sharedPreferences.getInt(accessID, 0);

    }


}


